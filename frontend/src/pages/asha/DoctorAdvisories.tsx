
import React, { useState } from 'react';
import { mockMedicalAdvisories, mockClinicalCases } from '../../mocks/clinical-mock-data';

export default function DoctorAdvisories() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [broadcastSent, setBroadcastSent] = useState<Set<string>>(new Set());

    const advisories = mockMedicalAdvisories.filter(a => a.sentToAsha);
    const selected = advisories.find(a => a.id === selectedId);
    const linkedCase = selected ? mockClinicalCases.find(c => c.id === selected.caseId) : null;

    const severityStyle = (s: string) => {
        switch (s) {
            case 'red': return 'bg-red-100 text-red-700';
            case 'orange': return 'bg-orange-100 text-orange-700';
            case 'yellow': return 'bg-amber-100 text-amber-700';
            default: return 'bg-emerald-100 text-emerald-700';
        }
    };

    const handleBroadcast = (id: string) => {
        setBroadcastSent(prev => new Set(prev).add(id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 lg:p-6">
            <div className="max-w-5xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl font-black text-slate-900">📋 Doctor Advisories</h1>
                    <p className="text-sm text-slate-500 mt-1">Received from PHC Medical Officers • Ready for Community Broadcast</p>
                </header>

                {advisories.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <i className="ri-inbox-line text-5xl text-slate-300 mb-4"></i>
                        <p className="font-bold text-slate-600">No advisories received yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Advisory List */}
                        <div className="lg:col-span-2 space-y-3">
                            {advisories.map(adv => (
                                <div key={adv.id} onClick={() => setSelectedId(adv.id)}
                                    className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md ${selectedId === adv.id ? 'border-teal-400 ring-2 ring-teal-100' : 'border-slate-200'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${severityStyle(adv.severity)}`}>{adv.severity}</span>
                                        {(broadcastSent.has(adv.id) || adv.communityAlertSentAt) && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold rounded">✓ Broadcast Sent</span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm">{adv.identifiedDisease}</h3>
                                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{adv.summary}</p>
                                    <div className="flex justify-between mt-3 text-[10px] text-slate-400">
                                        <span>{adv.doctorName}</span>
                                        <span>{new Date(adv.issuedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Advisory Detail */}
                        <div className="lg:col-span-3">
                            {selected ? (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                    {/* Official Header */}
                                    <div className="bg-slate-900 p-5 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className="ri-government-fill text-lg"></i>
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Community Health Advisory</span>
                                        </div>
                                        <h2 className="text-xl font-black">{selected.identifiedDisease}</h2>
                                        <p className="text-xs text-white/60 mt-1">By {selected.doctorName} • {selected.phcName} • {new Date(selected.issuedAt).toLocaleDateString()}</p>
                                    </div>

                                    <div className="p-6 space-y-5">
                                        <p className="text-sm text-slate-700 leading-relaxed">{selected.summary}</p>

                                        {/* Immediate Action */}
                                        <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                                            <p className="text-[10px] font-bold text-red-600 uppercase mb-1">⚠ Immediate Action Required</p>
                                            <p className="text-sm font-bold text-slate-800">{selected.immediateAction}</p>
                                        </div>

                                        {/* Medical Steps */}
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recommended Medical Steps</p>
                                            <ul className="space-y-1.5">
                                                {selected.recommendedMedicalSteps.map((s, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                        <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Preventive */}
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Preventive Measures</p>
                                            <ul className="space-y-1 text-sm text-slate-700">
                                                {selected.preventiveMeasures.map((m, i) => <li key={i} className="flex items-center gap-2"><i className="ri-shield-check-line text-green-500"></i>{m}</li>)}
                                            </ul>
                                        </div>

                                        {/* Household */}
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Household Guidelines</p>
                                            <ul className="space-y-1 text-sm text-slate-700">
                                                {selected.householdGuidelines.map((g, i) => <li key={i} className="flex items-center gap-2"><i className="ri-home-heart-line text-purple-500"></i>{g}</li>)}
                                            </ul>
                                        </div>

                                        {/* When to Visit PHC */}
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">When to Visit PHC</p>
                                            <p className="text-sm font-medium text-slate-700">{selected.whenToVisitPhc}</p>
                                        </div>

                                        {/* Timeline */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 p-3 rounded-xl text-center">
                                                <p className="text-lg font-black text-slate-900">{selected.durationOfPrecaution}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">Precaution Duration</p>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-xl text-center">
                                                <p className="text-lg font-black text-slate-900">{selected.followUpInDays} Days</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">Follow-up</p>
                                            </div>
                                        </div>

                                        {/* Broadcast Button */}
                                        {broadcastSent.has(selected.id) || selected.communityAlertSentAt ? (
                                            <div className="py-4 bg-green-50 text-green-700 font-bold rounded-2xl text-center border border-green-200">
                                                <i className="ri-checkbox-circle-fill mr-2"></i>
                                                Advisory Broadcast Sent to Community
                                                {selected.communityDeliveryRate && <span className="block text-xs font-medium text-green-600 mt-1">{selected.communityDeliveryRate}% delivered • {selected.communityResponseRate}% responded</span>}
                                            </div>
                                        ) : (
                                            <button onClick={() => handleBroadcast(selected.id)}
                                                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                                                <i className="ri-broadcast-line text-lg"></i>
                                                🔔 Send Doctor Advisory to Community
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 h-96 flex flex-col items-center justify-center text-center p-8">
                                    <i className="ri-file-text-line text-4xl text-slate-300 mb-4"></i>
                                    <p className="font-bold text-slate-600">Select an advisory to view details</p>
                                    <p className="text-xs text-slate-400 mt-1">You can broadcast doctor advisories to your community</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
