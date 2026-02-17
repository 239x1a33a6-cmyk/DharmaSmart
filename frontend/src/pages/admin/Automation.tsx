import React, { useState } from 'react';

interface AutoRule {
    id: string;
    title: string;
    trigger: string;
    triggerType: 'symptom_spike' | 'data_delay' | 'water_quality' | 'compliance' | 'custom';
    actions: string[];
    status: 'active' | 'paused' | 'draft';
    lastTriggered?: string;
    triggerCount: number;
}

const initialRules: AutoRule[] = [
    {
        id: 'rule-1', title: 'Outbreak Response Alpha', triggerType: 'symptom_spike',
        trigger: 'IF Symptom Spike > 15% within 72h in any village cluster',
        actions: ['Auto-Notify District Collector', 'Alert all PHC hubs in district', 'Create awareness campaign draft'],
        status: 'active', lastTriggered: '2026-02-12T10:30:00Z', triggerCount: 7,
    },
    {
        id: 'rule-2', title: 'Water Quality Critical', triggerType: 'water_quality',
        trigger: 'IF Contamination Level > Safe Threshold for > 24h',
        actions: ['Broadcast ASHA Alert', 'PHC emergency lockdown protocol', 'Generate water advisory'],
        status: 'active', lastTriggered: '2026-02-11T15:00:00Z', triggerCount: 3,
    },
    {
        id: 'rule-3', title: 'PHC Sync Escalation', triggerType: 'data_delay',
        trigger: 'IF No PHC data sync in > 24 hours',
        actions: ['Auto-Email State Supervisor', 'Flag in compliance dashboard'],
        status: 'paused', triggerCount: 12,
    },
    {
        id: 'rule-4', title: 'ASHA Inactivity Monitor', triggerType: 'compliance',
        trigger: 'IF ASHA Worker no login > 7 days',
        actions: ['Send re-engagement SMS', 'Notify district ASHA supervisor', 'Add to inactive tracker'],
        status: 'active', lastTriggered: '2026-02-12T08:00:00Z', triggerCount: 24,
    },
    {
        id: 'rule-5', title: 'Suspicious Account Lockdown', triggerType: 'custom',
        trigger: 'IF Failed login attempts > 5 from same IP within 1h',
        actions: ['Auto-suspend account', 'Alert security dashboard', 'Log to audit trail'],
        status: 'active', lastTriggered: '2026-02-10T02:15:00Z', triggerCount: 2,
    },
];

const scheduleItems = [
    { label: 'Daily District Summary Report', time: '06:00 AM', frequency: 'Daily', enabled: true },
    { label: 'Weekly ASHA Performance Report', time: 'Monday 08:00 AM', frequency: 'Weekly', enabled: true },
    { label: 'Monthly Compliance Audit', time: '1st of Month', frequency: 'Monthly', enabled: true },
    { label: 'System Backup', time: '02:00 AM', frequency: 'Daily', enabled: true },
    { label: 'AI Model Re-training', time: 'Sunday 00:00', frequency: 'Weekly', enabled: false },
];

export default function AutomationEngine() {
    const [rules, setRules] = useState<AutoRule[]>(initialRules);
    const [tab, setTab] = useState<'rules' | 'scheduled' | 'logs'>('rules');
    const [showCreate, setShowCreate] = useState(false);

    const toggleStatus = (id: string) => {
        setRules(prev => prev.map(r =>
            r.id === id ? { ...r, status: r.status === 'active' ? 'paused' : 'active' } : r
        ));
    };

    const statusColors = {
        active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        paused: 'bg-slate-100 text-slate-500 border-slate-200',
        draft: 'bg-amber-50 text-amber-600 border-amber-200',
    };

    const triggerIcons: Record<string, string> = {
        symptom_spike: 'ri-virus-line',
        data_delay: 'ri-time-line',
        water_quality: 'ri-water-flash-line',
        compliance: 'ri-shield-check-line',
        custom: 'ri-settings-line',
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Automation & Workflow Engine</h2>
                    <p className="text-sm text-slate-500 font-medium">Create and manage systemic trigger-response rules platform-wide</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowCreate(!showCreate)}
                        className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2 hover:shadow-slate-300 transition-all">
                        <i className="ri-add-line"></i> New Protocol
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Rules', value: rules.filter(r => r.status === 'active').length, color: 'bg-emerald-50 text-emerald-700', icon: 'ri-play-circle-fill' },
                    { label: 'Total Triggers', value: rules.reduce((a, r) => a + r.triggerCount, 0), color: 'bg-blue-50 text-blue-700', icon: 'ri-flashlight-fill' },
                    { label: 'Paused', value: rules.filter(r => r.status === 'paused').length, color: 'bg-slate-100 text-slate-600', icon: 'ri-pause-circle-fill' },
                    { label: 'Scheduled Jobs', value: scheduleItems.filter(s => s.enabled).length, color: 'bg-purple-50 text-purple-700', icon: 'ri-calendar-check-fill' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} rounded-2xl p-4 flex items-center gap-3`}>
                        <i className={`${s.icon} text-xl`}></i>
                        <div>
                            <p className="text-2xl font-black">{s.value}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-xl border border-slate-200 p-1 w-fit">
                {(['rules', 'scheduled', 'logs'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-5 py-2 text-xs font-bold rounded-lg capitalize transition-all ${tab === t ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}>
                        {t === 'rules' ? 'IF/THEN Rules' : t === 'scheduled' ? 'Scheduled Jobs' : 'Execution Log'}
                    </button>
                ))}
            </div>

            {/* Create Rule Card */}
            {showCreate && (
                <div className="bg-white rounded-2xl border-2 border-dashed border-teal-300 p-6 animate-in fade-in zoom-in-95 duration-300">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i className="ri-add-circle-fill text-teal-600"></i> Create New Automation Rule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Rule Name</label>
                            <input type="text" placeholder="e.g. Dengue Outbreak Response" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Trigger Type</label>
                            <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium">
                                <option>Symptom Spike</option>
                                <option>Water Quality Alert</option>
                                <option>Data Sync Delay</option>
                                <option>Compliance Violation</option>
                                <option>Custom Trigger</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">IF Condition</label>
                            <textarea rows={2} placeholder="e.g. Symptom count > 20 in 48 hours" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium resize-none" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">THEN Action(s)</label>
                            <textarea rows={2} placeholder="e.g. Notify district collector, create advisory draft" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium resize-none" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 bg-teal-600 text-white font-bold text-xs rounded-lg hover:bg-teal-700 transition-colors">Save & Activate</button>
                        <button onClick={() => setShowCreate(false)} className="px-5 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-lg">Cancel</button>
                    </div>
                </div>
            )}

            {/* Rules Tab */}
            {tab === 'rules' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {rules.map(rule => (
                        <div key={rule.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                                            <i className={`${triggerIcons[rule.triggerType]} text-slate-500`}></i>
                                        </div>
                                        <h3 className="font-bold text-slate-900">{rule.title}</h3>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${statusColors[rule.status]}`}>
                                        {rule.status}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2">
                                        <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">IF</span>
                                        <p className="text-xs font-medium text-slate-600">{rule.trigger}</p>
                                    </div>
                                    {rule.actions.map((a, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <span className="w-6 h-6 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                                {i === 0 ? 'DO' : '→'}
                                            </span>
                                            <p className="text-xs font-medium text-slate-600">{a}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-[10px] text-slate-400 mb-4">
                                    <span className="font-bold"><i className="ri-flashlight-line mr-1"></i>{rule.triggerCount} triggers</span>
                                    {rule.lastTriggered && (
                                        <span>Last: {new Date(rule.lastTriggered).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => toggleStatus(rule.id)}
                                    className={`flex-1 py-2.5 text-[10px] font-bold rounded-xl border transition-all ${rule.status === 'active' ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'}`}>
                                    {rule.status === 'active' ? 'PAUSE' : 'ACTIVATE'}
                                </button>
                                <button className="flex-1 py-2.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all">EDIT LOGIC</button>
                                <button className="px-3 py-2.5 bg-white text-slate-400 hover:text-red-500 rounded-xl transition-all border border-slate-100"><i className="ri-delete-bin-line"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Scheduled Jobs Tab */}
            {tab === 'scheduled' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Job</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Schedule</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Frequency</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {scheduleItems.map((s, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{s.label}</td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-500">{s.time}</td>
                                    <td className="px-6 py-4 text-xs">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded font-bold">{s.frequency}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${s.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                            {s.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Logs Tab */}
            {tab === 'logs' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="space-y-3">
                        {[
                            { time: '10:30 AM', rule: 'Outbreak Response Alpha', result: 'Success', detail: 'Notified District Collector (Nagaon) — 3 PHCs alerted' },
                            { time: '08:00 AM', rule: 'ASHA Inactivity Monitor', result: 'Success', detail: 'SMS sent to 12 inactive workers, supervisors notified' },
                            { time: '06:00 AM', rule: 'Daily District Summary', result: 'Success', detail: 'Reports generated for all 5 districts, emailed to collectors' },
                            { time: '02:00 AM', rule: 'System Backup', result: 'Success', detail: 'Full database backup completed (4.2 GB)' },
                            { time: 'Yesterday 15:00', rule: 'Water Quality Critical', result: 'Escalated', detail: 'Contamination in Majuli — ASHA alert + PHC lockdown triggered' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-start gap-4 border-b border-slate-50 pb-3">
                                <span className="text-[10px] font-mono text-slate-400 w-28 flex-shrink-0 pt-0.5">{log.time}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-bold text-slate-800">{log.rule}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.result === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{log.result}</span>
                                    </div>
                                    <p className="text-xs text-slate-500">{log.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
