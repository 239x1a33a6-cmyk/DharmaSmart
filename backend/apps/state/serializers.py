from rest_framework import serializers
from .models import StateAdvisory

class StateAdvisorySerializer(serializers.ModelSerializer):
    admin_name = serializers.CharField(source='state_admin.username', read_only=True)

    class Meta:
        model = StateAdvisory
        fields = '__all__'
        read_only_fields = ('state_admin', 'created_at')
