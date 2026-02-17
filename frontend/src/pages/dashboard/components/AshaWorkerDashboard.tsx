import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: any;
}

export default function AshaWorkerDashboard({ user }: Props) {
  const _navigate = useNavigate();
  const [selectedVillage, setSelectedVillage] = useState('all');

  const stats = [
    { label: 'Assigned Villages', value: '8', icon: 'ri-map-pin-line', color: 'bg-blue-500', change: '2 high-risk' },
    { label: 'Pending Tasks', value: '12', icon: 'ri-task-line', color: 'bg-orange-500', change: '3 urgent' },
    { label: 'Cases Reported', value: '24', icon: 'ri-file-list-3-line', color: 'bg-teal-500', change: 'This week' },
    { label: 'Inspections Done', value: '15', icon: 'ri-checkbox-circle-line', color: 'bg-green-500', change: 'This month' },
  ];

  const villages = [
    { name: 'Majuli Village', risk: 'HIGH', cases: 12, population: 2500, lastVisit: '1 day ago', waterSources: 3 },
    { name: 'Dibrugarh Ward 5', risk: 'MEDIUM', cases: 5, population: 1800, lastVisit: '2 days ago', waterSources: 2 },
    { name: 'Jorhat Block A', risk: 'LOW', cases: 2, population: 3200, lastVisit: '3 days ago', waterSources: 4 },
    { name: 'Sivasagar East', risk: 'MEDIUM', cases: 7, population: 2100, lastVisit: '1 day ago', waterSources: 3 },
  ];

  const tasks = [
    {
      id: 1,
      type: 'URGENT',
      title: 'Water Source Inspection',
      village: 'Majuli Village',
      description: 'Inspect community well - contamination suspected',
      deadline: 'Today, 5:00 PM',
      status: 'pending',
    },
    {
      id: 2,
      type: 'HIGH',
      title: 'Follow-up Visit',
      village: 'Dibrugarh Ward 5',
      description: 'Check on 3 patients with diarrhea symptoms',
      deadline: 'Tomorrow, 10:00 AM',
      status: 'pending',
    },
    {
      id: 3,
      type: 'NORMAL',
      title: 'Health Education Session',
      village: 'Jorhat Block A',
      description: 'Conduct hygiene awareness program',
      deadline: 'Dec 28, 2:00 PM',
      status: 'scheduled',
    },
  ];

  const recentReports = [
    {
      id: 1,
      patient: 'Ramesh Kumar',
      age: 35,
      symptoms: 'Diarrhea, Vomiting',
      severity: 'MEDIUM',
      village: 'Majuli Village',
      time: '2 hours ago',
      status: 'Reported to Clinic',
    },
    {
      id: 2,
      patient: 'Priya Devi',
      age: 28,
      symptoms: 'Fever, Dehydration',
      severity: 'HIGH',
      village: 'Sivasagar East',
      time: '4 hours ago',
      status: 'Escalated',
    },
  ];

  const handleMarkComplete = (taskId: number) => {
    alert(`Task ${taskId} marked as complete!`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello, {user.name}!</h1>
            <p className="text-white/90 text-lg">You have 12 pending tasks across 8 villages</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-nurse-line text-6xl"></i>
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

      {/* Assigned Villages */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="ri-map-pin-line mr-2 text-blue-500"></i>
            Assigned Villages
          </h2>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer"
          >
            <option value="all">All Villages</option>
            <option value="high">High Risk Only</option>
            <option value="medium">Medium Risk Only</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {villages.map((village, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${village.risk === 'HIGH'
                  ? 'border-red-200 bg-red-50'
                  : village.risk === 'MEDIUM'
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-green-200 bg-green-50'
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{village.name}</h3>
                  <p className="text-sm text-gray-600">Population: {village.population.toLocaleString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${village.risk === 'HIGH'
                      ? 'bg-red-500 text-white'
                      : village.risk === 'MEDIUM'
                        ? 'bg-orange-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                >
                  {village.risk}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{village.cases}</p>
                  <p className="text-xs text-gray-600">Cases</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{village.waterSources}</p>
                  <p className="text-xs text-gray-600">Water Sources</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xs font-bold text-gray-900">{village.lastVisit}</p>
                  <p className="text-xs text-gray-600">Last Visit</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-eye-line mr-2"></i>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks & Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-task-line mr-2 text-orange-500"></i>
            Pending Tasks
          </h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 ${task.type === 'URGENT'
                    ? 'border-red-200 bg-red-50'
                    : task.type === 'HIGH'
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-blue-200 bg-blue-50'
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${task.type === 'URGENT'
                            ? 'bg-red-500 text-white'
                            : task.type === 'HIGH'
                              ? 'bg-orange-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}
                      >
                        {task.type}
                      </span>
                      <span className="text-xs text-gray-600">{task.village}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      {task.deadline}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleMarkComplete(task.id)}
                    className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-check-line mr-1"></i>
                    Mark Complete
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-more-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-file-list-3-line mr-2 text-teal-500"></i>
            Recent Reports
          </h2>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl border-2 border-gray-200 hover:border-teal-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{report.patient}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Age: {report.age} | {report.village}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Symptoms:</strong> {report.symptoms}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${report.severity === 'HIGH'
                            ? 'bg-red-500 text-white'
                            : 'bg-orange-500 text-white'
                          }`}
                      >
                        {report.severity}
                      </span>
                      <span className="text-xs text-gray-500">{report.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-green-600 font-semibold">
                    <i className="ri-check-line mr-1"></i>
                    {report.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-flashlight-line mr-2 text-purple-500"></i>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-file-add-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Report Case</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-drop-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Water Inspection</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-calendar-check-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Schedule Visit</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-book-open-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Training Materials</p>
          </button>
        </div>
      </div>
    </div>
  );
}
