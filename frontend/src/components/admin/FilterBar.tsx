// Advanced Filter Bar Component
import React, { useState } from 'react';

export interface FilterOption {
    label: string;
    value: string;
}

export interface Filter {
    id: string;
    label: string;
    type: 'select' | 'multiselect' | 'daterange' | 'search';
    options?: FilterOption[];
    placeholder?: string;
}

interface FilterBarProps {
    filters: Filter[];
    onFilterChange: (filters: Record<string, any>) => void;
    onClear?: () => void;
}

export default function FilterBar({ filters, onFilterChange, onClear }: FilterBarProps) {
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    const handleFilterChange = (filterId: string, value: any) => {
        const newFilters = { ...filterValues, [filterId]: value };
        setFilterValues(newFilters);
        onFilterChange(newFilters);
    };

    const handleClear = () => {
        setFilterValues({});
        onFilterChange({});
        onClear?.();
    };

    const hasActiveFilters = Object.values(filterValues).some(
        (val) => val !== undefined && val !== '' && (Array.isArray(val) ? val.length > 0 : true)
    );

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center text-slate-600 mr-2">
                    <i className="ri-filter-3-line text-lg mr-2"></i>
                    <span className="text-sm font-bold">Filters:</span>
                </div>

                {filters.map((filter) => (
                    <div key={filter.id} className="flex-shrink-0">
                        {filter.type === 'search' && (
                            <div className="relative">
                                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input
                                    type="text"
                                    placeholder={filter.placeholder || 'Search...'}
                                    value={filterValues[filter.id] || ''}
                                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
                                />
                            </div>
                        )}

                        {filter.type === 'select' && filter.options && (
                            <select
                                value={filterValues[filter.id] || ''}
                                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                            >
                                <option value="">{filter.label}</option>
                                {filter.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}

                        {filter.type === 'daterange' && (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="date"
                                    value={filterValues[`${filter.id}_start`] || ''}
                                    onChange={(e) => handleFilterChange(`${filter.id}_start`, e.target.value)}
                                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                                <span className="text-slate-400">to</span>
                                <input
                                    type="date"
                                    value={filterValues[`${filter.id}_end`] || ''}
                                    onChange={(e) => handleFilterChange(`${filter.id}_end`, e.target.value)}
                                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="ml-auto px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-1"
                    >
                        <i className="ri-close-circle-line"></i>
                        <span>Clear All</span>
                    </button>
                )}
            </div>

            {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(filterValues).map(([key, value]) => {
                        if (!value || (Array.isArray(value) && value.length === 0)) return null;
                        const filter = filters.find((f) => f.id === key || key.startsWith(f.id));
                        if (!filter) return null;

                        return (
                            <span
                                key={key}
                                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                                {filter.label}: <strong className="ml-1">{value}</strong>
                                <button
                                    onClick={() => handleFilterChange(key, undefined)}
                                    className="ml-2 hover:text-primary-dark"
                                >
                                    <i className="ri-close-line"></i>
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
