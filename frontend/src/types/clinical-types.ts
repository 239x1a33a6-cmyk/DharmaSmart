
export type SeverityLevel = 'green' | 'yellow' | 'orange' | 'red';
export type CaseStatus = 'pending' | 'under_review' | 'advisory_issued' | 'closed';
export type AdvisoryPriority = 'green' | 'yellow' | 'orange' | 'red';

export interface SymptomEntry {
    symptom: string;
    count: number;
    percentage: number;
    severity: 'high' | 'moderate' | 'low';
    trend7d: 'rising' | 'stable' | 'declining';
}

export interface ClinicalCase {
    id: string;
    ashaId: string;
    ashaName: string;
    village: string;
    ward?: string;
    symptomCluster: SymptomEntry[];
    totalPatients: number;
    ageDistribution: Record<string, number>;
    genderDistribution: {
        male: number;
        female: number;
        other: number;
    };
    durationDays: number;
    severityScore: number; // 0-100
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: CaseStatus;
    reportedAt: string;
    location?: {
        lat: number;
        lng: number;
    };
    aiInsights?: string;
    outbreakProbability?: number; // 0-100
    environmentalFactors?: {
        rainfall: 'high' | 'moderate' | 'low';
        season: string;
        waterSource: string;
        sanitationScore: number;
    };
    linkedReportIds?: string[];
}

export interface MedicalAdvisory {
    id: string;
    caseId: string;
    doctorId: string;
    doctorName: string;
    phcName: string;
    severity: SeverityLevel;
    identifiedDisease?: string;
    summary: string;
    immediateAction: string;
    recommendedMedicalSteps: string[];
    preventiveMeasures: string[];
    householdGuidelines: string[];
    whenToVisitPhc: string;
    medications?: string[];
    durationOfPrecaution: string;
    followUpInDays: number;
    issuedAt: string;
    isApproved: boolean;
    attachments?: string[];
    // Loop tracking
    sentToAsha: boolean;
    ashaAcknowledgedAt?: string;
    communityAlertSentAt?: string;
    communityDeliveryRate?: number;
    communityResponseRate?: number;
    followUpStatus?: 'pending' | 'improvement' | 'no_change' | 'worsened';
    traceId: string; // ASHA Report ID → Clinical Review ID → Advisory ID
}

export interface AdvisoryFollowUp {
    advisoryId: string;
    caseId: string;
    daysSinceIssued: number;
    ashaCompliant: boolean;
    communityResponsePct: number;
    symptomTrend: 'improving' | 'stable' | 'worsening';
    reEvaluationNeeded: boolean;
    notes?: string;
}
