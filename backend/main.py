from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from backend.models import ContactSchema
from backend.utils import send_contact_email
from dotenv import load_dotenv
import uvicorn
import os

# Charger les variables d'environnement depuis .env
load_dotenv()

# Rate Limiter Setup
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Saindou Portfolio API",
    description="Backend API for Saindou's Portfolio",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS - Important pour Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En prod: ton domaine Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    
    # Content Security Policy (allows Tailwind CDN and Google Fonts)
    csp = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:; "
        "connect-src 'self'; "
        "frame-ancestors 'none'; " 
        "object-src 'none'; "
        "base-uri 'self';"
    )
    response.headers["Content-Security-Policy"] = csp
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    return response

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Mount Static Files (CSS, JS, Assets)
# We mount /src to serve assets referenced in HTML like ./src/...
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
    success = await send_contact_email(contact.dict())
    if success:
        return {"message": "Message envoyé avec succès ! Je vous répondrai sous 24h."}
    else:
        raise HTTPException(status_code=500, detail="Erreur interne lors de l'envoi du message.")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
