// ASHA Reports Module — District Admin view of all ASHA field reports
import { useState } from 'react';

const mockReports = [
    { id: 'AR-001', ashaName: 'Lakshmi Devi', ashaMobile: '9000000001', location: 'Old City, Hyderabad', symptoms: 'Fever, Diarrhea (3 cases)', dateSubmitted: '2026-02-12', status: 'pending', priority: 'high' },
    { id: 'AR-002', ashaName: 'Meera Reddy', ashaMobile: '9000000002', location: 'Secunderabad', symptoms: 'Cholera symptoms (1 case)', dateSubmitted: '2026-02-11', status: 'reviewed', priority: 'critical' },
    { id: 'AR-003', ashaName: 'Padma Kumari', ashaMobile: '9000000003', location: 'Charminar Area', symptoms: 'Skin rash, Malaria suspect', dateSubmitted: '2026-02-11', status: 'forwarded', priority: 'medium' },
    { id: 'AR-004', ashaName: 'Sunita Begum', ashaMobile: '9000000004', location: 'LB Nagar', symptoms: 'Water contamination alert', dateSubmitted: '2026-02-10', status: 'resolved', priority: 'high' },
    { id: 'AR-005', ashaName: 'Rani Devi', ashaMobile: '9000000005', location: 'Kukatpally', symptoms: 'Typhoid cluster (5 cases)', dateSubmitted: '2026-02-10', status: 'pending', priority: 'critical' },
    { id: 'AR-006', ashaName: 'Jaya Lakshmi', ashaMobile: '9000000006', location: 'Uppal', symptoms: 'Routine checkup report', dateSubmitted: '2026-02-09', status: 'reviewed', priority: 'low' },
    { id: 'AR-007', ashaName: 'Kavita Reddy', ashaMobile: '9000000007', location: 'Shamshabad', symptoms: 'Dengue symptoms (2 cases)', dateSubmitted: '2026-02-09', status: 'forwarded', priority: 'high' },
    { id: 'AR-008', ashaName: 'Anita Das', ashaMobile: '9000000008', location: 'Begumpet', symptoms: 'Malnourishment in children', dateSubmitted: '2026-02-08', status: 'pending', priority: 'medium' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    reviewed: 'bg-blue-100 text-blue-800',
    forwarded: 'bg-purple-100 text-purple-800',
    resolved: 'bg-emerald-100 text-emerald-800',
};

const priorityColors: Record<string, string> = {
    critical: 'bg-red-600 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-400 text-yellow-900',
    low: 'bg-slate-200 text-slate-700',
};

export default function AshaReports() {
    const [filter, setFilter] = useState<string>('all');
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    const filtered = filter === 'all' ? mockReports : mockReports.filter(r => r.status === filter);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">ASHA Field Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">Reports submitted by ASHA workers in Hyderabad District</p>
                </div>
                <button className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <i className="ri-download-2-line"></i> Export CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Reports', value: mockReports.length, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Pending Review', value: mockReports.filter(r => r.status === 'pending').length, color: 'bg-amber-50 text-amber-700' },
                    { label: 'Critical Priority', value: mockReports.filter(r => r.priority === 'critical').length, color: 'bg-red-50 text-red-700' },
                    { label: 'Resolved', value: mockReports.filter(r => r.status === 'resolved').length, color: 'bg-emerald-50 text-emerald-700' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} p-4 rounded-xl text-center`}>
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'reviewed', 'forwarded', 'resolved'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Report ID</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">ASHA Worker</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Symptoms</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(r => (
                                <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{r.id}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-slate-900">{r.ashaName}</p>
                                        <p className="text-xs text-slate-400">{r.ashaMobile}</p>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{r.location}</td>
                                    <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{r.symptoms}</td>
                                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${priorityColors[r.priority]}`}>{r.priority}</span></td>
                                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[r.status]}`}>{r.status}</span></td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{r.dateSubmitted}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedReport(r.id)} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">View</button>
                                            <button className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold hover:bg-purple-100 transition-colors">Forward</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                        {(() => {
                            const r = mockReports.find(rep => rep.id === selectedReport); if (!r) return null; return (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-slate-900">Report {r.id}</h3>
                                        <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-slate-100 rounded-lg"><i className="ri-close-line text-xl"></i></button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 p-3 rounded-xl"><p className="text-xs text-slate-400 font-bold uppercase">ASHA Worker</p><p className="font-semibold">{r.ashaName} — {r.ashaMobile}</p></div>
                                        <div className="bg-slate-50 p-3 rounded-xl"><p className="text-xs text-slate-400 font-bold uppercase">Location</p><p className="font-semibold">{r.location}</p></div>
                                        <div className="bg-slate-50 p-3 rounded-xl"><p className="text-xs text-slate-400 font-bold uppercase">Symptoms</p><p className="font-semibold">{r.symptoms}</p></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 p-3 rounded-xl"><p className="text-xs text-slate-400 font-bold uppercase">Priority</p><span className={`px-2 py-1 rounded-full text-xs font-bold ${priorityColors[r.priority]}`}>{r.priority}</span></div>
                                            <div className="bg-slate-50 p-3 rounded-xl"><p className="text-xs text-slate-400 font-bold uppercase">Status</p><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[r.status]}`}>{r.status}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <button className="flex-1 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">Forward to Clinical</button>
                                        <button className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">Mark Reviewed</button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
