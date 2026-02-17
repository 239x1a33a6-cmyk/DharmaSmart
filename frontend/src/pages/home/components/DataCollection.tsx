import { useState, useEffect } from 'react';
import { DataIngestionService } from '../../../services/data-ingestion';
import { LocationData, ReporterInfo } from '../../../types/health-data';

export default function DataCollection() {
  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState<'health' | 'water'>('health');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Health Report State
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(3);
  const [ageGroup, setAgeGroup] = useState<'child' | 'adult' | 'elderly'>('adult');
  const [dateOfSymptoms, setDateOfSymptoms] = useState(new Date().toISOString().split('T')[0]);
  const [timeOfSymptoms, setTimeOfSymptoms] = useState(new Date().toTimeString().split(' ')[0].substring(0, 5));
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Water Report State
  const [sourceType, setSourceType] = useState<'well' | 'handpump' | 'river' | 'tank' | 'piped' | 'other'>('well');
  const [turbidity, setTurbidity] = useState<number | undefined>();
  const [pH, setPH] = useState<number | undefined>();
  const [bacterialContamination, setBacterialContamination] = useState<'none' | 'low' | 'medium' | 'high'>('none');
  const [visualAppearance, setVisualAppearance] = useState('');
  const [odor, setOdor] = useState('');

  // Location State
  const [village, setVillage] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [gpsLocation, setGpsLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Reporter State
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');

  const symptomOptions = [
    { id: 'diarrhea', label: 'Diarrhea', icon: 'ri-pulse-line' },
    { id: 'vomiting', label: 'Vomiting', icon: 'ri-heart-pulse-line' },
    { id: 'fever', label: 'Fever', icon: 'ri-temp-hot-line' },
    { id: 'dehydration', label: 'Dehydration', icon: 'ri-drop-line' },
    { id: 'abdominal', label: 'Abdominal Pain', icon: 'ri-heart-line' },
    { id: 'fatigue', label: 'Fatigue', icon: 'ri-battery-low-line' }
  ];

  useEffect(() => {
    // Update pending sync count
    setPendingSyncCount(DataIngestionService.getPendingSyncCount());
  }, []);

  const toggleSymptom = (symptomId: string) => {
    if (symptoms.includes(symptomId)) {
      setSymptoms(symptoms.filter(s => s !== symptomId));
    } else {
      setSymptoms([...symptoms, symptomId]);
    }
  };

  const getGPSLocation = () => {
    setIsGettingLocation(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          alert('Unable to get GPS location. Please enter location manually.');
        }
      );
    } else {
      setIsGettingLocation(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitMessage('');

    const location: LocationData = {
      village,
      ward,
      district,
      state,
      gps: gpsLocation || undefined,
      geotagged: !!gpsLocation
    };

    const reporter: ReporterInfo = {
      type: 'citizen',
      name: reporterName || undefined,
      phone: reporterPhone || undefined,
      email: reporterEmail || undefined
    };

    try {
      if (reportType === 'health') {
        const result = await DataIngestionService.submitHealthReport({
          reportType: 'health',
          symptoms,
          severity,
          ageGroup,
          dateOfSymptoms,
          timeOfSymptoms,
          additionalNotes: additionalNotes || undefined,
          location,
          reporter
        });

        setSubmitSuccess(result.success);
        setSubmitMessage(result.message);

        if (result.success) {
          // Reset form
          resetForm();
          setStep(5); // Show success step
        }
      } else {
        const result = await DataIngestionService.submitWaterReport({
          reportType: 'water',
          sourceType,
          turbidity,
          pH,
          bacterialContamination,
          visualAppearance: visualAppearance || undefined,
          odor: odor || undefined,
          location,
          reporter
        });

        setSubmitSuccess(result.success);
        setSubmitMessage(result.message);

        if (result.success) {
          resetForm();
          setStep(5);
        }
      }

      // Update pending sync count
      setPendingSyncCount(DataIngestionService.getPendingSyncCount());
    } catch (_error) {
      setSubmitSuccess(false);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSymptoms([]);
    setSeverity(3);
    setAgeGroup('adult');
    setDateOfSymptoms(new Date().toISOString().split('T')[0]);
    setTimeOfSymptoms(new Date().toTimeString().split(' ')[0].substring(0, 5));
    setAdditionalNotes('');
    setSourceType('well');
    setTurbidity(undefined);
    setPH(undefined);
    setBacterialContamination('none');
    setVisualAppearance('');
    setOdor('');
    setVillage('');
    setWard('');
    setDistrict('');
    setState('');
    setGpsLocation(null);
    setReporterName('');
    setReporterPhone('');
    setReporterEmail('');
  };

  const getSeverityEmoji = (level: number) => {
    const emojis = ['😊', '🙂', '😐', '😟', '😰'];
    return emojis[level - 1] || '😐';
  };

  return (
    <section id="data-collection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Data Collection & Reporting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report health symptoms or water quality issues. Your data helps predict and prevent disease outbreaks.
          </p>

          {/* Offline Sync Status */}
          {pendingSyncCount > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <i className="ri-wifi-off-line text-amber-600"></i>
              <span className="text-sm text-amber-800">
                {pendingSyncCount} report{pendingSyncCount > 1 ? 's' : ''} pending sync
              </span>
            </div>
          )}
        </div>

        {/* Report Type Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setReportType('health'); setStep(1); }}
              className={`p-6 rounded-xl border-2 transition-all ${reportType === 'health'
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-teal-300'
                }`}
            >
              <i className={`ri-heart-pulse-line text-4xl mb-3 ${reportType === 'health' ? 'text-teal-600' : 'text-gray-400'
                }`}></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Health Report</h3>
              <p className="text-sm text-gray-600">Report symptoms and health issues</p>
            </button>

            <button
              onClick={() => { setReportType('water'); setStep(1); }}
              className={`p-6 rounded-xl border-2 transition-all ${reportType === 'water'
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-teal-300'
                }`}
            >
              <i className={`ri-drop-line text-4xl mb-3 ${reportType === 'water' ? 'text-teal-600' : 'text-gray-400'
                }`}></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Water Quality</h3>
              <p className="text-sm text-gray-600">Report water contamination</p>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= stepNum ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${step > stepNum ? 'bg-teal-500' : 'bg-gray-200'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-teal-600 font-medium' : 'text-gray-500'}>
              {reportType === 'health' ? 'Symptoms' : 'Water Info'}
            </span>
            <span className={step >= 2 ? 'text-teal-600 font-medium' : 'text-gray-500'}>Location</span>
            <span className={step >= 3 ? 'text-teal-600 font-medium' : 'text-gray-500'}>Details</span>
            <span className={step >= 4 ? 'text-teal-600 font-medium' : 'text-gray-500'}>Confirm</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Step 1: Symptoms/Water Info */}
          {step === 1 && reportType === 'health' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Symptoms</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${symptoms.includes(symptom.id)
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                      }`}
                  >
                    <i className={`${symptom.icon} text-3xl mb-2 ${symptoms.includes(symptom.id) ? 'text-teal-600' : 'text-gray-400'
                      }`}></i>
                    <p className="text-sm font-medium text-gray-900">{symptom.label}</p>
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Severity Level: {getSeverityEmoji(severity)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={severity}
                  onChange={(e) => setSeverity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Age Group</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['child', 'adult', 'elderly'] as const).map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGroup(age)}
                      className={`p-4 rounded-lg border-2 transition-all ${ageGroup === age
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                        }`}
                    >
                      <span className="text-sm font-medium capitalize">{age}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={dateOfSymptoms}
                    onChange={(e) => setDateOfSymptoms(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={timeOfSymptoms}
                    onChange={(e) => setTimeOfSymptoms(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={symptoms.length === 0}
                className="w-full py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Next: Location
              </button>
            </div>
          )}

          {step === 1 && reportType === 'water' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Water Quality Information</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Source Type</label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="well">Well</option>
                  <option value="handpump">Hand Pump</option>
                  <option value="river">River</option>
                  <option value="tank">Tank</option>
                  <option value="piped">Piped Water</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turbidity (NTU) <span className="text-gray-400 text-xs">Optional</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={turbidity || ''}
                    onChange={(e) => setTurbidity(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 2.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    pH Level <span className="text-gray-400 text-xs">Optional</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={pH || ''}
                    onChange={(e) => setPH(e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="e.g., 7.0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bacterial Contamination</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['none', 'low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setBacterialContamination(level)}
                      className={`p-3 rounded-lg border-2 transition-all ${bacterialContamination === level
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                        }`}
                    >
                      <span className="text-sm font-medium capitalize">{level}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visual Appearance <span className="text-gray-400 text-xs">Optional</span>
                </label>
                <input
                  type="text"
                  value={visualAppearance}
                  onChange={(e) => setVisualAppearance(e.target.value)}
                  placeholder="e.g., Cloudy, Clear, Discolored"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Odor <span className="text-gray-400 text-xs">Optional</span>
                </label>
                <input
                  type="text"
                  value={odor}
                  onChange={(e) => setOdor(e.target.value)}
                  placeholder="e.g., None, Chlorine, Foul"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap"
              >
                Next: Location
              </button>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Location Information</h3>

              <div className="mb-6">
                <button
                  onClick={getGPSLocation}
                  disabled={isGettingLocation}
                  className="w-full py-3 bg-teal-50 text-teal-600 rounded-lg font-medium hover:bg-teal-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                >
                  <i className={`${isGettingLocation ? 'ri-loader-4-line animate-spin' : 'ri-map-pin-line'}`}></i>
                  {isGettingLocation ? 'Getting Location...' : 'Use GPS Location'}
                </button>

                {gpsLocation && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <i className="ri-checkbox-circle-line mr-2"></i>
                    GPS location captured (Accuracy: {Math.round(gpsLocation.accuracy)}m)
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Enter village name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="Enter ward number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Enter district"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!district || !state}
                  className="flex-1 py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Next: Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Reporter Information</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-gray-400 text-xs">Optional</span>
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-400 text-xs">Optional</span>
                </label>
                <input
                  type="tel"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-gray-400 text-xs">Optional</span>
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {reportType === 'health' && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes <span className="text-gray-400 text-xs">Optional</span>
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any additional information..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap"
                >
                  Review & Submit
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Report</h3>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Report Type</p>
                  <p className="text-base text-gray-900 capitalize">{reportType} Report</p>
                </div>

                {reportType === 'health' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Symptoms</p>
                      <p className="text-base text-gray-900">{symptoms.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Severity</p>
                      <p className="text-base text-gray-900">{severity}/5 {getSeverityEmoji(severity)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Age Group</p>
                      <p className="text-base text-gray-900 capitalize">{ageGroup}</p>
                    </div>
                  </>
                )}

                {reportType === 'water' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Source Type</p>
                      <p className="text-base text-gray-900 capitalize">{sourceType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Contamination Level</p>
                      <p className="text-base text-gray-900 capitalize">{bacterialContamination}</p>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                  <p className="text-base text-gray-900">
                    {village && `${village}, `}{ward && `Ward ${ward}, `}{district}, {state}
                  </p>
                  {gpsLocation && (
                    <p className="text-sm text-green-600 mt-1">
                      <i className="ri-map-pin-line mr-1"></i>GPS Tagged
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex gap-3">
                  <i className="ri-information-line text-blue-600 text-xl flex-shrink-0"></i>
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">Data Privacy & Usage</p>
                    <p className="text-sm text-blue-800">
                      Your report will be used for disease surveillance and outbreak prevention.
                      Personal information is kept confidential and used only for follow-up if needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:bg-teal-300 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${submitSuccess ? 'bg-green-100' : 'bg-red-100'
                }`}>
                <i className={`text-4xl ${submitSuccess ? 'ri-checkbox-circle-line text-green-600' : 'ri-error-warning-line text-red-600'
                  }`}></i>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {submitSuccess ? 'Report Submitted Successfully!' : 'Submission Failed'}
              </h3>

              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {submitMessage}
              </p>

              {submitSuccess && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                  <p className="text-sm text-teal-800">
                    <i className="ri-shield-check-line mr-2"></i>
                    Your data has been validated and will help predict disease outbreaks in your area.
                  </p>
                </div>
              )}

              <button
                onClick={() => { setStep(1); resetForm(); }}
                className="px-8 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap"
              >
                Submit Another Report
              </button>
            </div>
          )}
        </div>

        {/* Multi-Channel Reporting Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <i className="ri-smartphone-line text-3xl text-teal-600 mb-3"></i>
            <h4 className="font-semibold text-gray-900 mb-2">Web & Mobile</h4>
            <p className="text-sm text-gray-600">Submit reports through our platform</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <i className="ri-message-3-line text-3xl text-teal-600 mb-3"></i>
            <h4 className="font-semibold text-gray-900 mb-2">SMS</h4>
            <p className="text-sm text-gray-600">Send reports via text message</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <i className="ri-phone-line text-3xl text-teal-600 mb-3"></i>
            <h4 className="font-semibold text-gray-900 mb-2">IVR Helpline</h4>
            <p className="text-sm text-gray-600">Call our toll-free number</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <i className="ri-robot-line text-3xl text-teal-600 mb-3"></i>
            <h4 className="font-semibold text-gray-900 mb-2">AI Chatbot</h4>
            <p className="text-sm text-gray-600">Voice and text assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
