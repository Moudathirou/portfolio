import logging
import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from backend.models import ContactSchema
from backend.utils import EmailNotConfiguredError, EmailSendError, is_dev, send_contact_email

# Charger les variables d'environnement depuis .env
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MIN_FILL_TIME_MS = 2500
SUCCESS_MESSAGE = "Message envoyé. Je vous réponds sous 24 h ouvrées."


def client_ip(request: Request) -> str:
    """IP réelle du visiteur derrière le proxy Vercel (x-real-ip / x-forwarded-for)."""
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# Rate Limiter Setup (mémoire par instance : complété par le honeypot et le délai minimal)
limiter = Limiter(key_func=client_ip)

DEV = is_dev()
app = FastAPI(
    title="Saindou Portfolio API",
    version="1.1.0",
    docs_url="/docs" if DEV else None,
    redoc_url="/redoc" if DEV else None,
    openapi_url="/openapi.json" if DEV else None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# Security Headers Middleware (en production sur Vercel, les mêmes en-têtes sont posés par vercel.json)
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)

    csp = (
        "default-src 'self'; "
        "script-src 'self' https://cdnjs.cloudflare.com; "
        "style-src 'self' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:; "
        "connect-src 'self'; "
        "form-action 'self'; "
        "frame-ancestors 'none'; "
        "object-src 'none'; "
        "base-uri 'self'"
    )
    response.headers["Content-Security-Policy"] = csp
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), interest-cohort=()"

    return response


# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Mount Static Files (CSS, JS, Assets) référencés en ./src/...
app.mount("/src", StaticFiles(directory=os.path.join(FRONTEND_DIR, "src")), name="src")


@app.get("/")
async def read_root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/contact")
@limiter.limit("5/minute")
async def contact_form(request: Request, contact: ContactSchema):
    """
    Handle contact form submissions.
    """
    # Honeypot rempli : on répond comme un succès sans rien envoyer (ne pas renseigner le bot)
    if contact.website:
        logger.info("Contact ignoré : honeypot rempli")
        return {"message": SUCCESS_MESSAGE}

    if contact.elapsed_ms < MIN_FILL_TIME_MS:
        raise HTTPException(
            status_code=400,
            detail="Envoi trop rapide. Relisez votre message puis renvoyez-le.",
        )

    try:
        await send_contact_email(contact.model_dump(exclude={"website", "elapsed_ms"}))
    except EmailNotConfiguredError:
        logger.error("SMTP non configuré en production")
        raise HTTPException(
            status_code=503,
            detail="L'envoi est momentanément indisponible. Écrivez-moi à kymsaindou@gmail.com.",
        )
    except EmailSendError:
        raise HTTPException(
            status_code=502,
            detail="Le message n'a pas pu être envoyé. Réessayez ou écrivez-moi à kymsaindou@gmail.com.",
        )

    return {"message": SUCCESS_MESSAGE}


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
