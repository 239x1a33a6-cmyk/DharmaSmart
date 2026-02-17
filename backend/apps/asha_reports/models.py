# TODO: Re-enable when using PostGIS-enabled database
# from django.contrib.gis.db import models
from django.db import models
from django.conf import settings

class AshaReport(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='asha_reports')
    district = models.ForeignKey('district.DistrictBoundary', on_delete=models.SET_NULL, null=True, related_name='asha_reports')
    village = models.ForeignKey('district.VillageBoundary', on_delete=models.SET_NULL, null=True, related_name='asha_reports')
    symptoms_json = models.JSONField()
    # TODO: Re-enable when using PostGIS-enabled database
    # geo_point = models.PointField(srid=4326)
    created_at = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [
        ('SUBMITTED', 'Submitted'),
        ('VERIFIED', 'Verified by Doctor'),
        ('REJECTED', 'Rejected'),
        ('ESCALATED', 'Escalated to District'),
        ('CLOSED', 'Closed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SUBMITTED')
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_reports')
    verified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Report {self.id} by {self.user} ({self.status})"

class WaterQualityReading(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='water_quality_readings')
    tds = models.FloatField()
    ph = models.FloatField()
    turbidity = models.FloatField()
    timestamp = models.DateTimeField()
    # TODO: Re-enable when using PostGIS-enabled database
    # geo_point = models.PointField(srid=4326)
    village = models.ForeignKey('district.VillageBoundary', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Water Quality {self.id} - pH: {self.ph}"
