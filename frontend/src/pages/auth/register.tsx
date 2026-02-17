import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'community_member' | 'asha_worker' | 'clinic_staff' | 'district_officer' | 'state_authority' | 'admin';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    location: '',
    district: '',
    state: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles: RoleOption[] = [
    {
      id: 'community_member',
      title: 'Community Member',
      description: 'Report health symptoms and access alerts',
      icon: 'ri-user-line',
      color: 'primary',
    },
    {
      id: 'asha_worker',
      title: 'ASHA / Health Worker',
      description: 'Field data collection and community support',
      icon: 'ri-nurse-line',
      color: 'secondary',
    },
    {
      id: 'clinic_staff',
      title: 'Clinic / PHC Staff',
      description: 'Clinical reporting and patient management',
      icon: 'ri-hospital-line',
      color: 'accent',
    },
    {
      id: 'district_officer',
      title: 'District Health Officer',
      description: 'District-level surveillance and coordination',
      icon: 'ri-government-line',
      color: 'warning',
    },
    {
      id: 'state_authority',
      title: 'State Health Authority',
      description: 'State-wide monitoring and policy decisions',
      icon: 'ri-building-line',
      color: 'success',
    },
    {
      id: 'admin',
      title: 'System Administrator',
      description: 'Full system access and configuration',
      icon: 'ri-admin-line',
      color: 'navy',
    },
  ];

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One digit');
    if (!/[!@#$%^&*]/.test(password)) errors.push('One special character (!@#$%^&*)');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setError(`Password must contain: ${passwordErrors.join(', ')}`);
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user creation
      const newUser = {
        id: Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        location: formData.location,
        district: formData.district,
        state: formData.state,
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (_err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordErrors = formData.password ? validatePassword(formData.password) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-add-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-heading font-bold text-navy mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join the health surveillance network
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {step > s ? <i className="ri-check-line"></i> : s}
                    </div>
                    <span className="text-xs font-medium text-gray-600 mt-2">
                      {s === 1 ? 'Role' : s === 2 ? 'Details' : 'Verify'}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${step > s ? 'bg-primary' : 'bg-gray-200'
                        }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <i className="ri-error-warning-line text-red-500 text-xl mt-0.5"></i>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">
                  Select Your Role
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: role.id })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 cursor-pointer text-left ${formData.role === role.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-${role.color}/10 flex items-center justify-center mb-3`}>
                        <i className={`${role.icon} text-2xl text-${role.color}`}></i>
                      </div>
                      <h4 className="font-semibold text-navy mb-1">{role.title}</h4>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.role}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  Continue
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Village / Ward *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option>Majuli</option>
                      <option>Kamrup</option>
                      <option>Dibrugarh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option>Assam</option>
                      <option>Meghalaya</option>
                      <option>Manipur</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                  >
                    Continue
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-navy mb-4">
                  Security & Verification
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors pr-12"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                    >
                      <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      {passwordErrors.length > 0 ? (
                        passwordErrors.map((err, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-red-600">
                            <i className="ri-close-circle-line"></i>
                            <span>{err}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-2 text-xs text-green-600">
                          <i className="ri-checkbox-circle-line"></i>
                          <span>Password meets all requirements</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors pr-12"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                    >
                      <i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className="mt-2">
                      {formData.password === formData.confirmPassword ? (
                        <div className="flex items-center space-x-2 text-xs text-green-600">
                          <i className="ri-checkbox-circle-line"></i>
                          <span>Passwords match</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-xs text-red-600">
                          <i className="ri-close-circle-line"></i>
                          <span>Passwords do not match</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      <span>Minimum 8 characters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      <span>At least one uppercase letter (A-Z)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      <span>At least one lowercase letter (a-z)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      <span>At least one digit (0-9)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      <span>At least one special character (!@#$%^&*)</span>
                    </li>
                  </ul>
                </div>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-5 h-5 text-primary mt-0.5 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:underline font-semibold cursor-pointer whitespace-nowrap">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-primary hover:underline font-semibold cursor-pointer whitespace-nowrap">
                      Privacy Policy
                    </button>
                  </span>
                </label>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || passwordErrors.length > 0}
                    className="flex-1 py-4 bg-gradient-to-r from-success to-primary text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="ri-check-line mr-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-primary hover:text-secondary font-semibold cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
