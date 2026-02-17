// Mock data for ML predictions and analytics
import { PredictionResult, SyndromicCluster, TimeSeriesForecast } from '../services/ml-analytics';

export const mockPredictionResults: PredictionResult[] = [
  {
    location: {
      village: 'Majuli',
      district: 'Majuli',
      state: 'Assam'
    },
    riskLevel: {
      level: 'High',
      score: 85,
      confidence: 92
    },
    predictedDiseases: [
      {
        disease: 'Cholera',
        probability: 87,
        casesExpected: 45,
        peakDate: '2025-01-20',
        confidence: 89
      },
      {
        disease: 'Acute Diarrhea',
        probability: 78,
        casesExpected: 62,
        peakDate: '2025-01-18',
        confidence: 85
      },
      {
        disease: 'Typhoid',
        probability: 65,
        casesExpected: 28,
        peakDate: '2025-01-22',
        confidence: 78
      }
    ],
    earlyWarningDays: 5,
    factors: [
      {
        factor: 'Symptom Clustering',
        impact: 'high',
        value: 34,
        contribution: 40,
        explanation: '34 cases with 156.3% growth rate in past 7 days'
      },
      {
        factor: 'Water Quality',
        impact: 'high',
        value: '8 sources monitored',
        contribution: 30,
        explanation: '5 of 8 water sources show bacterial contamination'
      },
      {
        factor: 'Environmental Conditions',
        impact: 'medium',
        value: 'Rainfall: 145.2mm, Humidity: 87.3%',
        contribution: 20,
        explanation: 'Heavy monsoon rainfall and high humidity detected'
      },
      {
        factor: 'Historical Comparison',
        impact: 'high',
        value: 92,
        contribution: 10,
        explanation: '34 cases detected, 580% above historical average'
      }
    ],
    timestamp: '2025-01-15T08:30:00Z',
    modelVersion: 'v2.1.0'
  },
  {
    location: {
      village: 'Dibrugarh Town',
      district: 'Dibrugarh',
      state: 'Assam'
    },
    riskLevel: {
      level: 'Medium',
      score: 62,
      confidence: 88
    },
    predictedDiseases: [
      {
        disease: 'Typhoid',
        probability: 71,
        casesExpected: 22,
        peakDate: '2025-01-21',
        confidence: 82
      },
      {
        disease: 'Hepatitis A',
        probability: 58,
        casesExpected: 15,
        peakDate: '2025-01-25',
        confidence: 75
      }
    ],
    earlyWarningDays: 6,
    factors: [
      {
        factor: 'Symptom Clustering',
        impact: 'medium',
        value: 18,
        contribution: 40,
        explanation: '18 cases with 80.0% growth rate in past 7 days'
      },
      {
        factor: 'Water Quality',
        impact: 'medium',
        value: '6 sources monitored',
        contribution: 30,
        explanation: '2 of 6 water sources show contamination'
      },
      {
        factor: 'Environmental Conditions',
        impact: 'low',
        value: 'Rainfall: 65.8mm, Humidity: 72.5%',
        contribution: 20,
        explanation: 'Moderate environmental risk factors'
      },
      {
        factor: 'Historical Comparison',
        impact: 'medium',
        value: 68,
        contribution: 10,
        explanation: '18 cases detected, 260% above historical average'
      }
    ],
    timestamp: '2025-01-15T08:30:00Z',
    modelVersion: 'v2.1.0'
  },
  {
    location: {
      village: 'Silchar',
      district: 'Cachar',
      state: 'Assam'
    },
    riskLevel: {
      level: 'Low',
      score: 28,
      confidence: 85
    },
    predictedDiseases: [
      {
        disease: 'Acute Diarrhea',
        probability: 42,
        casesExpected: 8,
        peakDate: '2025-01-19',
        confidence: 72
      }
    ],
    earlyWarningDays: 7,
    factors: [
      {
        factor: 'Symptom Clustering',
        impact: 'low',
        value: 6,
        contribution: 40,
        explanation: '6 cases with 20.0% growth rate in past 7 days'
      },
      {
        factor: 'Water Quality',
        impact: 'low',
        value: '5 sources monitored',
        contribution: 30,
        explanation: 'Water quality within acceptable range'
      },
      {
        factor: 'Environmental Conditions',
        impact: 'low',
        value: 'Rainfall: 32.4mm, Humidity: 68.2%',
        contribution: 20,
        explanation: 'Normal environmental conditions'
      },
      {
        factor: 'Historical Comparison',
        impact: 'low',
        value: 35,
        contribution: 10,
        explanation: '6 cases detected, 20% above historical average'
      }
    ],
    timestamp: '2025-01-15T08:30:00Z',
    modelVersion: 'v2.1.0'
  },
  {
    location: {
      village: 'Jorhat',
      district: 'Jorhat',
      state: 'Assam'
    },
    riskLevel: {
      level: 'Critical',
      score: 94,
      confidence: 95
    },
    predictedDiseases: [
      {
        disease: 'Cholera',
        probability: 93,
        casesExpected: 58,
        peakDate: '2025-01-18',
        confidence: 92
      },
      {
        disease: 'Acute Diarrhea',
        probability: 89,
        casesExpected: 71,
        peakDate: '2025-01-17',
        confidence: 90
      },
      {
        disease: 'Typhoid',
        probability: 72,
        casesExpected: 35,
        peakDate: '2025-01-21',
        confidence: 83
      }
    ],
    earlyWarningDays: 3,
    factors: [
      {
        factor: 'Symptom Clustering',
        impact: 'high',
        value: 47,
        contribution: 40,
        explanation: '47 cases with 235.7% growth rate in past 7 days'
      },
      {
        factor: 'Water Quality',
        impact: 'high',
        value: '10 sources monitored',
        contribution: 30,
        explanation: '9 of 10 water sources show severe contamination'
      },
      {
        factor: 'Environmental Conditions',
        impact: 'high',
        value: 'Rainfall: 178.5mm, Humidity: 91.8%',
        contribution: 20,
        explanation: 'Extreme rainfall and flooding conditions'
      },
      {
        factor: 'Historical Comparison',
        impact: 'high',
        value: 98,
        contribution: 10,
        explanation: '47 cases detected, 840% above historical average'
      }
    ],
    timestamp: '2025-01-15T08:30:00Z',
    modelVersion: 'v2.1.0'
  }
];

export const mockSyndromicClusters: SyndromicCluster[] = [
  {
    id: 'cluster-001',
    location: 'Jorhat, Jorhat District',
    symptoms: ['diarrhea', 'vomiting', 'dehydration', 'fever'],
    caseCount: 47,
    startDate: '2025-01-08T00:00:00Z',
    severity: 7.8,
    isAnomalous: true,
    growthRate: 235.7
  },
  {
    id: 'cluster-002',
    location: 'Majuli, Majuli District',
    symptoms: ['diarrhea', 'vomiting', 'abdominal'],
    caseCount: 34,
    startDate: '2025-01-10T00:00:00Z',
    severity: 6.9,
    isAnomalous: true,
    growthRate: 156.3
  },
  {
    id: 'cluster-003',
    location: 'Dibrugarh Town, Dibrugarh District',
    symptoms: ['fever', 'abdominal', 'fatigue'],
    caseCount: 18,
    startDate: '2025-01-11T00:00:00Z',
    severity: 5.4,
    isAnomalous: true,
    growthRate: 80.0
  },
  {
    id: 'cluster-004',
    location: 'Tezpur, Sonitpur District',
    symptoms: ['diarrhea', 'fever'],
    caseCount: 12,
    startDate: '2025-01-12T00:00:00Z',
    severity: 4.8,
    isAnomalous: false,
    growthRate: 50.0
  },
  {
    id: 'cluster-005',
    location: 'Silchar, Cachar District',
    symptoms: ['diarrhea', 'vomiting'],
    caseCount: 6,
    startDate: '2025-01-13T00:00:00Z',
    severity: 3.2,
    isAnomalous: false,
    growthRate: 20.0
  }
];

export const mockTimeSeriesForecasts: TimeSeriesForecast[] = [
  {
    date: '2025-01-16',
    predictedCases: 52,
    lowerBound: 45,
    upperBound: 59,
    confidence: 95
  },
  {
    date: '2025-01-17',
    predictedCases: 58,
    lowerBound: 49,
    upperBound: 67,
    confidence: 90
  },
  {
    date: '2025-01-18',
    predictedCases: 63,
    lowerBound: 52,
    upperBound: 74,
    confidence: 85
  },
  {
    date: '2025-01-19',
    predictedCases: 67,
    lowerBound: 54,
    upperBound: 80,
    confidence: 80
  },
  {
    date: '2025-01-20',
    predictedCases: 69,
    lowerBound: 55,
    upperBound: 83,
    confidence: 75
  },
  {
    date: '2025-01-21',
    predictedCases: 68,
    lowerBound: 53,
    upperBound: 83,
    confidence: 70
  },
  {
    date: '2025-01-22',
    predictedCases: 65,
    lowerBound: 49,
    upperBound: 81,
    confidence: 65
  }
];

export const mockModelMetrics = {
  anomalyDetection: {
    accuracy: 92.4,
    precision: 89.7,
    recall: 94.2,
    f1Score: 91.9
  },
  timeSeriesForecasting: {
    accuracy: 88.6,
    mae: 3.2,
    rmse: 4.7,
    mape: 12.3
  },
  riskClassification: {
    accuracy: 94.1,
    precision: 91.8,
    recall: 95.6,
    f1Score: 93.7
  }
};
