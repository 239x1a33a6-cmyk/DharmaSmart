import React from 'react';
import { useSurveillance } from '../../context/SurveillanceContext';

export default function PhcMonitor() {
    const { phcMetrics } = useSurveillance();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">PHC & ASHA Monitor</h1>
                    <p className="text-gray-500">Performance tracking and facility status</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            <th className="p-4">Facility Name</th>
                            <th className="p-4">Medical Officer</th>
                            <th className="p-4">Active Cases Managed</th>
                            <th className="p-4">Resources</th>
                            <th className="p-4">Last Report</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {phcMetrics.map(phc => (
                            <tr key={phc.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold text-navy">{phc.name}</td>
                                <td className="p-4 text-sm text-gray-600">{phc.medicalOfficer}</td>
                                <td className="p-4 text-sm font-bold text-navy">{phc.activeCases}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${phc.resourcesStatus === 'Critical' ? 'bg-red-100 text-red-700' :
                                            phc.resourcesStatus === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {phc.resourcesStatus}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-gray-400 mono">{phc.lastReport}</td>
                                <td className="p-4 text-right">
                                    <button className="text-blue-600 hover:text-navy font-bold text-xs">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
