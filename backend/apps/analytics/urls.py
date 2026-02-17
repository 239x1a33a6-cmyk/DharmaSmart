from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditLogViewSet, RiskScoreViewSet

router = DefaultRouter()
router.register(r'audit-logs', AuditLogViewSet)
router.register(r'risk-scores', RiskScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
