interface AlertSystemProps {
  showAlert: boolean;
  onClose: () => void;
}

export default function AlertSystem({ showAlert: _showAlert, onClose: _onClose }: AlertSystemProps) {
  const alertChannels = [
    { icon: 'ri-message-3-line', label: 'SMS', desc: 'Local languages', color: 'success' },
    { icon: 'ri-whatsapp-line', label: 'WhatsApp', desc: 'Instant notifications', color: 'success' },
    { icon: 'ri-notification-line', label: 'App Push', desc: 'Real-time alerts', color: 'primary' },
    { icon: 'ri-mail-line', label: 'Email', desc: 'For officials', color: 'secondary' },
  ];

  const actions = [
    { icon: 'ri-drop-line', text: 'Boil water before consumption', subtext: 'पानी को उबालकर पिएं' },
    { icon: 'ri-restaurant-line', text: 'Avoid street food', subtext: 'बाहर का खाना न खाएं' },
    { icon: 'ri-hospital-line', text: 'Visit nearest PHC if symptoms appear', subtext: 'लक्षण दिखने पर PHC जाएं' },
    { icon: 'ri-alarm-warning-line', text: 'Report new cases immediately', subtext: 'नए मामलों की तुरंत रिपोर्ट करें' },
  ];

  return (
    <section id="early-alerts" className="py-24 bg-gradient-to-b from-white to-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy">
            Alert & Early Warning System
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Multi-channel alerts in 12+ languages ensure every community member receives timely warnings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-heading font-bold text-navy mb-6">
                Alert Triggers
              </h3>
              <div className="space-y-4">
                {[
                  { icon: 'ri-alert-line', title: 'Risk Threshold Crossed', desc: 'When prediction models detect high outbreak probability' },
                  { icon: 'ri-drop-line', title: 'Water Contamination', desc: 'Immediate alerts for unsafe water sources' },
                  { icon: 'ri-group-line', title: 'Symptom Clustering', desc: 'Multiple cases reported in same area' },
                ].map((trigger, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${trigger.icon} text-2xl text-accent`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">{trigger.title}</h4>
                      <p className="text-sm text-gray-600">{trigger.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-heading font-bold text-navy mb-6">
                Delivery Channels
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {alertChannels.map((channel, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer">
                    <div className={`w-16 h-16 bg-${channel.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`${channel.icon} text-3xl text-${channel.color}`}></i>
                    </div>
                    <h4 className="font-semibold text-navy mb-1">{channel.label}</h4>
                    <p className="text-xs text-gray-600">{channel.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-accent/20">
                <div className="bg-gradient-to-r from-accent to-warning p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                      Sample Illustration Only
                    </span>
                    <span className="px-3 py-1 bg-white text-accent rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Example Alert
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className="ri-alarm-warning-line text-2xl text-accent"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white">
                        Health Alert
                      </h3>
                      <p className="text-sm text-white/90">Immediate Action Required</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-accent/5 border-l-4 border-accent rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-navy">
                        Outbreak Risk Detected
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 italic">
                      This is a sample warning representation. Actual alerts are sent to specific regions based on real-time surveillance.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <i className="ri-map-pin-line text-accent"></i>
                      <span>[Affected Region Name]</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-calendar-line text-accent"></i>
                      <span>[Time Period]</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <h5 className="text-sm font-bold text-navy mb-2 flex items-center">
                      <i className="ri-information-line mr-2"></i>
                      How to Read This Alert
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      When the system detects rising health risks, affected residents receive multi-channel notifications with specific preventive steps tailored to the local situation.
                    </p>
                  </div>


                  <div>
                    <h4 className="font-semibold text-navy mb-3 flex items-center">
                      <i className="ri-shield-check-line text-primary mr-2"></i>
                      Recommended Actions
                    </h4>
                    <div className="space-y-3">
                      {actions.map((action, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-mint/30 rounded-xl">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white font-bold text-sm">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-navy">{action.text}</p>
                            <p className="text-xs text-gray-600">{action.subtext}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 px-4 bg-white border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer">
                      <i className="ri-hospital-line"></i>
                      <span>Find PHC</span>
                    </button>
                    <button className="py-3 px-4 bg-white border-2 border-secondary text-secondary rounded-xl font-semibold text-sm hover:bg-secondary hover:text-white transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer">
                      <i className="ri-share-line"></i>
                      <span>Share Alert</span>
                    </button>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                    I Understand – Take Precautions
                  </button>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Language:</span>
                      <select className="text-xs font-semibold text-primary border border-primary/20 rounded-lg px-2 py-1 cursor-pointer">
                        <option>English</option>
                        <option>हिंदी</option>
                        <option>অসমীয়া</option>
                        <option>বাংলা</option>
                      </select>
                    </div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-primary cursor-pointer" />
                      <span className="text-xs text-gray-600">SMS Updates</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <i className="ri-message-3-line text-success"></i>
                  <span>SMS</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-whatsapp-line text-success"></i>
                  <span>WhatsApp</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-notification-line text-primary"></i>
                  <span>App</span>
                </div>
                <span className="text-gray-400">Alert sent via all channels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
