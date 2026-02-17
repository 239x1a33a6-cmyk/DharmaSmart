// Reports & Analytics Module for Super Admin
import React, { useState } from 'react';

interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
}

export default function Reports() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const reportTemplates: ReportTemplate[] = [
        {
            id: 'user-activity',
            name: 'User Activity Report',
            description: 'Comprehensive user engagement and login statistics',
            icon: 'ri-user-line',
            category: 'users',
        },
        {
            id: 'district-performance',
            name: 'District Performance Dashboard',
            description: 'KPIs and metrics across all districts',
            icon: 'ri-bar-chart-box-line',
            category: 'districts',
        },
        {
            id: 'health-trends',
            name: 'Health Trends Analysis',
            description: 'Disease patterns and outbreak predictions',
            icon: 'ri-line-chart-line',
            category: 'health',
        },
        {
            id: 'audit-summary',
            name: 'Audit Log Summary',
            description: 'Security and compliance activity overview',
            icon: 'ri-file-list-3-line',
            category: 'security',
        },
        {
            id: 'asha-efficiency',
            name: 'ASHA Worker Efficiency',
            description: 'Performance metrics for ASHA workers',
            icon: 'ri-user-heart-line',
            category: 'users',
        },
        {
            id: 'phc-compliance',
            name: 'PHC Compliance Report',
            description: 'Facility standards and inspection results',
            icon: 'ri-hospital-line',
            category: 'districts',
        },
    ];

    const categories = [
        { id: 'all', label: 'All Reports' },
        { id: 'users', label: 'User Management' },
        { id: 'districts', label: 'Districts & PHCs' },
        { id: 'health', label: 'Health & Surveillance' },
        { id: 'security', label: 'Security & Audit' },
    ];

    const filteredReports =
        selectedCategory === 'all'
            ? reportTemplates
            : reportTemplates.filter((r) => r.category === selectedCategory);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h2>
                    <p className="text-slate-500 font-medium mt-1">
                        Generate comprehensive reports and export data
                    </p>
                </div>
                <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center space-x-2">
                    <i className="ri-add-line"></i>
                    <span>Create Custom Report</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
                    <i className="ri-file-text-line text-3xl mb-3 opacity-90"></i>
                    <h4 className="text-3xl font-black">247</h4>
                    <p className="text-xs font-bold uppercase opacity-90 mt-1">Total Reports Generated</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
                    <i className="ri-calendar-check-line text-3xl mb-3 opacity-90"></i>
                    <h4 className="text-3xl font-black">12</h4>
                    <p className="text-xs font-bold uppercase opacity-90 mt-1">Scheduled Reports</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                    <i className="ri-download-2-line text-3xl mb-3 opacity-90"></i>
                    <h4 className="text-3xl font-black">1.8K</h4>
                    <p className="text-xs font-bold uppercase opacity-90 mt-1">Downloads This Month</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
                    <i className="ri-time-line text-3xl mb-3 opacity-90"></i>
                    <h4 className="text-3xl font-black">2h ago</h4>
                    <p className="text-xs font-bold uppercase opacity-90 mt-1">Last Generated</p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Report Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <i className={`${report.icon} text-2xl text-primary`}></i>
                            </div>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <i className="ri-more-2-fill text-slate-400"></i>
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2">{report.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{report.description}</p>

                        <div className="flex items-center space-x-2 pt-4 border-t border-slate-100">
                            <button className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors">
                                Generate
                            </button>
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                                <i className="ri-calendar-line"></i>
                            </button>
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                                <i className="ri-settings-3-line"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Recent Reports</h3>
                    <p className="text-sm text-slate-500 mt-1">Your recently generated reports</p>
                </div>
                <div className="divide-y divide-slate-50">
                    {[
                        {
                            name: 'District Performance Q4 2025',
                            type: 'PDF',
                            date: '2 hours ago',
                            size: '2.4 MB',
                        },
                        {
                            name: 'User Activity January 2026',
                            type: 'Excel',
                            date: '1 day ago',
                            size: '856 KB',
                        },
                        {
                            name: 'Health Trends Analysis',
                            type: 'PDF',
                            date: '3 days ago',
                            size: '1.8 MB',
                        },
                    ].map((report, i) => (
                        <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`p-3 rounded-lg ${report.type === 'PDF' ? 'bg-red-50' : 'bg-emerald-50'
                                        }`}
                                >
                                    <i
                                        className={`ri-file-${report.type === 'PDF' ? 'pdf' : 'excel'
                                            }-line text-2xl ${report.type === 'PDF' ? 'text-red-500' : 'text-emerald-500'
                                            }`}
                                    ></i>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{report.name}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {report.type} • {report.size} • {report.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-white text-primary hover:shadow-sm rounded-lg transition-all">
                                    <i className="ri-download-2-line text-lg"></i>
                                </button>
                                <button className="p-2 hover:bg-white text-slate-400 hover:text-slate-600 hover:shadow-sm rounded-lg transition-all">
                                    <i className="ri-share-line text-lg"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
