import { useState, useMemo } from 'react';
import { useSurveillance } from '../../context/SurveillanceContext';
import { useNavigate } from 'react-router-dom';
import RiskMap from '../district/RiskMap';

export default function AuthorityDashboard() {
  const { districtStats, villageStats, simulateOutbreak, resetSimulation } = useSurveillance();
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = async () => {
    setIsSimulating(true);
    await simulateOutbreak();
    setIsSimulating(false);
  };

  const highRiskVillages = useMemo(() => {
    return Object.values(villageStats).filter(v => v.riskLevel === 'High' || v.riskLevel === 'Critical');
  }, [villageStats]);

  const sortedVillages = useMemo(() => {
    return Object.values(villageStats).sort((a, b) => b.riskScore - a.riskScore);
  }, [villageStats]);

  if (!districtStats) return <div>Loading Analytics...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Removed - Managed by DistrictLayout */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm px-6 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy">District Health Intelligence Overview</h2>
          <p className="text-xs text-gray-400">Jorhat Surveillance Unit • Real-time Data</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetSimulation}
            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSimulation}
            disabled={isSimulating}
            className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center shadow-sm"
          >
            <i className={`ri-test-tube-line mr-1 ${isSimulating ? 'animate-spin' : ''}`}></i>
            {isSimulating ? 'Simulating...' : 'Simulate Outbreak'}
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="px-4 py-1.5 bg-navy text-white rounded-lg text-xs font-bold hover:bg-navy-dark transition-colors shadow-lg shadow-navy/20 flex items-center"
          >
            <i className="ri-file-chart-line mr-2"></i> Collector Report
          </button>
        </div>
      </div>

      <main className="flex-1 p-6 w-full space-y-6">

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {/* Card 1: Total Villages */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Villages Monitored</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-navy">{sortedVillages.length}</h3>
              <i className="ri-community-line text-gray-300 text-xl"></i>
            </div>
          </div>

          {/* Card 2: Active Alerts */}
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute right-0 top-0 w-16 h-16 bg-red-100 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <div className="relative z-10">
              <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider">Active Alerts</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-red-600">{highRiskVillages.length}</h3>
                <i className="ri-alarm-warning-fill text-red-300 text-xl"></i>
              </div>
            </div>
          </div>

          {/* Card 3: High Risk Villages */}
          <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm flex flex-col justify-between h-full">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">High Risk Villages</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-navy">{highRiskVillages.length}</h3>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Action Req.</span>
            </div>
          </div>

          {/* Card 4: Medium Risk Villages */}
          <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-400 shadow-sm flex flex-col justify-between h-full">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Medium Risk</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-navy">{sortedVillages.filter(v => v.riskLevel === 'Medium').length}</h3>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">Monitor</span>
            </div>
          </div>

          {/* Card 5: Symptom Reports */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Symptom Reports</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-navy">{districtStats.totalActiveCases + 42} <span className="text-xs text-gray-400 font-normal">/ 7 days</span></h3>
              <i className="ri-file-list-3-line text-blue-300 text-xl"></i>
            </div>
          </div>

          {/* Card 6: Water Unsafe */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Water Unsafe</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-navy">{districtStats.waterIncidents}</h3>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">Sources</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Main Map Area */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full relative group">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-navy flex items-center">
                <i className="ri-map-pin-line mr-2"></i> Geographic Heatmap (Satellite Control)
              </h3>
              <div className="flex space-x-2">
                <button onClick={() => navigate('/district/risk-map')} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-navy shadow-sm hover:bg-gray-50 transition-colors flex items-center">
                  <i className="ri-external-link-line mr-1"></i> Full View
                </button>
              </div>
            </div>
            <div className="flex-1 relative bg-blue-50/30 overflow-hidden">
              {/* Embed the RiskMap logic directly or as a component */}
              <RiskMap />
            </div>
          </div>

          {/* Right Panel: Alerts & Recommendations */}
          <div className="space-y-6">

            {/* Active Alerts */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 bg-red-50 flex items-center justify-between">
                <h3 className="font-bold text-red-800 flex items-center">
                  <i className="ri-alarm-warning-fill mr-2"></i> Priority Alerts
                </h3>
                <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded-full text-xs font-bold">
                  {highRiskVillages.length > 0 ? highRiskVillages.length : 0}
                </span>
              </div>
              <div className="p-0">
                {highRiskVillages.length > 0 ? (
                  highRiskVillages.map((v, i) => (
                    <div key={i} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-navy">{v.village} Outbreak Risk</h4>
                        <span className="text-[10px] text-gray-400">Just now</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        Rapid escalation in {v.clusterReason || 'symptom reports'}. {v.activeCases} active cases reported in last 48h.
                      </p>
                      <div className="flex space-x-2">
                        <button className="flex-1 py-1.5 bg-navy text-white text-xs font-bold rounded hover:bg-navy-dark transition-colors">
                          Dispatch Team
                        </button>
                        <button className="px-3 py-1.5 border border-gray-200 text-navy text-xs font-bold rounded hover:bg-gray-50 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <i className="ri-checkbox-circle-line text-4xl mb-2 text-green-500"></i>
                    <p className="text-sm">No critical alerts requiring action.</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Insight Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-navy rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <i className="ri-brain-fill text-6xl"></i>
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                  <i className="ri-magic-line text-yellow-400"></i>
                  <h3 className="font-bold text-sm tracking-wide uppercase">AI Insight</h3>
                </div>
                {districtStats.trend === 'increasing' ? (
                  <>
                    <p className="text-sm font-medium leading-relaxed opacity-90 mb-4">
                      Predictive models indicate a <strong>High Probability</strong> of cholera spread to <em>Majuli Central</em> block within 72 hours due to water contamination patterns.
                    </p>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-xs font-bold transition-colors">
                      View Prevention Plan
                    </button>
                  </>
                ) : (
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    Surveillance data indicates stable health parameters across all blocks. Routine monitoring recommended.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
