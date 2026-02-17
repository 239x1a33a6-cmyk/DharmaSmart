import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    district: '',
    state: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        location: parsedUser.location || '',
        district: parsedUser.district || '',
        state: parsedUser.state || '',
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-teal-500 animate-spin"></i>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Village/Ward"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.location || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="District name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.district || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="State name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.state || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i className="ri-file-list-3-line text-2xl text-blue-500"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Reports Submitted</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <i className="ri-notification-3-line text-2xl text-red-500"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Active Alerts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <i className="ri-calendar-check-line text-2xl text-green-500"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-sm text-gray-600">Days Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <i className="ri-lock-password-line text-xl text-gray-600"></i>
                <span className="font-semibold text-gray-900">Change Password</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <i className="ri-notification-3-line text-xl text-gray-600"></i>
                <span className="font-semibold text-gray-900">Notification Preferences</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <i className="ri-global-line text-xl text-gray-600"></i>
                <span className="font-semibold text-gray-900">Language Settings</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </button>

            <button className="w-full flex items-center justify-between p-4 border-2 border-red-200 rounded-xl hover:border-red-300 transition-colors cursor-pointer whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <i className="ri-logout-box-line text-xl text-red-600"></i>
                <span className="font-semibold text-red-600">Logout</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-red-400"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
