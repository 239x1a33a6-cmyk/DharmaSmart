// Clinical Reports Module — District Admin view of doctor clinical reports
import { useState } from 'react';

const mockClinicalReports = [
    { id: 'CR-001', doctorName: 'Dr. Anita Sharma', phc: 'Hyderabad Central PHC', diagnosis: 'Cholera outbreak — confirmed', actions: 'ORS supply, water chlorination, quarantine zone', priority: 'critical', date: '2026-02-12', status: 'active' },
    { id: 'CR-002', doctorName: 'Dr. Ravi Kumar', phc: 'Charminar PHC', diagnosis: 'Dengue cluster — 5 cases confirmed', actions: 'Fogging, vector control, ASHA awareness campaign', priority: 'high', date: '2026-02-11', status: 'active' },
    { id: 'CR-003', doctorName: 'Dr. Priya Reddy', phc: 'PHC Secunderabad', diagnosis: 'Typhoid — 3 suspected cases', actions: 'Blood tests, antibiotic course, water source sampling', priority: 'high', date: '2026-02-11', status: 'implemented' },
    { id: 'CR-004', doctorName: 'Dr. Suresh Babu', phc: 'PHC LB Nagar', diagnosis: 'Malaria spike — seasonal', actions: 'Prophylactic distribution, net campaign', priority: 'medium', date: '2026-02-10', status: 'implemented' },
    { id: 'CR-005', doctorName: 'Dr. Meena Verma', phc: 'PHC Kukatpally', diagnosis: 'Water contamination — Fluoride excess', actions: 'Water testing, alternate supply arrangement', priority: 'critical', date: '2026-02-09', status: 'active' },
    { id: 'CR-006', doctorName: 'Dr. Harish Rao', phc: 'PHC Uppal', diagnosis: 'Child malnutrition cluster', actions: 'Nutritional supplements, ASHA follow-up', priority: 'medium', date: '2026-02-08', status: 'review' },
];

const priorityColors: Record<string, string> = { critical: 'bg-red-600 text-white', high: 'bg-orange-500 text-white', medium: 'bg-yellow-400 text-yellow-900', low: 'bg-slate-200 text-slate-700' };
const statusColors: Record<string, string> = { active: 'bg-blue-100 text-blue-800', implemented: 'bg-emerald-100 text-emerald-800', review: 'bg-amber-100 text-amber-800' };

export default function ClinicalReports() {
    const [filter, setFilter] = useState<string>('all');
    const filtered = filter === 'all' ? mockClinicalReports : mockClinicalReports.filter(r => r.status === filter);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Clinical Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">Cure reports and diagnoses from PHC doctors in Hyderabad District</p>
                </div>
                <button className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <i className="ri-download-2-line"></i> Export
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Reports', value: mockClinicalReports.length, color: 'bg-teal-50 text-teal-700' },
                    { label: 'Active', value: mockClinicalReports.filter(r => r.status === 'active').length, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Critical', value: mockClinicalReports.filter(r => r.priority === 'critical').length, color: 'bg-red-50 text-red-700' },
                    { label: 'Implemented', value: mockClinicalReports.filter(r => r.status === 'implemented').length, color: 'bg-emerald-50 text-emerald-700' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} p-4 rounded-xl text-center`}>
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                {['all', 'active', 'implemented', 'review'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filtered.map(r => (
                    <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono font-bold text-slate-900">{r.id}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${priorityColors[r.priority]}`}>{r.priority}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColors[r.status]}`}>{r.status}</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{r.doctorName} • {r.phc}</p>
                            </div>
                            <span className="text-xs text-slate-400">{r.date}</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl mb-3">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Diagnosis</p>
                            <p className="font-semibold text-slate-900">{r.diagnosis}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl mb-4">
                            <p className="text-xs text-blue-400 font-bold uppercase mb-1">Recommended Actions</p>
                            <p className="text-blue-900 font-medium">{r.actions}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors">View Full Report</button>
                            <button className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl text-sm hover:bg-purple-700 transition-colors">Send to ASHA</button>
                            {r.status !== 'implemented' && <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 transition-colors">Mark Implemented</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
