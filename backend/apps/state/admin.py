from django.contrib import admin
from .models import StateAdvisory


@admin.register(StateAdvisory)
class StateAdvisoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'state_admin', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    readonly_fields = ('created_at',)
