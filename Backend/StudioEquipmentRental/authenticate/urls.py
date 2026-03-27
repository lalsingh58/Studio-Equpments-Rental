from django.urls import path
from .views import phone_login, google_login

urlpatterns = [
    path('phone/', phone_login),
    path('google/', google_login),
]