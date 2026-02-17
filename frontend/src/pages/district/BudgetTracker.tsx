// Budget & Resource Tracking — District Admin
import { useState } from 'react';

const budgetData = {
    totalAllocated: 4850000,
    utilized: 3120000,
    committed: 890000,
    available: 840000,
    categories: [
        { name: 'PHC Operations', allocated: 1600000, spent: 1250000, icon: 'ri-hospital-line', color: 'bg-teal-500' },
        { name: 'ASHA Stipends', allocated: 1200000, spent: 980000, icon: 'ri-user-heart-line', color: 'bg-purple-500' },
        { name: 'Medicine Supply', allocated: 900000, spent: 520000, icon: 'ri-capsule-line', color: 'bg-blue-500' },
        { name: 'Emergency Fund', allocated: 650000, spent: 220000, icon: 'ri-alarm-warning-line', color: 'bg-red-500' },
        { name: 'Infrastructure', allocated: 500000, spent: 150000, icon: 'ri-building-line', color: 'bg-orange-500' },
    ],
    recentTransactions: [
        { id: 'TXN-001', desc: 'PHC Charminar — medicine restock', amount: 125000, date: '2026-02-12', type: 'debit' },
        { id: 'TXN-002', desc: 'ASHA Worker stipends — January', amount: 320000, date: '2026-02-10', type: 'debit' },
        { id: 'TXN-003', desc: 'State allocation — Q1 release', amount: 1200000, date: '2026-02-05', type: 'credit' },
        { id: 'TXN-004', desc: 'Emergency fogging campaign', amount: 85000, date: '2026-02-03', type: 'debit' },
        { id: 'TXN-005', desc: 'PHC Secunderabad — equipment', amount: 245000, date: '2026-01-28', type: 'debit' },
    ],
};

function formatCurrency(n: number) { return '₹' + (n / 100000).toFixed(1) + 'L'; }

export default function BudgetTracker() {
    const [tab, setTab] = useState<'overview' | 'transactions'>('overview');
    const utilizationPct = Math.round((budgetData.utilized / budgetData.totalAllocated) * 100);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Budget & Resource Tracking</h2>
                <p className="text-sm text-slate-500 mt-1">Hyderabad District — FY 2025-26</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Allocated', value: formatCurrency(budgetData.totalAllocated), color: 'bg-blue-50 text-blue-700' },
                    { label: 'Utilized', value: formatCurrency(budgetData.utilized), color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Committed', value: formatCurrency(budgetData.committed), color: 'bg-amber-50 text-amber-700' },
                    { label: 'Available', value: formatCurrency(budgetData.available), color: 'bg-slate-50 text-slate-700' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} p-5 rounded-2xl text-center`}>
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Utilization Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">Budget Utilization</h3>
                    <span className="text-2xl font-black text-slate-900">{utilizationPct}%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${utilizationPct}%` }}></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{formatCurrency(budgetData.utilized)} of {formatCurrency(budgetData.totalAllocated)} utilized</p>
            </div>

            <div className="flex gap-2">
                <button onClick={() => setTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-bold ${tab === 'overview' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>Category Breakdown</button>
                <button onClick={() => setTab('transactions')} className={`px-4 py-2 rounded-lg text-sm font-bold ${tab === 'transactions' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>Recent Transactions</button>
            </div>

            {tab === 'overview' ? (
                <div className="space-y-4">
                    {budgetData.categories.map((cat, i) => {
                        const pct = Math.round((cat.spent / cat.allocated) * 100);
                        return (
                            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`${cat.color} p-2.5 rounded-xl text-white`}><i className={`${cat.icon} text-lg`}></i></div>
                                        <div>
                                            <p className="font-bold text-slate-900">{cat.name}</p>
                                            <p className="text-xs text-slate-400">{formatCurrency(cat.spent)} / {formatCurrency(cat.allocated)}</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-slate-900">{pct}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Transaction</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Description</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {budgetData.recentTransactions.map(tx => (
                                <tr key={tx.id} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{tx.id}</td>
                                    <td className="px-4 py-3 text-slate-600">{tx.desc}</td>
                                    <td className={`px-4 py-3 font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>{tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{tx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
