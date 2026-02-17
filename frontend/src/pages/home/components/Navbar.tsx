import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isScrolled
                ? 'bg-slate-900'
                : 'bg-white/10 backdrop-blur-md border border-white/20'
              }`}>
              <i className="ri-heart-pulse-line text-2xl text-white"></i>
            </div>
            <div>
              <h1 className={`text-lg font-bold transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
                }`}>
                Dharma Surveillance
              </h1>
              <p className={`text-xs font-medium transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'
                }`}>
                National Health Mission
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-semibold transition-colors ${isScrolled
                  ? 'text-slate-700 hover:text-blue-600'
                  : 'text-white hover:text-blue-200'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('features');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-semibold transition-colors ${isScrolled
                  ? 'text-slate-700 hover:text-blue-600'
                  : 'text-white hover:text-blue-200'
                }`}
            >
              Features
            </button>
            <button
              onClick={() => navigate('/login')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 ${isScrolled
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                  : 'bg-white text-slate-900 hover:bg-white/90 shadow-lg'
                }`}
            >
              <i className="ri-login-circle-line"></i>
              <span>Portal Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
              }`}
          >
            <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('features');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-bold flex items-center justify-center gap-2"
            >
              <i className="ri-login-circle-line"></i>
              <span>Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
