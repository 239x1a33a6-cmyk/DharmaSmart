import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function VisitLog() {
    const navigate = useNavigate();
    const { user: _user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        householdId: '',
        pregnantWoman: 'No',
        childrenUnder5: 'No',
        diarrhealCase: 'No',
        safeWaterStorage: 'Yes',
        toiletAvailability: 'Yes',
        hygieneAwareness: 'Yes',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Visit Log" showBack>
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="ri-user-follow-line text-4xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Visit Logged</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Routine visit for Household {formData.householdId} tracked successfully.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => { setSuccess(false); setFormData({ ...formData, householdId: '' }); }}
                                className="flex-1 py-4 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition-all"
                            >
                                Log Another
                            </button>
                            <button
                                onClick={() => navigate('/asha/dashboard')}
                                className="flex-1 py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all"
                            >
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </AshaLayout>
        );
    }

    return (
        <AshaLayout title="Household Visit Log" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Household ID / Head of Family</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. #42 or Ram Kumar"
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-teal-500 transition-all font-bold text-navy"
                            value={formData.householdId}
                            onChange={(e) => setFormData({ ...formData, householdId: e.target.value })}
                        />
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                        {[
                            { label: 'Pregnant Woman Present?', key: 'pregnantWoman' },
                            { label: 'Children Under 5?', key: 'childrenUnder5' },
                            { label: 'Any Active Diarrhea/Fever Case?', key: 'diarrhealCase' },
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                                <span className="text-sm font-bold text-navy">{item.label}</span>
                                <div className="flex space-x-2">
                                    {['Yes', 'No'].map(opt => (
                                        <button
                                            type="button"
                                            key={opt}
                                            onClick={() => setFormData({ ...formData, [item.key]: opt })}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData[item.key as keyof typeof formData] === opt
                                                ? 'bg-teal-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Hygiene & Safety Checks</h3>
                        {[
                            { label: 'Safe Water Storage?', key: 'safeWaterStorage' },
                            { label: 'Toilet Available & Used?', key: 'toiletAvailability' },
                            { label: 'Hygiene Awareness Given?', key: 'hygieneAwareness' },
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                                <span className="text-sm font-bold text-navy">{item.label}</span>
                                <div className="flex space-x-2">
                                    {['Yes', 'No'].map(opt => (
                                        <button
                                            type="button"
                                            key={opt}
                                            onClick={() => setFormData({ ...formData, [item.key]: opt })}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData[item.key as keyof typeof formData] === opt
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-navy text-white rounded-2xl font-bold shadow-xl shadow-navy/20 active:scale-[0.98] transition-all text-lg"
                    >
                        {loading ? 'Saving Log...' : 'Save Visit Log'}
                    </button>
                </form>
            </div>
        </AshaLayout>
    );
}
