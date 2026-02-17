import DistrictRiskMap from '../../components/maps/DistrictRiskMap';

export default function StateMapView() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Telangana State Map View</h2>
                <p className="text-sm text-slate-500 mt-1">Full state map with risk-based coloring</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
                <DistrictRiskMap loggedInDistrict="All" userRole="state_admin" />
            </div>
        </div>
    );
}
