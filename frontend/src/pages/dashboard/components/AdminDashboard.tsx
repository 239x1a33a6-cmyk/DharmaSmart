import { useState } from 'react';

interface Props {
  user: any;
}

export default function AdminDashboard({ user }: Props) {
  const [selectedTab, setSelectedTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '1,847', icon: 'ri-user-line', color: 'bg-blue-500', change: '+42 this month' },
    { label: 'Active Sessions', value: '324', icon: 'ri-pulse-line', color: 'bg-green-500', change: 'Real-time' },
    { label: 'System Health', value: '98%', icon: 'ri-heart-pulse-line', color: 'bg-teal-500', change: 'All systems operational' },
    { label: 'Data Records', value: '45.2K', icon: 'ri-database-2-line', color: 'bg-purple-500', change: '+1.2K today' },
  ];

  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'community@demo.gov',
      role: 'Community Member',
      status: 'Active',
      lastLogin: '2 hours ago',
      district: 'Majuli',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'asha@demo.gov',
      role: 'ASHA Worker',
      status: 'Active',
      lastLogin: '30 mins ago',
      district: 'Dibrugarh',
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      email: 'clinic@demo.gov',
      role: 'Clinic Staff',
      status: 'Active',
      lastLogin: '1 hour ago',
      district: 'Jorhat',
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      email: 'district@demo.gov',
      role: 'District Officer',
      status: 'Active',
      lastLogin: '15 mins ago',
      district: 'Sivasagar',
    },
    {
      id: 5,
      name: 'Dr. Meena Singh',
      email: 'state@demo.gov',
      role: 'State Authority',
      status: 'Active',
      lastLogin: '45 mins ago',
      district: 'State Level',
    },
  ];

  const systemLogs = [
    {
      id: 1,
      type: 'INFO',
      action: 'User Login',
      user: 'asha@demo.gov',
      timestamp: '2024-12-25 14:30:22',
      details: 'Successful login from IP 192.168.1.100',
    },
    {
      id: 2,
      type: 'WARNING',
      action: 'High API Usage',
      user: 'System',
      timestamp: '2024-12-25 14:25:15',
      details: 'API rate limit approaching threshold (85%)',
    },
    {
      id: 3,
      type: 'SUCCESS',
      action: 'Data Sync',
      user: 'System',
      timestamp: '2024-12-25 14:20:00',
      details: 'Successfully synced 1,247 records',
    },
    {
      id: 4,
      type: 'ERROR',
      action: 'Failed Login Attempt',
      user: 'unknown@test.com',
      timestamp: '2024-12-25 14:15:45',
      details: 'Invalid credentials - 3rd attempt',
    },
  ];

  const permissions = [
    { role: 'Community Member', view: true, create: true, edit: false, delete: false, admin: false },
    { role: 'ASHA Worker', view: true, create: true, edit: true, delete: false, admin: false },
    { role: 'Clinic Staff', view: true, create: true, edit: true, delete: false, admin: false },
    { role: 'District Officer', view: true, create: true, edit: true, delete: true, admin: false },
    { role: 'State Authority', view: true, create: true, edit: true, delete: true, admin: false },
    { role: 'Admin', view: true, create: true, edit: true, delete: true, admin: true },
  ];

  const dataMetrics = [
    { metric: 'Health Reports', count: 12847, growth: '+8.5%', status: 'healthy' },
    { metric: 'Water Quality Data', count: 3421, growth: '+12.3%', status: 'healthy' },
    { metric: 'Alert Messages', count: 8956, growth: '+15.7%', status: 'warning' },
    { metric: 'AI Predictions', count: 1567, growth: '+22.1%', status: 'healthy' },
  ];

  const handleToggleUser = (userId: number) => {
    alert(`User status toggled for user ID: ${userId}`);
  };

  const handleResetPassword = (userId: number) => {
    alert(`Password reset email sent for user ID: ${userId}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">System Administration</h1>
            <p className="text-white/90 text-lg">Welcome, {user.name} | System Administrator</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-shield-check-line text-6xl"></i>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('users')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'users'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-user-line mr-2"></i>
              User Management
            </button>
            <button
              onClick={() => setSelectedTab('permissions')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'permissions'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-shield-user-line mr-2"></i>
              Permissions
            </button>
            <button
              onClick={() => setSelectedTab('logs')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'logs'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              System Logs
            </button>
            <button
              onClick={() => setSelectedTab('data')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTab === 'data'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-database-2-line mr-2"></i>
              Data Monitoring
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* User Management Tab */}
          {selectedTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users by name, email, or role..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Add New User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">District</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Login</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.district}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleToggleUser(user.id)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap"
                              title="Toggle Status"
                            >
                              <i className="ri-toggle-line text-gray-600"></i>
                            </button>
                            <button
                              onClick={() => handleResetPassword(user.id)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap"
                              title="Reset Password"
                            >
                              <i className="ri-lock-password-line text-gray-600"></i>
                            </button>
                            <button
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap"
                              title="Edit User"
                            >
                              <i className="ri-edit-line text-gray-600"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {selectedTab === 'permissions' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Role-Based Access Control</h3>
                <p className="text-sm text-gray-600">Manage permissions for each user role in the system</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">View</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Create</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Edit</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Delete</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Admin</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-900">{perm.role}</td>
                        <td className="py-3 px-4 text-center">
                          <i className={`text-xl ${perm.view ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <i className={`text-xl ${perm.create ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <i className={`text-xl ${perm.edit ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <i className={`text-xl ${perm.delete ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <i className={`text-xl ${perm.admin ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-xs font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                            Edit Permissions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Logs Tab */}
          {selectedTab === 'logs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">System Activity Logs</h3>
                  <p className="text-sm text-gray-600">Real-time monitoring of system events and user activities</p>
                </div>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-download-line mr-2"></i>
                  Export Logs
                </button>
              </div>

              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 rounded-xl border-2 ${
                      log.type === 'ERROR'
                        ? 'border-red-200 bg-red-50'
                        : log.type === 'WARNING'
                        ? 'border-orange-200 bg-orange-50'
                        : log.type === 'SUCCESS'
                        ? 'border-green-200 bg-green-50'
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            log.type === 'ERROR'
                              ? 'bg-red-500'
                              : log.type === 'WARNING'
                              ? 'bg-orange-500'
                              : log.type === 'SUCCESS'
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}
                        >
                          <i
                            className={`text-white text-xl ${
                              log.type === 'ERROR'
                                ? 'ri-error-warning-line'
                                : log.type === 'WARNING'
                                ? 'ri-alert-line'
                                : log.type === 'SUCCESS'
                                ? 'ri-check-line'
                                : 'ri-information-line'
                            }`}
                          ></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-gray-900">{log.action}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                log.type === 'ERROR'
                                  ? 'bg-red-500 text-white'
                                  : log.type === 'WARNING'
                                  ? 'bg-orange-500 text-white'
                                  : log.type === 'SUCCESS'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-blue-500 text-white'
                              }`}
                            >
                              {log.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{log.details}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>
                              <i className="ri-user-line mr-1"></i>
                              {log.user}
                            </span>
                            <span>
                              <i className="ri-time-line mr-1"></i>
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Monitoring Tab */}
          {selectedTab === 'data' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data Monitoring Dashboard</h3>
                <p className="text-sm text-gray-600">Track data collection, storage, and processing metrics</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {dataMetrics.map((metric, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{metric.metric}</h4>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{metric.count.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              metric.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {metric.growth}
                          </span>
                          <span className="text-xs text-gray-600">vs last month</span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          metric.status === 'healthy' ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                      >
                        <i className="ri-database-2-line text-2xl text-white"></i>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-bar-chart-line mr-2"></i>
                        View Detailed Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xl mb-2">Database Health: Excellent</h4>
                    <p className="text-white/90">All systems operational. Last backup: 2 hours ago</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-refresh-line mr-2"></i>
                      Sync Now
                    </button>
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-save-line mr-2"></i>
                      Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
