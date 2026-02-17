import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSurveillance } from '../../context/SurveillanceContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function WaterLog() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        sourceId: '',
        turbidity: 'Normal',
        pH: '7.0',
        marksUnsafe: false,
        notes: '',
    });

    const { logWaterQuality } = useSurveillance();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        logWaterQuality({
            sourceId: formData.sourceId,
            status: formData.marksUnsafe ? 'Contaminated' : 'Safe',
            village: user?.profile?.village || 'Unknown'
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Water Quality Monitor Log" showBack backPath="/asha/dashboard">
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className={`w-20 h-20 ${formData.marksUnsafe ? 'bg-orange-500' : 'bg-green-500'} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                            <i className={`ri-${formData.marksUnsafe ? 'error-warning' : 'check'}-line text-4xl text-white`}></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Log {formData.marksUnsafe ? 'Action Generated' : 'Success'}</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            {formData.marksUnsafe
                                ? `Water source ${formData.sourceId} marked as UNSAFE. A provisional yellow alert has been triggered for ${user?.profile?.village}.`
                                : `Condition for water source ${formData.sourceId} has been logged in the surveillance database.`}
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
        <AshaLayout title="Water Quality Monitor Log" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Source Identification</label>
                        <select
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy appearance-none"
                            value={formData.sourceId}
                            onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                        >
                            <option value="">Select Water Source</option>
                            <option value="Well-01">Community Well #1 (North)</option>
                            <option value="Well-02">Community Well #2 (East)</option>
                            <option value="Well-03">Community Well #3 (Ward 4)</option>
                            <option value="Piped-01">Primary Supply Pipe (Main Rd)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Turbidity</label>
                            <select
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                value={formData.turbidity}
                                onChange={(e) => setFormData({ ...formData, turbidity: e.target.value })}
                            >
                                <option>Normal</option>
                                <option>Slightly Turbid</option>
                                <option>Highly Turbid / Muddy</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">pH Level</label>
                            <input
                                type="number"
                                step="0.1"
                                max="14"
                                min="0"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                value={formData.pH}
                                onChange={(e) => setFormData({ ...formData, pH: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.marksUnsafe ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'}`}>
                                <i className="ri-error-warning-line text-2xl"></i>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-navy">Mark as UNSAFE source</h4>
                                <p className="text-[10px] text-orange-700/60 font-medium">Will trigger immediate advisory to community.</p>
                            </div>
                        </div>
                        <div
                            onClick={() => setFormData({ ...formData, marksUnsafe: !formData.marksUnsafe })}
                            className={`w-14 h-8 rounded-full relative cursor-pointer transition-all ${formData.marksUnsafe ? 'bg-orange-500' : 'bg-gray-200'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${formData.marksUnsafe ? 'left-7' : 'left-1'}`}></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Manual Test Kit Image</label>
                        <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer bg-gray-50">
                            <i className="ri-image-add-line text-2xl text-gray-300 mb-1 block"></i>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Attach FTK Result Photo</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/20 active:scale-[0.98] transition-all"
                    >
                        {loading ? 'Logging data...' : 'Submit Water Log'}
                    </button>
                </form>
            </div>
        </AshaLayout>
    );
}
