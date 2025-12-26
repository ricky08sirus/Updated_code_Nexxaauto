# authentication/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """
    Admin interface for Contact Form Submissions
    """

    list_display = [
        "id_short",
        "name_or_anonymous",
        "email",
        "subject_short",
        "status_badge",
        "created_at",
        "is_new",
    ]

    list_filter = [
        "status",
        "created_at",
        "resolved_at",
    ]

    search_fields = [
        "email",
        "name",
        "subject",
        "message",
        "id",
    ]

    readonly_fields = [
        "id",
        "created_at",
        "updated_at",
        "resolved_at",
        "ip_address",
        "user_agent",
    ]

    fieldsets = (
        (
            "Contact Information",
            {
                "fields": (
                    "id",
                    "email",
                    "name",
                    "phone",
                )
            },
        ),
        (
            "Inquiry Details",
            {
                "fields": (
                    "subject",
                    "message",
                    "status",
                )
            },
        ),
        (
            "Admin Section",
            {"fields": ("admin_notes",)},
        ),
        (
            "Metadata",
            {
                "fields": (
                    "ip_address",
                    "user_agent",
                    "created_at",
                    "updated_at",
                    "resolved_at",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    ordering = ["-created_at"]
    date_hierarchy = "created_at"

    actions = [
        "mark_as_in_progress",
        "mark_as_resolved",
        "mark_as_new",
    ]

    # Custom display methods
    def id_short(self, obj):
        """Display shortened UUID"""
        return str(obj.id)[:8]

    id_short.short_description = "ID"

    def name_or_anonymous(self, obj):
        """Display name or 'Anonymous' if not provided"""
        return obj.name if obj.name else "Anonymous"

    name_or_anonymous.short_description = "Name"

    def subject_short(self, obj):
        """Display shortened subject"""
        if obj.subject:
            return obj.subject[:50] + "..." if len(obj.subject) > 50 else obj.subject
        return "(No subject)"

    subject_short.short_description = "Subject"

    def status_badge(self, obj):
        """Display status with color coding"""
        colors = {
            "new": "#e74c3c",  # Red
            "in_progress": "#f39c12",  # Orange
            "resolved": "#27ae60",  # Green
            "closed": "#95a5a6",  # Gray
        }
        color = colors.get(obj.status, "#95a5a6")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; '
            'border-radius: 3px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Status"

    # Admin actions
    def mark_as_in_progress(self, request, queryset):
        """Mark selected submissions as in progress"""
        updated = queryset.update(status="in_progress")
        self.message_user(request, f"{updated} submission(s) marked as in progress.")

    mark_as_in_progress.short_description = "Mark as In Progress"

    def mark_as_resolved(self, request, queryset):
        """Mark selected submissions as resolved"""
        count = 0
        for submission in queryset:
            submission.mark_as_resolved()
            count += 1
        self.message_user(request, f"{count} submission(s) marked as resolved.")

    mark_as_resolved.short_description = "Mark as Resolved"

    def mark_as_new(self, request, queryset):
        """Mark selected submissions as new"""
        updated = queryset.update(status="new", resolved_at=None)
        self.message_user(request, f"{updated} submission(s) marked as new.")

    mark_as_new.short_description = "Mark as New"
