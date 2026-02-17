import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserProfile } from '../../context/AuthContext';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<UserProfile>({
        fullName: user?.profile?.fullName || '',
        ageGroup: user?.profile?.ageGroup || '',
        gender: user?.profile?.gender || '',
        village: user?.profile?.village || '',
        district: user?.profile?.district || '',
        state: user?.profile?.state || '',
        waterSource: user?.profile?.waterSource || '',
        language: user?.profile?.language || 'English',
        isProfileComplete: false,
    });

    const ageGroups = ['<18', '18-25', '25-45', '45-60', '60+'];
    const waterSources = ['Piped Water', 'Well', 'Handpump', 'River/Lake', 'Tanker', 'Other'];
    const languages = ['English', 'Hindi', 'Assamese', 'Bengali', 'Manipuri', 'Bodo', 'Nagamese'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-navy p-8 text-white">
                    <h1 className="text-2xl font-bold font-heading">Complete Your Profile</h1>
                    <p className="text-white/60 text-sm mt-1">Please provide these details to access your health dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Age Group */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Age Group *</label>
                            <select
                                required
                                value={formData.ageGroup}
                                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                            >
                                <option value="">Select Age Group</option>
                                {ageGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gender (Optional)</label>
                            <div className="flex space-x-2">
                                {['Male', 'Female', 'Other'].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: g })}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${formData.gender === g ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Details */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Village/Ward *</label>
                            <input
                                type="text"
                                required
                                value={formData.village}
                                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Your village/ward"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">District *</label>
                            <input
                                type="text"
                                required
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Your district"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">State *</label>
                            <input
                                type="text"
                                required
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                placeholder="Your state"
                            />
                        </div>

                        {/* Water Source */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Water Source *</label>
                            <select
                                required
                                value={formData.waterSource}
                                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                            >
                                <option value="">Select Water Source</option>
                                {waterSources.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Preferred Language */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Preferred Language *</label>
                            <select
                                required
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                            >
                                {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 mb-6 flex items-start">
                            <i className="ri-shield-check-fill text-primary mr-2 text-xs"></i>
                            <span>Your personal health and location data is encrypted and used strictly for official public health monitoring and early warning purposes. Profile details help us provide more accurate local alerts.</span>
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            {loading ? 'Saving Profile...' : 'Complete Setup & Access Dashboard'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
