import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from dotenv import load_dotenv

# Charger le fichier .env
load_dotenv()

RECIPIENT_EMAIL = "kymsaindou@gmail.com"

async def send_contact_email(contact_data: dict):
    """
    Sends an email with the contact form data.
    If credentials are missing, just logs it (Dev mode).
    """
    # Lire les variables au moment de l'appel (après load_dotenv)
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    sender_email = os.getenv("SENDER_EMAIL", smtp_user)

    if not smtp_user or not smtp_password:
        print(f"[MOCK EMAIL] To: {RECIPIENT_EMAIL} | From: {contact_data['email']} | Subject: New Portfolio Contact: {contact_data['type']}")
        print(f"Message: {contact_data['message']}")
        return True

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = RECIPIENT_EMAIL
        # Sanitize subject to prevent header injection
        clean_name = contact_data['name'].replace('\n', ' ').replace('\r', ' ')
        msg['Subject'] = f"Portfolio Contact: {contact_data['type']} from {clean_name}"

        body = f"""
Nouveau message de contact via le portfolio :

Nom     : {contact_data['name']}
Email   : {contact_data['email']}
Type    : {contact_data['type']}

--------------------------------------------------
Message :
{contact_data['message']}
--------------------------------------------------
        """
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
