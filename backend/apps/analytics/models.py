from django.conf import settings
from django.db import models

class RiskScore(models.Model):
    district = models.ForeignKey('district.DistrictBoundary', on_delete=models.CASCADE, related_name='risk_scores')
    score_value = models.FloatField()
    classification = models.CharField(max_length=20) # e.g. 'Low', 'Moderate', 'High'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.district}: {self.score_value}"

class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='audit_logs')
    action = models.CharField(max_length=100)
    target = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action} at {self.timestamp}"
