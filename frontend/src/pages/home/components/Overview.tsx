export default function Overview() {
  const features = [
    {
      icon: 'ri-brain-line',
      title: 'Intelligent Disease Prediction',
      description: 'Advanced AI/ML models analyze symptom patterns, water quality, and seasonal trends to predict outbreaks 3-7 days in advance.',
      gradient: 'from-secondary to-secondary-dark',
      metrics: '7-Day Forecast Window',
      bullets: [
        'Anomaly detection algorithms',
        'Time-series forecasting',
        'Risk classification (Low/Medium/High)',
        'Explainable AI for transparency',
      ],
    },
    {
      icon: 'ri-drop-line',
      title: 'Water Quality Monitoring',
      description: 'Real-time tracking of water sources with pH, turbidity, and bacterial contamination sensors.',
      gradient: 'from-primary to-success',
      metrics: 'Real-Time Sensors',
      color: 'mint',
    },
    {
      icon: 'ri-notification-3-line',
      title: 'Multi-Channel Alerts',
      description: 'Instant notifications via SMS, WhatsApp, IVR, and app push in 12+ local and tribal languages.',
      gradient: 'from-accent to-warning',
      metrics: '12+ Languages',
      color: 'coral',
    },
  ];

  return (
    <section id="overview" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
            सशक्त समुदाय, स्वस्थ भारत
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowered Communities, Healthy India
          </p>
          <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
            A comprehensive platform combining <strong className="text-primary">AI-Powered</strong> analytics with <strong className="text-secondary">Real-Time</strong> surveillance to protect rural and tribal communities from water-borne, food-borne, and environment-linked diseases.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:row-span-2">
            <div className={`h-full bg-gradient-to-br ${features[0].gradient} rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className={`${features[0].icon} text-3xl`}></i>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="ri-shield-check-line text-3xl"></i>
                </div>
              </div>

              <h3 className="text-3xl font-heading font-bold mb-4">
                {features[0].title}
              </h3>

              <p className="text-white/90 mb-6 leading-relaxed">
                {features[0].description}
              </p>

              <ul className="space-y-3 mb-8">
                {features[0].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <i className="ri-check-line text-xl mt-0.5"></i>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-2xl font-bold font-mono">{features[0].metrics}</p>
                <p className="text-sm text-white/80">Prediction Capability</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className={`h-full bg-${features[1].color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <i className={`${features[1].icon} text-3xl text-primary`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-navy">
                      {features[1].title}
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold flex items-center space-x-2 whitespace-nowrap">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>{features[1].metrics}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {features[1].description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary font-mono">pH</div>
                  <div className="text-xs text-gray-600 mt-1">Level Monitor</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-secondary font-mono">TDS</div>
                  <div className="text-xs text-gray-600 mt-1">Turbidity</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-success font-mono">E.coli</div>
                  <div className="text-xs text-gray-600 mt-1">Bacteria</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className={`h-full bg-${features[2].color} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <i className={`${features[2].icon} text-3xl text-accent`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-navy">
                      {features[2].title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">🇮🇳 हिंदी</span>
                  <span className="text-sm font-semibold text-gray-700">অসমীয়া</span>
                  <span className="text-sm font-semibold text-gray-700">বাংলা</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {features[2].description}
              </p>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                  <i className="ri-message-3-line text-2xl text-success"></i>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                  <i className="ri-whatsapp-line text-2xl text-success"></i>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                  <i className="ri-phone-line text-2xl text-secondary"></i>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                  <i className="ri-notification-line text-2xl text-accent"></i>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-semibold text-gray-700">Multi-Channel Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
