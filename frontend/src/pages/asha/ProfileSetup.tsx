import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserProfile } from '../../context/AuthContext';

export default function AshaProfileSetup() {
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
        waterSource: user?.profile?.waterSource || 'Well',
        language: user?.profile?.language || 'English',
        ashaId: user?.profile?.ashaId || '',
        subCenter: user?.profile?.subCenter || '',
        phc: user?.profile?.phc || '',
        block: user?.profile?.block || '',
        yearsOfExperience: user?.profile?.yearsOfExperience || '',
        isProfileComplete: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await updateProfile(formData);
        navigate('/asha/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-navy p-8 text-white relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-2xl font-bold">ASHA Profile Verification</h1>
                        <p className="text-white/60 text-sm mt-1">Official Registration & Area Mapping</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Identity Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Identity & Experience</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">ASHA ID</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.ashaId}
                                    onChange={(e) => setFormData({ ...formData, ashaId: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                                    placeholder="e.g. ASHA-MJL-001"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Years of Experience</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.yearsOfExperience}
                                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Preferred Language</label>
                                <select
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm appearance-none"
                                >
                                    <option>Assamese</option>
                                    <option>Bengali</option>
                                    <option>Hindi</option>
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Area Mapping Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Geographic Assignment</h3>
                        <p className="text-[10px] text-orange-600 font-bold bg-orange-50 p-2 rounded-lg inline-block">
                            <i className="ri-error-warning-line mr-1"></i> Dashboard will be locked to the assigned village.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Assigned Village/Ward</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.village}
                                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">PHC name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.phc}
                                    onChange={(e) => setFormData({ ...formData, phc: e.target.value })}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Sub-Center</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subCenter}
                                    onChange={(e) => setFormData({ ...formData, subCenter: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-[10px]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">Block</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.block}
                                    onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-[10px]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-navy mb-2">District</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all text-[10px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
                            <div className="flex items-start space-x-3">
                                <i className="ri-information-line text-primary mt-0.5"></i>
                                <p className="text-[10px] text-primary font-semibold leading-relaxed">
                                    By submitting, you confirm that you are currenty deployed as an ASHA worker in the assigned area. Misrepresentation of identity is a punishable offense under government surveillance protocols.
                                </p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all"
                        >
                            {loading ? 'Verifying...' : 'Complete Verification'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
