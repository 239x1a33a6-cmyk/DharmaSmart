from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Directive, DistrictBoundary, VillageBoundary
from .serializers import DirectiveSerializer, DistrictBoundarySerializer, VillageBoundarySerializer

class DirectiveViewSet(viewsets.ModelViewSet):
    queryset = Directive.objects.all().order_by('-created_at')
    serializer_class = DirectiveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(issued_by=self.request.user)

class DistrictBoundaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DistrictBoundary.objects.all()
    serializer_class = DistrictBoundarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['get'])
    def dashboard_stats(self, request, pk=None):
        """
        Custom endpoint to serve real-time stats for the District Dashboard.
        aggregated from AshaReports and Alerts.
        """
        district = self.get_object()
        
        # dynamic imports to avoid circular dependency
        from apps.asha_reports.models import AshaReport
        from apps.analytics.models import RiskScore, AuditLog
        
        # 1. Total Reports
        total_reports = AshaReport.objects.filter(district__district_name=district.district_name).count()
        
        # 2. ASHA Worker Count (mock or real)
        asha_worker_count = 142 # Placeholder or filter Users by role
        
        # 3. Compliance Score (mock logic for now)
        compliance_score = 88 
        
        # 4. Risk Score (fetch latest)
        latest_risk = RiskScore.objects.filter(district=district).order_by('-created_at').first()
        risk_score = latest_risk.score_value if latest_risk else 45
        
        # 5. Active Alerts (High Severity Reports not verified)
        active_alerts = AshaReport.objects.filter(
            district__district_name=district.district_name,
            symptoms_json__severity='High',
            status='SUBMITTED' # Using the new status field
        ).count()

        data = {
            "district_name": district.district_name,
            "population": 450000, # Mock population
            "total_reports": total_reports,
            "asha_worker_count": asha_worker_count,
            "compliance_score": compliance_score,
            "risk_score": risk_score,
            "active_alerts": active_alerts,
        }
        return Response(data)

class VillageBoundaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VillageBoundary.objects.all()
    serializer_class = VillageBoundarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
