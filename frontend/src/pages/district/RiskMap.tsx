import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import districtsData from '../../data/village-boundaries.json';

// Village Risk Map Component
export default function RiskMap() {
    const navigate = useNavigate();
    const [selectedVillage, setSelectedVillage] = useState<any>(null);
    const [popupPosition, setPopupPosition] = useState<[number, number] | null>(null);

    // Style function for GeoJSON
    const getVillageStyle = (feature: any) => {
        const riskLevel = feature.properties.riskLevel;
        const baseStyle = {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
        };

        switch (riskLevel) {
            case 'Critical': return { ...baseStyle, fillColor: '#ef4444' }; // Red-500
            case 'High': return { ...baseStyle, fillColor: '#f97316' };     // Orange-500
            case 'Medium': return { ...baseStyle, fillColor: '#eab308' };   // Yellow-500
            case 'Low': return { ...baseStyle, fillColor: '#22c55e' };      // Green-500
            default: return { ...baseStyle, fillColor: '#94a3b8' };         // Slate-400
        }
    };

    const onEachVillage = (feature: any, layer: any) => {
        layer.on({
            mouseover: (e: any) => {
                const l = e.target;
                l.setStyle({
                    weight: 4,
                    color: '#fff',
                    dashArray: '',
                    fillOpacity: 0.9,
                });
            },
            mouseout: (e: any) => {
                const l = e.target;
                l.setStyle(getVillageStyle(feature));
            },
            click: (e: any) => {
                setSelectedVillage(feature.properties);
                setPopupPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-navy">Live Risk Map</h2>
                    <p className="text-gray-500 text-xs">Interactive Satellite Surveillance • {districtsData.features.length} Villages Tracked</p>
                </div>
                <div className="flex space-x-2">
                    <div className="flex items-center space-x-4 mr-4 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm text-[10px]">
                        <div className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Critical</div>
                        <div className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span> High</div>
                        <div className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Medium</div>
                        <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Stable</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-inner border border-gray-100 overflow-hidden relative group min-h-[400px]">
                <MapContainer
                    center={[26.9, 94.15]}
                    zoom={11}
                    scrollWheelZoom={true}
                    className="h-full w-full z-0"
                    zoomControl={false}
                >
                    <ZoomControl position="bottomright" />

                    {/* ESRI World Imagery Tile Layer */}
                    <TileLayer
                        attribution="&copy; Esri"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {/* Street Labels Overlay */}
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.png"
                        attribution='&copy; Stadia Maps'
                    />

                    <GeoJSON
                        data={districtsData as any}
                        style={getVillageStyle}
                        onEachFeature={onEachVillage}
                    />

                    {selectedVillage && popupPosition && (
                        <Popup
                            position={popupPosition}
                            eventHandlers={{
                                remove: () => {
                                    setSelectedVillage(null);
                                    setPopupPosition(null);
                                }
                            }}
                        >
                            <div className="p-1 min-w-[180px]">
                                <h3 className="font-bold text-navy text-sm mb-1">{selectedVillage.name}</h3>
                                <div className="space-y-1 mb-3">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-500">Risk Score:</span>
                                        <span className={`font-bold ${selectedVillage.riskScore > 70 ? 'text-red-600' : 'text-navy'}`}>{selectedVillage.riskScore}/100</span>
                                    </div>
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-500">Water Status:</span>
                                        <span className="text-blue-600 font-medium">Contaminated</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/asha/broadcast', { state: { targetVillage: selectedVillage } })}
                                    className="w-full py-1.5 bg-red-600 text-white rounded font-bold text-[10px] hover:bg-red-700 transition-all flex items-center justify-center"
                                >
                                    <i className="ri-notification-3-line mr-1"></i> BROADCAST ALERT
                                </button>
                            </div>
                        </Popup>
                    )}
                </MapContainer>

                <div className="absolute top-4 right-4 z-[1000] bg-navy/90 text-white p-3 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl space-y-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Context</h4>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="opacity-70">Satellite Sync</span>
                            <span className="text-green-400 font-mono text-[9px]">LIVE</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="opacity-70">Cloud Cover</span>
                            <span className="text-blue-300">12%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
