from django.conf import settings
from django.db import models

class ClinicalReport(models.Model):
    asha_report = models.OneToOneField('asha_reports.AshaReport', on_delete=models.CASCADE, related_name='clinical_report')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='clinical_reports')
    diagnosis = models.TextField()
    advisory_text = models.TextField()
    priority = models.CharField(max_length=20, choices=[('LOW', 'Low'), ('MEDIUM', 'Medium'), ('HIGH', 'High'), ('CRITICAL', 'Critical')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Clinical Report for {self.asha_report_id}"
