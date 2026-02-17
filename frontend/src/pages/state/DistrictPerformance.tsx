// District Performance Monitor — State Admin tracks all districts
import { useNavigate } from 'react-router-dom';
import { mockDistricts } from '../../mocks/admin-mock-data';
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

const districtPerformance = mockDistricts.map(d => {
    const analytics = districtAnalyticsData[d.name];
    return {
        name: d.name,
        riskScore: analytics?.riskScore || d.riskIndex,
        activeCases: analytics?.activeCases || 0,
        totalCases: analytics?.totalCases || 0,
        responseTime: Math.floor(Math.random() * 48) + 12 + 'h',
        healthCamps: Math.floor(Math.random() * 30) + 5,
        ashaCoverage: Math.floor(Math.random() * 30) + 65,
        complianceScore: d.complianceScore,
        phcCount: d.phcCount,
        ashaCount: d.ashaCount,
        population: d.population,
    };
}).sort((a, b) => b.riskScore - a.riskScore);

function getStatusColor(score: number) {
    if (score >= 80) return 'bg-emerald-100 text-emerald-700';
    if (score >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
}

export default function DistrictPerformance() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">District Performance Monitor</h2>
                <p className="text-sm text-slate-500 mt-1">Track how all {mockDistricts.length} districts are responding to health directives</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Districts', value: mockDistricts.length, color: 'bg-indigo-50 text-indigo-700' },
                    { label: 'High Risk', value: districtPerformance.filter(d => d.riskScore > 70).length, color: 'bg-red-50 text-red-700' },
                    { label: 'Avg. Compliance', value: Math.round(districtPerformance.reduce((s, d) => s + d.complianceScore, 0) / districtPerformance.length) + '%', color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Total PHCs', value: mockDistricts.reduce((s, d) => s + d.phcCount, 0), color: 'bg-blue-50 text-blue-700' },
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
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">District</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Risk Score</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Active Cases</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Response Time</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Health Camps</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">ASHA Coverage</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Compliance</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {districtPerformance.map(d => (
                                <tr key={d.name} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <p className="font-bold text-slate-900">{d.name}</p>
                                        <p className="text-xs text-slate-400">Pop: {(d.population / 1000000).toFixed(1)}M • {d.phcCount} PHCs</p>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-lg font-black" style={{ color: getRiskColor(d.riskScore) }}>{d.riskScore}</span>
                                        <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(d.riskScore) }}>{getRiskLabel(d.riskScore)}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center font-bold text-slate-900">{d.activeCases}</td>
                                    <td className="px-4 py-3 text-center text-slate-600">{d.responseTime}</td>
                                    <td className="px-4 py-3 text-center font-bold text-slate-700">{d.healthCamps}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${d.ashaCoverage >= 80 ? 'text-emerald-600' : d.ashaCoverage >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{d.ashaCoverage}%</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(d.complianceScore)}`}>{d.complianceScore}%</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button onClick={() => navigate('/state/advisory-generator')} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors">Send Advisory</button>
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
