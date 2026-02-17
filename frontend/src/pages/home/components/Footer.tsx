import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-navy to-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">About the Initiative</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Smart Community Health Surveillance & Early Warning System is a government initiative to transform healthcare delivery through predictive analytics and early disease detection.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-orange-400">🇮🇳</span>
              <span className="text-white/70">भारत सरकार की पहल</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/report-symptoms')}
                  className="text-white/80 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Report Symptoms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/analytics')}
                  className="text-white/80 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  View Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/alerts')}
                  className="text-white/80 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Health Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/education')}
                  className="text-white/80 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Health Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="text-white/80 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Official Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Contact & Support</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <i className="ri-phone-line text-primary mt-0.5"></i>
                <div>
                  <p className="text-white/80">Helpline (Toll-Free)</p>
                  <p className="text-white font-semibold">1800-XXX-XXXX</p>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <i className="ri-mail-line text-primary mt-0.5"></i>
                <div>
                  <p className="text-white/80">Email Support</p>
                  <p className="text-white font-semibold">support@healthsurveillance.gov.in</p>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <i className="ri-time-line text-primary mt-0.5"></i>
                <div>
                  <p className="text-white/80">Available 24/7</p>
                  <p className="text-white/70 text-xs">Emergency health support</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Data Privacy & Ethics */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Data Privacy & Ethics</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <i className="ri-shield-check-line text-green-400 mt-0.5"></i>
                <span className="text-white/80">HIPAA Compliant</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-lock-line text-green-400 mt-0.5"></i>
                <span className="text-white/80">End-to-End Encryption</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-user-settings-line text-green-400 mt-0.5"></i>
                <span className="text-white/80">User Data Protection</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-file-shield-line text-green-400 mt-0.5"></i>
                <span className="text-white/80">Ethical AI Practices</span>
              </li>
            </ul>
            <button className="mt-4 text-sm text-primary hover:text-primary-light transition-colors cursor-pointer">
              Read Privacy Policy →
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-2xl text-yellow-400 mt-0.5"></i>
              <div>
                <h4 className="font-bold text-white mb-2">Disclaimer - Pilot/Demo Phase</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  This system is currently in pilot/demo phase. All data, predictions, and metrics shown are for demonstration and evaluation purposes. The system is being tested in select regions before full-scale deployment. Medical decisions should always be made in consultation with qualified healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © 2026 Smart Community Health Surveillance System. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Developed for public health and community welfare
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
                Terms of Service
              </button>
              <button className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <button className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
