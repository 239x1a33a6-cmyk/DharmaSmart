import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    districtBoundaries,
    districtAnalyticsData,
    getRiskColor,
    getRiskLabel,
    type DistrictAnalytics,
} from '../../data/district-geojson';

interface DistrictRiskMapProps {
    loggedInDistrict: string; // e.g. 'Hyderabad'
    userRole: 'district_collector' | 'state_admin' | 'super_admin';
    onDistrictClick?: (district: string) => void;
}

// Component to fit map bounds to the filtered features
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression | null }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
        }
    }, [bounds, map]);
    return null;
}

// Legend component
function Legend() {
    const map = useMap();
    useEffect(() => {
        const legend = new L.Control({ position: 'bottomright' });
        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            div.style.cssText = 'background:white;padding:10px 14px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.15);font-family:system-ui;font-size:11px;line-height:1.8;';
            div.innerHTML = `
                <div style="font-weight:800;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:4px;">Risk Levels</div>
                <div><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:#31a354;margin-right:6px;vertical-align:middle;"></span> Low (0–40)</div>
                <div><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:#feb24c;margin-right:6px;vertical-align:middle;"></span> Moderate (41–60)</div>
                <div><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:#fd8d3c;margin-right:6px;vertical-align:middle;"></span> High (61–80)</div>
                <div><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:#e31a1c;margin-right:6px;vertical-align:middle;"></span> Critical (81–100)</div>
            `;
            return div;
        };
        legend.addTo(map);
        return () => { legend.remove(); };
    }, [map]);
    return null;
}

export default function DistrictRiskMap({ loggedInDistrict, userRole, onDistrictClick }: DistrictRiskMapProps) {
    const [riskMapEnabled, setRiskMapEnabled] = useState(true);
    const [bounds, setBounds] = useState<L.LatLngBoundsExpression | null>(null);
    const geoJsonRef = useRef<L.GeoJSON | null>(null);

    // Filter features based on role
    const filteredFeatures: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: userRole === 'district_collector'
            ? districtBoundaries.features.filter(
                f => f.properties?.DISTRICT.toLowerCase() === loggedInDistrict.toLowerCase()
            )
            : districtBoundaries.features,
    };

    const noMatch = filteredFeatures.features.length === 0;

    // Calculate bounds when features are loaded
    useEffect(() => {
        if (filteredFeatures.features.length > 0) {
            const layer = L.geoJSON(filteredFeatures);
            setBounds(layer.getBounds());
        }
    }, [loggedInDistrict, userRole]);

    const getAnalytics = (districtName: string): DistrictAnalytics | undefined => {
        return districtAnalyticsData[districtName];
    };

    const style = (feature: GeoJSON.Feature | undefined) => {
        if (!feature?.properties) return {};
        const districtName = feature.properties.DISTRICT;
        const analytics = getAnalytics(districtName);
        const riskScore = analytics?.riskScore || 50;

        return {
            color: '#003366',
            weight: userRole === 'district_collector' ? 4 : 2,
            fillColor: riskMapEnabled ? getRiskColor(riskScore) : '#3388ff',
            fillOpacity: 0.4,
        };
    };

    const highlightFeature = (e: L.LeafletMouseEvent) => {
        const layer = e.target;
        layer.setStyle({
            weight: 6,
            color: '#000000',
            fillOpacity: 0.6,
        });
        layer.bringToFront();
    };

    const resetHighlight = (e: L.LeafletMouseEvent) => {
        if (geoJsonRef.current) {
            geoJsonRef.current.resetStyle(e.target);
        }
    };

    const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
        const districtName = feature.properties?.DISTRICT || 'Unknown';
        const analytics = getAnalytics(districtName);

        if (analytics) {
            (layer as L.Path).bindPopup(`
                <div style="font-family:system-ui;min-width:220px;">
                    <div style="background:#0f172a;color:white;padding:10px 14px;border-radius:10px 10px 0 0;margin:-14px -18px 10px;">
                        <div style="font-size:13px;font-weight:800;">${districtName} District</div>
                        <div style="font-size:10px;opacity:0.6;text-transform:uppercase;">Health Surveillance Analytics</div>
                    </div>
                    <div style="padding:0 2px;">
                        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:11px;">Total Cases</span>
                            <strong style="font-size:12px;">${analytics.totalCases}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:11px;">Active Cases</span>
                            <strong style="font-size:12px;color:#dc2626;">${analytics.activeCases}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:11px;">Recovered</span>
                            <strong style="font-size:12px;color:#16a34a;">${analytics.recovered}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="color:#64748b;font-size:11px;">Water Alerts</span>
                            <strong style="font-size:12px;color:#ea580c;">${analytics.waterContaminationAlerts}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:4px 0;margin-top:4px;">
                            <span style="color:#64748b;font-size:11px;">Risk Score</span>
                            <span style="font-size:12px;font-weight:900;color:${getRiskColor(analytics.riskScore)};">${analytics.riskScore} (${getRiskLabel(analytics.riskScore)})</span>
                        </div>
                        <div style="margin-top:6px;font-size:9px;color:#94a3b8;text-align:right;">
                            Updated: ${new Date(analytics.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `, { className: 'district-popup', maxWidth: 280 });
        }

        (layer as L.Path).on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: () => onDistrictClick?.(districtName),
        });
    };

    if (noMatch) {
        return (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                <i className="ri-map-pin-line text-4xl text-amber-400 mb-3"></i>
                <p className="font-bold text-amber-800">District Boundary Not Found in GeoJSON</p>
                <p className="text-xs text-amber-600 mt-1">No matching boundary for "{loggedInDistrict}"</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Map Controls */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <i className="ri-map-2-line text-teal-600"></i>
                    District Risk Map
                    {userRole === 'district_collector' && (
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-[9px] font-bold uppercase">
                            {loggedInDistrict} Only
                        </span>
                    )}
                </h3>
                <button
                    onClick={() => setRiskMapEnabled(!riskMapEnabled)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${riskMapEnabled
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                >
                    <i className={`ri-${riskMapEnabled ? 'eye' : 'eye-off'}-line mr-1`}></i>
                    {riskMapEnabled ? 'Risk View ON' : 'Risk View OFF'}
                </button>
            </div>

            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg" style={{ height: 420 }}>
                <MapContainer
                    center={[17.385, 78.4867]}
                    zoom={8}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        key={`${loggedInDistrict}-${riskMapEnabled}-${userRole}`}
                        data={filteredFeatures}
                        style={style}
                        onEachFeature={onEachFeature}
                        ref={(ref) => { if (ref) geoJsonRef.current = ref; }}
                    />
                    <FitBounds bounds={bounds} />
                    <Legend />
                </MapContainer>
            </div>

            {/* Analytics Summary Strip */}
            {userRole === 'district_collector' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(() => {
                        const a = getAnalytics(loggedInDistrict);
                        if (!a) return null;
                        return [
                            { label: 'Total Cases', value: a.totalCases, color: 'text-slate-800' },
                            { label: 'Active', value: a.activeCases, color: 'text-red-600' },
                            { label: 'Recovered', value: a.recovered, color: 'text-green-600' },
                            { label: 'Water Alerts', value: a.waterContaminationAlerts, color: 'text-orange-600' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">{s.label}</p>
                            </div>
                        ));
                    })()}
                </div>
            )}
        </div>
    );
}
