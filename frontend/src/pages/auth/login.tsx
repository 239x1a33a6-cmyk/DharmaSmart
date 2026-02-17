import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [identifier, setIdentifier] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'ID' | 'OTP'>('ID');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    if (user) {
      if (user.role === 'SUPER_ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'CLINIC') {
        navigate('/clinic/dashboard');
      } else if (user.role === 'STATE_AUTHORITY') {
        navigate('/state/dashboard');
      } else if (user.role === 'DHO' || user.role === 'DISTRICT_ADMIN') {
        navigate('/district/dashboard');
      } else if (user.role === 'COMMUNITY_MEMBER') {
        if (!user.profile?.isProfileComplete) {
          navigate('/community/setup');
        } else {
          navigate('/community/dashboard');
        }
      } else if (user.role === 'ASHA_WORKER') {
        if (!user.profile?.isProfileComplete) {
          navigate('/asha/verify');
        } else {
          navigate('/asha/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'mobile') {
      if (!/^\d{10}$/.test(identifier)) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }
      setStep('OTP');
      setTimer(60);
      setError('');
    } else {
      // Email login goes straight to dashboard via password
      handleLogin();
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(
        loginMethod === 'mobile' ? 'OTP' : 'PASSWORD',
        identifier,
        secret
      );
      // AuthContext will trigger the useEffect for navigation
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Use 9876543210 / 123456 for demo.');
      setLoading(false);
    }
  };

  const resetOTP = () => {
    setTimer(60);
    // Simulate resending OTP
  };

  const demoCredentials = [
    { role: 'State Authority', method: 'email', id: 'state_admin1', secret: 'password123', type: 'PASS', icon: 'ri-building-4-line', color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
    { role: 'District Admin', method: 'email', id: 'district_admin1', secret: 'password123', type: 'PASS', icon: 'ri-government-line', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
    { role: 'Doctor', method: 'email', id: 'doctor1', secret: 'password123', type: 'PASS', icon: 'ri-stethoscope-line', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
    { role: 'ASHA Worker', method: 'email', id: 'asha_worker1', secret: 'password123', type: 'PASS', icon: 'ri-nurse-line', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { role: 'Super Admin', method: 'email', id: 'admin', secret: 'admin123', type: 'PASS', icon: 'ri-shield-star-line', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
    { role: 'Community', method: 'email', id: 'community1', secret: 'password123', type: 'PASS', icon: 'ri-user-line', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  ];

  const [autoLoggingIn, setAutoLoggingIn] = useState<string | null>(null);

  const handleSelectCredential = async (cred: typeof demoCredentials[0]) => {
    setAutoLoggingIn(cred.role);
    setLoginMethod(cred.method as 'mobile' | 'email');
    setIdentifier(cred.id);
    setSecret(cred.secret);
    setError('');
    setStep(cred.type === 'OTP' ? 'OTP' : 'ID');

    // Auto-submit after a brief visual delay
    setTimeout(async () => {
      try {
        await login(
          cred.type === 'OTP' ? 'OTP' : 'PASSWORD',
          cred.id,
          cred.secret
        );
      } catch (err: any) {
        setError(err.message || 'Demo login failed');
        setAutoLoggingIn(null);
      }
    }, 500);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden shadow-2xl rounded-none md:rounded-3xl m-0 md:m-8 bg-white">

      {/* Left Side: Official Branding (Image + Overlay) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop"
            alt="Ecological Data"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-900/80"></div>
        </div>

        {/* Top Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-2xl">🇮🇳</span>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm uppercase">Government of India</h3>
              <p className="text-blue-200 text-xs">National Health Mission</p>
            </div>
          </div>
        </div>

        {/* Middle Content - Hero Text */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
            Smart Health <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Surveillance
            </span>
          </h1>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            An advanced AI-powered platform for real-time disease tracking,
            resource allocation, and rapid response coordination across the nation.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-blue-200 flex items-center gap-2">
              <i className="ri-shield-check-line text-emerald-400"></i>
              Secure Access
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-blue-200 flex items-center gap-2">
              <i className="ri-government-line text-orange-400"></i>
              Official Portal
            </div>
          </div>
        </div>

        {/* Bottom Content - Footer */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-8">
          <div>
            <p className="text-slate-400 text-xs">Technical Partner</p>
            <p className="text-white font-mono text-sm mt-1">Dharma Intelligence © 2024</p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center bg-white p-8 lg:p-16 overflow-y-auto relative">
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 lg:left-16 text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium text-sm group z-10"
        >
          <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform"></i>
          Back to Home
        </button>

        <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">

          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your credentials to access the dashboard.</p>
          </div>

          {/* Existing Form Logic */}
          <div className="bg-slate-50 p-1 rounded-xl flex mb-6">
            <button
              type="button"
              onClick={() => { setLoginMethod('mobile'); setIdentifier(''); setSecret(''); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${loginMethod === 'mobile' ? 'bg-white text-blue-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <i className="ri-smartphone-line mr-2"></i>
              Mobile Number
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod('email'); setIdentifier(''); setSecret(''); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${loginMethod === 'email' ? 'bg-white text-blue-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <i className="ri-id-card-line mr-2"></i>
              Official ID
            </button>
          </div>

          <form onSubmit={step === 'ID' ? handleInitialSubmit : handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-shake">
                <i className="ri-error-warning-fill text-red-500 mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-bold text-red-800">Authentication Error</h4>
                  <p className="text-xs text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {step === 'ID' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    {loginMethod === 'mobile' ? 'Registered Mobile' : 'Email / User ID'}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className={`text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg ${loginMethod === 'mobile' ? 'ri-phone-fill' : 'ri-user-3-fill'}`}></i>
                    </div>
                    <input
                      type={loginMethod === 'mobile' ? 'tel' : 'text'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={loginMethod === 'mobile' ? '9876543210' : 'user@dharma.gov.in'}
                      className="block w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {loginMethod === 'email' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Secure Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-lock-2-fill text-slate-400 group-focus-within:text-blue-600 transition-colors text-lg"></i>
                      </div>
                      <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="••••••••"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-message-3-line text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Enter Verification Code</h3>
                  <p className="text-sm text-slate-500 mt-1">We sent a 6-digit code to +91 {identifier}</p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    maxLength={6}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    className="block w-full text-center py-4 text-3xl font-mono tracking-[0.5em] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    placeholder="······"
                    autoFocus
                  />
                  <div className="flex justify-between items-center px-2">
                    <button type="button" onClick={() => setStep('ID')} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                      Wrong Number?
                    </button>
                    <button type="button" onClick={resetOTP} disabled={timer > 0} className="text-xs font-bold text-blue-600 disabled:opacity-50 hover:text-blue-700">
                      {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {loading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-login-circle-line"></i>}
              {loading ? 'Authenticating...' : (step === 'ID' && loginMethod === 'mobile' ? 'Get OTP' : 'Access Portal')}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 text-sm text-slate-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
            >
              Sign Up
            </button>
          </div>

          {/* Quick Login - Updated Design */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">Select Role to Login (Demo)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => handleSelectCredential(cred)}
                  className={`group relative p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all text-left overflow-hidden ${autoLoggingIn === cred.role ? 'ring-2 ring-blue-500 border-blue-500 pl-4' : ''}`}
                >
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${cred.color.replace('bg-', 'from-').split(' ')[0]}/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                  <div className="relative z-10">
                    <i className={`${cred.icon} text-xl mb-2 text-slate-700 group-hover:text-blue-600 transition-colors`}></i>
                    <p className="font-bold text-xs text-slate-800 leading-tight">{cred.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-[10px] text-slate-400">
              Protected by reCAPTCHA and subject to the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
