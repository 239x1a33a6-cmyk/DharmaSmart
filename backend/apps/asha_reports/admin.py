from django.contrib.gis import admin
from .models import AshaReport, WaterQualityReading


@admin.register(AshaReport)
class AshaReportAdmin(admin.GISModelAdmin):
    list_display = ('id', 'user', 'district', 'village', 'get_symptoms_summary', 'status', 'created_at')
    list_filter = ('district', 'village', 'status', 'created_at')
    search_fields = ('user__username', 'district__district_name', 'village__village_name')
    readonly_fields = ('created_at',)
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 12,
            'default_lon': 79.4192,
            'default_lat': 13.6288,
        },
    }

    def get_symptoms_summary(self, obj):
        if not obj.symptoms_json:
            return "-"
        severity = obj.symptoms_json.get('severity', 'Unknown')
        patient = obj.symptoms_json.get('patientName', 'Unknown')
        symptoms = ", ".join(obj.symptoms_json.get('symptoms', []))
        return f"[{severity}] {patient} - {symptoms}"
    
    get_symptoms_summary.short_description = "Symptom Report"


@admin.register(WaterQualityReading)
class WaterQualityReadingAdmin(admin.GISModelAdmin):
    list_display = ('id', 'user', 'ph', 'tds', 'turbidity', 'timestamp', 'created_at')
    list_filter = ('timestamp', 'created_at')
    search_fields = ('user__username',)
    readonly_fields = ('created_at',)
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 12,
            'default_lon': 79.4192,
            'default_lat': 13.6288,
        },
    }
