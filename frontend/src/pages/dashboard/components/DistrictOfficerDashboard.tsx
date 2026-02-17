import { useState } from 'react';
// Removed unused map imports to pass linting
import 'leaflet/dist/leaflet.css';

interface Props {
  user: any;
}

export default function DistrictOfficerDashboard({ user }: Props) {
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  const stats = [
    { label: 'Total Cases', value: '156', icon: 'ri-file-list-3-line', color: 'bg-blue-500', change: '+12 today', trend: 'up' },
    { label: 'High-Risk Villages', value: '8', icon: 'ri-map-pin-line', color: 'bg-red-500', change: '+2 this week', trend: 'up' },
    { label: 'Active Interventions', value: '15', icon: 'ri-tools-line', color: 'bg-orange-500', change: '3 completed', trend: 'down' },
    { label: 'ASHA Workers', value: '42', icon: 'ri-team-line', color: 'bg-green-500', change: '38 active', trend: 'stable' },
  ];

  const hotspots = [
    {
      id: 1,
      village: 'Majuli Village',
      block: 'Majuli Block',
      cases: 45,
      risk: 'HIGH',
      population: 2500,
      prediction: '15 new cases in 3 days',
      waterQuality: 'Poor',
      interventions: 3,
      coordinates: [26.95, 94.22],
    },
    {
      id: 2,
      village: 'Dibrugarh Ward 5',
      block: 'Dibrugarh Urban',
      cases: 28,
      risk: 'HIGH',
      population: 1800,
      prediction: '8 new cases in 5 days',
      waterQuality: 'Moderate',
      interventions: 2,
      coordinates: [27.48, 94.91],
    },
    {
      id: 3,
      village: 'Jorhat Block A',
      block: 'Jorhat',
      cases: 18,
      risk: 'MEDIUM',
      population: 3200,
      prediction: '5 new cases in 7 days',
      waterQuality: 'Good',
      interventions: 1,
      coordinates: [26.75, 94.22],
    },
    {
      id: 4,
      village: 'Sivasagar East',
      block: 'Sivasagar',
      cases: 22,
      risk: 'MEDIUM',
      population: 2100,
      prediction: '6 new cases in 6 days',
      waterQuality: 'Moderate',
      interventions: 2,
      coordinates: [26.98, 94.64],
    },
  ];

  const interventions = [
    {
      id: 1,
      type: 'Water Remediation',
      village: 'Majuli Village',
      status: 'In Progress',
      assignedTo: 'Team A',
      startDate: 'Dec 23, 2024',
      progress: 65,
      priority: 'URGENT',
    },
    {
      id: 2,
      type: 'Medical Supply Distribution',
      village: 'Dibrugarh Ward 5',
      status: 'Scheduled',
      assignedTo: 'Team B',
      startDate: 'Dec 26, 2024',
      progress: 0,
      priority: 'HIGH',
    },
    {
      id: 3,
      type: 'Community Health Camp',
      village: 'Jorhat Block A',
      status: 'Completed',
      assignedTo: 'Team C',
      startDate: 'Dec 20, 2024',
      progress: 100,
      priority: 'NORMAL',
    },
  ];

  const diseaseBreakdown = [
    { disease: 'Cholera', cases: 68, percentage: 44, color: 'bg-red-500' },
    { disease: 'Typhoid', cases: 42, percentage: 27, color: 'bg-orange-500' },
    { disease: 'Diarrhea', cases: 31, percentage: 20, color: 'bg-yellow-500' },
    { disease: 'Hepatitis A', cases: 15, percentage: 9, color: 'bg-blue-500' },
  ];

  const handleAssignTask = (villageId: number) => {
    alert(`Task assignment interface opened for village ID: ${villageId}`);
  };

  const handleViewDetails = (villageId: number) => {
    alert(`Detailed analytics opened for village ID: ${villageId}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">District Command Center</h1>
            <p className="text-white/90 text-lg">Welcome, {user.name} | District Health Officer</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-dashboard-line text-6xl"></i>
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
              <span className={`text-xs px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-red-100 text-red-600' :
                  stat.trend === 'down' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                }`}>
                <i className={`ri-arrow-${stat.trend === 'up' ? 'up' : stat.trend === 'down' ? 'down' : 'right'}-line`}></i>
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <i className="ri-filter-line text-gray-600"></i>
            <span className="font-semibold text-gray-900">Filters:</span>
          </div>
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer"
          >
            <option value="all">All Diseases</option>
            <option value="cholera">Cholera</option>
            <option value="typhoid">Typhoid</option>
            <option value="diarrhea">Diarrhea</option>
            <option value="hepatitis">Hepatitis A</option>
          </select>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Disease Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-pie-chart-line mr-2 text-indigo-500"></i>
          Disease Breakdown
        </h2>
        <div className="space-y-4">
          {diseaseBreakdown.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{item.disease}</span>
                <span className="text-sm text-gray-600">{item.cases} cases ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotspot Map & List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hotspot Map */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-map-2-line mr-2 text-red-500"></i>
            Outbreak Hotspot Map
          </h2>
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-map-pin-line text-6xl text-gray-400 mb-2"></i>
                <p className="text-gray-600 font-semibold">Interactive Map View</p>
                <p className="text-sm text-gray-500">Showing {hotspots.length} high-risk locations</p>
              </div>
            </div>
            {/* Map markers visualization */}
            {hotspots.map((spot, index) => (
              <div
                key={spot.id}
                className={`absolute w-8 h-8 ${spot.risk === 'HIGH' ? 'bg-red-500' : 'bg-orange-500'
                  } rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse cursor-pointer`}
                style={{
                  top: `${20 + index * 20}%`,
                  left: `${30 + index * 15}%`,
                }}
                title={spot.village}
              >
                {spot.cases}
              </div>
            ))}
          </div>
        </div>

        {/* Hotspot List */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-list-check mr-2 text-orange-500"></i>
            High-Risk Villages
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className={`p-4 rounded-xl border-2 ${spot.risk === 'HIGH' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900">{spot.village}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${spot.risk === 'HIGH' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                          }`}
                      >
                        {spot.risk}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{spot.block} | Pop: {spot.population.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{spot.cases}</p>
                    <p className="text-xs text-gray-600">cases</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="p-2 bg-white rounded">
                    <p className="text-gray-600">Water Quality</p>
                    <p className="font-semibold text-gray-900">{spot.waterQuality}</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="text-gray-600">Interventions</p>
                    <p className="font-semibold text-gray-900">{spot.interventions} active</p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded mb-3">
                  <p className="text-xs text-gray-600 mb-1">AI Prediction:</p>
                  <p className="text-xs font-semibold text-red-600">{spot.prediction}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(spot.id)}
                    className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-eye-line mr-1"></i>
                    View Details
                  </button>
                  <button
                    onClick={() => handleAssignTask(spot.id)}
                    className="flex-1 py-2 bg-indigo-500 text-white rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-1"></i>
                    Assign Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Interventions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <i className="ri-tools-line mr-2 text-orange-500"></i>
            Active Interventions
          </h2>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            New Intervention
          </button>
        </div>
        <div className="space-y-4">
          {interventions.map((intervention) => (
            <div key={intervention.id} className="p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-900">{intervention.type}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${intervention.priority === 'URGENT'
                          ? 'bg-red-500 text-white'
                          : intervention.priority === 'HIGH'
                            ? 'bg-orange-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                    >
                      {intervention.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {intervention.village} | Assigned to: {intervention.assignedTo}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${intervention.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : intervention.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {intervention.status}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-semibold text-gray-900">{intervention.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${intervention.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                      } h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${intervention.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>
                  <i className="ri-calendar-line mr-1"></i>
                  Started: {intervention.startDate}
                </span>
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer whitespace-nowrap">
                  View Timeline <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-flashlight-line mr-2 text-purple-500"></i>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-alarm-warning-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Send Alert</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-team-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Manage Teams</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-bar-chart-box-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Analytics</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-file-text-line text-3xl mb-2 block"></i>
            <p className="font-semibold text-sm">Reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}
