import { useNavigate } from 'react-router-dom';

export default function LivePreview() {
    const navigate = useNavigate();

    const riskData = [
        { district: 'Tirupati', risk: 'High', cases: 47, trend: 'up', color: 'red' },
        { district: 'Chittoor', risk: 'Medium', cases: 23, trend: 'stable', color: 'orange' },
        { district: 'Anantapur', risk: 'Low', cases: 8, trend: 'down', color: 'green' },
    ];

    const recentAlerts = [
        {
            type: 'Outbreak Warning',
            location: 'Tirupati District',
            disease: 'Cholera',
            time: '2 hours ago',
            severity: 'high',
        },
        {
            type: 'Water Quality Alert',
            location: 'Chittoor PHC Area',
            disease: 'E.coli Detection',
            time: '5 hours ago',
            severity: 'medium',
        },
    ];

    return (
        <section id="live-preview" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-primary/20 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-sm font-semibold text-gray-700">Live System Preview</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        Real-Time Disease Surveillance Dashboard
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        See how our system monitors and predicts health risks across communities
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    {/* Risk Level Indicators */}
                    {riskData.map((data, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${data.color === 'red' ? 'border-red-200' :
                                    data.color === 'orange' ? 'border-orange-200' :
                                        'border-green-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-navy">{data.district}</h3>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${data.color === 'red' ? 'bg-red-100 text-red-700' :
                                        data.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                            'bg-green-100 text-green-700'
                                    }`}>
                                    {data.risk} Risk
                                </div>
                            </div>
                            <div className="flex items-end space-x-4">
                                <div>
                                    <p className="text-3xl font-bold text-navy font-mono">{data.cases}</p>
                                    <p className="text-sm text-gray-600">Active Cases</p>
                                </div>
                                <div className="flex-1">
                                    <div className={`h-2 rounded-full ${data.color === 'red' ? 'bg-red-200' :
                                            data.color === 'orange' ? 'bg-orange-200' :
                                                'bg-green-200'
                                        }`}>
                                        <div
                                            className={`h-2 rounded-full ${data.color === 'red' ? 'bg-red-600' :
                                                    data.color === 'orange' ? 'bg-orange-600' :
                                                        'bg-green-600'
                                                }`}
                                            style={{ width: `${(data.cases / 50) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-2">
                                        <i className={`${data.trend === 'up' ? 'ri-arrow-up-line text-red-600' :
                                                data.trend === 'down' ? 'ri-arrow-down-line text-green-600' :
                                                    'ri-subtract-line text-orange-600'
                                            } text-sm`}></i>
                                        <span className="text-xs text-gray-600">
                                            {data.trend === 'up' ? 'Increasing' : data.trend === 'down' ? 'Decreasing' : 'Stable'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Sample Hotspot Map */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-navy">Hotspot Map</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>High</span>
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span>Medium</span>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Low</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                            {/* Simplified Map Visualization */}
                            <div className="absolute inset-0 opacity-20">
                                <svg viewBox="0 0 400 300" className="w-full h-full">
                                    <path d="M50,50 L150,80 L200,120 L250,100 L300,150 L350,180" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                                    <path d="M50,150 L100,180 L150,200 L200,220 L250,200 L300,230" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="absolute top-20 left-20 w-16 h-16 bg-red-500/30 rounded-full animate-pulse flex items-center justify-center">
                                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                                </div>
                                <div className="absolute top-40 right-32 w-12 h-12 bg-orange-500/30 rounded-full animate-pulse flex items-center justify-center">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-20 left-40 w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                                    <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-700">
                                <i className="ri-map-pin-line mr-1"></i>
                                Andhra Pradesh Region
                            </div>
                        </div>
                    </div>

                    {/* Recent Alerts */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-navy">Recent Alerts</h3>
                            <div className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                                {recentAlerts.length} Active
                            </div>
                        </div>
                        <div className="space-y-4 mb-6">
                            {recentAlerts.map((alert, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border-l-4 ${alert.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-orange-50 border-orange-500'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <i className={`${alert.severity === 'high' ? 'ri-error-warning-line text-red-600' : 'ri-alert-line text-orange-600'
                                                } text-xl`}></i>
                                            <h4 className="font-bold text-navy">{alert.type}</h4>
                                        </div>
                                        <span className="text-xs text-gray-500">{alert.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1">
                                        <i className="ri-map-pin-line mr-1"></i>
                                        {alert.location}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {alert.disease}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-navy font-mono">7 Days</p>
                                <p className="text-xs text-gray-600">Prediction Window</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-navy font-mono">89%</p>
                                <p className="text-xs text-gray-600">Accuracy Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/analytics')}
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all cursor-pointer"
                    >
                        <span>View Analytics Dashboard</span>
                        <i className="ri-arrow-right-line"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
