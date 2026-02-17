import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendApi } from '../../services/backend-api';

interface Role {
    id: number;
    name: string;
    description: string;
}

export default function SignUp() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        requested_role_id: '',
        reason: '',
        password: '',
        password_confirm: '',
    });

    useEffect(() => {
        // Fetch available roles
        const fetchRoles = async () => {
            try {
                const response = await backendApi.get('/auth/roles/');
                setRoles(response.data);
            } catch (error) {
                console.error('Failed to fetch roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await backendApi.post('/auth/register/', formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'Registration failed. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="ri-checkbox-circle-line text-4xl text-emerald-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Submitted!</h2>
                    <p className="text-slate-600 mb-4">
                        Your registration request has been sent to the administrators for approval.
                    </p>
                    <p className="text-sm text-slate-500 mb-6">
                        You will be able to log in once your account is approved. Redirecting to login...
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-4 text-white/80 hover:text-white flex items-center gap-2 text-sm"
                    >
                        <i className="ri-arrow-left-line"></i>
                        Back to Home
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-blue-100">Register for access to the Dharma Surveillance Platform</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {errors.general && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {errors.general}
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.phone_number && <p className="text-red-600 text-xs mt-1">{errors.phone_number}</p>}
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900">Account Details</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Username *
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password * (min 8 characters)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    name="password_confirm"
                                    value={formData.password_confirm}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.password_confirm && <p className="text-red-600 text-xs mt-1">{errors.password_confirm}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900">Role Request</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Requested Role *
                            </label>
                            <select
                                name="requested_role_id"
                                value={formData.requested_role_id}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a role...</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name} {role.description && `- ${role.description}`}
                                    </option>
                                ))}
                            </select>
                            {errors.requested_role_id && <p className="text-red-600 text-xs mt-1">{errors.requested_role_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Justification *
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Please explain why you need access to this role..."
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Provide a brief explanation of why you need this role. This will be reviewed by administrators.
                            </p>
                            {errors.reason && <p className="text-red-600 text-xs mt-1">{errors.reason}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin"></i>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <i className="ri-send-plane-line"></i>
                                    Submit Registration
                                </>
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
