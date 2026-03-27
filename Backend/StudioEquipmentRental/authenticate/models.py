from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    google_id = models.CharField(max_length=255, null=True, blank=True)