// State Advisory Inbox — District Admin receives advisory from state level
import { useState } from 'react';

const mockAdvisories = [
    { id: 'ADV-001', title: 'Monsoon Disease Preparedness Advisory', from: 'State Health Commissioner', date: '2026-02-12', status: 'unread', priority: 'high', summary: 'All districts must activate monsoon preparedness protocols. Ensure PHC readiness, stock anti-malarial drugs, and deploy vector control teams by Feb 20.' },
    { id: 'ADV-002', title: 'COVID-19 Surveillance Protocol Update', from: 'Director of Public Health', date: '2026-02-10', status: 'acknowledged', priority: 'medium', summary: 'Updated surveillance guidelines for XBB.1.5 variant. All PHCs to report respiratory clusters within 24 hours.' },
    { id: 'ADV-003', title: 'Budget Q1 Release Notification', from: 'State Finance Department', date: '2026-02-05', status: 'acknowledged', priority: 'low', summary: 'Q1 FY2025-26 budget allocation of ₹48.5L has been released. Utilize as per approved district health plan.' },
    { id: 'ADV-004', title: 'ASHA Worker Training Directive', from: 'National Health Mission, TS', date: '2026-02-01', status: 'unread', priority: 'medium', summary: 'Mandatory refresher training for all ASHA workers on TB screening protocol. Complete by March 15, 2026.' },
    { id: 'ADV-005', title: 'Water Quality Alert — Fluoride Hotspots', from: 'State Water Resources Board', date: '2026-01-28', status: 'acknowledged', priority: 'critical', summary: 'Elevated fluoride levels detected in Nalgonda and parts of Hyderabad. Activate alternate water supply protocols immediately.' },
];

const statusColors: Record<string, string> = { unread: 'bg-blue-600 text-white', acknowledged: 'bg-emerald-100 text-emerald-800' };
const priorityIcons: Record<string, string> = { critical: 'ri-alert-fill text-red-600', high: 'ri-error-warning-fill text-orange-500', medium: 'ri-information-fill text-blue-500', low: 'ri-checkbox-circle-fill text-slate-400' };

export default function AdvisoryInbox() {
    const [selected, setSelected] = useState<string | null>(null);
    const active = mockAdvisories.find(a => a.id === selected);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">State Advisory Inbox</h2>
                <p className="text-sm text-slate-500 mt-1">Directives and advisories from Telangana State Health Authority</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{mockAdvisories.filter(a => a.status === 'unread').length}</p>
                    <p className="text-[10px] font-bold uppercase">Unread</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{mockAdvisories.filter(a => a.status === 'acknowledged').length}</p>
                    <p className="text-[10px] font-bold uppercase">Acknowledged</p>
                </div>
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{mockAdvisories.filter(a => a.priority === 'critical').length}</p>
                    <p className="text-[10px] font-bold uppercase">Critical</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Advisory List */}
                <div className="lg:col-span-2 space-y-3">
                    {mockAdvisories.map(a => (
                        <button key={a.id} onClick={() => setSelected(a.id)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all ${selected === a.id ? 'bg-blue-50 border-blue-300 shadow-md' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}>
                            <div className="flex items-start gap-3">
                                <i className={`${priorityIcons[a.priority]} text-xl mt-0.5`}></i>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-900 text-sm truncate">{a.title}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${statusColors[a.status]}`}>{a.status === 'unread' ? 'NEW' : '✓'}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{a.from} • {a.date}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-3">
                    {active ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-4">
                            <div className="flex items-center gap-2 mb-2">
                                <i className={`${priorityIcons[active.priority]} text-xl`}></i>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${active.priority === 'critical' ? 'bg-red-100 text-red-700' : active.priority === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{active.priority}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{active.title}</h3>
                            <p className="text-sm text-slate-500 mb-4">From: <strong>{active.from}</strong> • {active.date}</p>
                            <div className="bg-slate-50 p-5 rounded-xl mb-6">
                                <p className="text-slate-700 leading-relaxed">{active.summary}</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                                    <i className="ri-check-double-line"></i> Acknowledge
                                </button>
                                <button className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
                                    <i className="ri-download-line"></i> PDF
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                            <i className="ri-mail-open-line text-4xl text-slate-300 mb-3"></i>
                            <p className="text-slate-400 font-medium">Select an advisory to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
