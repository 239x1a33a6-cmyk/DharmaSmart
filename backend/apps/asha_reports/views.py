from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import AshaReport, WaterQualityReading
from .serializers import AshaReportSerializer, WaterQualityReadingSerializer
from apps.analytics.models import AuditLog

class AshaReportViewSet(viewsets.ModelViewSet):
    queryset = AshaReport.objects.all()
    serializer_class = AshaReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        report = self.get_object()
        report.status = 'VERIFIED'
        report.verified_by = request.user
        report.verified_at = timezone.now()
        report.save()

        # Create Audit Log
        AuditLog.objects.create(
            user=request.user,
            action='VERIFIED_REPORT',
            target=f"Report #{report.id} ({report.symptoms_json.get('severity', 'Unknown')})"
        )

        return Response(self.get_serializer(report).data)

class WaterQualityReadingViewSet(viewsets.ModelViewSet):
    queryset = WaterQualityReading.objects.all()
    serializer_class = WaterQualityReadingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
