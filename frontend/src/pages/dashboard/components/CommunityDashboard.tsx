import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../../../components/Chatbot';

interface Props {
  user: any;
}

export default function CommunityDashboard({ user }: Props) {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const stats = [
    { label: 'Active Alerts', value: '2', icon: 'ri-alarm-warning-line', color: 'bg-red-500', change: '+1 today' },
    { label: 'Reports Submitted', value: '5', icon: 'ri-file-list-3-line', color: 'bg-blue-500', change: 'Last: 2 days ago' },
    { label: 'Water Quality', value: 'Good', icon: 'ri-drop-line', color: 'bg-teal-500', change: 'Updated today' },
    { label: 'Health Score', value: '85%', icon: 'ri-heart-pulse-line', color: 'bg-green-500', change: '+5% this week' },
  ];

  const alerts = [
    {
      id: 1,
      type: 'HIGH',
      title: 'Cholera Risk Alert',
      message: 'High risk detected in your area. Boil water before drinking.',
      time: '2 hours ago',
      actions: ['View Details', 'Mark as Read'],
    },
    {
      id: 2,
      type: 'MEDIUM',
      title: 'Water Quality Advisory',
      message: 'Turbidity levels elevated in community well. Use alternative source.',
      time: '5 hours ago',
      actions: ['View Map', 'Report Issue'],
    },
  ];

  const quickActions = [
    { label: 'Report Symptoms', icon: 'ri-thermometer-line', color: 'from-red-500 to-orange-500', path: '/report-symptoms' },
    { label: 'Water Safety Report', icon: 'ri-drop-line', color: 'from-blue-500 to-teal-500', path: '/water-report' },
    { label: 'View Alerts', icon: 'ri-notification-3-line', color: 'from-purple-500 to-pink-500', path: '/alerts' },
    { label: 'Education', icon: 'ri-book-open-line', color: 'from-green-500 to-emerald-500', path: '/education' },
  ];

  const educationContent = [
    { title: 'Hand Washing Guide', type: 'Video', duration: '3 min', icon: 'ri-video-line', language: 'Hindi' },
    { title: 'Safe Water Practices', type: 'Audio', duration: '5 min', icon: 'ri-volume-up-line', language: 'Assamese' },
    { title: 'Symptom Recognition', type: 'Infographic', duration: '2 min', icon: 'ri-image-line', language: 'English' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-white/90 text-lg">Stay informed and healthy. Your community needs you.</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-user-heart-line text-6xl"></i>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-flashlight-line mr-2 text-teal-500"></i>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`p-6 bg-gradient-to-br ${action.color} rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap`}
            >
              <i className={`${action.icon} text-4xl mb-3 block`}></i>
              <p className="font-semibold">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="ri-alarm-warning-line mr-2 text-red-500"></i>
            Active Alerts
          </h2>
          <button
            onClick={() => navigate('/alerts')}
            className="text-sm text-teal-600 hover:text-teal-700 font-semibold cursor-pointer whitespace-nowrap"
          >
            View All <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border-2 ${
                alert.type === 'HIGH' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 ${
                      alert.type === 'HIGH' ? 'bg-red-500' : 'bg-orange-500'
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <i className="ri-error-warning-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alert.type === 'HIGH' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                  }`}
                >
                  {alert.type}
                </span>
              </div>
              <div className="flex space-x-2 mt-3">
                {alert.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="ri-book-open-line mr-2 text-green-500"></i>
            Health Education
          </h2>
          <button
            onClick={() => navigate('/education')}
            className="text-sm text-teal-600 hover:text-teal-700 font-semibold cursor-pointer whitespace-nowrap"
          >
            View All <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {educationContent.map((content, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
                <i className={`${content.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{content.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <i className="ri-time-line mr-1"></i>
                  {content.duration}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{content.language}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all cursor-pointer whitespace-nowrap z-50"
      >
        <i className={`${showChatbot ? 'ri-close-line' : 'ri-chat-3-line'} text-2xl`}></i>
      </button>

      {/* Chatbot Window */}
      <Chatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  );
}
