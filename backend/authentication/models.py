# authentication/models.py
from django.db import models
from django.utils import timezone
import uuid


class ContactSubmission(models.Model):
    """
    Model to store contact form submissions from users
    No authentication required - anyone can submit
    """

    STATUS_CHOICES = [
        ("new", "New"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Contact Information
    email = models.EmailField(
        max_length=255, help_text="User's email address for response"
    )

    name = models.CharField(
        max_length=255, blank=True, help_text="User's name (optional)"
    )

    subject = models.CharField(
        max_length=255, blank=True, help_text="Subject of the inquiry"
    )

    # Message/Query
    message = models.TextField(help_text="User's query or message to the company")

    # Additional Information
    phone = models.CharField(
        max_length=20, blank=True, help_text="Phone number (optional)"
    )

    # Status tracking
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new",
        help_text="Current status of the inquiry",
    )

    # Admin notes
    admin_notes = models.TextField(
        blank=True, help_text="Internal notes for admin staff"
    )

    # Timestamps
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="When the contact form was submitted"
    )

    updated_at = models.DateTimeField(
        auto_now=True, help_text="Last time this record was updated"
    )

    resolved_at = models.DateTimeField(
        null=True, blank=True, help_text="When the inquiry was resolved"
    )

    # Metadata
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address of the submitter (for spam prevention)",
    )

    user_agent = models.TextField(
        blank=True, help_text="Browser user agent (for spam prevention)"
    )

    class Meta:
        db_table = "contact_submissions"
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["status"]),
            models.Index(fields=["-created_at"]),
        ]

    def __str__(self):
        name_display = self.name if self.name else "Anonymous"
        return f"{name_display} ({self.email}) - {self.created_at.strftime('%Y-%m-%d')}"

    def mark_as_resolved(self):
        """Mark this inquiry as resolved"""
        self.status = "resolved"
        self.resolved_at = timezone.now()
        self.save(update_fields=["status", "resolved_at", "updated_at"])

    def mark_as_in_progress(self):
        """Mark this inquiry as in progress"""
        self.status = "in_progress"
        self.save(update_fields=["status", "updated_at"])

    def to_dict(self):
        """Convert contact submission to dictionary for API responses"""
        return {
            "id": str(self.id),
            "email": self.email,
            "name": self.name,
            "subject": self.subject,
            "message": self.message,
            "phone": self.phone,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    @property
    def is_new(self):
        """Check if this is a new, unread submission"""
        return self.status == "new"

    @property
    def response_time(self):
        """Calculate time taken to resolve (if resolved)"""
        if self.resolved_at:
            delta = self.resolved_at - self.created_at
            return delta
        return None
