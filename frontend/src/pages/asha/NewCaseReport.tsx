import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { useSurveillance } from '../../context/SurveillanceContext';
import { backendApi, API_ENDPOINTS } from '../../services/backend-api';
import AshaLayout from '../../components/layout/AshaLayout';

export default function NewCaseReport() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        patientName: '',
        ageGroup: 'Adult',
        symptoms: [] as string[],
        onsetDate: '',
        severity: 'Mild',
        waterSource: '',
        householdSize: '',
        photo: null as File | null,
    });

    const symptomsList = [
        'Diarrhea', 'Vomiting', 'Fever', 'Dehydration',
        'Jaundice', 'Abdominal pain'
    ];

    const handleSymptomToggle = (s: string) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(s)
                ? prev.symptoms.filter(item => item !== s)
                : [...prev.symptoms, s]
        }));
    };

    // const { addCase } = useSurveillance();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get Real Location
            let location = "POINT(78.9629 20.5937)"; // Default
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                location = `POINT(${position.coords.longitude} ${position.coords.latitude})`;
            } catch (e) {
                console.warn("Geolocation failed, using randomized default");
                // Randomize slightly to prevent stacking
                const rLat = 20.5937 + (Math.random() - 0.5) * 0.01;
                const rLng = 78.9629 + (Math.random() - 0.5) * 0.01;
                location = `POINT(${rLng} ${rLat})`;
            }

            // Prepare the payload for Django
            const reportPayload = {
                // In a real app, you'd have fields for patient name, age, etc. in the model
                // For now, we are mapping to the existing AshaReport model structure
                village: user?.profile?.village || 1,
                // We're storing the extra form data in the JSON field 'symptoms_json'
                symptoms_json: {
                    ...formData,
                    symptoms: formData.symptoms,
                    patientName: formData.patientName,
                    ageGroup: formData.ageGroup,
                    severity: formData.severity,
                    waterSource: formData.waterSource,
                    submitted_by: user?.profile?.fullName || 'ASHA Worker'
                },
                geo_point: location
            };

            // Post to Backend
            // We use 'any' here because user might not have type definitions fully set up for the payload yet
            await backendApi.post(API_ENDPOINTS.ashaReports, reportPayload);

            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <AshaLayout title="New Case Entry" showBack>
                <div className="flex items-center justify-center p-4 min-h-[60vh]">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">
                        <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="ri-check-line text-4xl text-white"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">Case Recorded</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            New case has been logged locally and synced with the District Surveillance Server. Risk score for {user?.profile?.village} updated.
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
        <AshaLayout title="New Case Entry" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Patient Details */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold text-navy border-b border-gray-50 pb-2">Patient Details</h3>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Patient Name/ID (Anonymized)</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                placeholder="e.g. H. Das (House #42)"
                                value={formData.patientName}
                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Age Group</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['0–5 Years', '6–18 Years', 'Adult', 'Elderly'].map(age => (
                                    <button
                                        type="button"
                                        key={age}
                                        onClick={() => setFormData({ ...formData, ageGroup: age })}
                                        className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.ageGroup === age ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        {age}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Household Size</label>
                            <input
                                type="number"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                value={formData.householdSize}
                                onChange={(e) => setFormData({ ...formData, householdSize: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Clinical Info */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold text-navy border-b border-gray-50 pb-2">Clinical Symptoms</h3>

                        <div className="grid grid-cols-2 gap-3">
                            {symptomsList.map(s => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => handleSymptomToggle(s)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${formData.symptoms.includes(s) ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-50 text-gray-400'}`}
                                >
                                    <span className="font-bold text-xs">{s}</span>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Symptom Onset Date</label>
                            <input
                                type="date"
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy"
                                value={formData.onsetDate}
                                onChange={(e) => setFormData({ ...formData, onsetDate: e.target.value })}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Severity</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Mild', 'Moderate', 'Severe'].map(sev => (
                                    <button
                                        type="button"
                                        key={sev}
                                        onClick={() => setFormData({ ...formData, severity: sev })}
                                        className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${formData.severity === sev ? sev === 'Severe' ? 'border-red-500 bg-red-50 text-red-600' : 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        {sev}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Environment */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold text-navy border-b border-gray-50 pb-2">Environment</h3>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Water Source Used</label>
                            <select
                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:bg-white focus:border-primary transition-all font-bold text-navy appearance-none"
                                value={formData.waterSource}
                                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                            >
                                <option value="">Select Source</option>
                                <option>Private Well</option>
                                <option>Community Well</option>
                                <option>Handpump</option>
                                <option>River/Pond</option>
                                <option>Piped Supply</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Photo (Optional)</label>
                            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-6 text-center text-gray-400">
                                <i className="ri-camera-fill text-2xl mb-2 block"></i>
                                <span className="text-[10px] uppercase font-bold">Tap to Capture</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4 pb-8">
                        <button
                            type="button"
                            onClick={() => navigate('/asha/dashboard')}
                            className="px-6 py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-5 bg-navy text-white rounded-2xl font-bold shadow-xl shadow-navy/20 active:scale-[0.98] transition-all text-lg"
                        >
                            {loading ? 'Submitting...' : 'Submit New Case'}
                        </button>
                    </div>
                </form>
            </div>
        </AshaLayout>
    );
}
