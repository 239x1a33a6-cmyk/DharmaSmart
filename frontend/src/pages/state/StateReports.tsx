// State Reports — Generate and view monthly state reports
import { useState } from 'react';

const pastReports = [
    { id: 'SR-2026-01', month: 'January 2026', generated: '2026-02-01', pages: 45, status: 'published' },
    { id: 'SR-2025-12', month: 'December 2025', generated: '2026-01-01', pages: 52, status: 'published' },
    { id: 'SR-2025-11', month: 'November 2025', generated: '2025-12-01', pages: 38, status: 'published' },
    { id: 'SR-2025-10', month: 'October 2025', generated: '2025-11-01', pages: 41, status: 'archived' },
];

export default function StateReports() {
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">State Health Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">Generate and download monthly state reports</p>
                </div>
                <button onClick={handleGenerate} disabled={generating}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2">
                    {generating ? <><i className="ri-loader-4-line animate-spin"></i> Generating...</> : <><i className="ri-file-chart-fill"></i> Generate Monthly Report</>}
                </button>
            </div>

            {generated && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <i className="ri-check-double-line text-emerald-600 text-xl"></i>
                    <div className="flex-1">
                        <p className="text-emerald-800 font-bold text-sm">Report SR-2026-02 generated!</p>
                        <p className="text-emerald-600 text-xs">February 2026 — 48 pages, covering all districts</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
                        <i className="ri-download-2-fill mr-1"></i>Download PDF
                    </button>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Report Contents Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { section: 'Executive Summary', icon: 'ri-file-text-fill', pages: '2-3' },
                        { section: 'District Risk Analysis', icon: 'ri-shield-flash-fill', pages: '4-15' },
                        { section: 'Outbreak Predictions', icon: 'ri-robot-2-fill', pages: '16-22' },
                        { section: 'ASHA Activity Report', icon: 'ri-user-heart-fill', pages: '23-30' },
                        { section: 'Health Camp Summary', icon: 'ri-heart-pulse-fill', pages: '31-36' },
                        { section: 'Compliance Metrics', icon: 'ri-checkbox-circle-fill', pages: '37-40' },
                        { section: 'Budget Utilization', icon: 'ri-money-rupee-circle-fill', pages: '41-44' },
                        { section: 'Recommendations', icon: 'ri-lightbulb-flash-fill', pages: '45-48' },
                    ].map((s, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-4 text-center">
                            <i className={`${s.icon} text-2xl text-indigo-600`}></i>
                            <p className="font-bold text-sm text-slate-900 mt-2">{s.section}</p>
                            <p className="text-xs text-slate-400">Pages {s.pages}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Past Reports</h3>
                <div className="space-y-3">
                    {pastReports.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <i className="ri-file-chart-fill text-indigo-600 text-xl"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{r.month}</p>
                                    <p className="text-xs text-slate-400">{r.id} • {r.pages} pages • Generated {r.generated}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${r.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{r.status}</span>
                                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50">
                                    <i className="ri-download-2-fill mr-1"></i>Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
