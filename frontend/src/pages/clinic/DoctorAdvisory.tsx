
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockClinicalCases, diseasePatternsDB } from '../../mocks/clinical-mock-data';
import { SeverityLevel } from '../../types/clinical-types';

export default function DoctorAdvisory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const clinicalCase = mockClinicalCases.find(c => c.id === id) || mockClinicalCases[0];

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [advisory, setAdvisory] = useState({
        identifiedDisease: '',
        severity: 'yellow' as SeverityLevel,
        summary: '',
        immediateAction: '',
        medicalSteps: [''],
        preventiveMeasures: [''],
        householdGuidelines: [''],
        whenToVisitPhc: '',
        medications: [''],
        durationOfPrecaution: '7 Days',
        followUp: 3,
        phcContact: '1800-XXX-XXXX',
        emergencyHotline: '108 (Ambulance), 104 (Health Help)',
    });

    const handleAddField = (field: 'medicalSteps' | 'preventiveMeasures' | 'householdGuidelines' | 'medications') => {
        setAdvisory({ ...advisory, [field]: [...advisory[field], ''] });
    };

    const handleFieldChange = (field: 'medicalSteps' | 'preventiveMeasures' | 'householdGuidelines' | 'medications', index: number, value: string) => {
        const newList = [...advisory[field]];
        newList[index] = value;
        setAdvisory({ ...advisory, [field]: newList });
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const caseSymptoms = clinicalCase.symptomCluster.map(s => s.symptom);
    const topMatch = diseasePatternsDB.map(d => ({
        ...d,
        matchPct: Math.round((d.symptoms.filter(s => caseSymptoms.includes(s)).length / d.symptoms.length) * 100)
    })).sort((a, b) => b.matchPct - a.matchPct)[0];

    const severityColors: Record<string, { bg: string; text: string; label: string }> = {
        green: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Monitor' },
        yellow: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Preventive Alert' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'High Risk Cluster' },
        red: { bg: 'bg-red-100', text: 'text-red-700', label: 'Urgent Medical Response' },
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i className="ri-checkbox-circle-fill text-5xl text-teal-600"></i>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Advisory Published Successfully</h2>
                    <p className="text-sm text-slate-500 mb-2">
                        <strong>"{advisory.identifiedDisease || 'Health Advisory'}"</strong> for {clinicalCase.village} has been issued.
                    </p>
                    <div className="my-6 p-4 bg-teal-50 rounded-2xl border border-teal-100 text-left space-y-2">
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Case ID</span><span className="font-bold text-slate-800">{clinicalCase.id}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">ASHA Worker</span><span className="font-bold text-slate-800">{clinicalCase.ashaName}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Severity</span><span className={`font-bold ${severityColors[advisory.severity].text}`}>{severityColors[advisory.severity].label}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Follow-up</span><span className="font-bold text-slate-800">{advisory.followUp} days</span></div>
                    </div>
                    <p className="text-xs text-slate-400 mb-6">ASHA worker <strong>{clinicalCase.ashaName}</strong> has been notified and can now broadcast this advisory to the community.</p>
                    <div className="flex gap-3">
                        <button onClick={() => navigate('/clinic/dashboard')} className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all">
                            Back to Dashboard
                        </button>
                        <button onClick={() => navigate('/clinic/advisory-history')} className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                            View History
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors">
                        <i className="ri-arrow-left-line"></i> Back to Dashboard
                    </button>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Community Health Advisory</p>
                        <h1 className="text-xl font-black text-slate-900">Generate Official Report</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar: Case Context */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-8 space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case Reference</h3>
                            {[
                                { k: 'Case ID', v: clinicalCase.id },
                                { k: 'Village', v: clinicalCase.village },
                                { k: 'ASHA', v: clinicalCase.ashaName },
                                { k: 'Patients', v: String(clinicalCase.totalPatients) },
                                { k: 'Duration', v: `${clinicalCase.durationDays} days` },
                                { k: 'Risk Score', v: `${clinicalCase.severityScore}/100` },
                            ].map((r, i) => (
                                <div key={i} className="flex justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                                    <span className="text-slate-500">{r.k}</span>
                                    <span className="font-bold text-slate-800">{r.v}</span>
                                </div>
                            ))}

                            {topMatch && (
                                <div className="bg-teal-50 p-3 rounded-xl border border-teal-100">
                                    <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest mb-1">AI Suggested</p>
                                    <p className="text-sm font-black text-slate-800">{topMatch.disease}</p>
                                    <p className="text-[10px] text-slate-500">{topMatch.matchPct}% symptom match</p>
                                </div>
                            )}

                            {/* Step Progress */}
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Progress</p>
                                {['Clinical Findings', 'Instructions', 'Logistics'].map((s, i) => (
                                    <div key={i} className="flex items-center gap-2 mb-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step > i + 1 ? 'bg-teal-600 text-white' : step === i + 1 ? 'bg-teal-100 text-teal-700 ring-2 ring-teal-300' : 'bg-slate-100 text-slate-400'}`}>
                                            {step > i + 1 ? '✓' : i + 1}
                                        </div>
                                        <span className={`text-xs font-medium ${step === i + 1 ? 'text-slate-800' : 'text-slate-400'}`}>{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Steps */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* STEP 1: Clinical Findings */}
                            {step === 1 && (
                                <div className="p-8 space-y-6 animate-in fade-in duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                                        <h2 className="text-lg font-black text-slate-900">Clinical Findings</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Identified Disease / Suspicion</label>
                                            <input required type="text" placeholder="e.g. Suspected Dengue Outbreak"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                                value={advisory.identifiedDisease}
                                                onChange={e => setAdvisory({ ...advisory, identifiedDisease: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Severity Classification</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {(['green', 'yellow', 'orange', 'red'] as SeverityLevel[]).map(s => (
                                                    <button key={s} type="button" onClick={() => setAdvisory({ ...advisory, severity: s })}
                                                        className={`py-2 rounded-xl text-[10px] font-bold uppercase border-2 transition-all ${advisory.severity === s ? `${severityColors[s].bg} ${severityColors[s].text} border-current` : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>
                                                        {severityColors[s].label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Case Summary / Doctor's Observation</label>
                                        <textarea required rows={3} placeholder="Describe clinical observation..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium resize-none"
                                            value={advisory.summary}
                                            onChange={e => setAdvisory({ ...advisory, summary: e.target.value })} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-red-500 uppercase ml-1">⚠ Immediate Action Required</label>
                                        <textarea required rows={2} placeholder="What should the community do RIGHT NOW?"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-red-200 bg-red-50/50 focus:ring-2 focus:ring-red-400 outline-none font-medium resize-none"
                                            value={advisory.immediateAction}
                                            onChange={e => setAdvisory({ ...advisory, immediateAction: e.target.value })} />
                                    </div>

                                    <button onClick={() => setStep(2)} disabled={!advisory.identifiedDisease || !advisory.summary || !advisory.immediateAction}
                                        className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-200 active:scale-[0.98] transition-all disabled:opacity-40">
                                        Continue → Community Instructions
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: Community Instructions */}
                            {step === 2 && (
                                <div className="p-8 space-y-6 animate-in fade-in duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                                        <h2 className="text-lg font-black text-slate-900">Community Instructions</h2>
                                    </div>

                                    {/* Medical Steps */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
                                            Recommended Medical Steps
                                            <button type="button" onClick={() => handleAddField('medicalSteps')} className="text-teal-600 hover:underline">+ Add</button>
                                        </label>
                                        {advisory.medicalSteps.map((s, idx) => (
                                            <input key={idx} type="text" placeholder={`Step ${idx + 1}...`}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                                value={s} onChange={e => handleFieldChange('medicalSteps', idx, e.target.value)} />
                                        ))}
                                    </div>

                                    {/* Preventive Measures */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
                                            Preventive Measures
                                            <button type="button" onClick={() => handleAddField('preventiveMeasures')} className="text-teal-600 hover:underline">+ Add</button>
                                        </label>
                                        {advisory.preventiveMeasures.map((m, idx) => (
                                            <input key={idx} type="text" placeholder={`Measure ${idx + 1}...`}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                                value={m} onChange={e => handleFieldChange('preventiveMeasures', idx, e.target.value)} />
                                        ))}
                                    </div>

                                    {/* Household Guidelines */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
                                            Household Guidelines
                                            <button type="button" onClick={() => handleAddField('householdGuidelines')} className="text-teal-600 hover:underline">+ Add</button>
                                        </label>
                                        {advisory.householdGuidelines.map((g, idx) => (
                                            <input key={idx} type="text" placeholder={`Guideline ${idx + 1}...`}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                                value={g} onChange={e => handleFieldChange('householdGuidelines', idx, e.target.value)} />
                                        ))}
                                    </div>

                                    {/* Medications */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
                                            Medications (if advisory-allowed)
                                            <button type="button" onClick={() => handleAddField('medications')} className="text-teal-600 hover:underline">+ Add</button>
                                        </label>
                                        {advisory.medications.map((m, idx) => (
                                            <input key={idx} type="text" placeholder={`e.g. Paracetamol 500mg`}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                                value={m} onChange={e => handleFieldChange('medications', idx, e.target.value)} />
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(1)} className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">← Back</button>
                                        <button onClick={() => setStep(3)} className="flex-1 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-200 active:scale-[0.98] transition-all">
                                            Continue → Logistics & Review
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Logistics + Preview + Submit */}
                            {step === 3 && (
                                <div className="p-8 space-y-6 animate-in fade-in duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">3</span>
                                        <h2 className="text-lg font-black text-slate-900">Logistics & Final Review</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">When to Visit PHC</label>
                                            <textarea rows={2} placeholder="e.g. If fever >3 days, bleeding, severe pain..."
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none font-medium resize-none"
                                                value={advisory.whenToVisitPhc}
                                                onChange={e => setAdvisory({ ...advisory, whenToVisitPhc: e.target.value })} />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Duration of Precaution</label>
                                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold"
                                                    value={advisory.durationOfPrecaution}
                                                    onChange={e => setAdvisory({ ...advisory, durationOfPrecaution: e.target.value })}>
                                                    <option>3 Days</option><option>5 Days</option><option>7 Days</option><option>14 Days</option><option>21 Days</option><option>Until Further Notice</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Follow-up Re-evaluation (Days)</label>
                                                <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 font-black text-center"
                                                    value={advisory.followUp}
                                                    onChange={e => setAdvisory({ ...advisory, followUp: parseInt(e.target.value) || 3 })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">PHC Contact Number</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono"
                                                value={advisory.phcContact}
                                                onChange={e => setAdvisory({ ...advisory, phcContact: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Emergency Helplines (auto-attached)</label>
                                            <input type="text" readOnly className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono bg-slate-50 text-slate-500"
                                                value={advisory.emergencyHotline} />
                                        </div>
                                    </div>

                                    {/* Official Preview */}
                                    <div className="mt-4">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Official Format Preview</h3>
                                        <div className="border-2 border-slate-900 rounded-2xl overflow-hidden shadow-xl">
                                            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <i className="ri-government-fill text-lg"></i>
                                                    <div>
                                                        <h4 className="text-sm font-bold uppercase tracking-wider">Community Health Advisory</h4>
                                                        <p className="text-[10px] opacity-60">Govt. of India • NHM Initiative</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${severityColors[advisory.severity].bg} ${severityColors[advisory.severity].text}`}>
                                                    {severityColors[advisory.severity].label}
                                                </span>
                                            </div>
                                            <div className="p-5 space-y-4 text-sm">
                                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><i className="ri-stethoscope-line text-slate-400"></i></div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-800">Issued By: Dr. Ramesh Kumar</p>
                                                        <p className="text-[10px] text-slate-500">PHC Majuli Block • {new Date().toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <h4 className="text-lg font-black text-red-700">{advisory.identifiedDisease || '—'}</h4>
                                                <p className="text-slate-600">{advisory.summary || '—'}</p>
                                                {advisory.immediateAction && (
                                                    <div className="bg-red-50 p-3 rounded-xl border-l-4 border-red-500">
                                                        <p className="text-[10px] font-bold text-red-500 uppercase mb-1">⚠ Immediate Action</p>
                                                        <p className="font-bold text-slate-800">{advisory.immediateAction}</p>
                                                    </div>
                                                )}
                                                {advisory.medicalSteps.filter(Boolean).length > 0 && (
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Medical Steps</p>
                                                        <ul className="list-disc ml-4 text-slate-700 space-y-0.5">{advisory.medicalSteps.filter(Boolean).map((s, i) => <li key={i}>{s}</li>)}</ul>
                                                    </div>
                                                )}
                                                {advisory.preventiveMeasures.filter(Boolean).length > 0 && (
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Preventive Measures</p>
                                                        <ul className="list-disc ml-4 text-slate-700 space-y-0.5">{advisory.preventiveMeasures.filter(Boolean).map((m, i) => <li key={i}>{m}</li>)}</ul>
                                                    </div>
                                                )}
                                                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                                                    {advisory.emergencyHotline.split(',').map((n, i) => (
                                                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{n.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                                                <p className="text-[10px] text-slate-400">Official Health Communication • Verified via Dharma Platform</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                                        <i className="ri-error-warning-line text-amber-600 mt-0.5"></i>
                                        <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                                            This advisory will be sent to ASHA worker <strong>{clinicalCase.ashaName}</strong> for community broadcast.
                                            All actions are logged and traceable. Advisory ID will be linked to Case {clinicalCase.id}.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(2)} className="px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">← Back</button>
                                        <button onClick={handleSubmit}
                                            className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                                            <i className="ri-send-plane-fill"></i>
                                            Publish Official Advisory
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
