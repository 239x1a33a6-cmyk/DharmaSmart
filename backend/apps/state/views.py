from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import StateAdvisory
from .serializers import StateAdvisorySerializer

class StateAdvisoryViewSet(viewsets.ModelViewSet):
    queryset = StateAdvisory.objects.all()
    serializer_class = StateAdvisorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(state_admin=self.request.user)

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        from apps.asha_reports.models import AshaReport
        from apps.alerts.models import DistrictAlert
        from apps.district.models import DistrictBoundary
        from django.db.models import Count, Q

        total_reports = AshaReport.objects.count()
        verified_cases = AshaReport.objects.filter(status='VERIFIED').count()
        active_alerts = DistrictAlert.objects.filter(status='Open').count()
        
        # District Rankings (by Risk Score)
        # For hackathon, we'll mock risk scores if not enough data, or aggregate reports
        districts = DistrictBoundary.objects.annotate(
            report_count=Count('asha_reports'),
            high_risk_count=Count('asha_reports', filter=Q(asha_reports__symptoms_json__severity='High'))
        ).values('id', 'district_name', 'report_count', 'high_risk_count')

        return Response({
            'total_reports': total_reports,
            'verified_cases': verified_cases,
            'active_alerts': active_alerts,
            'districts': list(districts)
        })
