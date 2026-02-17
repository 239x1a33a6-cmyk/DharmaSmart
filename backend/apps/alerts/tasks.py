from celery import shared_task
import time

@shared_task
def send_alert_notification(alert_id):
    """
    Mock task to send SMS/WhatsApp notification via Twilio.
    """
    from .models import DistrictAlert
    try:
        alert = DistrictAlert.objects.get(id=alert_id)
        print(f"Sending notification for Alert: {alert.title} to District: {alert.district.district_name}")
        # Simulate API call latency
        time.sleep(2)
        print("Notification sent successfully.")
        return f"Notification sent for alert {alert_id}"
    except DistrictAlert.DoesNotExist:
        return f"Alert {alert_id} not found"
