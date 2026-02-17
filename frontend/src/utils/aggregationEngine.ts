import { CaseRecord, RiskEngine, WaterLog } from './riskEngine';

export interface VillageStats {
    village: string;
    totalCases: number;
    activeCases: number;
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    contaminationStatus: 'Safe' | 'Contaminated';
    clusterDetected: boolean;
    clusterReason?: string;
    lastUpdated: string;
}

export interface DistrictAggregates {
    totalActiveCases: number;
    highRiskVillages: number;
    criticalAlerts: number;
    waterIncidents: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    affectedVillages: string[];
}

export class AggregationEngine {

    static aggregateVillage(village: string, allCases: CaseRecord[], allWaterLogs: WaterLog[]): VillageStats {
        const villageCases = allCases.filter(c => c.village === village);
        const riskAnalysis = RiskEngine.calculateVillageRiskScore(allCases, allWaterLogs, village);
        const clusterAnalysis = RiskEngine.detectClustering(allCases, village);
        const waterAnalysis = RiskEngine.analyzeWaterRisk(allWaterLogs, village);

        return {
            village,
            totalCases: villageCases.length,
            activeCases: villageCases.length, // Assuming all are active for demo simplicity unless resolved
            riskScore: riskAnalysis.score,
            riskLevel: riskAnalysis.level,
            contaminationStatus: waterAnalysis.isUnsafe ? 'Contaminated' : 'Safe',
            clusterDetected: clusterAnalysis.detected,
            clusterReason: clusterAnalysis.reason,
            lastUpdated: new Date().toISOString()
        };
    }

    static aggregateDistrict(villages: string[], allCases: CaseRecord[], allWaterLogs: WaterLog[]): DistrictAggregates {
        const villageStats = villages.map(v => this.aggregateVillage(v, allCases, allWaterLogs));

        const totalActiveCases = villageStats.reduce((sum, v) => sum + v.activeCases, 0);
        const highRiskVillages = villageStats.filter(v => v.riskLevel === 'High' || v.riskLevel === 'Critical').length;
        const criticalAlerts = villageStats.filter(v => v.riskLevel === 'Critical').length;
        const waterIncidents = villageStats.filter(v => v.contaminationStatus === 'Contaminated').length;
        const affectedVillages = villageStats.filter(v => v.activeCases > 0).map(v => v.village);

        // Simple trend logic for demo: more than 10 cases = increasing
        const trend = totalActiveCases > 10 ? 'increasing' : totalActiveCases > 0 ? 'stable' : 'decreasing';

        return {
            totalActiveCases,
            highRiskVillages,
            criticalAlerts,
            waterIncidents,
            trend,
            affectedVillages
        };
    }
}
