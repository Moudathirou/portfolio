import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException

# Mock email sender for dev, switch to real SMTP if env vars present
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", SMTP_USER)
RECIPIENT_EMAIL = "kymsaindou@gmail.com"

async def send_contact_email(contact_data: dict):
    """
    Sends an email with the contact form data.
    If credentials are missing, just logs it (Dev mode).
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"[MOCK EMAIL] To: {RECIPIENT_EMAIL} | From: {contact_data['email']} | Subject: New Portfolio Contact: {contact_data['type']}")
        print(f"Message: {contact_data['message']}")
        return True

    try:
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECIPIENT_EMAIL
        # Sanitize subject to prevent header injection
        clean_name = contact_data['name'].replace('\n', ' ').replace('\r', ' ')
        msg['Subject'] = f"Portfolio Contact: {contact_data['type']} from {clean_name}"

        body = f"""
        Nouveau message de contact via le portfolio :
        
        Nom : {contact_data['name']}
        Email : {contact_data['email']}
        Type : {contact_data['type']}
        
        --------------------------------------------------
        Message :
        {contact_data['message']}
        --------------------------------------------------
        """
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")
