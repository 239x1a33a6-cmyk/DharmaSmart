// Mock data for Decision Support Dashboards

export interface DiseaseHotspot {
  id: string;
  village: string;
  block: string;
  district: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number;
  activeCases: number;
  disease: string;
  lastUpdated: string;
  population: number;
  waterQualityStatus: 'Safe' | 'Contaminated' | 'Unknown';
  interventionStatus: 'None' | 'Planned' | 'In Progress' | 'Completed';
}

export interface WaterQualityPoint {
  id: string;
  sourceType: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'Safe' | 'Contaminated' | 'Unknown';
  pH: number;
  turbidity: number;
  bacterialContamination: 'none' | 'low' | 'medium' | 'high';
  lastTested: string;
  affectedPopulation: number;
}

export interface TemporalTrend {
  date: string;
  cholera: number;
  typhoid: number;
  diarrhea: number;
  hepatitisA: number;
  totalCases: number;
}

export interface OutbreakProgression {
  id: string;
  location: string;
  disease: string;
  startDate: string;
  currentDay: number;
  totalCases: number;
  newCasesToday: number;
  peakPredicted: string;
  status: 'Emerging' | 'Active' | 'Declining' | 'Contained';
  interventions: string[];
}

export interface KPIMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

// Mock Disease Hotspots
export const mockDiseaseHotspots: DiseaseHotspot[] = [
  {
    id: 'hs-001',
    village: 'Kamalabari',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.9504, lng: 94.2153 },
    riskLevel: 'Critical',
    riskScore: 92,
    activeCases: 47,
    disease: 'Cholera',
    lastUpdated: '2025-01-15T14:30:00Z',
    population: 3200,
    waterQualityStatus: 'Contaminated',
    interventionStatus: 'In Progress'
  },
  {
    id: 'hs-002',
    village: 'Garamur',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.9234, lng: 94.1876 },
    riskLevel: 'High',
    riskScore: 78,
    activeCases: 32,
    disease: 'Diarrhea',
    lastUpdated: '2025-01-15T13:45:00Z',
    population: 2800,
    waterQualityStatus: 'Contaminated',
    interventionStatus: 'Planned'
  },
  {
    id: 'hs-003',
    village: 'Auniati',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.9678, lng: 94.2456 },
    riskLevel: 'High',
    riskScore: 74,
    activeCases: 28,
    disease: 'Typhoid',
    lastUpdated: '2025-01-15T12:20:00Z',
    population: 2500,
    waterQualityStatus: 'Unknown',
    interventionStatus: 'In Progress'
  },
  {
    id: 'hs-004',
    village: 'Dakhinpat',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.9123, lng: 94.2789 },
    riskLevel: 'Medium',
    riskScore: 56,
    activeCases: 18,
    disease: 'Diarrhea',
    lastUpdated: '2025-01-15T11:00:00Z',
    population: 1900,
    waterQualityStatus: 'Safe',
    interventionStatus: 'Completed'
  },
  {
    id: 'hs-005',
    village: 'Salmora',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.8956, lng: 94.1567 },
    riskLevel: 'Medium',
    riskScore: 48,
    activeCases: 12,
    disease: 'Hepatitis A',
    lastUpdated: '2025-01-15T10:30:00Z',
    population: 1600,
    waterQualityStatus: 'Safe',
    interventionStatus: 'None'
  },
  {
    id: 'hs-006',
    village: 'Jengraimukh',
    block: 'Majuli',
    district: 'Majuli',
    state: 'Assam',
    coordinates: { lat: 26.9345, lng: 94.3012 },
    riskLevel: 'Low',
    riskScore: 32,
    activeCases: 7,
    disease: 'Diarrhea',
    lastUpdated: '2025-01-15T09:15:00Z',
    population: 1200,
    waterQualityStatus: 'Safe',
    interventionStatus: 'None'
  },
  {
    id: 'hs-007',
    village: 'Phuloni',
    block: 'Dibrugarh East',
    district: 'Dibrugarh',
    state: 'Assam',
    coordinates: { lat: 27.4728, lng: 94.9120 },
    riskLevel: 'High',
    riskScore: 81,
    activeCases: 38,
    disease: 'Cholera',
    lastUpdated: '2025-01-15T14:00:00Z',
    population: 4100,
    waterQualityStatus: 'Contaminated',
    interventionStatus: 'Planned'
  },
  {
    id: 'hs-008',
    village: 'Lahowal',
    block: 'Dibrugarh West',
    district: 'Dibrugarh',
    state: 'Assam',
    coordinates: { lat: 27.4234, lng: 94.8567 },
    riskLevel: 'Medium',
    riskScore: 52,
    activeCases: 15,
    disease: 'Typhoid',
    lastUpdated: '2025-01-15T13:30:00Z',
    population: 2300,
    waterQualityStatus: 'Unknown',
    interventionStatus: 'In Progress'
  },
  {
    id: 'hs-009',
    village: 'Tengakhat',
    block: 'Dibrugarh East',
    district: 'Dibrugarh',
    state: 'Assam',
    coordinates: { lat: 27.5012, lng: 94.9456 },
    riskLevel: 'Low',
    riskScore: 28,
    activeCases: 5,
    disease: 'Diarrhea',
    lastUpdated: '2025-01-15T12:45:00Z',
    population: 1800,
    waterQualityStatus: 'Safe',
    interventionStatus: 'None'
  },
  {
    id: 'hs-010',
    village: 'Sonari',
    block: 'Silchar',
    district: 'Cachar',
    state: 'Assam',
    coordinates: { lat: 24.8267, lng: 92.7984 },
    riskLevel: 'High',
    riskScore: 76,
    activeCases: 34,
    disease: 'Diarrhea',
    lastUpdated: '2025-01-15T14:15:00Z',
    population: 3600,
    waterQualityStatus: 'Contaminated',
    interventionStatus: 'In Progress'
  }
];

// Mock Water Quality Points
export const mockWaterQualityPoints: WaterQualityPoint[] = [
  {
    id: 'wq-001',
    sourceType: 'Handpump',
    location: 'Kamalabari Village Center',
    coordinates: { lat: 26.9504, lng: 94.2153 },
    status: 'Contaminated',
    pH: 5.8,
    turbidity: 12.5,
    bacterialContamination: 'high',
    lastTested: '2025-01-14T10:00:00Z',
    affectedPopulation: 850
  },
  {
    id: 'wq-002',
    sourceType: 'Well',
    location: 'Garamur Community Well',
    coordinates: { lat: 26.9234, lng: 94.1876 },
    status: 'Contaminated',
    pH: 6.2,
    turbidity: 8.3,
    bacterialContamination: 'medium',
    lastTested: '2025-01-14T11:30:00Z',
    affectedPopulation: 620
  },
  {
    id: 'wq-003',
    sourceType: 'River',
    location: 'Brahmaputra Ghat - Auniati',
    coordinates: { lat: 26.9678, lng: 94.2456 },
    status: 'Unknown',
    pH: 7.1,
    turbidity: 15.2,
    bacterialContamination: 'medium',
    lastTested: '2025-01-13T09:00:00Z',
    affectedPopulation: 1200
  },
  {
    id: 'wq-004',
    sourceType: 'Handpump',
    location: 'Dakhinpat School',
    coordinates: { lat: 26.9123, lng: 94.2789 },
    status: 'Safe',
    pH: 7.4,
    turbidity: 2.1,
    bacterialContamination: 'none',
    lastTested: '2025-01-15T08:00:00Z',
    affectedPopulation: 450
  },
  {
    id: 'wq-005',
    sourceType: 'Tank',
    location: 'Salmora Water Tank',
    coordinates: { lat: 26.8956, lng: 94.1567 },
    status: 'Safe',
    pH: 7.2,
    turbidity: 1.8,
    bacterialContamination: 'none',
    lastTested: '2025-01-15T07:30:00Z',
    affectedPopulation: 380
  },
  {
    id: 'wq-006',
    sourceType: 'Handpump',
    location: 'Phuloni Market Area',
    coordinates: { lat: 27.4728, lng: 94.9120 },
    status: 'Contaminated',
    pH: 5.5,
    turbidity: 14.7,
    bacterialContamination: 'high',
    lastTested: '2025-01-14T12:00:00Z',
    affectedPopulation: 920
  },
  {
    id: 'wq-007',
    sourceType: 'Well',
    location: 'Sonari Community Well',
    coordinates: { lat: 24.8267, lng: 92.7984 },
    status: 'Contaminated',
    pH: 6.0,
    turbidity: 9.8,
    bacterialContamination: 'medium',
    lastTested: '2025-01-14T13:30:00Z',
    affectedPopulation: 740
  }
];

// Mock Temporal Trends (90 days)
export const mockTemporalTrends: TemporalTrend[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  
  const baseCholeraRate = 3 + Math.sin(i / 10) * 2;
  const baseTyphoidRate = 2 + Math.cos(i / 12) * 1.5;
  const baseDiarrheaRate = 5 + Math.sin(i / 8) * 3;
  const baseHepatitisRate = 1 + Math.cos(i / 15) * 0.8;
  
  const recentSpike = i > 70 ? (i - 70) * 0.5 : 0;
  
  const cholera = Math.max(0, Math.round(baseCholeraRate + recentSpike + Math.random() * 2));
  const typhoid = Math.max(0, Math.round(baseTyphoidRate + recentSpike * 0.3 + Math.random() * 1.5));
  const diarrhea = Math.max(0, Math.round(baseDiarrheaRate + recentSpike * 0.8 + Math.random() * 3));
  const hepatitisA = Math.max(0, Math.round(baseHepatitisRate + recentSpike * 0.2 + Math.random()));
  
  return {
    date: date.toISOString().split('T')[0],
    cholera,
    typhoid,
    diarrhea,
    hepatitisA,
    totalCases: cholera + typhoid + diarrhea + hepatitisA
  };
});

// Mock Outbreak Progressions
export const mockOutbreakProgressions: OutbreakProgression[] = [
  {
    id: 'ob-001',
    location: 'Kamalabari, Majuli',
    disease: 'Cholera',
    startDate: '2025-01-08',
    currentDay: 7,
    totalCases: 47,
    newCasesToday: 8,
    peakPredicted: '2025-01-18',
    status: 'Active',
    interventions: ['Water chlorination', 'ORS distribution', 'Health camps']
  },
  {
    id: 'ob-002',
    location: 'Garamur, Majuli',
    disease: 'Diarrhea',
    startDate: '2025-01-10',
    currentDay: 5,
    totalCases: 32,
    newCasesToday: 6,
    peakPredicted: '2025-01-17',
    status: 'Emerging',
    interventions: ['Hygiene awareness', 'Water testing']
  },
  {
    id: 'ob-003',
    location: 'Phuloni, Dibrugarh',
    disease: 'Cholera',
    startDate: '2025-01-09',
    currentDay: 6,
    totalCases: 38,
    newCasesToday: 7,
    peakPredicted: '2025-01-19',
    status: 'Active',
    interventions: ['Water source remediation', 'Medical team deployed']
  },
  {
    id: 'ob-004',
    location: 'Sonari, Cachar',
    disease: 'Diarrhea',
    startDate: '2025-01-11',
    currentDay: 4,
    totalCases: 34,
    newCasesToday: 9,
    peakPredicted: '2025-01-16',
    status: 'Emerging',
    interventions: ['Community education', 'Water quality monitoring']
  },
  {
    id: 'ob-005',
    location: 'Auniati, Majuli',
    disease: 'Typhoid',
    startDate: '2025-01-07',
    currentDay: 8,
    totalCases: 28,
    newCasesToday: 3,
    peakPredicted: '2025-01-15',
    status: 'Declining',
    interventions: ['Antibiotic distribution', 'Sanitation improvement']
  },
  {
    id: 'ob-006',
    location: 'Dakhinpat, Majuli',
    disease: 'Diarrhea',
    startDate: '2025-01-05',
    currentDay: 10,
    totalCases: 18,
    newCasesToday: 0,
    peakPredicted: '2025-01-12',
    status: 'Contained',
    interventions: ['Water treatment completed', 'Follow-up monitoring']
  }
];

// Mock KPI Metrics
export const mockKPIMetrics: KPIMetric[] = [
  {
    label: 'Active Cases',
    value: 237,
    change: 12.5,
    changeType: 'increase',
    icon: 'ri-user-heart-line',
    color: 'red'
  },
  {
    label: 'High-Risk Villages',
    value: 18,
    change: 3,
    changeType: 'increase',
    icon: 'ri-map-pin-line',
    color: 'orange'
  },
  {
    label: 'Alerts Sent (24h)',
    value: 142,
    change: 8.2,
    changeType: 'increase',
    icon: 'ri-notification-3-line',
    color: 'blue'
  },
  {
    label: 'Water Sources Monitored',
    value: 67,
    change: 5,
    changeType: 'increase',
    icon: 'ri-drop-line',
    color: 'teal'
  },
  {
    label: 'Interventions Active',
    value: 24,
    change: 2,
    changeType: 'increase',
    icon: 'ri-first-aid-kit-line',
    color: 'green'
  },
  {
    label: 'ASHA Workers Deployed',
    value: 89,
    change: 4,
    changeType: 'increase',
    icon: 'ri-team-line',
    color: 'purple'
  }
];
