import React from 'react';

export default function DistrictReports() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Reports & Downloads</h1>
                    <p className="text-gray-500">Official epidemiological reports and data exports</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                        <i className="ri-file-pdf-fill text-red-500 text-xl"></i>
                    </div>
                    <h3 className="font-bold text-navy mb-1">Daily Situation Report</h3>
                    <p className="text-xs text-gray-500 mb-4">Generated automatically at 08:00 AM</p>
                    <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Download PDF</button>
                </div>
            </div>
        </div>
    );
}
