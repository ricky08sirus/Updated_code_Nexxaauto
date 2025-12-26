# authentication/urls.py
from django.urls import path
from . import views

app_name = "authentication"

urlpatterns = [
    path("contact/", views.submit_contact_form, name="submit_contact"),
    path("contact/test-email/", views.test_email, name="test_email"),
    path("health/", views.health_check, name="health_check"),
]

