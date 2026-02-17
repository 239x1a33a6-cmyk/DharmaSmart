from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.asha_reports.models import AshaReport
from apps.alerts.models import DistrictAlert
from apps.district.models import DistrictBoundary

@receiver(post_save, sender=AshaReport)
def create_alert_for_high_severity(sender, instance, created, **kwargs):
    if created and instance.symptoms_json:
        severity = instance.symptoms_json.get('severity', '').lower()
        if severity == 'high' or severity == 'critical':
            # Find district (assuming link exists, otherwise default to first)
            district = instance.district
            if not district:
                district = DistrictBoundary.objects.first()
            
            village_name = instance.village.village_name if instance.village else 'District'
            DistrictAlert.objects.create(
                district=district,
                alert_type='Outbreak Risk',
                title=f"High Severity Case Reported in {village_name}",
                description=f"A high severity case was reported by {instance.user.username}. Symptoms suggest immediate attention required. Risk score updated.",
            )
