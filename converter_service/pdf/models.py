from django.db import models
from datetime import datetime


class OriginalFile(models.Model):
    name = models.CharField(max_length=128)
    size = models.BigIntegerField()
    extension = models.CharField(max_length=10)
    url = models.URLField(max_length=200)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField()
    deleted_at = models.DateTimeField()
