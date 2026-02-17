
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedicalAdvisories, mockClinicalCases } from '../../mocks/clinical-mock-data';

export default function AdvisoryHistory() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'pending' | 'acknowledged'>('all');

    const advisories = mockMedicalAdvisories.filter(a => {
        if (filter === 'pending') return a.followUpStatus === 'pending';
        if (filter === 'acknowledged') return a.followUpStatus !== 'pending';
        return true;
    });

    const getSeverityStyle = (s: string) => {
        switch (s) {
            case 'red': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' };
            case 'orange': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' };
            case 'yellow': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' };
            default: return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' };
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button onClick={() => navigate('/clinic/dashboard')} className="text-sm text-slate-500 hover:text-slate-800 font-bold mb-1 flex items-center gap-1">
                            <i className="ri-arrow-left-line"></i> Dashboard
                        </button>
                        <h1 className="text-2xl font-black text-slate-900">Advisory Pipeline History</h1>
                        <p className="text-xs text-slate-400 mt-1">Full traceability: Case → Advisory → ASHA → Community</p>
                    </div>
                    <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                        {(['all', 'pending', 'acknowledged'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${filter === f ? 'bg-teal-600 text-white shadow' : 'text-slate-500'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-5">
                    {advisories.map(adv => {
                        const sc = getSeverityStyle(adv.severity);
                        const linkedCase = mockClinicalCases.find(c => c.id === adv.caseId);
                        return (
                            <div key={adv.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Header */}
                                <div className="p-5 flex items-start justify-between border-b border-slate-100">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${sc.bg} ${sc.text}`}>{adv.severity}</span>
                                            <h3 className="font-bold text-slate-800">{adv.identifiedDisease}</h3>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-mono">{adv.traceId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-700">{adv.doctorName}</p>
                                        <p className="text-[10px] text-slate-400">{new Date(adv.issuedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Pipeline Progress */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        {[
                                            { label: 'Case Reported', icon: 'ri-file-list-3-line', done: true, info: linkedCase?.village || '—' },
                                            { label: 'Advisory Issued', icon: 'ri-stethoscope-line', done: adv.isApproved, info: adv.id },
                                            { label: 'ASHA Notified', icon: 'ri-notification-3-line', done: adv.sentToAsha, info: adv.ashaAcknowledgedAt ? 'Acknowledged' : 'Pending' },
                                            { label: 'Community Alert', icon: 'ri-broadcast-line', done: !!adv.communityAlertSentAt, info: adv.communityDeliveryRate ? `${adv.communityDeliveryRate}% delivered` : '—' },
                                            { label: 'Follow-up', icon: 'ri-loop-left-line', done: adv.followUpStatus === 'improvement', info: adv.followUpStatus || 'pending' },
                                        ].map((step, i) => (
                                            <React.Fragment key={i}>
                                                <div className="flex flex-col items-center text-center flex-1">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${step.done ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-300'}`}>
                                                        <i className={`${step.icon} text-lg`}></i>
                                                    </div>
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase">{step.label}</p>
                                                    <p className="text-[9px] text-slate-400">{step.info}</p>
                                                </div>
                                                {i < 4 && <div className={`flex-shrink-0 w-8 h-0.5 mt-[-20px] ${step.done ? 'bg-teal-300' : 'bg-slate-200'}`}></div>}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-slate-50 p-3 rounded-xl text-center">
                                            <p className="text-xl font-black text-slate-800">{linkedCase?.totalPatients || '—'}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Patients</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl text-center">
                                            <p className="text-xl font-black text-slate-800">{adv.communityDeliveryRate || '—'}%</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Delivery</p>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl text-center">
                                            <p className="text-xl font-black text-slate-800">{adv.communityResponseRate || '—'}%</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Response</p>
                                        </div>
                                        <div className={`p-3 rounded-xl text-center ${adv.followUpStatus === 'improvement' ? 'bg-green-50' : adv.followUpStatus === 'worsened' ? 'bg-red-50' : 'bg-amber-50'}`}>
                                            <p className="text-xl font-black text-slate-800 capitalize">{adv.followUpStatus || '—'}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Trend</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
