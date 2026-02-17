import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function FieldVerification() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        householdVisit: '',
        observedSymptoms: [] as string[],
        waterCondition: '',
        photos: [] as string[],
        actionTaken: [] as string[],
        recommendation: 'Monitor',
        notes: '',
    });

    const symptomsList = ['Diarrhea', 'Vomiting', 'Fever', 'Dehydration', 'Abdominal pain', 'Skin infection'];
    const actionsList = ['ORS distributed', 'Referred to PHC', 'Awareness provided', 'Water source reported'];

    const handleSymptomToggle = (s: string) => {
        setFormData(prev => ({
            ...prev,
            observedSymptoms: prev.observedSymptoms.includes(s)
                ? prev.observedSymptoms.filter(item => item !== s)
                : [...prev.observedSymptoms, s]
        }));
    };

    const handleActionToggle = (a: string) => {
        setFormData(prev => ({
            ...prev,
            actionTaken: prev.actionTaken.includes(a)
                ? prev.actionTaken.filter(item => item !== a)
                : [...prev.actionTaken, a]
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate backend submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <AshaLayout title="Field Verification" showBack backPath="/asha/verify-reports">
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="ri-check-line text-4xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Verification Submitted!</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Field report for case #{id} has been recorded. The system risk score for {user?.profile?.village} is being recalculated.
                        </p>
                        <button
                            onClick={() => navigate('/asha/dashboard')}
                            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </AshaLayout>
        );
    }

    return (
        <AshaLayout title={`Field Verification: Step ${step} of 6`} showBack backPath="/asha/verify-reports">
            <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
                <div className="h-1.5 w-full bg-gray-200 rounded-full mb-12 overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(step / 6) * 100}%` }}
                    ></div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Household Visit</h2>
                            <p className="text-gray-500 text-sm">Did you complete a physical visit to the reporter's house?</p>
                            <div className="grid grid-cols-1 gap-3">
                                {['Yes', 'No'].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => { setFormData({ ...formData, householdVisit: v }); setStep(2); }}
                                        className={`p-5 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.householdVisit === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span>{v === 'Yes' ? 'Yes, visit completed' : 'No, call/proxy verification'}</span>
                                        <i className={`ri-checkbox-circle-${formData.householdVisit === v ? 'fill' : 'line'} text-xl`}></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Observed Symptoms</h2>
                            <p className="text-gray-500 text-sm">What symptoms did you observe during the visit?</p>
                            <div className="grid grid-cols-2 gap-3">
                                {symptomsList.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleSymptomToggle(s)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.observedSymptoms.includes(s) ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span className="font-bold text-xs">{s}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setStep(3)} className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-6">Continue</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Water Source Check</h2>
                            <p className="text-gray-500 text-sm">Condition of primary water source used by household</p>
                            <div className="grid grid-cols-1 gap-3">
                                {['Normal', 'Turbid / Muddy', 'Odor Detected', 'Visible Contamination', 'Recent Pipe Damage'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setFormData({ ...formData, waterCondition: c }); setStep(4); }}
                                        className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.waterCondition === c ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span>{c}</span>
                                        <i className={`ri-checkbox-circle-${formData.waterCondition === c ? 'fill' : 'line'} text-xl`}></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Photo Upload</h2>
                            <p className="text-gray-500 text-sm">Capture evidence of symptoms or environment (optional)</p>
                            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-primary/50 transition-all cursor-pointer bg-gray-50 group">
                                <i className="ri-camera-lens-line text-4xl text-gray-300 group-hover:text-primary mb-2 block"></i>
                                <span className="text-xs font-bold text-gray-400">Click to capture or upload photos</span>
                            </div>
                            <button onClick={() => setStep(5)} className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-6">Skip / Continue</button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Actions Taken</h2>
                            <p className="text-gray-500 text-sm">Immediate intervention provided in field</p>
                            <div className="grid grid-cols-1 gap-3">
                                {actionsList.map(a => (
                                    <button
                                        key={a}
                                        onClick={() => handleActionToggle(a)}
                                        className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.actionTaken.includes(a) ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span>{a}</span>
                                        <i className={`ri-checkbox-circle-${formData.actionTaken.includes(a) ? 'fill' : 'line'} text-xl`}></i>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setStep(6)} className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-6">Continue</button>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy">Final Recommendation</h2>
                            <p className="text-gray-500 text-sm">Specify the severity level and next steps</p>
                            <div className="grid grid-cols-1 gap-3">
                                {['Monitor Locally', 'Escalate to PHC', 'Revisit in 24h', 'Resolved / False Report'].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setFormData({ ...formData, recommendation: r })}
                                        className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.recommendation === r ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span>{r}</span>
                                        <i className={`ri-checkbox-circle-${formData.recommendation === r ? 'fill' : 'line'} text-xl`}></i>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary border border-gray-100 transition-all resize-none text-sm h-24"
                                    placeholder="Additional observations..."
                                ></textarea>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button onClick={() => setStep(5)} className="px-6 py-4 bg-gray-50 text-gray-400 rounded-xl font-bold text-xs uppercase transition-all">Back</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                                >
                                    {loading ? 'Submitting...' : 'Submit Field Report'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AshaLayout>
    );
}
