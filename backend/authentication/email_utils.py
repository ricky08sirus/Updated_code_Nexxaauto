# authentication/email_utils.py
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging

logger = logging.getLogger(__name__)


def send_contact_notification(submission):
    """
    Send email notification to company when contact form is submitted

    Args:
        submission: ContactSubmission instance
    """
    try:
        # Email subject
        subject = f"New Contact Form Submission - {submission.subject or 'No Subject'}"

        # Create HTML email body
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #dc2626; color: white; padding: 20px; text-align: center; }}
                .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #555; }}
                .value {{ margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #dc2626; }}
                .message-box {{ background-color: white; padding: 15px; border: 1px solid #ddd; min-height: 100px; }}
                .footer {{ text-align: center; padding: 20px; color: #777; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Contact Form Submission</h1>
                    <p>Nexxa Auto Parts</p>
                </div>

                <div class="content">
                    <div class="field">
                        <div class="label">📧 Email:</div>
                        <div class="value">{submission.email}</div>
                    </div>

                    <div class="field">
                        <div class="label">👤 Name:</div>
                        <div class="value">{submission.name or "Not provided"}</div>
                    </div>

                    <div class="field">
                        <div class="label">📋 Subject:</div>
                        <div class="value">{submission.subject or "No subject"}</div>
                    </div>

                    <div class="field">
                        <div class="label">📱 Phone:</div>
                        <div class="value">{submission.phone or "Not provided"}</div>
                    </div>

                    <div class="field">
                        <div class="label">💬 Message:</div>
                        <div class="message-box">{submission.message}</div>
                    </div>

                    <div class="field">
                        <div class="label">🕐 Submitted:</div>
                        <div class="value">{submission.created_at.strftime("%B %d, %Y at %I:%M %p")}</div>
                    </div>

                    <div class="field">
                        <div class="label">🌐 IP Address:</div>
                        <div class="value">{submission.ip_address or "Unknown"}</div>
                    </div>

                    <div class="field">
                        <div class="label">🆔 Submission ID:</div>
                        <div class="value">{submission.id}</div>
                    </div>
                </div>

                <div class="footer">
                    <p>This is an automated notification from your Nexxa Auto Parts contact form.</p>
                    <p>Please respond to: {submission.email}</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Plain text version (fallback)
        text_content = f"""
New Contact Form Submission - Nexxa Auto Parts

Email: {submission.email}
Name: {submission.name or "Not provided"}
Subject: {submission.subject or "No subject"}
Phone: {submission.phone or "Not provided"}

Message:
{submission.message}

Submitted: {submission.created_at.strftime("%B %d, %Y at %I:%M %p")}
IP Address: {submission.ip_address or "Unknown"}
Submission ID: {submission.id}

---
Please respond to: {submission.email}
        """

        # Create email with both HTML and text versions
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=settings.CONTACT_EMAIL_RECIPIENTS,
            reply_to=[submission.email],  # Set reply-to as submitter's email
        )

        # Attach HTML version
        email.attach_alternative(html_content, "text/html")

        # Send email
        email.send(fail_silently=False)

        logger.info(f"Contact form notification sent for submission {submission.id}")
        return True

    except Exception as e:
        logger.error(f"Failed to send contact notification: {str(e)}", exc_info=True)
        return False


def send_auto_reply_to_customer(submission):
    """
    Send automatic reply to customer confirming receipt of their message

    Args:
        submission: ContactSubmission instance
    """
    try:
        subject = "We received your message - Nexxa Auto Parts"

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #dc2626; color: white; padding: 30px; text-align: center; }}
                .content {{ background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }}
                .highlight {{ background-color: #fff; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; }}
                .footer {{ text-align: center; padding: 20px; color: #777; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Contacting Us!</h1>
                    <p>Nexxa Auto Parts</p>
                </div>

                <div class="content">
                    <p>Hi {submission.name or "there"},</p>

                    <p>Thank you for reaching out to <strong>Nexxa Auto Parts</strong>!</p>

                    <p>We have received your message and our team will review it shortly. We typically respond within 24-48 hours during business days.</p>

                    <div class="highlight">
                        <strong>Your Message Summary:</strong><br>
                        <strong>Subject:</strong> {submission.subject or "General Inquiry"}<br>
                        <strong>Reference ID:</strong> {str(submission.id)[:8]}
                    </div>

                    <p>If you have any urgent concerns, please feel free to call us or send another message.</p>

                    <p>Best regards,<br>
                    <strong>Nexxa Auto Parts Team</strong></p>
                </div>

                <div class="footer">
                    <p>This is an automated confirmation email.</p>
                    <p>© 2024 Nexxa Auto Parts. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """

        text_content = f"""
Thank You for Contacting Us!

Hi {submission.name or "there"},

Thank you for reaching out to Nexxa Auto Parts!

We have received your message and our team will review it shortly. We typically respond within 24-48 hours during business days.

Your Message Summary:
Subject: {submission.subject or "General Inquiry"}
Reference ID: {str(submission.id)[:8]}

If you have any urgent concerns, please feel free to call us or send another message.

Best regards,
Nexxa Auto Parts Team

---
This is an automated confirmation email.
© 2024 Nexxa Auto Parts. All rights reserved.
        """

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[submission.email],
        )

        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)

        logger.info(f"Auto-reply sent to {submission.email}")
        return True

    except Exception as e:
        logger.error(f"Failed to send auto-reply: {str(e)}", exc_info=True)
        return False
