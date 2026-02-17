from django.contrib import admin
from .models import ClinicalReport


@admin.register(ClinicalReport)
class ClinicalReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'asha_report', 'doctor', 'priority', 'created_at')
    list_filter = ('priority', 'created_at')
    search_fields = ('doctor__username', 'diagnosis')
    readonly_fields = ('created_at',)
    raw_id_fields = ('asha_report', 'doctor')
