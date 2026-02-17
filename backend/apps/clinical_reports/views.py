from rest_framework import viewsets, permissions
from .models import ClinicalReport
from .serializers import ClinicalReportSerializer

class ClinicalReportViewSet(viewsets.ModelViewSet):
    queryset = ClinicalReport.objects.all()
    serializer_class = ClinicalReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)
