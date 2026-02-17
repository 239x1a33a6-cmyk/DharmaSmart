import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSurveillance } from '../../context/SurveillanceContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function WeeklyReport() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        householdsVisited: '',
        diarrhealCases: '',
        feverCases: '',
        choleraSuspects: '',
        waterComplaints: '',
        deaths: '0',
        comments: '',
    });

    const { addCase } = useSurveillance();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const village = user?.profile?.village || 'Unknown';
        const _timestamp = new Date().toISOString();

        // 1. Process Diarrheal Cases
        const dCount = parseInt(formData.diarrhealCases) || 0;
        for (let i = 0; i < dCount; i++) {
            addCase({ village, symptoms: ['Diarrhea'], diagnosis: 'Acute Diarrhea' });
        }

        // 2. Process Fever Cases
        const fCount = parseInt(formData.feverCases) || 0;
        for (let i = 0; i < fCount; i++) {
            addCase({ village, symptoms: ['Fever'], diagnosis: 'Undiagnosed Fever' });
        }

        // 3. Process Cholera Suspects (High Priority)
        const cCount = parseInt(formData.choleraSuspects) || 0;
        for (let i = 0; i < cCount; i++) {
            addCase({
                village,
                symptoms: ['Diarrhea', 'Vomiting', 'Dehydration'],
                diagnosis: 'Suspected Cholera',
            });
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Weekly Surveillance Report" showBack>
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="ri-send-plane-fill text-4xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Report Submitted</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Your weekly surveillance summary has been forwarded to the Garmur PHC and the District Surveillance Unit.
                        </p>
                        <button
                            onClick={() => navigate('/asha/dashboard')}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            </AshaLayout>
        );
    }

    return (
        <AshaLayout title="Weekly Surveillance Report" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Household Coverage</label>
                            <div className="relative">
                                <i className="ri-home-4-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="number"
                                    required
                                    placeholder="Total visited"
                                    value={formData.householdsVisited}
                                    onChange={(e) => setFormData({ ...formData, householdsVisited: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Diarrheal Cases</label>
                            <div className="relative">
                                <i className="ri-heart-pulse-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="number"
                                    required
                                    placeholder="New cases"
                                    value={formData.diarrhealCases}
                                    onChange={(e) => setFormData({ ...formData, diarrhealCases: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Fever Cases</label>
                            <div className="relative">
                                <i className="ri-temp-hot-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="number"
                                    required
                                    placeholder="New cases"
                                    value={formData.feverCases}
                                    onChange={(e) => setFormData({ ...formData, feverCases: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Cholera Suspects</label>
                            <div className="relative">
                                <i className="ri-skull-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="number"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-red-500"
                                    value={formData.choleraSuspects}
                                    onChange={(e) => setFormData({ ...formData, choleraSuspects: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 py-4 border-y border-gray-50">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Severe Indicators</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-navy">Water Complaints</span>
                                <input
                                    type="number"
                                    value={formData.waterComplaints}
                                    onChange={(e) => setFormData({ ...formData, waterComplaints: e.target.value })}
                                    className="w-16 bg-white border border-gray-100 rounded-lg py-1 px-2 text-center font-bold text-primary"
                                />
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-navy">Deaths (All cause)</span>
                                <input
                                    type="number"
                                    value={formData.deaths}
                                    onChange={(e) => setFormData({ ...formData, deaths: e.target.value })}
                                    className="w-16 bg-white border border-gray-100 rounded-lg py-1 px-2 text-center font-bold text-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Additional Observations</label>
                        <textarea
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all text-sm h-32"
                            placeholder="Enter any field observations regarding sanitation, climate, or migration..."
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all"
                        >
                            {loading ? 'Submitting to District Unit...' : 'Submit Weekly Report'}
                        </button>
                        <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed font-medium">
                            This report will be automatically synced with the PHC Surveillance Dashboard. <br />
                            Ensure all diarrheal deaths are reported within 24 hours via the Escalation portal.
                        </p>
                    </div>
                </form>
            </div>
        </AshaLayout>
    );
}
