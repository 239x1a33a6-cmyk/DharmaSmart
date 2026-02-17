export default function DataPrivacy() {
    return (
        <section className="py-24 bg-gradient-to-br from-navy to-navy-dark text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                        <i className="ri-shield-check-line text-4xl text-primary"></i>
                    </div>
                    <h2 className="text-4xl font-heading font-bold mb-4">
                        Data Privacy & Trust
                    </h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Your health data is protected with the highest standards of security and ethical practices
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Role-Based Access Control */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="ri-lock-password-line text-2xl text-primary"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Role-Based Access Control</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Every user has specific access permissions based on their role. Community members see only their own data and local alerts. Health officials access aggregated, anonymized insights for decision-making. No unauthorized access is possible.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Public Health Purpose Only */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="ri-heart-pulse-line text-2xl text-success"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Public Health Purpose Only</h3>
                                <p className="text-white/70 leading-relaxed">
                                    All data collected is used exclusively for disease surveillance, outbreak prediction, and public health interventions. No commercial use, no third-party sharing, no advertising purposes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* No Public Exposure of Sensitive Data */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="ri-eye-off-line text-2xl text-warning"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">No Public Exposure of Sensitive Data</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Individual health records, personal identifiers, and location-specific outbreak data are never publicly displayed. Only authorized health officials can access detailed operational dashboards after secure authentication.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AI as Decision Support */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="ri-brain-line text-2xl text-secondary"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">AI as Decision Support, Not Replacement</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Our AI models provide early warning signals and pattern detection to assist health professionals. Final decisions on interventions, treatments, and public health actions are always made by qualified medical and public health experts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Features */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold mb-6 text-center">Security & Compliance</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-shield-check-line text-3xl text-green-400"></i>
                            </div>
                            <p className="font-semibold mb-1">End-to-End Encryption</p>
                            <p className="text-sm text-white/60">AES-256 encryption for all data transmission and storage</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-file-shield-line text-3xl text-green-400"></i>
                            </div>
                            <p className="font-semibold mb-1">HIPAA Compliant</p>
                            <p className="text-sm text-white/60">Adheres to health data protection standards</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-user-settings-line text-3xl text-green-400"></i>
                            </div>
                            <p className="font-semibold mb-1">Granular Permissions</p>
                            <p className="text-sm text-white/60">Precise control over who sees what data</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-audit-line text-3xl text-green-400"></i>
                            </div>
                            <p className="font-semibold mb-1">Audit Trails</p>
                            <p className="text-sm text-white/60">Complete logging of all data access and actions</p>
                        </div>
                    </div>
                </div>

                {/* Ethical AI Principles */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-bold mb-6">Ethical AI Principles</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                            Transparency in AI Decision-Making
                        </span>
                        <span className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                            Bias Detection & Mitigation
                        </span>
                        <span className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                            Human Oversight Required
                        </span>
                        <span className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                            Explainable Predictions
                        </span>
                        <span className="px-6 py-3 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                            Community Consent & Participation
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
