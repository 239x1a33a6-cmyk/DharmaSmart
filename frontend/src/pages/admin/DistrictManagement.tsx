import React, { useState } from 'react';
import { mockDistricts } from '../../mocks/admin-mock-data';
import DataTable, { Column } from '../../components/admin/DataTable';
import FilterBar, { Filter } from '../../components/admin/FilterBar';
import StatCard from '../../components/admin/StatCard';
import type { District } from '../../types/admin-types';

export default function DistrictManagement() {
    const [filteredData, setFilteredData] = useState(mockDistricts);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Filter Configuration
    const filters: Filter[] = [
        { id: 'search', label: 'Search', type: 'search', placeholder: 'Search district, code or collector...' },
        {
            id: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Suspected', value: 'suspected' }, // Typo in mock data? 'suspended'
                { label: 'Inactive', value: 'inactive' },
            ]
        },
        {
            id: 'risk',
            label: 'Risk Level',
            type: 'select',
            options: [
                { label: 'High Risk (>80)', value: 'high' },
                { label: 'Medium Risk (50-80)', value: 'medium' },
                { label: 'Low Risk (<50)', value: 'low' },
            ]
        }
    ];

    // Table Columns
    const columns: Column<District>[] = [
        {
            key: 'name',
            label: 'District Name',
            sortable: true,
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-900">{row.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{row.code}</p>
                </div>
            )
        },
        {
            key: 'districtCollector',
            label: 'District Collector',
            sortable: true,
            render: (row) => row.districtCollector || <span className="text-slate-400 italic">Unassigned</span>
        },
        {
            key: 'phcCount',
            label: 'PHCs',
            sortable: true,
            render: (row) => (
                <span className="font-bold text-slate-700">{row.phcCount}</span>
            )
        },
        {
            key: 'complianceScore',
            label: 'Compliance',
            sortable: true,
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${row.complianceScore >= 90 ? 'bg-emerald-500' : row.complianceScore >= 70 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            style={{ width: `${row.complianceScore}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">{row.complianceScore}%</span>
                </div>
            )
        },
        {
            key: 'riskIndex',
            label: 'Risk Index',
            sortable: true,
            render: (row) => (
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${row.riskIndex > 80 ? 'bg-red-50 text-red-600' :
                        row.riskIndex > 50 ? 'bg-orange-50 text-orange-600' :
                            'bg-emerald-50 text-emerald-600'
                    }`}>
                    {row.riskIndex}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            key: 'id',
            label: 'Actions',
            render: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit District"
                    >
                        <i className="ri-edit-line"></i>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Suspend District"
                    >
                        <i className="ri-forbid-line"></i>
                    </button>
                </div>
            )
        }
    ];

    // Filter Logic
    const handleFilterChange = (newFilters: Record<string, any>) => {
        let result = [...mockDistricts];

        if (newFilters.search) {
            const term = newFilters.search.toLowerCase();
            result = result.filter(d =>
                d.name.toLowerCase().includes(term) ||
                d.code.toLowerCase().includes(term) ||
                (d.districtCollector && d.districtCollector.toLowerCase().includes(term))
            );
        }

        if (newFilters.status) {
            result = result.filter(d => d.status === newFilters.status);
        }

        if (newFilters.risk) {
            if (newFilters.risk === 'high') result = result.filter(d => d.riskIndex > 80);
            if (newFilters.risk === 'medium') result = result.filter(d => d.riskIndex >= 50 && d.riskIndex <= 80);
            if (newFilters.risk === 'low') result = result.filter(d => d.riskIndex < 50);
        }

        setFilteredData(result);
    };

    const handleEdit = (district: District) => {
        setSelectedDistrict(district);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedDistrict(null);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    // Derived Metrics
    const activeCount = mockDistricts.filter(d => d.status === 'active').length;
    const highRiskCount = mockDistricts.filter(d => d.riskIndex > 80).length;
    const avgCompliance = Math.round(mockDistricts.reduce((acc, d) => acc + d.complianceScore, 0) / mockDistricts.length);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">District / Tenant Management</h2>
                    <p className="text-slate-500 font-medium mt-1">Manage {mockDistricts.length} districts and their surveillance units</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-slate-700 transition-all flex items-center"
                >
                    <i className="ri-add-circle-line mr-2"></i> Register New District
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Districts"
                    value={mockDistricts.length}
                    icon="ri-map-2-line"
                    color="bg-blue-500"
                    trend="+2 this month"
                />
                <StatCard
                    label="Active Tenants"
                    value={activeCount}
                    icon="ri-building-line"
                    color="bg-emerald-500"
                    trend={`${Math.round((activeCount / mockDistricts.length) * 100)}% active`}
                />
                <StatCard
                    label="High Risk Districts"
                    value={highRiskCount}
                    icon="ri-alarm-warning-fill"
                    color="bg-red-500"
                    trend={highRiskCount > 0 ? "Requires Attention" : "All Clear"}
                />
                <StatCard
                    label="Avg Compliance"
                    value={`${avgCompliance}%`}
                    icon="ri-checkbox-circle-line"
                    color="bg-violet-500"
                    trend="+1.2%"
                />
            </div>

            {/* Filters & Table */}
            <div className="space-y-4">
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                <DataTable
                    columns={columns}
                    data={filteredData}
                    onRowClick={handleEdit}
                    emptyMessage="No districts found matching filters."
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-900">
                                {isEditMode ? 'Edit District Details' : 'Register New District'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">District Name</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedDistrict?.name}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-bold"
                                        placeholder="e.g. Jorhat"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">District Code</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedDistrict?.code}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-mono"
                                        placeholder="e.g. AS-JOR"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">State</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedDistrict?.state || 'Assam'}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">District Collector</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedDistrict?.districtCollector}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="status" defaultChecked={selectedDistrict?.status === 'active' || !selectedDistrict} className="accent-emerald-600" />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="status" defaultChecked={selectedDistrict?.status === 'suspended'} className="accent-orange-600" />
                                        <span className="text-sm font-medium">Suspended</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="status" defaultChecked={selectedDistrict?.status === 'inactive'} className="accent-slate-600" />
                                        <span className="text-sm font-medium">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { setIsModalOpen(false); /* Logic to save would go here */ }}
                                className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                            >
                                {isEditMode ? 'Save Changes' : 'Create District'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
