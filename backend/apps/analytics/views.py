from rest_framework import viewsets, permissions
from .models import AuditLog, RiskScore
from .serializers import AuditLogSerializer, RiskScoreSerializer

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]

class RiskScoreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RiskScore.objects.all().order_by('-created_at')
    serializer_class = RiskScoreSerializer
    permission_classes = [permissions.IsAuthenticated]
