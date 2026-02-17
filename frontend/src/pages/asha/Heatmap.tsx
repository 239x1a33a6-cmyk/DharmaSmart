import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AshaLayout from '../../components/layout/AshaLayout';

export default function MicroHeatmap() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Simulated heatmap data points
    const points = [
        { id: 1, lat: 50, lng: 30, severity: 'High', type: 'Cholera' },
        { id: 2, lat: 45, lng: 35, severity: 'High', type: 'Cholera' },
        { id: 3, lat: 48, lng: 32, severity: 'Medium', type: 'Diarrhea' },
        { id: 4, lat: 60, lng: 60, severity: 'Low', type: 'Fever' },
        { id: 5, lat: 20, lng: 80, severity: 'Low', type: 'Skin Rash' },
    ];

    return (
        <AshaLayout title="Village Micro-Heatmap" showBack backPath="/asha/dashboard">
            <div className="flex-1 relative overflow-hidden h-full min-h-[600px] w-full">
                {/* Map Background Simulation */}
                <div className="absolute inset-0 bg-blue-50/50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* Map Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-square bg-white shadow-xl rounded-full border-4 border-white overflow-hidden">
                        {/* Village Map Placeholder */}
                        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 font-bold text-6xl opacity-20">
                            {user?.profile?.village} Map
                        </div>

                        {/* Roads / Rivers Simulation */}
                        <div className="absolute top-0 left-1/3 w-2 h-full bg-gray-300 transform rotate-12"></div>
                        <div className="absolute top-1/2 left-0 w-full h-4 bg-blue-200 transform -rotate-6"></div>

                        {/* Data Points */}
                        {points.map(p => (
                            <div
                                key={p.id}
                                className="absolute group cursor-pointer"
                                style={{ top: `${p.lat}%`, left: `${p.lng}%` }}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse ${p.severity === 'High' ? 'bg-red-500' : p.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-navy text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <p className="font-bold">{p.type}</p>
                                    <p className="opacity-70">{p.severity} Severity</p>
                                </div>
                            </div>
                        ))}

                        {/* Cluster Circle */}
                        <div className="absolute top-[42%] left-[28%] w-32 h-32 border-2 border-red-500 rounded-full bg-red-500/10 animate-ping"></div>
                    </div>
                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-8 left-8 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-10">
                    <h4 className="text-xs font-bold text-navy mb-3">Legend</h4>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="text-[10px] text-gray-500 font-bold">Critical / Cluster</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                            <span className="text-[10px] text-gray-500 font-bold">Moderate Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-[10px] text-gray-500 font-bold">Low Risk / Water</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-50">
                            <div className="w-4 h-1 bg-blue-200"></div>
                            <span className="text-[10px] text-gray-500 font-bold">Water Bodies</span>
                        </div>
                    </div>
                </div>

                {/* Alert Overlay */}
                <div className="absolute top-24 right-8 max-w-xs bg-white p-4 rounded-2xl shadow-lg border-l-4 border-red-500 z-10">
                    <div className="flex items-start space-x-3">
                        <i className="ri-alarm-warning-fill text-red-500 mt-1"></i>
                        <div>
                            <h4 className="text-xs font-bold text-navy">High Concentration Detected</h4>
                            <p className="text-[10px] text-gray-500 mt-1">
                                Cluster identified near Community Well #3. Recommend immediate field verification.
                            </p>
                            <button
                                onClick={() => navigate('/asha/cluster-detection')}
                                className="mt-2 text-[10px] font-bold text-red-600 hover:underline"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AshaLayout>
    );
}
