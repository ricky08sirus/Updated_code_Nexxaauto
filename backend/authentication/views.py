# authentication/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer
from .email_utils import send_contact_notification, send_auto_reply_to_customer
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Extract client IP address from request"""
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


@api_view(["POST"])
@permission_classes([AllowAny])
def submit_contact_form(request):
    """
    Handle contact form submission and send email notifications

    POST /api/contact/

    Body (JSON):
    {
        "name": "John Doe",           // Optional
        "email": "john@example.com",  // Required
        "subject": "General Inquiry", // Optional
        "message": "Your message...",  // Required
        "phone": "+1234567890"        // Optional
    }
    """

    # Add IP and user agent to the data
    data = request.data.copy()

    # Create serializer
    serializer = ContactSubmissionSerializer(data=data)

    if serializer.is_valid():
        try:
            # Save submission with metadata
            submission = serializer.save(
                ip_address=get_client_ip(request),
                user_agent=request.META.get("HTTP_USER_AGENT", "")[:500],
            )

            logger.info(f"Contact form submitted by {submission.email}")

            # Send email notification to company
            email_sent = send_contact_notification(submission)

            # Send auto-reply to customer
            auto_reply_sent = send_auto_reply_to_customer(submission)

            if email_sent:
                logger.info(
                    f"Email notification sent successfully for submission {
                        submission.id
                    }"
                )
            else:
                logger.warning(
                    f"Failed to send email notification for submission {submission.id}"
                )

            if auto_reply_sent:
                logger.info(f"Auto-reply sent to {submission.email}")
            else:
                logger.warning(f"Failed to send auto-reply to {submission.email}")

            return Response(
                {
                    "success": True,
                    "message": "Your message has been sent successfully! We will get back to you soon.",
                    "submission_id": str(submission.id),
                    "email_sent": email_sent,
                    "auto_reply_sent": auto_reply_sent,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            logger.error(f"Error saving contact submission: {str(e)}", exc_info=True)
            return Response(
                {"error": "Failed to submit form. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # Return validation errors
    return Response(
        {"success": False, "errors": serializer.errors},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """Simple health check endpoint"""
    return Response({"status": "ok", "message": "Contact API is running"})


@api_view(["POST"])
@permission_classes([AllowAny])
def test_email(request):
    """
    Test email configuration

    POST /api/contact/test-email/
    """
    try:
        from django.core.mail import send_mail
        from django.conf import settings

        send_mail(
            subject="Test Email from Nexxa Auto Parts",
            message="This is a test email to verify your email configuration is working correctly.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=settings.CONTACT_EMAIL_RECIPIENTS,
            fail_silently=False,
        )

        return Response(
            {
                "success": True,
                "message": "Test email sent successfully! Check your inbox.",
            }
        )

    except Exception as e:
        logger.error(f"Test email failed: {str(e)}", exc_info=True)
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
