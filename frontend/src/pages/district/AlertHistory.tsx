// Alert History — District Admin view of previously sent alerts
const mockAlertHistory = [
    { id: 'ALT-001', title: 'Cholera Outbreak Alert — Old City', sentDate: '2026-02-12', targetArea: 'Old City, Charminar', priority: 'critical', deliveryStatus: 'delivered', recipientCount: 342 },
    { id: 'ALT-002', title: 'Water Contamination Warning', sentDate: '2026-02-10', targetArea: 'LB Nagar, Uppal', priority: 'high', deliveryStatus: 'delivered', recipientCount: 1250 },
    { id: 'ALT-003', title: 'Dengue Prevention Advisory', sentDate: '2026-02-08', targetArea: 'All Hyderabad PHCs', priority: 'medium', deliveryStatus: 'delivered', recipientCount: 4500 },
    { id: 'ALT-004', title: 'Typhoid Cluster Warning', sentDate: '2026-02-05', targetArea: 'Kukatpally, Secunderabad', priority: 'high', deliveryStatus: 'partial', recipientCount: 890 },
    { id: 'ALT-005', title: 'ASHA Worker Safety Notice', sentDate: '2026-02-01', targetArea: 'District-wide', priority: 'low', deliveryStatus: 'delivered', recipientCount: 890 },
    { id: 'ALT-006', title: 'Emergency Fogging Schedule', sentDate: '2026-01-28', targetArea: 'Shamshabad, LB Nagar', priority: 'medium', deliveryStatus: 'delivered', recipientCount: 2100 },
    { id: 'ALT-007', title: 'Flood Risk Advisory', sentDate: '2026-01-25', targetArea: 'All low-lying areas', priority: 'critical', deliveryStatus: 'delivered', recipientCount: 5600 },
    { id: 'ALT-008', title: 'Vaccination Drive Reminder', sentDate: '2026-01-20', targetArea: 'District-wide', priority: 'low', deliveryStatus: 'delivered', recipientCount: 8900 },
];

const priorityColors: Record<string, string> = { critical: 'bg-red-600 text-white', high: 'bg-orange-500 text-white', medium: 'bg-yellow-400 text-yellow-900', low: 'bg-slate-200 text-slate-700' };
const deliveryColors: Record<string, string> = { delivered: 'text-emerald-600', partial: 'text-amber-600', failed: 'text-red-600' };
const deliveryIcons: Record<string, string> = { delivered: 'ri-check-double-line', partial: 'ri-check-line', failed: 'ri-close-line' };

export default function AlertHistory() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Alert History</h2>
                    <p className="text-sm text-slate-500 mt-1">Previously sent district alerts and their delivery status</p>
                </div>
                <button className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <i className="ri-download-2-line"></i> Export Log
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Alerts Sent', value: mockAlertHistory.length, color: 'bg-blue-50 text-blue-700' },
                    { label: 'Critical Alerts', value: mockAlertHistory.filter(a => a.priority === 'critical').length, color: 'bg-red-50 text-red-700' },
                    { label: 'Fully Delivered', value: mockAlertHistory.filter(a => a.deliveryStatus === 'delivered').length, color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Total Recipients', value: mockAlertHistory.reduce((s, a) => s + a.recipientCount, 0).toLocaleString(), color: 'bg-purple-50 text-purple-700' },
                ].map((s, i) => (
                    <div key={i} className={`${s.color} p-4 rounded-xl text-center`}>
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Alert ID</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Target Area</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Delivery</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Recipients</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">Sent Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockAlertHistory.map(a => (
                                <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{a.id}</td>
                                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-[250px] truncate">{a.title}</td>
                                    <td className="px-4 py-3 text-slate-600">{a.targetArea}</td>
                                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${priorityColors[a.priority]}`}>{a.priority}</span></td>
                                    <td className="px-4 py-3">
                                        <span className={`flex items-center gap-1 font-bold text-sm capitalize ${deliveryColors[a.deliveryStatus]}`}>
                                            <i className={deliveryIcons[a.deliveryStatus]}></i> {a.deliveryStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-slate-700">{a.recipientCount.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-slate-500 text-xs">{a.sentDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
