import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import DistrictLayout from '../components/layout/DistrictLayout';

const HomePage = lazy(() => import('../pages/home/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const AnalyticsPage = lazy(() => import('../pages/analytics/DistrictAnalytics'));
const AuthorityDashboardPage = lazy(() => import('../pages/dashboard-authority/page'));
const AlertsPage = lazy(() => import('../pages/alerts/page'));
const InterventionsPage = lazy(() => import('../pages/interventions/page'));
const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));
const SignUpPage = lazy(() => import('../pages/auth/SignUp'));
const ReportSymptomsPage = lazy(() => import('../pages/report-symptoms/page'));
const WaterReportPage = lazy(() => import('../pages/water-report/page'));
const EducationPage = lazy(() => import('../pages/education/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Community Pages
const CommunityDashboard = lazy(() => import('../pages/community/Dashboard'));
const ProfileSetup = lazy(() => import('../pages/community/ProfileSetup'));
const CommunitySubmissions = lazy(() => import('../pages/community/Submissions'));
const CommunityAlerts = lazy(() => import('../pages/community/Alerts'));
const CommunityEducation = lazy(() => import('../pages/community/Education'));
const CommunityChatbot = lazy(() => import('../pages/community/Chatbot'));
const CommunityProfile = lazy(() => import('../pages/community/Profile'));

// District Command Center Pages
const DistrictDashboard = lazy(() => import('../pages/district/Dashboard'));
const ClusterMonitor = lazy(() => import('../pages/district/ClusterMonitor'));
const AlertManager = lazy(() => import('../pages/district/AlertManager'));
const RiskMap = lazy(() => import('../pages/district/RiskMap'));
const DistrictReports = lazy(() => import('../pages/district/Reports'));
const DistrictSettings = lazy(() => import('../pages/district/Settings'));
const InterventionManager = lazy(() => import('../pages/district/InterventionManager'));
const PhcMonitor = lazy(() => import('../pages/district/PhcMonitor'));
const ResourceAllocation = lazy(() => import('../pages/district/ResourceAllocation'));
const DistrictDirectives = lazy(() => import('../pages/district/Directives'));
const AshaReports = lazy(() => import('../pages/district/AshaReports'));
const ClinicalReports = lazy(() => import('../pages/district/ClinicalReports'));
const BudgetTracker = lazy(() => import('../pages/district/BudgetTracker'));
const AdvisoryInbox = lazy(() => import('../pages/district/AdvisoryInbox'));
const AlertHistory = lazy(() => import('../pages/district/AlertHistory'));
const RiskAnalytics = lazy(() => import('../pages/district/RiskAnalytics'));

// Super Admin Pages
const SuperAdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UserManagement = lazy(() => import('../pages/admin/UserManagement'));
const UserApprovals = lazy(() => import('../pages/admin/UserApprovals'));
const DistrictManagement = lazy(() => import('../pages/admin/DistrictManagement'));
const PhcManagement = lazy(() => import('../pages/admin/PhcManagement'));
const AuditLogs = lazy(() => import('../pages/admin/AuditLogs'));
const SecurityCenter = lazy(() => import('../pages/admin/Security'));
const AiConfig = lazy(() => import('../pages/admin/AiConfig'));
const AutomationEngine = lazy(() => import('../pages/admin/Automation'));
const GlobalSettings = lazy(() => import('../pages/admin/Settings'));
const ReportsModule = lazy(() => import('../pages/admin/Reports'));
const EmergencyMode = lazy(() => import('../pages/admin/Emergency'));
const SuperAdminLayout = lazy(() => import('../components/layout/SuperAdminLayout'));

// State Admin Pages
const StateLayout = lazy(() => import('../components/layout/StateLayout'));
const StateDashboard = lazy(() => import('../pages/state/Dashboard'));
const StateDistrictPerformance = lazy(() => import('../pages/state/DistrictPerformance'));
const StateRiskIntelligence = lazy(() => import('../pages/state/RiskIntelligence'));
const StateAdvisoryGenerator = lazy(() => import('../pages/state/AdvisoryGenerator'));
const StateComplianceTracker = lazy(() => import('../pages/state/ComplianceTracker'));
const StateHealthCamps = lazy(() => import('../pages/state/HealthCamps'));
const StateMapView = lazy(() => import('../pages/state/MapView'));
const StateReports = lazy(() => import('../pages/state/StateReports'));

// ASHA Worker Pages
const AshaDashboard = lazy(() => import('../pages/asha/Dashboard'));
const AshaProfileSetup = lazy(() => import('../pages/asha/ProfileSetup'));
const AshaReportQueue = lazy(() => import('../pages/asha/ReportQueue'));
const AshaFieldVerification = lazy(() => import('../pages/asha/FieldVerification'));
const AshaClusterDetection = lazy(() => import('../pages/asha/ClusterDetection'));
const AshaWeeklyReport = lazy(() => import('../pages/asha/WeeklyReport'));
const AshaWaterLog = lazy(() => import('../pages/asha/WaterLog'));
const AshaEscalationForm = lazy(() => import('../pages/asha/EscalationForm'));
const AshaDecisionSupport = lazy(() => import('../pages/asha/DecisionSupport'));
const AshaFollowUpTracker = lazy(() => import('../pages/asha/FollowUpTracker'));
const AshaMicroHeatmap = lazy(() => import('../pages/asha/Heatmap'));
const AshaBroadcastTool = lazy(() => import('../pages/asha/BroadcastTool'));
const AshaOfflineManager = lazy(() => import('../pages/asha/OfflineManager'));
const AshaNewCaseReport = lazy(() => import('../pages/asha/NewCaseReport'));
const AshaVisitLog = lazy(() => import('../pages/asha/VisitLog'));
const AshaHelp = lazy(() => import('../pages/asha/Help'));
const AshaProfile = lazy(() => import('../pages/asha/Profile'));
const AshaDirectives = lazy(() => import('../pages/asha/Directives'));
const AshaDistrictInstructions = lazy(() => import('../pages/asha/DistrictInstructions'));
const AshaAwarenessSessions = lazy(() => import('../pages/asha/AwarenessSessions'));
const AshaHealthCamps = lazy(() => import('../pages/asha/HealthCamps'));
const AshaCommunicationArchive = lazy(() => import('../pages/asha/CommunicationArchive'));
const ClinicalDashboard = lazy(() => import('../pages/clinic/Dashboard'));
const DoctorAdvisory = lazy(() => import('../pages/clinic/DoctorAdvisory'));
const AdvisoryHistory = lazy(() => import('../pages/clinic/AdvisoryHistory'));
const CaseAnalysis = lazy(() => import('../pages/clinic/CaseAnalysis'));
const AshaDoctorAdvisories = lazy(() => import('../pages/asha/DoctorAdvisories'));
const RealDataExample = lazy(() => import('../pages/examples/RealDataExample'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },

  // Community Routes
  {
    path: '/community/setup',
    element: (
      <ProtectedRoute requireProfileComplete={false} allowedRoles={['COMMUNITY_MEMBER']}>
        <ProfileSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunityDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/submissions',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunitySubmissions />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/alerts',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunityAlerts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/education',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunityEducation />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/chatbot',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunityChatbot />
      </ProtectedRoute>
    ),
  },
  {
    path: '/community/profile',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER']}>
        <CommunityProfile />
      </ProtectedRoute>
    ),
  },

  // ASHA Worker Routes
  {
    path: '/asha/verify',
    element: (
      <ProtectedRoute requireProfileComplete={false} allowedRoles={['ASHA_WORKER']}>
        <AshaProfileSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/reports',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaReportQueue />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/verify-reports/:id',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaFieldVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/clusters',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaClusterDetection />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/weekly-report',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaWeeklyReport />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/water-monitoring',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaWaterLog />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/escalations',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaEscalationForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/decision-support',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaDecisionSupport />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/follow-ups',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaFollowUpTracker />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/heatmap',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaMicroHeatmap />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/broadcast',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaBroadcastTool />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/district-instructions',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaDistrictInstructions />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/awareness-sessions',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaAwarenessSessions />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/health-camps',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaHealthCamps />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/communication-archive',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaCommunicationArchive />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/offline',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaOfflineManager />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/new-case',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaNewCaseReport />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/household-visits',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaVisitLog />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/verify-reports',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaReportQueue />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/help',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaHelp />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/directives',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaDirectives />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/profile',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaProfile />
      </ProtectedRoute>
    ),
  },

  // Authority & Healthcare Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER', 'CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'STATE_AUTHORITY']}>
        <AnalyticsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard-authority',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <AuthorityDashboardPage />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/clinic/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <ClinicalDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clinic/analysis/:id',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <DoctorAdvisory />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clinic/advisory/:id',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <DoctorAdvisory />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clinic/advisory-history',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <AdvisoryHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clinic/case-analysis',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <CaseAnalysis />
      </ProtectedRoute>
    ),
  },
  {
    path: '/asha/doctor-advisories',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER']}>
        <AshaDoctorAdvisories />
      </ProtectedRoute>
    ),
  },

  // District Admin Dashboard (Dedicated for DHO/District Admin)
  {
    path: '/district/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <DistrictDashboard />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },

  // New District Command Center Routes
  {
    path: '/district/clusters',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <ClusterMonitor />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/alerts',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <AlertManager />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/risk-map',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <RiskMap />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/reports',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <DistrictReports />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/settings',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <DistrictSettings />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/phcs',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <PhcMonitor />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/resources',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <ResourceAllocation />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/interventions',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <InterventionManager />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/water',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <div className="p-8"><h1 className="text-2xl font-bold text-navy">Water Surveillance (Coming Soon)</h1></div>
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/directives',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <DistrictDirectives />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/asha-reports',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <AshaReports />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/clinical-reports',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <ClinicalReports />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/budget',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <BudgetTracker />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/advisories',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <AdvisoryInbox />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/alert-history',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <AlertHistory />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/district/risk-analytics',
    element: (
      <ProtectedRoute allowedRoles={['DHO', 'DISTRICT_ADMIN', 'STATE_AUTHORITY']}>
        <DistrictLayout>
          <RiskAnalytics />
        </DistrictLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: '/alerts',
    element: (
      <ProtectedRoute allowedRoles={['ASHA_WORKER', 'CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <AlertsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/interventions',
    element: (
      <ProtectedRoute allowedRoles={['CLINIC', 'DHO', 'STATE_AUTHORITY']}>
        <InterventionsPage />
      </ProtectedRoute>
    ),
  },

  // Common Protected Routes
  {
    path: '/report-symptoms',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER', 'ASHA_WORKER']}>
        <ReportSymptomsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/water-report',
    element: (
      <ProtectedRoute allowedRoles={['COMMUNITY_MEMBER', 'ASHA_WORKER']}>
        <WaterReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/education',
    element: <EducationPage />,
  },

  // Super Admin Routes
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <SuperAdminDashboard />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <UserManagement />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/districts',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <DistrictManagement />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/phcs',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <PhcManagement />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/logs',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <AuditLogs />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/security',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <SecurityCenter />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/ai-config',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <AiConfig />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/automation',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <AutomationEngine />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <GlobalSettings />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <ReportsModule />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/emergency',
    element: (
      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
        <SuperAdminLayout>
          <EmergencyMode />
        </SuperAdminLayout>
      </ProtectedRoute>
    ),
  },

  // Legacy/Catch-all redirection
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        {/* Profile page handles redirection internally or we can split it */}
        <CommunityProfile />
      </ProtectedRoute>
    ),
  },
  // ===== STATE ADMIN ROUTES =====
  {
    path: '/state/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateDashboard />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/district-performance',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateDistrictPerformance />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/risk-intelligence',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateRiskIntelligence />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/advisory-generator',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateAdvisoryGenerator />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/compliance',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateComplianceTracker />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/health-camps',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateHealthCamps />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/map',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateMapView />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/state/reports',
    element: (
      <ProtectedRoute allowedRoles={['STATE_AUTHORITY']}>
        <StateLayout>
          <StateReports />
        </StateLayout>
      </ProtectedRoute>
    ),
  },
  // Example: Real Data Integration Demo
  {
    path: '/example/real-data',
    element: <RealDataExample />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
