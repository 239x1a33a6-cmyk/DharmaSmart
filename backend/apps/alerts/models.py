from django.db import models

class DistrictAlert(models.Model):
    district = models.ForeignKey('district.DistrictBoundary', on_delete=models.CASCADE, related_name='alerts')
    alert_type = models.CharField(max_length=50) # e.g. 'Outbreak', 'Water Quality'
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.alert_type}: {self.title} ({self.district})"
