export default function AIPrediction() {
  const models = [
    {
      title: 'Anomaly Detection',
      description: 'Identifies unusual patterns in symptom reporting and water quality data',
      icon: 'ri-radar-line',
      color: 'primary',
      accuracy: '92%',
    },
    {
      title: 'Time-Series Forecasting',
      description: 'Predicts disease trends based on historical data and seasonal patterns',
      icon: 'ri-line-chart-line',
      color: 'secondary',
      accuracy: '89%',
    },
    {
      title: 'Risk Classification',
      description: 'Categorizes outbreak risk levels: Low, Medium, High, Critical',
      icon: 'ri-shield-check-line',
      color: 'warning',
      accuracy: '94%',
    },
  ];

  const dataInputs = [
    { label: 'Symptom Frequency', value: '2,400+ reports/day', icon: 'ri-stethoscope-line' },
    { label: 'Water Quality', value: '450 sources monitored', icon: 'ri-drop-line' },
    { label: 'Seasonal Trends', value: 'Monsoon indicators', icon: 'ri-cloud-line' },
    { label: 'Historical Data', value: '5 years of records', icon: 'ri-database-2-line' },
  ];

  return (
    <section id="ai-prediction" className="py-24 bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <i className="ri-brain-line text-primary text-xl"></i>
            <span className="text-sm font-semibold text-white">Powered by Advanced AI/ML</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">
            AI/ML Prediction Engine
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Intelligent algorithms analyze multiple data sources to predict disease outbreaks 3-7 days in advance with transparent, explainable AI logic
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-heading font-bold text-white mb-8">
              Data Sources & Analysis
            </h3>
            {dataInputs.map((input, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${input.icon} text-2xl text-primary`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{input.label}</h4>
                  <p className="text-sm text-gray-400">{input.value}</p>
                </div>
                <i className="ri-arrow-right-line text-xl text-gray-500"></i>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-heading font-bold text-white">
                  Prediction Output
                </h4>
                <div className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-semibold flex items-center space-x-1 whitespace-nowrap">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-accent/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-300">Risk Level</span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold whitespace-nowrap">
                      HIGH RISK
                    </span>
                  </div>
                  <div className="text-4xl font-bold font-mono text-white mb-2">85%</div>
                  <p className="text-sm text-gray-400">Cholera outbreak probability</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-300">Affected Area</span>
                    <i className="ri-map-pin-line text-primary text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Majuli District</div>
                  <p className="text-sm text-gray-400">12 villages, ~8,400 people at risk</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-300">Forecast Window</span>
                    <i className="ri-calendar-line text-secondary text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Next 5-7 Days</div>
                  <p className="text-sm text-gray-400">Peak expected in 3 days</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-300">Confidence Level</span>
                    <span className="text-success font-bold">89%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-success to-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer"
            >
              <div className={`w-16 h-16 bg-${model.color}/20 rounded-2xl flex items-center justify-center mb-6`}>
                <i className={`${model.icon} text-3xl text-${model.color}`}></i>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {model.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {model.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">Accuracy</span>
                <span className={`text-2xl font-bold font-mono text-${model.color}`}>
                  {model.accuracy}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-lightbulb-line text-2xl text-primary"></i>
            </div>
            <div>
              <h4 className="text-xl font-heading font-bold text-white mb-2">
                Explainable AI for Transparency
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Our AI models provide clear explanations for predictions, showing which factors contributed most to the risk assessment. Health authorities can understand the reasoning behind each alert, ensuring trust and enabling informed decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
