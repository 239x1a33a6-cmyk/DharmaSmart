import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ReportSymptomsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    affectedWho: '',
    symptoms: [] as string[],
    otherSymptom: '',
    duration: '',
    severity: 'Moderate',
    waterSource: user?.profile?.waterSource || '',
    openDrainage: '',
    heavyRainfall: '',
    recentTravel: '',
    location: `${user?.profile?.village}, ${user?.profile?.district}, ${user?.profile?.state}`,
  });

  const symptomsList = [
    { id: 'Diarrhea', icon: 'ri-drop-line' },
    { id: 'Vomiting', icon: 'ri-flask-line' },
    { id: 'Fever', icon: 'ri-temp-hot-line' },
    { id: 'Dehydration', icon: 'ri-water-flash-line' },
    { id: 'Abdominal pain', icon: 'ri-heart-pulse-line' },
    { id: 'Skin infection', icon: 'ri-shield-cross-line' },
  ];

  const handleSymptomToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(id)
        ? prev.symptoms.filter(s => s !== id)
        : [...prev.symptoms, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate backend submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <i className="ri-check-line text-4xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-4">Report Submitted!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Your report has been securely forwarded to local health authorities. Thank you for helping keep your community safe.
          </p>
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-8">
            <div className="flex items-start space-x-3 text-left">
              <i className="ri-information-line text-primary mt-0.5"></i>
              <p className="text-[10px] text-primary/80 font-semibold leading-relaxed">
                An ASHA worker or health official may contact you for further verification if needed. Please monitor for any new alerts.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/community/dashboard')}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark transition-all shadow-lg active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-6 px-8 flex justify-between items-center">
        <button onClick={() => navigate('/community/dashboard')} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <i className="ri-arrow-left-line text-navy text-xl"></i>
        </button>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of 6</span>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 p-8 max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full mb-12 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy">Who is affected?</h2>
              <p className="text-gray-500 text-sm">Select the person experiencing symptoms</p>
              <div className="grid grid-cols-1 gap-3">
                {['Self', 'Family Member', 'Neighbor'].map(person => (
                  <button
                    key={person}
                    onClick={() => { setFormData({ ...formData, affectedWho: person }); setStep(2); }}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.affectedWho === person ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                  >
                    <span>{person}</span>
                    <i className={`ri-checkbox-circle-${formData.affectedWho === person ? 'fill' : 'line'} text-xl`}></i>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy">Select Symptoms</h2>
              <p className="text-gray-500 text-sm">Choose all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {symptomsList.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSymptomToggle(s.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col space-y-2 ${formData.symptoms.includes(s.id) ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                  >
                    <i className={`${s.icon} text-2xl`}></i>
                    <span className="font-bold text-xs">{s.id}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Other (if any)</label>
                <input
                  type="text"
                  value={formData.otherSymptom}
                  onChange={(e) => setFormData({ ...formData, otherSymptom: e.target.value })}
                  placeholder="Describe briefly"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all"
                />
              </div>
              <button
                disabled={formData.symptoms.length === 0 && !formData.otherSymptom}
                onClick={() => setStep(3)}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-6 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy">How long has it been?</h2>
              <p className="text-gray-500 text-sm">Select the duration of symptoms</p>
              <div className="grid grid-cols-1 gap-3">
                {['<24 hours', '1–3 days', '>3 days'].map(d => (
                  <button
                    key={d}
                    onClick={() => { setFormData({ ...formData, duration: d }); setStep(4); }}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.duration === d ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                  >
                    <span>{d}</span>
                    <i className={`ri-checkbox-circle-${formData.duration === d ? 'fill' : 'line'} text-xl`}></i>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full text-center text-xs font-bold text-gray-400 mt-4 underline">Back</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy">Severity Level</h2>
              <p className="text-gray-500 text-sm">How would you describe the feeling?</p>
              <div className="grid grid-cols-1 gap-3">
                {['Mild', 'Moderate', 'Severe'].map(s => (
                  <button
                    key={s}
                    onClick={() => { setFormData({ ...formData, severity: s }); setStep(5); }}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${formData.severity === s ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                  >
                    <span>{s}</span>
                    <i className={`ri-checkbox-circle-${formData.severity === s ? 'fill' : 'line'} text-xl`}></i>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="w-full text-center text-xs font-bold text-gray-400 mt-4 underline">Back</button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-navy">Environmental Factors</h2>
              <p className="text-gray-500 text-sm">Please answer these brief questions</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-navy mb-3">Open drainage nearby?</label>
                  <div className="flex space-x-2">
                    {['Yes', 'No'].map(v => (
                      <button key={v} onClick={() => setFormData({ ...formData, openDrainage: v })} className={`flex-1 py-3 rounded-xl border-2 font-bold ${formData.openDrainage === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-3">Recent heavy rainfall?</label>
                  <div className="flex space-x-2">
                    {['Yes', 'No'].map(v => (
                      <button key={v} onClick={() => setFormData({ ...formData, heavyRainfall: v })} className={`flex-1 py-3 rounded-xl border-2 font-bold ${formData.heavyRainfall === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-3">Recent travel (last 14 days)?</label>
                  <div className="flex space-x-2">
                    {['Yes', 'No'].map(v => (
                      <button key={v} onClick={() => setFormData({ ...formData, recentTravel: v })} className={`flex-1 py-3 rounded-xl border-2 font-bold ${formData.recentTravel === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                disabled={!formData.openDrainage || !formData.heavyRainfall || !formData.recentTravel}
                onClick={() => setStep(6)}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy">Review & Location</h2>
              <p className="text-gray-500 text-sm">Confirm details before submission</p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Incident Location</span>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-transparent font-bold text-navy outline-none"
                  />
                </div>

                <div className="p-4 border border-gray-100 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Affected</span>
                    <span className="font-bold text-navy">{formData.affectedWho}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Symptoms</span>
                    <span className="font-bold text-navy">{formData.symptoms.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Severity</span>
                    <span className="font-bold text-navy">{formData.severity}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-[10px] text-orange-700 font-semibold italic text-center leading-relaxed">
                  "I confirm the information provided is accurate and I am aware that authorities may follow up for public health verification."
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                {loading ? 'Submitting...' : 'Submit Official Report'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
