
export interface Symptom {
    name: string;
    severityWeight: number; // 1-10
}

export interface CaseRecord {
    id: string;
    symptoms: string[];
    diagnosis?: string;
    village: string;
    timestamp: string; // ISO string
}

export interface WaterLog {
    id: string;
    sourceId: string;
    status: 'Safe' | 'Contaminated';
    village: string;
    timestamp: string;
}

export const SYMPTOM_WEIGHTS: Record<string, number> = {
    'Diarrhea': 5,
    'Vomiting': 4,
    'Fever': 3,
    'Dehydration': 8,
    'Stomach Pain': 2,
    'Skin Rash': 3,
    'Breathing Difficulty': 7,
};

export class RiskEngine {
    // Rule: ≥5 similar symptoms in 48 hrs in one village
    static detectClustering(cases: CaseRecord[], village: string): { detected: boolean; reason?: string } {
        const now = new Date();
        const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

        const recentVillageCases = cases.filter(c =>
            c.village === village && new Date(c.timestamp) >= fortyEightHoursAgo
        );

        if (recentVillageCases.length < 5) return { detected: false };

        // Check for symptom similarity
        const symptomCounts: Record<string, number> = {};
        recentVillageCases.forEach(c => {
            c.symptoms.forEach(s => {
                symptomCounts[s] = (symptomCounts[s] || 0) + 1;
            });
        });

        const dominantSymptom = Object.keys(symptomCounts).find(s => symptomCounts[s] >= 5);

        if (dominantSymptom) {
            return {
                detected: true,
                reason: `Cluster Pattern: ${dominantSymptom} detected in ${recentVillageCases.length} cases within 48h`
            };
        }

        return { detected: false };
    }

    // Rule: Unsafe water + related symptoms => Critical Risk
    static analyzeWaterRisk(waterLogs: WaterLog[], village: string): { isUnsafe: boolean; details?: string } {
        const recentUnsafeLogs = waterLogs.filter(l =>
            l.village === village &&
            l.status === 'Contaminated' &&
            new Date(l.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        );

        if (recentUnsafeLogs.length > 0) {
            return {
                isUnsafe: true,
                details: `${recentUnsafeLogs.length} contaminated water sources reported in last 7 days`
            };
        }
        return { isUnsafe: false };
    }

    static calculateVillageRiskScore(cases: CaseRecord[], waterLogs: WaterLog[], village: string): { score: number; level: 'Low' | 'Medium' | 'High' | 'Critical' } {
        let score = 0;

        // 1. Case Volume factor
        const activeCases = cases.filter(c => c.village === village).length;
        score += activeCases * 2;

        // 2. Symptom Severity factor
        cases.filter(c => c.village === village).forEach(c => {
            c.symptoms.forEach(s => {
                score += (SYMPTOM_WEIGHTS[s] || 1);
            });
        });

        // 3. Cluster Factor
        const cluster = this.detectClustering(cases, village);
        if (cluster.detected) score += 40;

        // 4. Water Factor
        const water = this.analyzeWaterRisk(waterLogs, village);
        if (water.isUnsafe) score += 30;

        // Normalize roughly to 0-100 scale for UI, but can go higher internally
        score = Math.min(score, 100);

        let level: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
        if (score >= 80) level = 'Critical';
        else if (score >= 50) level = 'High';
        else if (score >= 25) level = 'Medium';

        return { score, level };
    }
}
