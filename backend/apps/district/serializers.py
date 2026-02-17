from rest_framework import serializers
from .models import Directive, DistrictBoundary, VillageBoundary

class DirectiveSerializer(serializers.ModelSerializer):
    issued_by_name = serializers.CharField(source='issued_by.username', read_only=True)
    target_district_name = serializers.CharField(source='target_district.district_name', read_only=True, allow_null=True)
    
    class Meta:
        model = Directive
        fields = ['id', 'issued_by', 'issued_by_name', 'target_district', 'target_district_name', 'target_village', 'title', 'description', 'priority', 'created_at', 'is_active']

class DistrictBoundarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictBoundary
        fields = ['id', 'district_name', 'state_name']

class VillageBoundarySerializer(serializers.ModelSerializer):
    class Meta:
        model = VillageBoundary
        fields = ['id', 'village_name', 'district']
