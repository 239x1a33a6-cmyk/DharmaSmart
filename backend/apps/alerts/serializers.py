from rest_framework import serializers
from .models import DistrictAlert

class DistrictAlertSerializer(serializers.ModelSerializer):
    district_name = serializers.CharField(source='district.district_name', read_only=True)

    class Meta:
        model = DistrictAlert
        fields = '__all__'
        read_only_fields = ('created_at',)
