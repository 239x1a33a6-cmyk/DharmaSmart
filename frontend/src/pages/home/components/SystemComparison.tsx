export default function SystemComparison() {
    const comparisons = [
        {
            current: {
                icon: 'ri-alarm-warning-line',
                title: 'Reactive',
                description: 'Response after outbreak occurs',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
            },
            proposed: {
                icon: 'ri-brain-line',
                title: 'Predictive',
                description: '3-7 day advance warning',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
            },
        },
        {
            current: {
                icon: 'ri-file-paper-line',
                title: 'Manual',
                description: 'Paper-based data collection',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
            },
            proposed: {
                icon: 'ri-robot-line',
                title: 'AI-Driven',
                description: 'Automated pattern detection',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
            },
        },
        {
            current: {
                icon: 'ri-folder-forbid-line',
                title: 'Isolated',
                description: 'Fragmented reporting systems',
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
            },
            proposed: {
                icon: 'ri-links-line',
                title: 'Integrated',
                description: 'Unified surveillance platform',
                color: 'text-teal-600',
                bgColor: 'bg-teal-50',
            },
        },
        {
            current: {
                icon: 'ri-timer-line',
                title: 'Delayed Alerts',
                description: 'Slow manual notification',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
            },
            proposed: {
                icon: 'ri-notification-3-line',
                title: 'Early Warnings',
                description: 'Instant multi-channel alerts',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
            },
        },
    ];

    return (
        <section id="comparison" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-green-50 border-2 border-primary/20 rounded-full">
                        <i className="ri-arrow-left-right-line text-primary mr-2"></i>
                        <span className="text-sm font-semibold text-gray-700">System Transformation</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        Current System vs Our Solution
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Moving from reactive healthcare to predictive disease surveillance
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {comparisons.map((comparison, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                {/* Current System */}
                                <div className="space-y-4">
                                    {index === 0 && (
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Current System
                                        </div>
                                    )}
                                    <div className={`${comparison.current.bgColor} rounded-2xl p-6 border-2 border-gray-200`}>
                                        <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                                            <i className={`${comparison.current.icon} text-2xl ${comparison.current.color}`}></i>
                                        </div>
                                        <h3 className={`text-xl font-bold ${comparison.current.color} mb-2`}>
                                            {comparison.current.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {comparison.current.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center justify-center">
                                    <div className="relative">
                                        {index === 0 && (
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Our Solution
                                            </div>
                                        )}
                                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                                            <i className="ri-arrow-right-line text-2xl text-white"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Proposed System - moved to left visually but second in grid */}
                                <div className="space-y-4 -order-1">
                                    {index === 0 && (
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 opacity-0">
                                            Proposed
                                        </div>
                                    )}
                                    <div className={`${comparison.proposed.bgColor} rounded-2xl p-6 border-2 border-primary/30 shadow-md`}>
                                        <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                                            <i className={`${comparison.proposed.icon} text-2xl ${comparison.proposed.color}`}></i>
                                        </div>
                                        <h3 className={`text-xl font-bold ${comparison.proposed.color} mb-2`}>
                                            {comparison.proposed.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {comparison.proposed.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-full">
                        <i className="ri-check-double-line text-green-600 text-xl"></i>
                        <span className="text-sm font-semibold text-green-700">
                            Transforming healthcare delivery through technology and integration
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
