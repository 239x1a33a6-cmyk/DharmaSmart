export default function SystemOverview() {
    const pillars = [
        {
            icon: 'ri-database-2-line',
            title: 'Multimodal Data Collection',
            description: 'The system collects health reports from community members and ASHA workers, alongside real-time water quality monitoring data from villages.'
        },
        {
            icon: 'ri-brain-line',
            title: 'AI-Powered Pattern Detection',
            description: 'Advanced algorithms analyze the incoming data to detect abnormal health patterns and potential water-borne disease outbreaks before they spread.'
        },
        {
            icon: 'ri-notification-3-line',
            title: 'Automated Early Warnings',
            description: 'When potential risks are identified, the system automatically triggers alerts via SMS, WhatsApp, and voice calls to community members and health workers.'
        },
        {
            icon: 'ri-government-line',
            title: 'Authority Decision Support',
            description: 'The platform provides local and state health authorities with critical insights to coordinate rapid response and preventive interventions.'
        }
    ];

    return (
        <section id="overview" className="py-24 bg-navy text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                            <i className="ri-information-line text-primary"></i>
                            <span className="text-sm font-semibold uppercase tracking-wider">Concept & Solution</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                            How the Early Warning System Protects Communities
                        </h2>
                        <p className="text-xl text-white/70 leading-relaxed mb-8">
                            Our platform bridges the gap between community reporting and government action, using artificial intelligence to provide a predictive shield against water-borne diseases.
                        </p>

                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <i className="ri-shield-flash-line text-secondary mr-3 text-2xl"></i>
                                The Core Objective
                            </h3>
                            <p className="text-white/60">
                                The primary goal of this initiative is to shift from reactive health response to proactive disease prevention. By detecting "signals" in community health and water quality, we can provide authorities with a critical lead time of 7-10 days before an outbreak occurs.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {pillars.map((pillar, idx) => (
                            <div key={idx} className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:-translate-x-2">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                        <i className={`${pillar.icon} text-2xl text-primary group-hover:text-white`}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">{pillar.title}</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
