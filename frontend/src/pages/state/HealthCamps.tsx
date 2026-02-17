// Health Camp & ASHA Activity Tracking — State Admin
import { mockDistricts } from '../../mocks/admin-mock-data';

const campData = mockDistricts.map(d => ({
    district: d.name,
    campsCompleted: Math.floor(Math.random() * 25) + 10,
    campsPlanned: Math.floor(Math.random() * 15) + 5,
    awarenessAttendance: Math.floor(Math.random() * 5000) + 2000,
    ashaEngagement: Math.floor(Math.random() * 25) + 70,
    feedbackRating: (Math.random() * 1.5 + 3.5).toFixed(1),
    ashaCount: d.ashaCount,
}));

const totalCamps = campData.reduce((s, d) => s + d.campsCompleted, 0);
const totalAttendance = campData.reduce((s, d) => s + d.awarenessAttendance, 0);
const avgEngagement = Math.round(campData.reduce((s, d) => s + d.ashaEngagement, 0) / campData.length);

export default function HealthCamps() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Health Camp & ASHA Activity Tracking</h2>
                <p className="text-sm text-slate-500 mt-1">Monitor community-level health actions across all districts</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-pink-50 text-pink-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{totalCamps}</p>
                    <p className="text-[10px] font-bold uppercase">Camps Completed</p>
                </div>
                <div className="bg-purple-50 text-purple-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{totalAttendance.toLocaleString()}</p>
                    <p className="text-[10px] font-bold uppercase">Total Attendance</p>
                </div>
                <div className="bg-teal-50 text-teal-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{avgEngagement}%</p>
                    <p className="text-[10px] font-bold uppercase">Avg ASHA Engagement</p>
                </div>
                <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-center">
                    <p className="text-2xl font-black">{mockDistricts.reduce((s, d) => s + d.ashaCount, 0)}</p>
                    <p className="text-[10px] font-bold uppercase">Total ASHA Workers</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">District</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">ASHA Workers</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Camps Done</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Camps Planned</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Attendance</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">ASHA Engagement</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {campData.map(d => (
                                <tr key={d.district} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 font-bold text-slate-900">{d.district}</td>
                                    <td className="px-4 py-3 text-center text-slate-700">{d.ashaCount}</td>
                                    <td className="px-4 py-3 text-center font-bold text-emerald-600">{d.campsCompleted}</td>
                                    <td className="px-4 py-3 text-center text-blue-600">{d.campsPlanned}</td>
                                    <td className="px-4 py-3 text-center text-slate-700">{d.awarenessAttendance.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`font-bold ${d.ashaEngagement >= 85 ? 'text-emerald-600' : d.ashaEngagement >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{d.ashaEngagement}%</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="flex items-center justify-center gap-1 font-bold text-amber-500"><i className="ri-star-fill"></i>{d.feedbackRating}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
