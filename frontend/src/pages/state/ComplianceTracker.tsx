// Compliance Tracking — State Admin tracks district response to advisories
import { mockDistricts } from '../../mocks/admin-mock-data';

const complianceData = [
    { advisoryId: 'SA-001', title: 'Monsoon Disease Preparedness', districts: mockDistricts.slice(0, 5).map(d => ({ name: d.name, acknowledged: true, actionTaken: 'Deployed vector control teams', timeTaken: '24h', status: 'completed' })).concat(mockDistricts.slice(5).map(d => ({ name: d.name, acknowledged: true, actionTaken: 'In progress', timeTaken: '48h', status: 'in-progress' }))) },
    { advisoryId: 'SA-002', title: 'COVID-19 Variant Surveillance', districts: [{ name: 'Hyderabad', acknowledged: true, actionTaken: 'PHC surveillance activated', timeTaken: '12h', status: 'completed' }, { name: 'Rangareddy', acknowledged: false, actionTaken: 'Pending', timeTaken: '-', status: 'pending' }] },
    { advisoryId: 'SA-003', title: 'Water Testing Directive', districts: [{ name: 'Nalgonda', acknowledged: true, actionTaken: 'Water samples collected', timeTaken: '36h', status: 'completed' }, { name: 'Khammam', acknowledged: true, actionTaken: 'Testing in progress', timeTaken: '48h', status: 'in-progress' }] },
];

const statusColors: Record<string, string> = { completed: 'bg-emerald-100 text-emerald-700', 'in-progress': 'bg-amber-100 text-amber-700', pending: 'bg-red-100 text-red-700' };

export default function ComplianceTracker() {
    const totalResponses = complianceData.flatMap(c => c.districts);
    const completed = totalResponses.filter(d => d.status === 'completed').length;
    const complianceRate = Math.round((completed / totalResponses.length) * 100);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Compliance Tracking</h2>
                <p className="text-sm text-slate-500 mt-1">Track district response to state advisories</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{complianceData.length}</p>
                    <p className="text-[10px] font-bold uppercase">Advisories Sent</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{completed}</p>
                    <p className="text-[10px] font-bold uppercase">Completed</p>
                </div>
                <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{totalResponses.filter(d => d.status === 'in-progress').length}</p>
                    <p className="text-[10px] font-bold uppercase">In Progress</p>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{complianceRate}%</p>
                    <p className="text-[10px] font-bold uppercase">Compliance Rate</p>
                </div>
            </div>

            {complianceData.map(advisory => (
                <div key={advisory.advisoryId} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono font-bold text-sm text-slate-400">{advisory.advisoryId}</span>
                        <h3 className="text-lg font-bold text-slate-900">{advisory.title}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-400 uppercase">District</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-slate-400 uppercase">Acknowledged</th>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-slate-400 uppercase">Action Taken</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-slate-400 uppercase">Time Taken</th>
                                    <th className="px-4 py-2 text-center text-xs font-bold text-slate-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {advisory.districts.map(d => (
                                    <tr key={d.name} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-2 font-bold text-slate-900">{d.name}</td>
                                        <td className="px-4 py-2 text-center">
                                            <i className={`${d.acknowledged ? 'ri-check-line text-emerald-600' : 'ri-close-line text-red-500'} text-lg`}></i>
                                        </td>
                                        <td className="px-4 py-2 text-slate-600">{d.actionTaken}</td>
                                        <td className="px-4 py-2 text-center font-mono text-slate-500">{d.timeTaken}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[d.status]}`}>{d.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
