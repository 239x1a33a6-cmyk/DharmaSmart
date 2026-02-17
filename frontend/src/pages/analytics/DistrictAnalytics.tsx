import React, { useState } from 'react';
import { useSurveillance } from '../../context/SurveillanceContext';

export default function DistrictAnalytics() {
    const { districtStats: _districtStats } = useSurveillance();
    // Simulation for deep analytics trends
    const [_chartHeight] = useState(300);
    const [timeRange, setTimeRange] = useState('7d');

    // Dummy Chart Data (Simulated for UI)
    const _chartHeightValue = 200;
    const dataPoints = [12, 15, 18, 14, 22, 28, 35]; // Last 7 days
    const maxVal = Math.max(...dataPoints);

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">AI Trend & Predictive Analytics</h1>
                    <p className="text-gray-500 text-sm">Jorhat District • Predictive Confidence: <span className="text-green-600 font-bold">94%</span></p>
                </div>
                <div className="flex space-x-3">
                    <select
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 focus:ring-navy focus:border-navy"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last Quarter</option>
                    </select>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-navy font-bold rounded-lg text-sm shadow-sm hover:bg-gray-50 flex items-center">
                        <i className="ri-file-pdf-line mr-2"></i> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chart Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-navy">Epidemic Curve (Predicted)</h3>
                        <div className="flex items-center space-x-2 text-xs">
                            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span> Actual</span>
                            <span className="flex items-center"><span className="w-2 h-2 bg-red-400 rounded-full mr-1 border border-red-400 border-dashed"></span> AI Projection</span>
                        </div>
                    </div>

                    {/* Custom CSS Chart */}
                    <div className="h-64 w-full flex items-end justify-between space-x-2 px-4 relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                            <div className="border-t border-gray-900 w-full h-0"></div>
                            <div className="border-t border-gray-900 w-full h-0"></div>
                            <div className="border-t border-gray-900 w-full h-0"></div>
                            <div className="border-t border-gray-900 w-full h-0"></div>
                        </div>

                        {dataPoints.map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group relative">
                                <div
                                    style={{ height: `${(val / maxVal) * 100}%` }}
                                    className={`w-full rounded-t-sm transition-all duration-500 ${i > 4 ? 'bg-red-400/80 bg-[url("/stripes.png")]' : 'bg-blue-500'}`}
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                    {i > 4 ? 'Predicted: ' : 'Actual: '} {val} Cases
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 text-xs text-gray-400 font-mono">
                        <span>Day 1</span>
                        <span>Day 2</span>
                        <span>Day 3</span>
                        <span>Day 4</span>
                        <span>Day 5</span>
                        <span>Day 6</span>
                        <span>Day 7 (Today)</span>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex items-start">
                        <i className="ri-lightbulb-flash-line text-yellow-600 mr-3 mt-0.5"></i>
                        <div>
                            <h4 className="font-bold text-yellow-800 text-sm">AI Insight</h4>
                            <p className="text-xs text-yellow-700 mt-1">
                                Spike in <strong>Majuli</strong> correlates with recent rainfall (92% confidence).
                                Expect <strong>+24%</strong> increase in cases over next 48h if water sources are not treated.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Side Metrics */}
                <div className="space-y-6">

                    {/* R-Naught Meter */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Reproduction Rate (R0)</h3>
                        <div className="relative w-40 h-20 mx-auto overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-t-full"></div>
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-t-full origin-bottom transition-transform duration-1000"
                                style={{ transform: 'rotate(45deg)' }} // Dummy rotation for visual
                            ></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-white rounded-t-full flex items-end justify-center pb-2">
                                <span className="text-3xl font-bold text-navy">2.4</span>
                            </div>
                        </div>
                        <p className="text-xs text-red-500 font-bold mt-2 flex items-center justify-center">
                            <i className="ri-arrow-up-line"></i> Rising Rapidly
                        </p>
                    </div>

                    {/* Hotspot List */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-navy mb-4">Emerging Hotspots</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Majuli', risk: 85, trend: 'up' },
                                { name: 'Bishnupur', risk: 62, trend: 'up' },
                                { name: 'Garmur', risk: 45, trend: 'stable' }
                            ].map((h, i) => (
                                <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div>
                                        <h4 className="font-bold text-gray-700 text-sm">{h.name}</h4>
                                        <div className="w-24 bg-gray-100 h-1.5 rounded-full mt-1">
                                            <div className={`h-1.5 rounded-full ${h.risk > 70 ? 'bg-red-500' : h.risk > 50 ? 'bg-orange-500' : 'bg-yellow-500'}`} style={{ width: `${h.risk}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-navy text-sm">{h.risk}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
