import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Government Branding Header */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-50 via-white to-green-50 border border-slate-200 rounded-full w-fit shadow-sm">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-200">
              <span className="text-xl">🇮🇳</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">Government of India</p>
              <p className="text-xs text-slate-500">National Health Mission | भारत सरकार की पहल</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-black text-5xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight">
                Smart Health
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                  Surveillance
                </span>
                <br />
                <span className="text-4xl lg:text-5xl font-bold text-slate-700">
                  System
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed font-light max-w-xl">
                AI-powered predictive health surveillance for rural, tribal, and remote communities across India. Real-time disease tracking, resource allocation, and rapid response coordination.
              </p>

              {/* Key Features Pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 flex items-center gap-2">
                  <i className="ri-shield-check-line"></i>
                  Secure Access
                </div>
                <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-sm font-medium text-emerald-700 flex items-center gap-2">
                  <i className="ri-time-line"></i>
                  Real-time Alerts
                </div>
                <div className="px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-sm font-medium text-orange-700 flex items-center gap-2">
                  <i className="ri-government-line"></i>
                  Official Portal
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/login')}
                className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <span>Access Portal</span>
                <i className="ri-login-circle-line group-hover:translate-x-1 transition-transform"></i>
              </button>

              <button
                onClick={() => {
                  const alertSection = document.getElementById('early-alerts');
                  if (alertSection) {
                    alertSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 rounded-xl font-bold text-lg transition-all hover:shadow-md flex items-center justify-center gap-2"
              >
                <i className="ri-notification-line"></i>
                <span>Learn More</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-black text-slate-900">24/7</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Monitoring</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">100K+</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Communities</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">AI</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Powered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Card */}
            <div className="relative w-full max-w-md">
              {/* Decorative Background Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

              {/* Main Feature Card */}
              <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {/* Health Monitoring */}
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3">
                      <i className="ri-heart-pulse-line text-3xl text-teal-600"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Health</span>
                  </div>

                  {/* Water Quality */}
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 mt-8">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3">
                      <i className="ri-drop-line text-3xl text-blue-600"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Water</span>
                  </div>

                  {/* Alert System */}
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 -mt-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3">
                      <i className="ri-alarm-warning-line text-3xl text-orange-600"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Alerts</span>
                  </div>

                  {/* Protection */}
                  <div className="flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 mt-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3">
                      <i className="ri-shield-check-line text-3xl text-emerald-600"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Protect</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600">System Active</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">v2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#features" className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group">
          <span className="text-xs font-medium">Explore Features</span>
          <i className="ri-arrow-down-line text-2xl group-hover:translate-y-1 transition-transform"></i>
        </a>
      </div>
    </section>
  );
}
