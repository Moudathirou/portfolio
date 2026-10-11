import logging
import os
from email.message import EmailMessage

import aiosmtplib
from dotenv import load_dotenv

# Charger le fichier .env
load_dotenv()

logger = logging.getLogger(__name__)

RECIPIENT_EMAIL = "kymsaindou@gmail.com"
SMTP_TIMEOUT_SECONDS = 15


class EmailNotConfiguredError(RuntimeError):
    """Les identifiants SMTP sont absents hors environnement de développement."""


class EmailSendError(RuntimeError):
    """L'envoi SMTP a échoué (le détail reste dans les logs serveur)."""


def is_dev() -> bool:
    return os.getenv("ENV", "production").lower() in {"dev", "development", "local"}


def _single_line(value: str) -> str:
    # Empêche toute injection d'en-tête (CR/LF) dans Subject / Reply-To
    return " ".join(value.replace("\r", " ").replace("\n", " ").split())


async def send_contact_email(contact_data: dict) -> None:
    """
    Envoie le message du formulaire de contact.
    En développement sans identifiants SMTP, le message est simplement journalisé.
    Lève EmailNotConfiguredError ou EmailSendError en cas d'échec.
    """
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    sender_email = os.getenv("SENDER_EMAIL", smtp_user)

    if not smtp_user or not smtp_password:
        if is_dev():
            logger.info("[MOCK EMAIL] type=%s (SMTP non configuré, ENV=dev)", contact_data["type"])
            return
        raise EmailNotConfiguredError("SMTP credentials missing")

    name = _single_line(contact_data["name"])
    msg = EmailMessage()
    msg["From"] = sender_email
    msg["To"] = RECIPIENT_EMAIL
    msg["Reply-To"] = _single_line(contact_data["email"])
    msg["Subject"] = f"Portfolio : {_single_line(contact_data['type'])} — {name}"
    msg.set_content(
        "Nouveau message de contact via le portfolio :\n\n"
        f"Nom     : {name}\n"
        f"Email   : {contact_data['email']}\n"
        f"Type    : {contact_data['type']}\n\n"
        "--------------------------------------------------\n"
        "Message :\n"
        f"{contact_data['message']}\n"
        "--------------------------------------------------\n"
    )

    smtp = aiosmtplib.SMTP(
        hostname=smtp_server,
        port=smtp_port,
        start_tls=smtp_port != 465,
        use_tls=smtp_port == 465,
        timeout=SMTP_TIMEOUT_SECONDS,
    )
    try:
        async with smtp:
            await smtp.ehlo()
            # Une seule méthode d'authentification : après un refus, Gmail coupe la connexion
            # et aiosmtplib remonterait « Unexpected EOF » au lieu du vrai code 535.
            if "plain" in smtp.server_auth_methods:
                await smtp.auth_plain(smtp_user, smtp_password)
            else:
                await smtp.login(smtp_user, smtp_password)
            await smtp.send_message(msg)
    except aiosmtplib.SMTPAuthenticationError as exc:
        logger.error(
            "Identifiants SMTP refusés par %s:%s pour %s (code %s : %s)",
            smtp_server, smtp_port, smtp_user, exc.code, exc.message.splitlines()[0],
        )
        raise EmailSendError("SMTP authentication failed") from exc
    except Exception as exc:  # noqa: BLE001 — détail journalisé, jamais renvoyé au client
        logger.exception("Échec de l'envoi SMTP via %s:%s", smtp_server, smtp_port)
        raise EmailSendError("SMTP send failed") from exc
