// Advisory & Policy Generator — State sends structured advisories to districts
import { useState } from 'react';
import { mockDistricts } from '../../mocks/admin-mock-data';

const recentAdvisories = [
    { id: 'SA-001', title: 'Monsoon Disease Preparedness', districts: 'All Districts', riskLevel: 'High', date: '2026-02-12', status: 'sent' },
    { id: 'SA-002', title: 'COVID-19 Variant Surveillance', districts: 'Hyderabad, Rangareddy', riskLevel: 'Medium', date: '2026-02-10', status: 'acknowledged' },
    { id: 'SA-003', title: 'Water Testing Directive', districts: 'Nalgonda, Khammam', riskLevel: 'Critical', date: '2026-02-08', status: 'implemented' },
];

const statusColors: Record<string, string> = { sent: 'bg-blue-100 text-blue-700', acknowledged: 'bg-amber-100 text-amber-700', implemented: 'bg-emerald-100 text-emerald-700' };

export default function AdvisoryGenerator() {
    const [form, setForm] = useState({ title: '', disease: '', districts: [] as string[], riskLevel: 'medium', action: '', budget: '', deadline: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Advisory & Policy Generator</h2>
                <p className="text-sm text-slate-500 mt-1">Send structured state advisories to district collectors</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Form */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Advisory</h3>
                    {sent && (
                        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                            <i className="ri-check-double-line text-emerald-600 text-xl"></i>
                            <p className="text-emerald-800 font-bold text-sm">Advisory sent successfully to selected districts!</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Advisory Title</label>
                            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. Emergency Water Testing Directive" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-1">Disease Type</label>
                                <select value={form.disease} onChange={e => setForm({ ...form, disease: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select</option>
                                    <option>Cholera</option><option>Dengue</option><option>Malaria</option><option>Typhoid</option><option>COVID-19</option><option>Water Contamination</option><option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-1">Risk Level</label>
                                <select value={form.riskLevel} onChange={e => setForm({ ...form, riskLevel: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Affected Districts</label>
                            <div className="flex flex-wrap gap-2">
                                {mockDistricts.map(d => (
                                    <button key={d.id} type="button"
                                        onClick={() => setForm({ ...form, districts: form.districts.includes(d.name) ? form.districts.filter(n => n !== d.name) : [...form.districts, d.name] })}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${form.districts.includes(d.name) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {d.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 block mb-1">Recommended Action</label>
                            <textarea value={form.action} onChange={e => setForm({ ...form, action: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 h-24 resize-none" placeholder="Describe the action to be taken..." required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-1">Budget Allocation (₹)</label>
                                <input type="text" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl" placeholder="e.g. 5,00,000" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-1">Deadline</label>
                                <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                            <i className="ri-mail-send-fill"></i> Send Advisory to Districts
                        </button>
                    </form>
                </div>

                {/* Recent Advisories */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Advisories</h3>
                        <div className="space-y-3">
                            {recentAdvisories.map(a => (
                                <div key={a.id} className="p-4 border border-slate-100 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-mono font-bold text-xs text-slate-400">{a.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusColors[a.status]}`}>{a.status}</span>
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm">{a.title}</p>
                                    <p className="text-xs text-slate-400 mt-1">{a.districts} • {a.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
