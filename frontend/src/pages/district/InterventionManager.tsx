import React from 'react';

export default function InterventionManager() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Intervention Manager</h1>
                    <p className="text-gray-500">Track and manage field operations</p>
                </div>
                <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm shadow-lg hover:bg-navy-dark">
                    <i className="ri-add-line mr-2"></i> New Intervention
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Campaign Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Active</span>
                        <i className="ri-edit-line text-gray-400 hover:text-navy cursor-pointer"></i>
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">Majuli Chlorine Drive</h3>
                    <p className="text-sm text-gray-500 mb-4">Distribution of chlorine tablets to 500 households in flood-affected zones.</p>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-bold text-navy">78%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <i className="ri-calendar-line mr-2"></i> Ends in 2 days
                        </div>
                    </div>
                </div>

                {/* Planned Campaign Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">Planned</span>
                        <i className="ri-edit-line text-gray-400 hover:text-navy cursor-pointer"></i>
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">Vaccination Camp - Cluster B</h3>
                    <p className="text-sm text-gray-500 mb-4">Scheduled immunization for Bishnupur residents post-outbreak.</p>

                    <div className="flex items-center text-xs text-gray-500 mt-6">
                        <i className="ri-calendar-event-line mr-2"></i> Oct 24 - Oct 26
                    </div>
                </div>
            </div>
        </div>
    );
}
