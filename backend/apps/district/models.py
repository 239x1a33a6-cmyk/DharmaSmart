# TODO: Re-enable when using PostGIS-enabled database
# from django.contrib.gis.db import models
from django.db import models
from django.conf import settings

class DistrictBoundary(models.Model):
    district_name = models.CharField(max_length=100, unique=True)
    state_name = models.CharField(max_length=100)
    # TODO: Re-enable when using PostGIS-enabled database
    # geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.district_name

class VillageBoundary(models.Model):
    village_name = models.CharField(max_length=100)
    district = models.ForeignKey(DistrictBoundary, on_delete=models.CASCADE, related_name='villages')
    # TODO: Re-enable when using PostGIS-enabled database
    # geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return f"{self.village_name} ({self.district.district_name})"

class Directive(models.Model):
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    ]
    
    issued_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='issued_directives')
    target_district = models.ForeignKey(DistrictBoundary, on_delete=models.CASCADE, null=True, blank=True, related_name='directives')
    target_village = models.ForeignKey(VillageBoundary, on_delete=models.CASCADE, null=True, blank=True, related_name='directives')
    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='MEDIUM')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Directive: {self.title} by {self.issued_by}"

