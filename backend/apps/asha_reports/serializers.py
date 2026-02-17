from rest_framework import serializers
from .models import AshaReport, WaterQualityReading
from apps.district.models import DistrictBoundary, VillageBoundary

class AshaReportSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    district_name = serializers.CharField(source='district.district_name', read_only=True)
    village_name = serializers.CharField(source='village.village_name', read_only=True)
    is_processed = serializers.SerializerMethodField()
    verified_by_name = serializers.CharField(source='verified_by.username', read_only=True)

    class Meta:
        model = AshaReport
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'is_processed', 'verified_by', 'verified_at')

    def get_is_processed(self, obj):
        return obj.status in ['VERIFIED', 'ESCALATED', 'CLOSED']

class WaterQualityReadingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = WaterQualityReading
        fields = '__all__'
        read_only_fields = ('user', 'created_at')
