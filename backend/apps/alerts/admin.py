from django.contrib import admin
from .models import DistrictAlert


@admin.register(DistrictAlert)
class DistrictAlertAdmin(admin.ModelAdmin):
    list_display = ('id', 'district', 'alert_type', 'title', 'created_at')
    list_filter = ('alert_type', 'district', 'created_at')
    search_fields = ('title', 'description', 'district__district_name')
    readonly_fields = ('created_at',)
