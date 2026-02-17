from django.contrib import admin
from .models import RiskScore, AuditLog


@admin.register(RiskScore)
class RiskScoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'district', 'classification', 'score_value', 'created_at')
    list_filter = ('classification', 'district', 'created_at')
    search_fields = ('district__district_name',)
    readonly_fields = ('created_at',)


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'action', 'target', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__username', 'action', 'target')
    readonly_fields = ('timestamp',)
