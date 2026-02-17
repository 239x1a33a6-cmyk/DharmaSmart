// Health Data Types and Interfaces

export interface HealthReport {
  id: string;
  reportType: 'health' | 'environmental' | 'water';
  timestamp: string;
  location: LocationData;
  reporter: ReporterInfo;
  status: 'pending' | 'validated' | 'processed' | 'synced';
  syncStatus: 'offline' | 'syncing' | 'synced' | 'failed';
  validationErrors?: string[];
}

export interface HealthSymptomReport extends HealthReport {
  reportType: 'health';
  symptoms: string[];
  severity: number; // 1-5
  ageGroup: 'child' | 'adult' | 'elderly';
  dateOfSymptoms: string;
  timeOfSymptoms: string;
  additionalNotes?: string;
}

export interface WaterQualityReport extends HealthReport {
  reportType: 'water';
  sourceType: 'well' | 'handpump' | 'river' | 'tank' | 'piped' | 'other';
  turbidity?: number;
  pH?: number;
  bacterialContamination?: 'none' | 'low' | 'medium' | 'high';
  visualAppearance?: string;
  odor?: string;
  taste?: string;
}

export interface EnvironmentalReport extends HealthReport {
  reportType: 'environmental';
  rainfall?: number;
  temperature?: number;
  humidity?: number;
  sanitationIssues?: string[];
  wasteDisposal?: string;
}

export interface LocationData {
  village?: string;
  ward?: string;
  district: string;
  state: string;
  gps?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  geotagged: boolean;
}

export interface ReporterInfo {
  type: 'citizen' | 'asha' | 'clinic' | 'phc' | 'district' | 'state';
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  standardizedData?: any;
}

export interface SyncQueueItem {
  id: string;
  data: HealthReport;
  attempts: number;
  lastAttempt?: string;
  error?: string;
}

// Disease Case Definitions (WHO/IDSP Standards)
export const DISEASE_CASE_DEFINITIONS = {
  diarrhea: {
    symptoms: ['diarrhea'],
    minSeverity: 1,
    duration: '24 hours',
    definition: 'Three or more loose stools in 24 hours'
  },
  cholera: {
    symptoms: ['diarrhea', 'vomiting', 'dehydration'],
    minSeverity: 3,
    duration: '24 hours',
    definition: 'Acute watery diarrhea with severe dehydration'
  },
  typhoid: {
    symptoms: ['fever', 'abdominal', 'fatigue'],
    minSeverity: 2,
    duration: '3 days',
    definition: 'Sustained fever with abdominal symptoms'
  },
  hepatitisA: {
    symptoms: ['fever', 'fatigue', 'abdominal'],
    minSeverity: 2,
    duration: '7 days',
    definition: 'Jaundice with fever and fatigue'
  }
};
