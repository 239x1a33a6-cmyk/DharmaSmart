import React from 'react';
import { useSurveillance } from '../../context/SurveillanceContext';

export default function ResourceAllocation() {
    const { resources, updateResource } = useSurveillance();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Resource Allocation</h1>
                    <p className="text-gray-500">Central inventory and distribution</p>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 text-navy rounded-lg text-sm shadow-sm hover:bg-gray-50">
                    <i className="ri-history-line mr-2"></i> History
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-navy">
                                <i className="ri-medicine-bottle-fill text-xl"></i>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'Critical' ? 'bg-red-100 text-red-700' :
                                    item.status === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {item.status} Stock
                            </span>
                        </div>

                        <div>
                            <h3 className="font-bold text-navy text-lg">{item.item}</h3>
                            <div className="flex items-baseline mt-1">
                                <span className="text-2xl font-bold text-gray-800">{item.currentStock}</span>
                                <span className="text-sm text-gray-500 ml-1">/ {item.requiredStock} {item.unit}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <button
                                onClick={() => updateResource(item.item, 100)}
                                className="w-full py-2 bg-navy text-white text-xs font-bold rounded hover:bg-navy-dark transition-colors"
                            >
                                Re-stock (+100)
                            </button>
                            <button className="w-full py-2 border border-blue-200 text-blue-600 text-xs font-bold rounded hover:bg-blue-50 transition-colors">
                                Dispatch to PHC
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
