from rest_framework import serializers
from .models import AuditLog, RiskScore

class AuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'user_name', 'action', 'target', 'timestamp']

class RiskScoreSerializer(serializers.ModelSerializer):
    district_name = serializers.CharField(source='district.district_name', read_only=True)
    
    class Meta:
        model = RiskScore
        fields = ['id', 'district', 'district_name', 'score_value', 'classification', 'created_at']
