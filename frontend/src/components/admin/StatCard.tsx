// Reusable Stat Card Component for Admin Dashboard
import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    trend?: string;
    icon: string;
    color: string;
    onClick?: () => void;
    loading?: boolean;
}

export default function StatCard({ label, value, trend, icon, color, onClick, loading }: StatCardProps) {
    const isPositiveTrend = trend?.startsWith('+');
    const isNegativeTrend = trend?.startsWith('-');

    return (
        <div
            className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group ${onClick ? 'cursor-pointer' : ''
                }`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`${color} p-2 rounded-xl text-white shadow-lg`}>
                    <i className={`${icon} text-xl`}></i>
                </div>
                {trend && (
                    <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPositiveTrend
                                ? 'bg-emerald-50 text-emerald-600'
                                : isNegativeTrend
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-slate-50 text-slate-600'
                            }`}
                    >
                        {trend}
                    </span>
                )}
            </div>
            {loading ? (
                <div className="space-y-2">
                    <div className="h-6 bg-slate-100 rounded animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse"></div>
                </div>
            ) : (
                <>
                    <h4 className="text-2xl font-black text-slate-900">{value}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
                </>
            )}
        </div>
    );
}
