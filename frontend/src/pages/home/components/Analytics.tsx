import { useState } from 'react';

export default function Analytics() {
  const [_activeTab, _setActiveTab] = useState('epidemiology');

  const kpis = [
    { label: 'Active Cases', value: '247', trend: '+12%', icon: 'ri-user-heart-line', color: 'accent' },
    { label: 'High-Risk Villages', value: '12', trend: '+3', icon: 'ri-map-pin-line', color: 'warning' },
    { label: 'Alerts Sent Today', value: '1,840', trend: '+24%', icon: 'ri-notification-line', color: 'primary' },
    { label: 'Water Sources', value: '450', trend: '98% safe', icon: 'ri-drop-line', color: 'success' },
  ];

  const outbreaks = [
    { village: 'Kamalabari', disease: 'Cholera', cases: 45, trend: 'up', status: 'Critical', color: 'accent' },
    { village: 'Garamur', disease: 'Diarrhea', cases: 32, trend: 'up', status: 'High', color: 'warning' },
    { village: 'Auniati', disease: 'Typhoid', cases: 18, trend: 'down', status: 'Medium', color: 'primary' },
    { village: 'Dakhinpat', disease: 'Hepatitis A', cases: 12, trend: 'stable', status: 'Low', color: 'success' },
  ];

  return (
    <section id="analytics" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
            Analytics & Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights and interactive visualizations for health authorities and decision-makers
          </p>
        </div>

        <div className="bg-navy rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-navy to-navy-light p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <i className="ri-dashboard-line text-xl text-primary"></i>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    Health Surveillance Command Center
                  </h3>
                  <p className="text-sm text-gray-400">Real-time monitoring and analytics</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
                <button className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="ri-notification-line text-white"></i>
                </button>
                <button className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="ri-settings-3-line text-white"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <i className="ri-map-pin-line"></i>
              <span>Assam</span>
              <i className="ri-arrow-right-s-line"></i>
              <span>Majuli District</span>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-white">All Blocks</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 bg-${kpi.color}/20 rounded-lg flex items-center justify-center`}>
                      <i className={`${kpi.icon} text-xl text-${kpi.color}`}></i>
                    </div>
                    <span className={`text-xs font-semibold ${kpi.trend.includes('+') ? 'text-accent' : 'text-success'}`}>
                      {kpi.trend}
                    </span>
                  </div>
                  <div className="text-3xl font-bold font-mono text-white mb-1">{kpi.value}</div>
                  <div className="text-sm text-gray-400">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-heading font-bold text-white">
                    Geographic Heatmap
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-white/10 rounded-lg text-xs text-white hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer">
                      Disease Type
                    </button>
                    <button className="px-3 py-1 bg-white/10 rounded-lg text-xs text-white hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer">
                      Water Sources
                    </button>
                  </div>
                </div>

                <div className="relative bg-white/5 rounded-xl p-8 h-96 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=India%20map%20outline%20with%20northeastern%20region%20highlighted%20showing%20disease%20outbreak%20heatmap%20with%20red%20orange%20yellow%20green%20color%20zones%20geographic%20visualization%20clean%20minimal%20style%20data%20visualization%20dashboard%20style&width=700&height=400&seq=map-viz-001&orientation=landscape"
                      alt="Disease Outbreak Heatmap"
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-accent rounded"></div>
                      <span className="text-xs text-white">Critical</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-warning rounded"></div>
                      <span className="text-xs text-white">High</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span className="text-xs text-white">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-success rounded"></div>
                      <span className="text-xs text-white">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-heading font-bold text-white mb-6">
                  7-Day Risk Forecast
                </h4>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                    const risks = [65, 72, 85, 88, 82, 75, 68];
                    const risk = risks[idx];
                    const color = risk > 80 ? 'accent' : risk > 60 ? 'warning' : 'primary';
                    return (
                      <div key={day} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 font-medium">{day}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono font-bold">{risk}%</span>
                            <span className={`px-2 py-0.5 bg-${color}/20 text-${color} rounded text-xs font-semibold whitespace-nowrap`}>
                              {risk > 80 ? 'High' : risk > 60 ? 'Med' : 'Low'}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r from-${color} to-${color}-light h-2 rounded-full transition-all`}
                            style={{ width: `${risk}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="ri-alarm-warning-line text-accent"></i>
                    <span className="text-sm font-semibold text-white">Peak Alert</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Highest risk expected on Thursday (88%). Confidence: 89%
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-heading font-bold text-white mb-6">
                  Active Outbreaks
                </h4>
                <div className="space-y-3">
                  {outbreaks.map((outbreak, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-${outbreak.color}/20 rounded-lg flex items-center justify-center`}>
                          <i className="ri-map-pin-line text-xl text-white"></i>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{outbreak.village}</div>
                          <div className="text-sm text-gray-400">{outbreak.disease}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold font-mono text-white">{outbreak.cases}</div>
                          <div className="text-xs text-gray-400">cases</div>
                        </div>
                        <div className={`px-3 py-1 bg-${outbreak.color}/20 text-${outbreak.color} rounded-lg text-xs font-semibold whitespace-nowrap`}>
                          {outbreak.status}
                        </div>
                        <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                          <i className="ri-arrow-right-line text-white"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-heading font-bold text-white mb-6">
                  Disease Trend (90 Days)
                </h4>
                <div className="relative h-64 flex items-end justify-between space-x-2">
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const height = Math.random() * 100;
                    const color = height > 70 ? 'accent' : height > 40 ? 'warning' : 'primary';
                    return (
                      <div
                        key={idx}
                        className={`flex-1 bg-gradient-to-t from-${color} to-${color}-light rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-accent cursor-pointer" />
                      <span className="text-sm text-gray-400">Cholera</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-warning cursor-pointer" />
                      <span className="text-sm text-gray-400">Diarrhea</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-primary cursor-pointer" />
                      <span className="text-sm text-gray-400">Typhoid</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
