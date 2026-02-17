from rest_framework import serializers
from .models import ClinicalReport

class ClinicalReportSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.username', read_only=True)
    asha_report_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ClinicalReport
        fields = '__all__'
        read_only_fields = ('doctor', 'created_at')
