export default function UserRoles() {
    const roles = [
        {
            title: 'Community Members',
            icon: 'ri-user-line',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            dataAccess: [
                'Local health alerts and warnings',
                'Nearby water quality reports',
                'Disease prevention guidelines',
                'Health education content',
            ],
            actions: [
                'Report symptoms via app/SMS/voice',
                'Subscribe to health alerts',
                'Access educational resources',
                'View community health status',
            ],
        },
        {
            title: 'ASHA Workers',
            icon: 'ri-user-heart-line',
            color: 'from-green-500 to-teal-500',
            bgColor: 'bg-green-50',
            dataAccess: [
                'Village-level health data',
                'Assigned household information',
                'Training materials and protocols',
                'Alert notifications',
            ],
            actions: [
                'Report cases and symptoms',
                'Conduct health surveys',
                'Distribute health advisories',
                'Track follow-ups',
            ],
        },
        {
            title: 'Clinics / PHCs',
            icon: 'ri-hospital-line',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
            dataAccess: [
                'Patient medical records',
                'Lab test results',
                'Disease outbreak alerts',
                'Treatment protocols',
            ],
            actions: [
                'Register confirmed cases',
                'Order and track lab tests',
                'Update patient records',
                'Generate health reports',
            ],
        },
        {
            title: 'District Health Officers',
            icon: 'ri-shield-user-line',
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50',
            dataAccess: [
                'District-wide analytics',
                'Outbreak predictions',
                'Resource allocation data',
                'Team performance metrics',
            ],
            actions: [
                'Coordinate interventions',
                'Deploy medical teams',
                'Allocate resources',
                'Monitor outbreak response',
            ],
        },
        {
            title: 'State Health Authorities',
            icon: 'ri-government-line',
            color: 'from-indigo-500 to-blue-500',
            bgColor: 'bg-indigo-50',
            dataAccess: [
                'State-wide health overview',
                'Cross-district comparisons',
                'Policy impact analysis',
                'Budget and resource planning',
            ],
            actions: [
                'Set health policies',
                'Allocate state resources',
                'Review district performance',
                'Generate state reports',
            ],
        },
    ];

    return (
        <section id="user-roles" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-primary/20 rounded-full">
                        <i className="ri-team-line text-primary mr-2"></i>
                        <span className="text-sm font-semibold text-gray-700">Stakeholders & Beneficiaries</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        Who Benefits from the System
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Role-based access ensuring the right information reaches the right people
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {roles.map((role, index) => (
                        <div
                            key={index}
                            className={`${role.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30`}
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <i className={`${role.icon} text-3xl text-white`}></i>
                            </div>

                            <h3 className="text-xl font-bold text-navy mb-6">
                                {role.title}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <i className="ri-database-2-line text-primary"></i>
                                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Data Access</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {role.dataAccess.map((item, idx) => (
                                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                                <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <i className="ri-flashlight-line text-secondary"></i>
                                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {role.actions.map((item, idx) => (
                                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                                <i className="ri-arrow-right-s-line text-secondary mt-0.5 flex-shrink-0"></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-12 border-2 border-primary/20">
                    <div className="text-center space-y-4">
                        <i className="ri-shield-check-line text-5xl text-primary"></i>
                        <h3 className="text-2xl font-bold text-navy">
                            Secure, Role-Based Access Control
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Every user sees only the information relevant to their role, ensuring data privacy while enabling effective collaboration across all levels of the healthcare system.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                                <i className="ri-lock-line text-primary mr-2"></i>
                                End-to-End Encryption
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                                <i className="ri-user-settings-line text-secondary mr-2"></i>
                                Granular Permissions
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                                <i className="ri-shield-check-line text-success mr-2"></i>
                                HIPAA Compliant
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
