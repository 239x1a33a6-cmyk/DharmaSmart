import { useState } from 'react';

export default function SystemWorkflow() {
    const [selectedStep, setSelectedStep] = useState<number | null>(null);

    const steps = [
        {
            number: 1,
            title: 'Community & ASHA Reporting',
            icon: 'ri-user-heart-line',
            color: 'from-blue-500 to-cyan-500',
            description: 'Community members and ASHA workers report symptoms through mobile app, SMS, or voice calls',
            details: [
                'Multi-lingual symptom reporting interface',
                'Voice-based reporting for low-literacy users',
                'GPS-tagged location data',
                'Photo upload for visible symptoms',
            ],
        },
        {
            number: 2,
            title: 'Environmental & Water Monitoring',
            icon: 'ri-drop-line',
            color: 'from-teal-500 to-green-500',
            description: 'Real-time water quality sensors and environmental data collection from field sources',
            details: [
                'pH, turbidity, and bacterial contamination sensors',
                'Weather and seasonal pattern tracking',
                'Water source mapping and monitoring',
                'Automated data transmission to central system',
            ],
        },
        {
            number: 3,
            title: 'AI/ML Outbreak Prediction',
            icon: 'ri-brain-line',
            color: 'from-purple-500 to-pink-500',
            description: 'Advanced machine learning models analyze patterns to predict potential outbreaks',
            details: [
                'Time-series forecasting algorithms',
                'Anomaly detection in symptom clusters',
                'Risk classification (Low/Medium/High)',
                'Explainable AI for transparency',
            ],
        },
        {
            number: 4,
            title: 'Early Alerts & Warnings',
            icon: 'ri-notification-3-line',
            color: 'from-orange-500 to-red-500',
            description: 'Instant multi-channel alerts sent to authorities, health workers, and affected communities',
            details: [
                'SMS and WhatsApp notifications',
                'IVR calls in local languages',
                'Push notifications to mobile app',
                'Dashboard alerts for officials',
            ],
        },
        {
            number: 5,
            title: 'Authority Response & Intervention',
            icon: 'ri-shield-check-line',
            color: 'from-indigo-500 to-blue-500',
            description: 'Health authorities coordinate rapid response and preventive interventions',
            details: [
                'Medical team deployment',
                'Water source remediation',
                'Community health camps',
                'Supply and resource allocation',
            ],
        },
    ];

    return (
        <section id="workflow" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/20 rounded-full">
                        <i className="ri-flow-chart text-primary mr-2"></i>
                        <span className="text-sm font-semibold text-gray-700">System Architecture</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        How the System Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A comprehensive 5-step process from data collection to intervention
                    </p>
                </div>

                {/* Desktop Flow */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connection Lines */}
                        <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200"></div>

                        <div className="grid grid-cols-5 gap-4">
                            {steps.map((step, index) => (
                                <div key={index} className="relative">
                                    <button
                                        onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                                        className="w-full group cursor-pointer"
                                    >
                                        <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 ${selectedStep === index ? 'ring-4 ring-primary/50 scale-105' : ''}`}>
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 mx-auto">
                                                <i className={`${step.icon} text-3xl`}></i>
                                            </div>
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                                                <span className="text-xl font-bold text-navy">{step.number}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-center">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-white/90 text-center">
                                                {step.description}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Arrow */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-24 -right-2 w-4 h-4 bg-primary rounded-full z-10 flex items-center justify-center">
                                            <i className="ri-arrow-right-s-line text-white text-xs"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Panel */}
                    {selectedStep !== null && (
                        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border-2 border-primary/20 animate-fadeIn">
                            <div className="flex items-start space-x-6">
                                <div className={`w-16 h-16 bg-gradient-to-br ${steps[selectedStep].color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                                    <i className={`${steps[selectedStep].icon} text-3xl text-white`}></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-navy mb-4">
                                        Step {steps[selectedStep].number}: {steps[selectedStep].title}
                                    </h3>
                                    <p className="text-gray-600 mb-6">{steps[selectedStep].description}</p>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {steps[selectedStep].details.map((detail, idx) => (
                                            <div key={idx} className="flex items-start space-x-2">
                                                <i className="ri-check-line text-green-600 text-lg mt-0.5"></i>
                                                <span className="text-sm text-gray-700">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedStep(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Flow */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, index) => (
                        <div key={index}>
                            <button
                                onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                                className="w-full"
                            >
                                <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-6 text-white shadow-lg ${selectedStep === index ? 'ring-4 ring-primary/50' : ''}`}>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-xl font-bold text-navy">{step.number}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-left flex-1">
                                            {step.title}
                                        </h3>
                                        <i className={`${step.icon} text-2xl`}></i>
                                    </div>
                                    <p className="text-sm text-white/90">
                                        {step.description}
                                    </p>
                                </div>
                            </button>

                            {selectedStep === index && (
                                <div className="mt-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-primary/20">
                                    <div className="space-y-3">
                                        {step.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-start space-x-2">
                                                <i className="ri-check-line text-green-600 text-lg mt-0.5"></i>
                                                <span className="text-sm text-gray-700">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {index < steps.length - 1 && (
                                <div className="flex justify-center py-2">
                                    <i className="ri-arrow-down-line text-2xl text-primary"></i>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
