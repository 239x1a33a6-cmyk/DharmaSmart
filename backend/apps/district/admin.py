from django.contrib.gis import admin
from .models import DistrictBoundary, VillageBoundary


@admin.register(DistrictBoundary)
class DistrictBoundaryAdmin(admin.GISModelAdmin):
    list_display = ('district_name', 'state_name')
    search_fields = ('district_name', 'state_name')
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 7,
            'default_lon': 79.4192,
            'default_lat': 13.6288,
        },
    }


@admin.register(VillageBoundary)
class VillageBoundaryAdmin(admin.GISModelAdmin):
    list_display = ('village_name', 'district')
    list_filter = ('district',)
    search_fields = ('village_name',)
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 10,
            'default_lon': 79.4192,
            'default_lat': 13.6288,
        },
    }
