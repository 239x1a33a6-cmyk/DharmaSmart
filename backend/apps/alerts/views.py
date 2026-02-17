from rest_framework import viewsets, permissions
from .models import DistrictAlert
from .serializers import DistrictAlertSerializer

class DistrictAlertViewSet(viewsets.ModelViewSet):
    queryset = DistrictAlert.objects.all()
    serializer_class = DistrictAlertSerializer
    permission_classes = [permissions.IsAuthenticated]
