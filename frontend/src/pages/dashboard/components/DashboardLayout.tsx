import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: any;
  children: ReactNode;
  onLogout?: () => void;
  roleTitle?: string;
}

export default function DashboardLayout({ user, children, onLogout, roleTitle }: Props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      navigate('/auth/login');
    }
  };

  // Role-based navigation items
  const getNavigationItems = () => {
    const commonItems = [
      { label: 'Dashboard', icon: 'ri-dashboard-line', path: '/dashboard' },
    ];

    const roleSpecificItems: Record<string, any[]> = {
      community_member: [
        { label: 'Report Symptoms', icon: 'ri-thermometer-line', path: '/report-symptoms' },
        { label: 'Water Safety', icon: 'ri-drop-line', path: '/water-report' },
        { label: 'Alerts', icon: 'ri-notification-3-line', path: '/alerts' },
        { label: 'Education', icon: 'ri-book-open-line', path: '/education' },
        { label: 'My Profile', icon: 'ri-user-line', path: '/profile' },
      ],
      asha_worker: [
        { label: 'My Villages', icon: 'ri-map-pin-line', path: '/villages' },
        { label: 'Report Case', icon: 'ri-file-add-line', path: '/report-case' },
        { label: 'Tasks', icon: 'ri-task-line', path: '/tasks' },
        { label: 'Water Inspection', icon: 'ri-drop-line', path: '/water-inspection' },
        { label: 'Training', icon: 'ri-book-open-line', path: '/training' },
      ],
      clinic_staff: [
        { label: 'Pending Cases', icon: 'ri-file-list-3-line', path: '/pending-cases' },
        { label: 'Confirmed Cases', icon: 'ri-checkbox-circle-line', path: '/confirmed-cases' },
        { label: 'Lab Tests', icon: 'ri-test-tube-line', path: '/lab-tests' },
        { label: 'Patient Records', icon: 'ri-folder-user-line', path: '/patient-records' },
        { label: 'Reports', icon: 'ri-file-text-line', path: '/reports' },
      ],
      district_officer: [
        { label: 'Hotspot Map', icon: 'ri-map-2-line', path: '/hotspot-map' },
        { label: 'Analytics', icon: 'ri-bar-chart-line', path: '/analytics' },
        { label: 'Interventions', icon: 'ri-tools-line', path: '/interventions' },
        { label: 'Teams', icon: 'ri-team-line', path: '/teams' },
        { label: 'Resources', icon: 'ri-box-3-line', path: '/resources' },
      ],
      state_authority: [
        { label: 'State Overview', icon: 'ri-government-line', path: '/state-overview' },
        { label: 'District Comparison', icon: 'ri-bar-chart-grouped-line', path: '/district-comparison' },
        { label: 'Forecasting', icon: 'ri-line-chart-line', path: '/forecasting' },
        { label: 'Policy Insights', icon: 'ri-lightbulb-line', path: '/policy-insights' },
        { label: 'Reports', icon: 'ri-file-text-line', path: '/state-reports' },
      ],
      admin: [
        { label: 'User Management', icon: 'ri-user-settings-line', path: '/admin/users' },
        { label: 'Permissions', icon: 'ri-shield-user-line', path: '/admin/permissions' },
        { label: 'System Logs', icon: 'ri-file-list-3-line', path: '/admin/logs' },
        { label: 'Data Monitoring', icon: 'ri-database-2-line', path: '/admin/data' },
        { label: 'Settings', icon: 'ri-settings-3-line', path: '/admin/settings' },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  const navigationItems = getNavigationItems();

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      community_member: 'bg-blue-100 text-blue-700',
      asha_worker: 'bg-purple-100 text-purple-700',
      clinic_staff: 'bg-teal-100 text-teal-700',
      district_officer: 'bg-indigo-100 text-indigo-700',
      state_authority: 'bg-emerald-100 text-emerald-700',
      admin: 'bg-gray-800 text-white',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleDisplayName = (role: string) => {
    const names: Record<string, string> = {
      community_member: 'Community Member',
      asha_worker: 'ASHA Worker',
      clinic_staff: 'Clinic Staff',
      district_officer: 'District Officer',
      state_authority: 'State Authority',
      admin: 'Administrator',
    };
    return names[role] || role;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">Health Surveillance</h2>
                  <p className="text-xs text-gray-600">Early Warning System</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
                <i className="ri-shield-check-line text-white text-xl"></i>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                {getRoleDisplayName(user.role)}
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center'
                  } py-3 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors text-gray-700 cursor-pointer whitespace-nowrap`}
                title={!sidebarOpen ? item.label : ''}
              >
                <i className={`${item.icon} text-xl`}></i>
                {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center'
              } py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer whitespace-nowrap`}
            title={!sidebarOpen ? 'Home' : ''}
          >
            <i className="ri-home-line text-xl"></i>
            {sidebarOpen && <span className="font-medium text-sm">Home</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center'
              } py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700 cursor-pointer whitespace-nowrap`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <i className="ri-logout-box-line text-xl"></i>
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-${sidebarOpen ? 'menu-fold' : 'menu-unfold'}-line text-xl text-gray-700`}></i>
              </button>
              {roleTitle && (
                <h2 className="text-xl font-bold text-navy ml-2">{roleTitle}</h2>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-notification-3-line text-xl text-gray-700"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-settings-3-line text-xl text-gray-700"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
