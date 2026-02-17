export default function ImpactMetrics() {
    const metrics = [
        {
            value: '450+',
            label: 'Villages Monitored',
            icon: 'ri-map-pin-line',
            color: 'from-blue-500 to-cyan-500',
            description: 'Across rural and tribal areas',
        },
        {
            value: '2.4L+',
            label: 'Health Reports Analyzed',
            icon: 'ri-file-list-3-line',
            color: 'from-green-500 to-teal-500',
            description: 'Real-time data processing',
        },
        {
            value: '7 Days',
            label: 'Prediction Lead Time',
            icon: 'ri-time-line',
            color: 'from-purple-500 to-pink-500',
            description: 'Early outbreak warnings',
        },
        {
            value: '89%',
            label: 'Prediction Accuracy',
            icon: 'ri-checkbox-circle-line',
            color: 'from-orange-500 to-red-500',
            description: 'AI model performance',
        },
        {
            value: '1.2M+',
            label: 'Community Coverage',
            icon: 'ri-group-line',
            color: 'from-indigo-500 to-blue-500',
            description: 'People protected',
        },
        {
            value: '12+',
            label: 'Languages Supported',
            icon: 'ri-translate-2',
            color: 'from-teal-500 to-green-500',
            description: 'Including tribal languages',
        },
    ];

    return (
        <section id="impact" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-primary/20 rounded-full">
                        <i className="ri-line-chart-line text-primary mr-2"></i>
                        <span className="text-sm font-semibold text-gray-700">Measurable Impact</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        System Performance & Outcomes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Real metrics demonstrating the effectiveness of predictive health surveillance
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <i className={`${metric.icon} text-3xl text-white`}></i>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold text-navy font-mono">{metric.value}</p>
                                <h3 className="text-lg font-bold text-gray-800">{metric.label}</h3>
                                <p className="text-sm text-gray-600">{metric.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Key Achievements */}
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 border-2 border-green-200">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                <i className="ri-trophy-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-navy">Key Achievements</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <i className="ri-check-double-line text-green-600 text-xl mt-0.5"></i>
                                <div>
                                    <p className="font-semibold text-gray-800">Early Outbreak Detection</p>
                                    <p className="text-sm text-gray-600">Identified 23 potential outbreaks before widespread transmission</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <i className="ri-check-double-line text-green-600 text-xl mt-0.5"></i>
                                <div>
                                    <p className="font-semibold text-gray-800">Rapid Response Time</p>
                                    <p className="text-sm text-gray-600">Average intervention time reduced from 7 days to 24 hours</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <i className="ri-check-double-line text-green-600 text-xl mt-0.5"></i>
                                <div>
                                    <p className="font-semibold text-gray-800">Community Engagement</p>
                                    <p className="text-sm text-gray-600">85% active participation from ASHA workers and community members</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <i className="ri-check-double-line text-green-600 text-xl mt-0.5"></i>
                                <div>
                                    <p className="font-semibold text-gray-800">Water Quality Improvement</p>
                                    <p className="text-sm text-gray-600">127 contaminated water sources identified and remediated</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* System Capabilities */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <i className="ri-settings-3-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-navy">System Capabilities</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Real-Time Processing</span>
                                    <span className="text-sm font-mono text-blue-600">99.8%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '99.8%' }}></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">System Uptime</span>
                                    <span className="text-sm font-mono text-green-600">99.9%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" style={{ width: '99.9%' }}></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Alert Delivery Success</span>
                                    <span className="text-sm font-mono text-purple-600">97.5%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '97.5%' }}></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">User Satisfaction</span>
                                    <span className="text-sm font-mono text-orange-600">92%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-primary/20 rounded-full">
                        <i className="ri-information-line text-primary"></i>
                        <span className="text-sm font-semibold text-gray-700">
                            All metrics based on pilot deployment data (Demo/Pilot Phase)
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
