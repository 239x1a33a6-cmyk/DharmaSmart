import React from 'react';

export default function GlobalSettings() {
    const settingsSections = [
        { title: 'Platform Branding', icon: 'ri-palette-fill', desc: 'Logo, theme colors, and portal naming' },
        { title: 'Authentication & SSO', icon: 'ri-shield-user-fill', desc: 'OAuth, session length, and login policies' },
        { title: 'Notification Gateways', icon: 'ri-broadcast-fill', desc: 'SMS service provider and email smtp config' },
        { title: 'Regional Localization', icon: 'ri-translate-2', desc: 'Manage 12+ supported regional languages' },
        { title: 'Feature Flag Control', icon: 'ri-toggle-fill', desc: 'Toggle AI modules and map layers globally' },
        { title: 'API & Webhooks', icon: 'ri-terminal-box-fill', desc: 'Manage system integration points' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Global System Settings</h2>
                    <p className="text-sm text-slate-500 font-medium">Core platform configuration and system-wide default overrides</p>
                </div>
                <div className="flex items-center space-x-3 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm animate-pulse">
                    <i className="ri-checkbox-circle-fill"></i> System Synchronized
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsSections.map((s, i) => (
                    <div key={i} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center mb-5 transition-all shadow-inner group-hover:shadow-lg group-hover:shadow-primary/30">
                            <i className={`${s.icon} text-2xl`}></i>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-tighter opacity-70 mb-4">{s.desc}</p>
                        <div className="flex items-center text-primary font-bold text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                            Configure Module <i className="ri-arrow-right-s-line ml-1"></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* Feature Flag / Rapid Toggles Surface */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                    <h3 className="font-bold text-slate-900">Rapid Toggle Workspace</h3>
                    <p className="text-xs text-slate-400 mt-1">Instant platform-wide feature enabling/disabling</p>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { label: 'Satellite Real-time Layers', active: true },
                        { label: 'Predictive Outbreak AI', active: true },
                        { label: 'Multilingual SMS Alerts', active: true },
                        { label: 'Offline Data Sync', active: false },
                        { label: 'Public Awareness Portal', active: true },
                        { label: 'Global Search (Cross-District)', active: false },
                    ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700">{f.label}</span>
                            <button className={`w-12 h-6 rounded-full transition-all relative ${f.active ? 'bg-primary shadow-sm shadow-primary/20' : 'bg-slate-200'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${f.active ? 'left-7 shadow-sm' : 'left-1'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger Zone Footer */}
            <div className="mt-12 p-8 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-black text-red-800 uppercase tracking-widest mb-1 flex items-center">
                        <i className="ri-alert-fill mr-2"></i> Absolute Root Governance
                    </h4>
                    <p className="text-xs text-red-700 font-medium italic">Changes here can lead to platform-wide downtime. Every update is tracked by the Global Audit Guard.</p>
                </div>
                <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl text-xs shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all">FACTORY RESET DEFAULTS</button>
            </div>
        </div>
    );
}
