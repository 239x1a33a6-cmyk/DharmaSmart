export default function ProblemStatement() {
    const problems = [
        {
            icon: 'ri-drop-line',
            title: 'Water-Borne Disease Burden',
            description: 'Cholera, typhoid, and diarrheal diseases affect millions annually',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: 'ri-time-line',
            title: 'Delayed Detection',
            description: 'Fragmented reporting leads to late outbreak identification',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: 'ri-signal-wifi-off-line',
            title: 'Rural & Tribal Challenges',
            description: 'Low connectivity and limited healthcare access in remote areas',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <section id="problem" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                        <i className="ri-alert-line text-red-600 mr-2"></i>
                        <span className="text-sm font-semibold text-red-700">The Challenge</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
                        Public Health Challenges We Address
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Understanding the critical gaps in current disease surveillance systems
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <i className={`${problem.icon} text-3xl text-white`}></i>
                            </div>
                            <h3 className="text-xl font-heading font-bold text-navy mb-3">
                                {problem.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 lg:p-12 border border-red-100">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                                Current System Limitations
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                                    <span className="text-gray-700">Manual data collection causing delays</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                                    <span className="text-gray-700">Isolated reporting with no integration</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                                    <span className="text-gray-700">Reactive response after outbreak spreads</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                                    <span className="text-gray-700">Language and literacy barriers</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="text-center space-y-4">
                                <div className="text-5xl font-bold text-red-600 font-mono">3-7</div>
                                <p className="text-gray-700 font-medium">Days lost in traditional outbreak detection</p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Early detection can save thousands of lives and prevent widespread transmission
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
