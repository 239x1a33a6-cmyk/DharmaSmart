// Risk Analytics Module — District Admin detailed analytics view
import { districtAnalyticsData, getRiskColor, getRiskLabel } from '../../data/district-geojson';

const analytics = districtAnalyticsData['Hyderabad'];

const trendData = [
    { day: 'Mon', cases: 28, recovered: 15 },
    { day: 'Tue', cases: 32, recovered: 18 },
    { day: 'Wed', cases: 25, recovered: 22 },
    { day: 'Thu', cases: 41, recovered: 20 },
    { day: 'Fri', cases: 38, recovered: 25 },
    { day: 'Sat', cases: 29, recovered: 28 },
    { day: 'Sun', cases: 22, recovered: 30 },
];

const riskFactors = [
    { factor: 'Water Contamination', score: 78, trend: 'rising', icon: 'ri-drop-line' },
    { factor: 'Disease Clusters', score: 65, trend: 'stable', icon: 'ri-virus-line' },
    { factor: 'Vector Density', score: 52, trend: 'falling', icon: 'ri-bug-line' },
    { factor: 'Sanitation Coverage', score: 71, trend: 'rising', icon: 'ri-recycle-line' },
    { factor: 'Healthcare Access', score: 45, trend: 'stable', icon: 'ri-hospital-line' },
];

const maxCases = Math.max(...trendData.map(d => d.cases));

export default function RiskAnalytics() {
    if (!analytics) return <div className="p-8 text-center text-slate-500">No analytics data available</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Risk Analytics — Hyderabad</h2>
                <p className="text-sm text-slate-500 mt-1">Detailed risk score breakdown and 7-day trends</p>
            </div>

            {/* Overall Risk Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-6">
                    <div className="w-28 h-28 rounded-full border-8 flex items-center justify-center" style={{ borderColor: getRiskColor(analytics.riskScore) }}>
                        <div className="text-center">
                            <p className="text-3xl font-black" style={{ color: getRiskColor(analytics.riskScore) }}>{analytics.riskScore}</p>
                            <p className="text-[10px] font-bold uppercase" style={{ color: getRiskColor(analytics.riskScore) }}>{getRiskLabel(analytics.riskScore)}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        <div className="bg-red-50 p-4 rounded-xl text-center">
                            <p className="text-2xl font-black text-red-700">{analytics.activeCases}</p>
                            <p className="text-[10px] text-red-600 font-bold uppercase">Active Cases</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                            <p className="text-2xl font-black text-blue-700">{analytics.totalCases}</p>
                            <p className="text-[10px] text-blue-600 font-bold uppercase">Total Cases</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl text-center">
                            <p className="text-2xl font-black text-emerald-700">{analytics.recovered}</p>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase">Recovered</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl text-center">
                            <p className="text-2xl font-black text-orange-700">{analytics.waterContaminationAlerts}</p>
                            <p className="text-[10px] text-orange-600 font-bold uppercase">Water Alerts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7-Day Trend */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">7-Day Case Trend</h3>
                <div className="flex items-end gap-3 h-40">
                    {trendData.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col items-center gap-1" style={{ height: '120px', justifyContent: 'flex-end' }}>
                                <div className="w-full bg-red-400 rounded-t-lg transition-all" style={{ height: `${(d.cases / maxCases) * 100}%`, minHeight: '4px' }} title={`${d.cases} cases`}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
                            <span className="text-[10px] font-bold text-slate-700">{d.cases}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded-sm"></span> New Cases</span>
                </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Risk Factor Breakdown</h3>
                <div className="space-y-4">
                    {riskFactors.map((rf, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="bg-slate-100 p-2.5 rounded-xl"><i className={`${rf.icon} text-lg text-slate-600`}></i></div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-slate-900 text-sm">{rf.factor}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">{rf.score}</span>
                                        <span className={`text-xs font-bold ${rf.trend === 'rising' ? 'text-red-500' : rf.trend === 'falling' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            <i className={`ri-arrow-${rf.trend === 'rising' ? 'up' : rf.trend === 'falling' ? 'down' : 'right'}-line`}></i> {rf.trend}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${rf.score}%`, backgroundColor: getRiskColor(rf.score) }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
