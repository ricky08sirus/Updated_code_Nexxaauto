# authentication/serializers.py
from rest_framework import serializers
from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for contact form submissions
    """

    class Meta:
        model = ContactSubmission
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "phone",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_email(self, value):
        """Validate email format"""
        if not value or "@" not in value:
            raise serializers.ValidationError("Please provide a valid email address")
        return value.lower().strip()

    def validate_message(self, value):
        """Validate message is not empty and within limits"""
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Message must be at least 10 characters long"
            )
        if len(value) > 5000:
            raise serializers.ValidationError(
                "Message is too long (max 5000 characters)"
            )
        return value.strip()

    def validate_name(self, value):
        """Clean up name"""
        return value.strip() if value else ""

    def validate_subject(self, value):
        """Clean up subject"""
        return value.strip() if value else ""
