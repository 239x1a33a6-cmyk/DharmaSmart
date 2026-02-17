/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CaseRecord, WaterLog, RiskEngine as _RiskEngine } from '../utils/riskEngine';
import { AggregationEngine, DistrictAggregates, VillageStats } from '../utils/aggregationEngine';


export interface Cluster {
    id: string;
    village: string;
    riskScore: number;
    cases: number;
    status: 'Detected' | 'Verified' | 'Response Sent' | 'Resolved';
    dateDetected: string;
}

export interface PhcMetric {
    id: string;
    name: string;
    medicalOfficer: string;
    activeCases: number;
    resourcesStatus: 'Good' | 'Low' | 'Critical';
    lastReport: string;
}

export interface ResourceStock {
    item: string;
    currentStock: number;
    requiredStock: number;
    unit: string;
    status: 'Good' | 'Low' | 'Critical';
}

interface SurveillanceContextType {
    // Data Stores
    cases: CaseRecord[];
    waterLogs: WaterLog[];
    clusters: Cluster[]; // New
    phcMetrics: PhcMetric[]; // New
    resources: ResourceStock[]; // New
    alerts: string[]; // New: Simple string alerts for demo

    // Aggregated Stats
    villageStats: Record<string, VillageStats>;
    districtStats: DistrictAggregates | null;

    // Actions
    addCase: (caseData: Omit<CaseRecord, 'id' | 'timestamp'>) => void;
    logWaterQuality: (logData: Omit<WaterLog, 'id' | 'timestamp'>) => void;

    // Command Actions
    dispatchTeam: (clusterId: string) => void;
    updateResource: (item: string, amount: number) => void;
    resolveCluster: (clusterId: string) => void;

    resetSimulation: () => void;
    simulateOutbreak: () => Promise<void>;
}

const SurveillanceContext = createContext<SurveillanceContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_CASES: CaseRecord[] = [
    { id: 'c1', symptoms: ['Fever'], village: 'Majuli', timestamp: new Date().toISOString() },
    { id: 'c2', symptoms: ['Cough'], village: 'Bishnupur', timestamp: new Date(Date.now() - 86400000).toISOString() },
];

const INITIAL_WATER: WaterLog[] = [
    { id: 'w1', sourceId: 'Well-01', status: 'Safe', village: 'Majuli', timestamp: new Date().toISOString() },
];

const KNOWN_VILLAGES = ['Majuli', 'Bishnupur', 'Garmur', 'Kamalabari'];

const INITIAL_CLUSTERS: Cluster[] = [
    { id: 'cl-1', village: 'Bishnupur', riskScore: 65, cases: 12, status: 'Verified', dateDetected: new Date().toISOString() }
];

const INITIAL_PHC: PhcMetric[] = [
    { id: 'phc-1', name: 'Garmur PHC', medicalOfficer: 'Dr. Das', activeCases: 45, resourcesStatus: 'Good', lastReport: '2h ago' },
    { id: 'phc-2', name: 'Kamalabari PHC', medicalOfficer: 'Dr. Hazarika', activeCases: 12, resourcesStatus: 'Low', lastReport: '5h ago' }
];

const INITIAL_RESOURCES: ResourceStock[] = [
    { item: 'ORS Packets', currentStock: 5000, requiredStock: 2000, unit: 'packets', status: 'Good' },
    { item: 'Chlorine Tabs', currentStock: 800, requiredStock: 1000, unit: 'strips', status: 'Low' },
    { item: 'IV Fluids', currentStock: 200, requiredStock: 500, unit: 'bottles', status: 'Critical' }
];

export const SurveillanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // ... existing state ...
    const [cases, setCases] = useState<CaseRecord[]>(() => {
        const saved = localStorage.getItem('dharma_cases');
        return saved ? JSON.parse(saved) : INITIAL_CASES;
    });
    const [waterLogs, setWaterLogs] = useState<WaterLog[]>(() => {
        const saved = localStorage.getItem('dharma_water');
        return saved ? JSON.parse(saved) : INITIAL_WATER;
    });

    // New State
    const [clusters, setClusters] = useState<Cluster[]>(INITIAL_CLUSTERS);
    const [phcMetrics, _setPhcMetrics] = useState<PhcMetric[]>(INITIAL_PHC);
    const [resources, setResources] = useState<ResourceStock[]>(INITIAL_RESOURCES);
    const [alerts, setAlerts] = useState<string[]>([]);


    // Derived State (The "Brain" - auto-calculated on every data change)
    const [villageStats, setVillageStats] = useState<Record<string, VillageStats>>({});
    const [districtStats, setDistrictStats] = useState<DistrictAggregates | null>(null);

    // Persistence & Recalculation Effect
    useEffect(() => {
        localStorage.setItem('dharma_cases', JSON.stringify(cases));
        localStorage.setItem('dharma_water', JSON.stringify(waterLogs));

        // The Magic: Real-time Recalculation
        const vStats: Record<string, VillageStats> = {};
        KNOWN_VILLAGES.forEach(v => {
            vStats[v] = AggregationEngine.aggregateVillage(v, cases, waterLogs);
        });
        setVillageStats(vStats);

        const dStats = AggregationEngine.aggregateDistrict(KNOWN_VILLAGES, cases, waterLogs);
        setDistrictStats(dStats);

    }, [cases, waterLogs]);


    // Actions
    const addCase = (caseData: Omit<CaseRecord, 'id' | 'timestamp'>) => {
        const newCase: CaseRecord = {
            ...caseData,
            id: `C-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString()
        };
        setCases(prev => [newCase, ...prev]);
    };

    const logWaterQuality = (logData: Omit<WaterLog, 'id' | 'timestamp'>) => {
        const newLog: WaterLog = {
            ...logData,
            id: `W-${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        setWaterLogs(prev => [newLog, ...prev]);
    };

    const resetSimulation = () => {
        setCases([]);
        setWaterLogs([]);
        localStorage.removeItem('dharma_cases');
        localStorage.removeItem('dharma_water');
    };

    const simulateOutbreak = async () => {
        // Inject 10 cases of Diarrhea in Majuli over 5 seconds
        for (let i = 0; i < 8; i++) {
            await new Promise(r => setTimeout(r, 600));
            addCase({
                symptoms: ['Diarrhea', 'Dehydration', 'Vomiting'],
                village: 'Majuli',
                diagnosis: 'Suspected Cholera'
            });
        }
        // And mark water unsafe
        logWaterQuality({
            sourceId: 'Comm-Well-05',
            status: 'Contaminated',
            village: 'Majuli'
        });

        // Add to Cluster List
        setClusters(prev => [
            { id: 'cl-new-01', village: 'Majuli', riskScore: 90, cases: 8, status: 'Detected', dateDetected: new Date().toISOString() },
            ...prev
        ]);
        setAlerts(prev => ['CRITICAL: Outbreak detected in Majuli', ...prev]);
    };

    const dispatchTeam = (clusterId: string) => {
        setClusters(prev => prev.map(c => c.id === clusterId ? { ...c, status: 'Response Sent' } : c));
        setAlerts(prev => [`Response Team Dispatched to ${clusterId}`, ...prev]);
    };

    const updateResource = (item: string, amount: number) => {
        setResources(prev => prev.map(r => r.item === item ? { ...r, currentStock: r.currentStock + amount } : r));
    };

    const resolveCluster = (clusterId: string) => {
        setClusters(prev => prev.map(c => c.id === clusterId ? { ...c, status: 'Resolved' } : c));
    };

    return (
        <SurveillanceContext.Provider value={{
            cases,
            waterLogs,
            clusters,
            phcMetrics,
            resources,
            alerts,
            villageStats,
            districtStats,
            addCase,
            logWaterQuality,
            dispatchTeam,
            updateResource,
            resolveCluster,
            resetSimulation,
            simulateOutbreak
        }}>
            {children}
        </SurveillanceContext.Provider>
    );
};

export const useSurveillance = () => {
    const context = useContext(SurveillanceContext);
    if (!context) {
        throw new Error('useSurveillance must be used within a SurveillanceProvider');
    }
    return context;
};
