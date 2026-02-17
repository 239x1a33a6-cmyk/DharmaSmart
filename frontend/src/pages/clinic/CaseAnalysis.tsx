
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClinicalCases, mockMedicalAdvisories } from '../../mocks/clinical-mock-data';

export default function CaseAnalysis() {
    const navigate = useNavigate();
    const [selectedCaseId, setSelectedCaseId] = useState(mockClinicalCases[0]?.id);
    const selectedCase = mockClinicalCases.find(c => c.id === selectedCaseId) || mockClinicalCases[0];

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/clinic/dashboard')} className="text-sm text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1">
                        <i className="ri-arrow-left-line"></i> Dashboard
                    </button>
                    <h1 className="text-xl font-black text-slate-900">Deep Case Analysis</h1>
                </div>

                {/* Case Selector */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {mockClinicalCases.map(c => (
                        <button key={c.id} onClick={() => setSelectedCaseId(c.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${selectedCaseId === c.id ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-200' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'}`}>
                            {c.village} ({c.id})
                        </button>
                    ))}
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Overview */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Patient & Cluster Overview</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-4 rounded-xl text-center">
                                <p className="text-3xl font-black text-slate-900">{selectedCase.totalPatients}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Reported</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-center">
                                <p className="text-3xl font-black text-slate-900">{selectedCase.durationDays}d</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-center">
                                <p className={`text-3xl font-black ${selectedCase.severityScore > 70 ? 'text-red-600' : selectedCase.severityScore > 40 ? 'text-amber-600' : 'text-green-600'}`}>{selectedCase.severityScore}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Risk Score</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-center">
                                <p className={`text-3xl font-black ${(selectedCase.outbreakProbability || 0) > 60 ? 'text-red-600' : 'text-amber-600'}`}>{selectedCase.outbreakProbability || 0}%</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Outbreak Prob.</p>
                            </div>
                        </div>
                    </div>

                    {/* Symptom Breakdown */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Symptom Breakdown</h3>
                        <div className="space-y-3">
                            {selectedCase.symptomCluster.map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${s.severity === 'high' ? 'bg-red-500' : s.severity === 'moderate' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                                    <span className="text-sm font-medium text-slate-700 flex-1">{s.symptom}</span>
                                    <span className="text-xs font-bold text-slate-500">{s.count} cases</span>
                                    <span className="text-xs font-black text-teal-600 w-12 text-right">{s.percentage}%</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.trend7d === 'rising' ? 'bg-red-100 text-red-600' : s.trend7d === 'declining' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                        {s.trend7d === 'rising' ? '↑' : s.trend7d === 'declining' ? '↓' : '—'} {s.trend7d}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Environment */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Environmental Correlation</h3>
                        {selectedCase.environmentalFactors ? (
                            <div className="space-y-3">
                                {[
                                    { label: 'Rainfall Level', value: selectedCase.environmentalFactors.rainfall, icon: 'ri-rainy-line' },
                                    { label: 'Season', value: selectedCase.environmentalFactors.season, icon: 'ri-sun-line' },
                                    { label: 'Water Source', value: selectedCase.environmentalFactors.waterSource, icon: 'ri-water-flash-line' },
                                ].map((row, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                                        <i className={`${row.icon} text-slate-400`}></i>
                                        <span className="text-xs text-slate-500 flex-1">{row.label}</span>
                                        <span className="text-xs font-bold text-slate-800">{row.value}</span>
                                    </div>
                                ))}
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-500">Sanitation Score</span>
                                        <span className="font-bold">{selectedCase.environmentalFactors.sanitationScore}/100</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${selectedCase.environmentalFactors.sanitationScore > 60 ? 'bg-green-400' : selectedCase.environmentalFactors.sanitationScore > 30 ? 'bg-amber-400' : 'bg-red-400'}`}
                                            style={{ width: `${selectedCase.environmentalFactors.sanitationScore}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ) : <p className="text-xs text-slate-400 italic">No environmental data available</p>}
                    </div>

                    {/* Doctor Action Panel */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Doctor Actions</h3>
                            <div className="space-y-3">
                                <button onClick={() => navigate(`/clinic/advisory/${selectedCase.id}`)}
                                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-200">
                                    <i className="ri-file-text-line"></i> Generate Advisory Report
                                </button>
                                <button className="w-full py-3 bg-orange-50 text-orange-700 font-bold rounded-xl text-sm border border-orange-200 hover:bg-orange-100 transition-all flex items-center justify-center gap-2">
                                    <i className="ri-alert-line"></i> Mark as Probable Outbreak
                                </button>
                                <button className="w-full py-3 bg-red-50 text-red-700 font-bold rounded-xl text-sm border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                                    <i className="ri-upload-2-line"></i> Escalate to District
                                </button>
                                <button className="w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm border border-blue-200 hover:bg-blue-100 transition-all flex items-center justify-center gap-2">
                                    <i className="ri-search-eye-line"></i> Request Further Investigation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
