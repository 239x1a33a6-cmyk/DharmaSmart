import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function WaterReportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    sourceType: user?.profile?.waterSource || '',
    turbidity: 'Clear',
    unusualOdor: 'No',
    colorChange: 'No',
    dateObserved: new Date().toISOString().split('T')[0],
    location: `${user?.profile?.village}, ${user?.profile?.district}`,
    description: '',
  });

  const waterSources = ['Piped Water', 'Well', 'Handpump', 'River/Lake', 'Tanker', 'Other'];
  const turbidityLevels = ['Clear', 'Slightly Cloudy', 'Cloudy', 'Muddy/Very Dirty'];

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
          <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-200">
            <i className="ri-check-line text-4xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-4">Water Issue Reported!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Your report has been logged and health officials have been notified. Monitoring water quality helps prevent community outbreaks.
          </p>
          <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 mb-8">
            <div className="flex items-start space-x-3 text-left">
              <i className="ri-information-line text-teal-600 mt-0.5"></i>
              <p className="text-[10px] text-teal-700 font-semibold leading-relaxed">
                Experts will investigate the water source. Please follow any local advisories regarding water consumption in the meantime.
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
        <h1 className="text-navy font-bold text-lg">Report Water Issue</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 p-8 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Water Source Details</h2>
            <p className="text-gray-500 text-xs">Help us identify which source is affected</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Source Type *</label>
              <select
                required
                value={formData.sourceType}
                onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all appearance-none"
              >
                {waterSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date Observed *</label>
              <input
                type="date"
                required
                value={formData.dateObserved}
                onChange={(e) => setFormData({ ...formData, dateObserved: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Turbidity Level *</label>
              <div className="grid grid-cols-2 gap-2">
                {turbidityLevels.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, turbidity: t })}
                    className={`py-3 px-4 rounded-xl border-2 text-xs font-bold transition-all ${formData.turbidity === t ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Unusual Odor? *</label>
                <div className="flex bg-gray-50 p-1 rounded-xl">
                  {['Yes', 'No'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFormData({ ...formData, unusualOdor: v })}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.unusualOdor === v ? 'bg-white text-navy shadow-sm' : 'text-gray-400'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Color Change? *</label>
                <div className="flex bg-gray-50 p-1 rounded-xl">
                  {['Yes', 'No'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFormData({ ...formData, colorChange: v })}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.colorChange === v ? 'bg-white text-navy shadow-sm' : 'text-gray-400'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Upload Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer group">
              <i className="ri-image-add-line text-4xl text-gray-300 group-hover:text-primary mb-2 block"></i>
              <span className="text-xs font-bold text-gray-400 group-hover:text-navy">Click to capture or upload photo</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Additional Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary transition-all resize-none h-24 text-sm"
              placeholder="Describe any other issues like floating particles, broken pipes, etc."
            ></textarea>
          </div>

          <div className="pt-6 border-t border-gray-50">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-dark shadow-lg shadow-navy/20 transition-all active:scale-[0.98]"
            >
              {loading ? 'Submitting Report...' : 'Submit Water Quality Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
