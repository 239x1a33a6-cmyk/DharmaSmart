// PHC Management Module for Super Admin
import React, { useState } from 'react';
import { mockPHCs, mockDistricts } from '../../mocks/admin-mock-data';
import DataTable, { Column } from '../../components/admin/DataTable';
import FilterBar, { Filter } from '../../components/admin/FilterBar';
import type { PHC } from '../../types/admin-types';

export default function PhcManagement() {
    const [filteredData, setFilteredData] = useState(mockPHCs);
    const [selectedPHC, setSelectedPHC] = useState<PHC | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const filters: Filter[] = [
        { id: 'search', label: 'Search', type: 'search', placeholder: 'Search by name or code...' },
        {
            id: 'district',
            label: 'Filt by District',
            type: 'select',
            options: mockDistricts.map((d) => ({ label: d.name, value: d.id })),
        },
        {
            id: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Maintenance', value: 'maintenance' },
            ],
        },
    ];

    const columns: Column<PHC>[] = [
        {
            key: 'code',
            label: 'PHC Code',
            sortable: true,
            render: (row) => <span className="font-mono text-sm font-bold text-slate-700">{row.code}</span>,
        },
        {
            key: 'name',
            label: 'PHC Name',
            sortable: true,
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-900">{row.name}</p>
                    <p className="text-xs text-slate-400">{row.districtName}</p>
                </div>
            ),
        },
        {
            key: 'population',
            label: 'Population',
            sortable: true,
            render: (row) => row.population.toLocaleString(),
        },
        {
            key: 'ashaWorkers',
            label: 'ASHA Workers',
            sortable: true,
        },
        {
            key: 'performanceScore',
            label: 'Performance',
            sortable: true,
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${row.performanceScore >= 90
                                    ? 'bg-emerald-500'
                                    : row.performanceScore >= 70
                                        ? 'bg-blue-500'
                                        : 'bg-orange-500'
                                }`}
                            style={{ width: `${row.performanceScore}%` }}
                        ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">{row.performanceScore}%</span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600'
                            : row.status === 'maintenance'
                                ? 'bg-orange-50 text-orange-600'
                                : 'bg-slate-100 text-slate-600'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
    ];

    const handleFilterChange = (filters: Record<string, any>) => {
        let filtered = [...mockPHCs];

        if (filters.search) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                    p.code.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.district) {
            filtered = filtered.filter((p) => p.districtId === filters.district);
        }

        if (filters.status) {
            filtered = filtered.filter((p) => p.status === filters.status);
        }

        setFilteredData(filtered);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">PHC Management</h2>
                    <p className="text-slate-500 font-medium mt-1">
                        Manage Primary Health Centers across {mockDistricts.length} districts
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center space-x-2"
                >
                    <i className="ri-add-line"></i>
                    <span>Add New PHC</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <i className="ri-hospital-line text-2xl text-teal-500"></i>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                            +{mockPHCs.filter((p) => p.status === 'active').length}
                        </span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">{mockPHCs.length}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">Total PHCs</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <i className="ri-check-double-line text-2xl text-emerald-500"></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">
                        {mockPHCs.filter((p) => p.status === 'active').length}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">Active</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <i className="ri-tools-line text-2xl text-orange-500"></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">
                        {mockPHCs.filter((p) => p.status === 'maintenance').length}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">In Maintenance</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <i className="ri-percent-line text-2xl text-blue-500"></i>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">
                        {Math.round(
                            mockPHCs.reduce((sum, p) => sum + p.performanceScore, 0) / mockPHCs.length
                        )}
                        %
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">Avg Performance</p>
                </div>
            </div>

            {/* Filters */}
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            {/* PHC Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                onRowClick={(phc) => setSelectedPHC(phc)}
                emptyMessage="No PHCs found"
            />

            {/* PHC Detail Modal */}
            {selectedPHC && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">{selectedPHC.name}</h3>
                            <button
                                onClick={() => setSelectedPHC(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Code</p>
                                    <p className="font-mono font-bold text-slate-900">{selectedPHC.code}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">District</p>
                                    <p className="font-bold text-slate-900">{selectedPHC.districtName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Population Served</p>
                                    <p className="font-bold text-slate-900">{selectedPHC.population.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">ASHA Workers</p>
                                    <p className="font-bold text-slate-900">{selectedPHC.ashaWorkers}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Performance Score</p>
                                    <p className="font-bold text-emerald-600">{selectedPHC.performanceScore}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Status</p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${selectedPHC.status === 'active'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-orange-50 text-orange-600'
                                            }`}
                                    >
                                        {selectedPHC.status}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Facilities</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPHC.facilities.map((facility, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                                        >
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Address</p>
                                <p className="text-sm text-slate-600">{selectedPHC.location.address}</p>
                            </div>

                            {selectedPHC.contactPhone && (
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Contact</p>
                                    <p className="text-sm font-mono text-slate-900">{selectedPHC.contactPhone}</p>
                                </div>
                            )}

                            <div className="flex space-x-3 pt-4 border-t">
                                <button className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors">
                                    Edit PHC
                                </button>
                                <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
                                    View Reports
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
