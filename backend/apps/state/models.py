from django.conf import settings
from django.db import models

class StateAdvisory(models.Model):
    state_admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='state_advisories')
    title = models.CharField(max_length=200)
    description = models.TextField()
    budget_recommendations = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
