import { useSurveillance } from '../../context/SurveillanceContext';

export default function ClusterMonitor() {
    const { clusters, dispatchTeam, resolveCluster } = useSurveillance();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-navy">Cluster Monitor</h2>
                    <p className="text-sm text-gray-500">Active disease cluster tracking and response</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-navy hover:bg-gray-50 shadow-sm">
                        <i className="ri-download-line mr-2"></i> Export Data
                    </button>
                    <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-bold hover:bg-navy-dark shadow-lg">
                        <i className="ri-add-line mr-2"></i> Manual Entry
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clusters.map((cluster) => (
                    <div key={cluster.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className={`absolute top-0 right-0 w-2 h-full ${cluster.status === 'Resolved' ? 'bg-green-500' :
                                cluster.status === 'Response Sent' ? 'bg-blue-500' :
                                    cluster.riskScore > 80 ? 'bg-red-500' : 'bg-orange-500'
                            }`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID: {cluster.id}</span>
                                <h3 className="text-xl font-bold text-navy mt-1">{cluster.village}</h3>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${cluster.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                    cluster.status === 'Response Sent' ? 'bg-blue-100 text-blue-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {cluster.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Risk Score</span>
                                <span className="font-bold text-navy">{cluster.riskScore}/100</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${cluster.riskScore > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${cluster.riskScore}%` }}></div>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span className="text-gray-500">Confirmed Cases</span>
                                <span className="font-bold text-navy">{cluster.cases}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date Detected</span>
                                <span className="font-bold text-navy">{new Date(cluster.dateDetected).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex space-x-3 pt-4 border-t border-gray-50">
                            {cluster.status === 'Detected' || cluster.status === 'Verified' ? (
                                <button
                                    onClick={() => dispatchTeam(cluster.id)}
                                    className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                                >
                                    Dispatch RRT
                                </button>
                            ) : cluster.status === 'Response Sent' ? (
                                <button
                                    onClick={() => resolveCluster(cluster.id)}
                                    className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                                >
                                    Mark Resolved
                                </button>
                            ) : (
                                <button className="flex-1 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-bold cursor-not-allowed">
                                    Archived
                                </button>
                            )}
                            <button className="px-3 py-2 border border-gray-200 text-navy rounded-lg hover:bg-gray-50">
                                <i className="ri-file-list-line"></i>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Placeholder for no clusters if empty, though demo data has one */}
                {clusters.length === 0 && (
                    <div className="col-span-3 p-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <i className="ri-shield-check-line text-5xl mb-3"></i>
                        <p>No active disease clusters detected.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
