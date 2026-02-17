import React, { useState } from 'react';

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState('');

    const users = [
        { id: '1', name: 'Dr. Siddharth Verma', email: 'dho.jorhat@gov.in', role: 'DHO', district: 'Jorhat', status: 'Active', mfa: true },
        { id: '2', name: 'Sunita Das', email: 'sunita.asha@gov.in', role: 'ASHA_WORKER', district: 'Jorhat', status: 'Active', mfa: false },
        { id: '3', name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', role: 'COMMUNITY_MEMBER', district: 'Bankura', status: 'Inactive', mfa: false },
        { id: '4', name: 'Dr. A. Sharma', email: 'dho.bankura@gov.in', role: 'DHO', district: 'Bankura', status: 'Active', mfa: true },
    ];

    const roles = ['ALL', 'SUPER_ADMIN', 'STATE_AUTHORITY', 'DHO', 'ASHA_WORKER', 'COMMUNITY_MEMBER'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with Search and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">User & Role Management</h2>
                    <p className="text-sm text-slate-500">Manage system-wide permissions and user lifecycles</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all shadow-sm">
                        <i className="ri-file-download-line mr-2"></i> Export CSV
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center">
                        <i className="ri-user-add-line mr-2"></i> Create New User
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px] relative">
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input
                        type="text"
                        placeholder="Search by name, email or district..."
                        className="w-full pl-11 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Role</span>
                    <select className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary/20">
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <i className="ri-filter-3-line text-xl"></i>
                </button>
            </div>

            {/* User List Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Role</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Territory</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sec. (MFA)</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold mr-3 border border-slate-200">
                                                {u.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{u.name}</p>
                                                <p className="text-xs text-slate-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-tighter uppercase border
                                            ${u.role === 'DHO' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                u.role === 'ASHA_WORKER' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                    u.role === 'STATE_AUTHORITY' ? 'bg-teal-50 text-teal-600 border-teal-100' :
                                                        'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                            {u.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-xs font-medium text-slate-600">
                                            <i className="ri-map-pin-line mr-1.5 text-slate-400"></i>
                                            {u.district}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center space-x-1.5 text-[10px] font-bold ${u.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                            <span>{u.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <i className={`ri-shield-keyhole-${u.mfa ? 'fill text-emerald-500' : 'line text-slate-300'} text-lg`} title={u.mfa ? 'MFA Enabled' : 'MFA Disabled'}></i>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit">
                                                <i className="ri-edit-line text-lg"></i>
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all" title="Suspend">
                                                <i className="ri-indeterminate-circle-line text-lg"></i>
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                                <i className="ri-more-2-fill text-lg"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-6 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium font-mono uppercase">Page 1 of 24</p>
                    <div className="flex space-x-2">
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-200 cursor-not-allowed">
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mass Actions / Bulk Workspace Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                        <i className="ri-upload-cloud-2-line text-9xl"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Bulk User Provisioning</h3>
                    <p className="text-xs text-slate-400 mb-6">Upload a master CSV to seed new districts or PHCs with pre-configured workers.</p>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-all">
                        Launch Batch Importer
                    </button>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Role Matrix Control</h3>
                    <p className="text-xs text-slate-500 mb-6">Granularly toggle system permissions for each role globally across all districts.</p>
                    <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-all">
                        Edit Permission Matrix
                    </button>
                </div>
            </div>
        </div>
    );
}
