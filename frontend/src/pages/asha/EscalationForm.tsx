import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function EscalationForm() {
    const navigate = useNavigate();
    const { user: _user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        reason: '',
        affectedHouseholds: '',
        severity: 'High',
        urgency: 'Critical',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to escalate this case? This will trigger an immediate alert to the District Surveillance Unit.')) {
            return;
        }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Emergency Escalation" showBack backPath="/asha/dashboard">
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn border-t-4 border-red-500">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="ri-alarm-warning-fill text-4xl text-red-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-2">Escalation Triggered</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Case has been locked and transferred to Dr. R. Singh (DHO, Jorhat). ASHA intervention is now paused pending authority instructions.
                        </p>
                        <button
                            onClick={() => navigate('/asha/dashboard')}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </AshaLayout>
        );
    }

    return (
        <AshaLayout title="Emergency Escalation" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-red-100 p-8 shadow-lg space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start space-x-3">
                        <i className="ri-information-line text-red-600 mt-0.5"></i>
                        <p className="text-xs text-red-800 font-medium">
                            Escalation locks the case from further editing. Use only for suspected outbreaks, severe deterioration, or when resources are overwhelmed.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Primary Reason</label>
                        <select
                            required
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-red-500 transition-all font-bold text-navy appearance-none"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        >
                            <option value="">Select Reason</option>
                            <option value="Rapid Case Increase">Rapid Increase in Similar Cases</option>
                            <option value="Severe Dehydration">Severe Dehydration / Shock</option>
                            <option value="Death">Suspected Disease-Related Death</option>
                            <option value="Water Contamination">Mass Water Contamination</option>
                            <option value="Treatment Failure">Non-response to First-line Treatment</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Affected Households</label>
                            <input
                                type="number"
                                required
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-red-500 transition-all font-bold text-navy"
                                value={formData.affectedHouseholds}
                                onChange={(e) => setFormData({ ...formData, affectedHouseholds: e.target.value })}
                                placeholder="Total count"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Urgency Level</label>
                            <select
                                className="w-full p-4 bg-red-50 rounded-2xl border border-red-100 outline-none focus:ring-2 focus:ring-red-200 transition-all font-bold text-red-700 appearance-none"
                                value={formData.urgency}
                                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                            >
                                <option>Normal</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Clinical Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-red-500 transition-all text-sm h-32"
                            placeholder="Describe symptoms, duration, and immediate actions taken..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        {loading ? (
                            <span>Transmitting Alert...</span>
                        ) : (
                            <>
                                <i className="ri-alarm-warning-fill mr-2"></i>
                                Confirm Critical Escalation
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AshaLayout>
    );
}
