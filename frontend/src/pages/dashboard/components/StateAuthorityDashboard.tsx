import { useState } from 'react';

interface Props {
  user: any;
}

export default function StateAuthorityDashboard({ user }: Props) {
  const [selectedState, setSelectedState] = useState('assam');
  const [selectedMetric, setSelectedMetric] = useState('cases');

  const stats = [
    { label: 'Total Districts', value: '33', icon: 'ri-map-2-line', color: 'bg-blue-500', change: '5 high-risk' },
    { label: 'Total Cases', value: '2,847', icon: 'ri-file-list-3-line', color: 'bg-red-500', change: '+156 today' },
    { label: 'Active Outbreaks', value: '12', icon: 'ri-alarm-warning-line', color: 'bg-orange-500', change: '3 critical' },
    { label: 'Interventions', value: '89', icon: 'ri-tools-line', color: 'bg-green-500', change: '67 completed' },
  ];

  const districtComparison = [
    { district: 'Majuli', cases: 245, risk: 'CRITICAL', trend: 'up', population: 150000, incidence: 163 },
    { district: 'Dibrugarh', cases: 198, risk: 'HIGH', trend: 'up', population: 350000, incidence: 57 },
    { district: 'Jorhat', cases: 156, risk: 'HIGH', trend: 'stable', population: 280000, incidence: 56 },
    { district: 'Sivasagar', cases: 142, risk: 'MEDIUM', trend: 'down', population: 220000, incidence: 65 },
    { district: 'Golaghat', cases: 98, risk: 'MEDIUM', trend: 'stable', population: 190000, incidence: 52 },
    { district: 'Tinsukia', cases: 87, risk: 'LOW', trend: 'down', population: 310000, incidence: 28 },
  ];

  const forecastData = [
    { week: 'Week 1', predicted: 2950, confidence: 92 },
    { week: 'Week 2', predicted: 3180, confidence: 89 },
    { week: 'Week 3', predicted: 3420, confidence: 85 },
    { week: 'Week 4', predicted: 3650, confidence: 81 },
  ];

  const policyInsights = [
    {
      id: 1,
      title: 'Water Infrastructure Investment Needed',
      priority: 'CRITICAL',
      districts: ['Majuli', 'Dibrugarh', 'Jorhat'],
      description: 'AI analysis shows 68% of cases linked to poor water infrastructure in 3 districts',
      recommendation: 'Allocate ₹50 crore for water treatment facilities',
      impact: 'Could prevent 1,200+ cases in next quarter',
    },
    {
      id: 2,
      title: 'Seasonal Outbreak Pattern Detected',
      priority: 'HIGH',
      districts: ['All Districts'],
      description: 'Monsoon-linked outbreak pattern identified with 94% accuracy',
      recommendation: 'Pre-position medical supplies before monsoon season',
      impact: 'Reduce response time by 60%',
    },
    {
      id: 3,
      title: 'ASHA Worker Training Gap',
      priority: 'MEDIUM',
      districts: ['Golaghat', 'Tinsukia'],
      description: 'Lower detection rates in 2 districts correlate with training gaps',
      recommendation: 'Conduct refresher training programs',
      impact: 'Improve early detection by 40%',
    },
  ];

  const resourceAllocation = [
    { resource: 'Medical Supplies', allocated: 85, utilized: 72, unit: '%' },
    { resource: 'ASHA Workers', allocated: 1250, utilized: 1180, unit: 'workers' },
    { resource: 'PHC Beds', allocated: 450, utilized: 380, unit: 'beds' },
    { resource: 'Ambulances', allocated: 120, utilized: 95, unit: 'vehicles' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">State Health Command Center</h1>
            <p className="text-white/90 text-lg">Welcome, {user.name} | State Health Authority</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <i className="ri-government-line text-6xl"></i>
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

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <i className="ri-settings-3-line text-gray-600"></i>
            <span className="font-semibold text-gray-900">State View:</span>
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer"
          >
            <option value="assam">Assam</option>
            <option value="meghalaya">Meghalaya</option>
            <option value="manipur">Manipur</option>
            <option value="tripura">Tripura</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer"
          >
            <option value="cases">Total Cases</option>
            <option value="incidence">Incidence Rate</option>
            <option value="mortality">Mortality Rate</option>
            <option value="recovery">Recovery Rate</option>
          </select>
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Export State Report
          </button>
        </div>
      </div>

      {/* District Comparison */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-bar-chart-grouped-line mr-2 text-blue-500"></i>
          District-wise Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">District</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Cases</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Risk Level</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Trend</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Population</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Incidence Rate</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districtComparison.map((district, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">{district.district}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-2xl font-bold text-gray-900">{district.cases}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        district.risk === 'CRITICAL'
                          ? 'bg-red-500 text-white'
                          : district.risk === 'HIGH'
                          ? 'bg-orange-500 text-white'
                          : district.risk === 'MEDIUM'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {district.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <i
                      className={`text-xl ${
                        district.trend === 'up'
                          ? 'ri-arrow-up-line text-red-500'
                          : district.trend === 'down'
                          ? 'ri-arrow-down-line text-green-500'
                          : 'ri-arrow-right-line text-gray-500'
                      }`}
                    ></i>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">
                    {district.population.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-gray-900">{district.incidence}</span>
                    <span className="text-xs text-gray-600"> per 100k</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-xs font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecast & Policy Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 4-Week Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-line-chart-line mr-2 text-purple-500"></i>
            4-Week Forecast
          </h2>
          <div className="space-y-4">
            {forecastData.map((week, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{week.week}</span>
                  <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600">
                    {week.confidence}% confidence
                  </span>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-900">{week.predicted.toLocaleString()}</span>
                  <span className="text-sm text-gray-600 mb-1">predicted cases</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${week.confidence}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="ri-pie-chart-2-line mr-2 text-green-500"></i>
            Resource Allocation
          </h2>
          <div className="space-y-4">
            {resourceAllocation.map((resource, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{resource.resource}</span>
                  <span className="text-sm text-gray-600">
                    {resource.utilized} / {resource.allocated} {resource.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      (resource.utilized / resource.allocated) * 100 > 90
                        ? 'bg-red-500'
                        : (resource.utilized / resource.allocated) * 100 > 70
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(resource.utilized / resource.allocated) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {((resource.utilized / resource.allocated) * 100).toFixed(1)}% utilized
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <i className="ri-lightbulb-line mr-2 text-yellow-500"></i>
          AI-Powered Policy Insights
        </h2>
        <div className="space-y-4">
          {policyInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-6 rounded-xl border-2 ${
                insight.priority === 'CRITICAL'
                  ? 'border-red-200 bg-red-50'
                  : insight.priority === 'HIGH'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        insight.priority === 'CRITICAL'
                          ? 'bg-red-500 text-white'
                          : insight.priority === 'HIGH'
                          ? 'bg-orange-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Affected Districts:</strong> {insight.districts.join(', ')}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Analysis:</p>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Recommendation:</p>
                  <p className="text-sm text-gray-700">{insight.recommendation}</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-1">Expected Impact:</p>
                  <p className="text-sm text-green-700">{insight.impact}</p>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-file-text-line mr-2"></i>
                  Generate Report
                </button>
                <button className="flex-1 py-2 bg-teal-500 text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-check-line mr-2"></i>
                  Approve Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
