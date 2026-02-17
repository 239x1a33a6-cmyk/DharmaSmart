// AI/ML Analytics Pipeline & Prediction Engine
// Implements syndromic surveillance, anomaly detection, and risk classification

import {
  HealthReport,
  HealthSymptomReport,
  WaterQualityReport,
  EnvironmentalReport
} from '../types/health-data';

export interface RiskLevel {
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  score: number; // 0-100
  confidence: number; // 0-100
}

export interface PredictionResult {
  location: {
    village?: string;
    district: string;
    state: string;
  };
  riskLevel: RiskLevel;
  predictedDiseases: DiseasePrediction[];
  earlyWarningDays: number; // 3-7 days advance warning
  factors: RiskFactor[];
  timestamp: string;
  modelVersion: string;
}

export interface DiseasePrediction {
  disease: string;
  probability: number; // 0-100
  casesExpected: number;
  peakDate: string;
  confidence: number;
}

export interface RiskFactor {
  factor: string;
  impact: 'high' | 'medium' | 'low';
  value: string | number;
  contribution: number; // percentage contribution to risk
  explanation: string;
}

export interface SyndromicCluster {
  id: string;
  location: string;
  symptoms: string[];
  caseCount: number;
  startDate: string;
  severity: number;
  isAnomalous: boolean;
  growthRate: number; // percentage
}

export interface TimeSeriesForecast {
  date: string;
  predictedCases: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export class MLAnalyticsService {
  private static readonly MODEL_VERSION = 'v2.1.0';
  private static readonly RISK_THRESHOLDS = {
    low: 25,
    medium: 50,
    high: 75,
    critical: 90
  };

  // ==================== SYNDROMIC SURVEILLANCE ====================

  /**
   * Detect symptom clustering across geographic areas
   * Identifies unusual patterns of symptoms that may indicate outbreak
   */
  static detectSyndromicClusters(reports: HealthSymptomReport[]): SyndromicCluster[] {
    const clusters: SyndromicCluster[] = [];

    // Group reports by location
    const locationGroups = this.groupByLocation(reports);

    Object.entries(locationGroups).forEach(([location, locationReports]) => {
      // Analyze symptom patterns
      const symptomFrequency = this.calculateSymptomFrequency(locationReports);
      const dominantSymptoms = Object.entries(symptomFrequency)
        .filter(([, count]) => count >= 3) // At least 3 cases
        .map(([symptom]) => symptom);

      if (dominantSymptoms.length > 0) {
        const recentReports = this.getRecentReports(locationReports, 7); // Last 7 days
        const olderReports = this.getReportsInRange(locationReports, 14, 7); // 7-14 days ago

        const growthRate = this.calculateGrowthRate(
          recentReports.length,
          olderReports.length
        );

        const avgSeverity = this.calculateAverageSeverity(recentReports);
        const isAnomalous = this.detectAnomaly(recentReports.length, location);

        clusters.push({
          id: `cluster-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          location,
          symptoms: dominantSymptoms,
          caseCount: recentReports.length,
          startDate: recentReports[0]?.timestamp || new Date().toISOString(),
          severity: avgSeverity,
          isAnomalous,
          growthRate
        });
      }
    });

    return clusters.sort((a, b) => b.caseCount - a.caseCount);
  }

  // ==================== ANOMALY DETECTION ====================

  /**
   * Detect anomalous patterns using statistical methods
   * Compares current data against historical baselines
   */
  static detectAnomaly(currentCases: number, location: string): boolean {
    // Get historical baseline (simulated - in production, fetch from database)
    const historicalData = this.getHistoricalBaseline(location);
    const mean = historicalData.mean;
    const stdDev = historicalData.stdDev;

    // Z-score calculation
    const zScore = (currentCases - mean) / stdDev;

    // Anomaly if z-score > 2 (2 standard deviations above mean)
    return Math.abs(zScore) > 2;
  }

  /**
   * Calculate anomaly score for a location
   */
  static calculateAnomalyScore(
    reports: HealthReport[],
    location: string
  ): { score: number; isAnomaly: boolean; explanation: string } {
    const recentCases = this.getRecentReports(reports, 7).length;
    const historicalData = this.getHistoricalBaseline(location);

    const zScore = (recentCases - historicalData.mean) / historicalData.stdDev;
    const score = Math.min(100, Math.max(0, (zScore + 3) * 16.67)); // Normalize to 0-100

    const isAnomaly = zScore > 2;
    const explanation = isAnomaly
      ? `${recentCases} cases detected, ${Math.round((recentCases / historicalData.mean - 1) * 100)}% above historical average`
      : 'Case count within normal range';

    return { score, isAnomaly, explanation };
  }

  // ==================== TIME-SERIES FORECASTING ====================

  /**
   * Forecast disease cases for next 7 days using time-series analysis
   * Uses exponential smoothing and trend analysis
   */
  static forecastTimeSeries(
    historicalReports: HealthReport[],
    days: number = 7
  ): TimeSeriesForecast[] {
    const forecasts: TimeSeriesForecast[] = [];

    // Prepare time series data (daily case counts)
    const dailyCases = this.aggregateDailyCases(historicalReports);

    if (dailyCases.length < 7) {
      // Not enough data for forecasting
      return [];
    }

    // Calculate trend and seasonality
    const trend = this.calculateTrend(dailyCases);
    const seasonality = this.calculateSeasonality(dailyCases);

    // Generate forecasts
    const lastDate = new Date(dailyCases[dailyCases.length - 1].date);

    for (let i = 1; i <= days; i++) {
      const forecastDate = new Date(lastDate);
      forecastDate.setDate(forecastDate.getDate() + i);

      // Exponential smoothing with trend
      // Exponential smoothing with trend
      // alpha (0.3) and beta (0.1) would be used here in a more complex model


      const lastValue = dailyCases[dailyCases.length - 1].cases;
      const predictedCases = Math.round(
        lastValue + trend * i + seasonality * Math.sin((i / 7) * Math.PI)
      );

      // Calculate confidence interval (95%)
      const stdError = this.calculateStandardError(dailyCases);
      const marginOfError = 1.96 * stdError;

      forecasts.push({
        date: forecastDate.toISOString().split('T')[0],
        predictedCases: Math.max(0, predictedCases),
        lowerBound: Math.max(0, predictedCases - marginOfError),
        upperBound: predictedCases + marginOfError,
        confidence: Math.max(60, 95 - i * 5) // Confidence decreases with forecast horizon
      });
    }

    return forecasts;
  }

  // ==================== RISK CLASSIFICATION ====================

  /**
   * Classify outbreak risk level based on multiple factors
   * Integrates health, water quality, and environmental data
   */
  static classifyRisk(
    healthReports: HealthSymptomReport[],
    waterReports: WaterQualityReport[],
    environmentalReports: EnvironmentalReport[],
    location: string
  ): PredictionResult {
    const factors: RiskFactor[] = [];
    let totalRiskScore = 0;

    // Factor 1: Symptom Clustering (40% weight)
    const clusters = this.detectSyndromicClusters(healthReports);
    const locationCluster = clusters.find(c => c.location.includes(location));
    const symptomScore = locationCluster
      ? Math.min(100, locationCluster.caseCount * 10 + locationCluster.growthRate)
      : 0;

    factors.push({
      factor: 'Symptom Clustering',
      impact: symptomScore > 70 ? 'high' : symptomScore > 40 ? 'medium' : 'low',
      value: locationCluster?.caseCount || 0,
      contribution: 40,
      explanation: locationCluster
        ? `${locationCluster.caseCount} cases with ${locationCluster.growthRate.toFixed(1)}% growth rate`
        : 'No significant clustering detected'
    });
    totalRiskScore += symptomScore * 0.4;

    // Factor 2: Water Quality (30% weight)
    const recentWaterReports = this.getRecentReports(waterReports, 7);
    const waterScore = this.calculateWaterQualityScore(recentWaterReports);

    factors.push({
      factor: 'Water Quality',
      impact: waterScore > 70 ? 'high' : waterScore > 40 ? 'medium' : 'low',
      value: `${recentWaterReports.length} sources monitored`,
      contribution: 30,
      explanation: this.getWaterQualityExplanation(recentWaterReports)
    });
    totalRiskScore += waterScore * 0.3;

    // Factor 3: Environmental Conditions (20% weight)
    const recentEnvReports = this.getRecentReports(environmentalReports, 7);
    const envScore = this.calculateEnvironmentalScore(recentEnvReports);

    factors.push({
      factor: 'Environmental Conditions',
      impact: envScore > 70 ? 'high' : envScore > 40 ? 'medium' : 'low',
      value: this.getEnvironmentalSummary(recentEnvReports),
      contribution: 20,
      explanation: 'Seasonal and sanitation factors analyzed'
    });
    totalRiskScore += envScore * 0.2;

    // Factor 4: Historical Trends (10% weight)
    const anomalyResult = this.calculateAnomalyScore(healthReports, location);

    factors.push({
      factor: 'Historical Comparison',
      impact: anomalyResult.isAnomaly ? 'high' : 'low',
      value: anomalyResult.score,
      contribution: 10,
      explanation: anomalyResult.explanation
    });
    totalRiskScore += anomalyResult.score * 0.1;

    // Determine risk level
    const riskLevel = this.getRiskLevel(totalRiskScore);

    // Predict specific diseases
    const predictedDiseases = this.predictDiseases(
      healthReports,
      waterReports,
      environmentalReports
    );

    // Calculate early warning days (3-7 days based on risk level)
    const earlyWarningDays = riskLevel.level === 'Critical' ? 3
      : riskLevel.level === 'High' ? 5
        : 7;

    return {
      location: {
        district: location,
        state: 'Assam' // Default, should be dynamic
      },
      riskLevel,
      predictedDiseases,
      earlyWarningDays,
      factors,
      timestamp: new Date().toISOString(),
      modelVersion: this.MODEL_VERSION
    };
  }

  // ==================== DISEASE PREDICTION ====================

  /**
   * Predict specific diseases based on symptom patterns and environmental factors
   */
  static predictDiseases(
    healthReports: HealthSymptomReport[],
    waterReports: WaterQualityReport[],
    environmentalReports: EnvironmentalReport[]
  ): DiseasePrediction[] {
    const predictions: DiseasePrediction[] = [];

    // Analyze symptom patterns
    const recentReports = this.getRecentReports(healthReports, 14);
    const symptomFrequency = this.calculateSymptomFrequency(recentReports);

    // Cholera prediction
    const choleraIndicators = ['diarrhea', 'vomiting', 'dehydration'];
    const choleraScore = this.calculateDiseaseScore(symptomFrequency, choleraIndicators);
    const waterContamination = this.hasWaterContamination(waterReports);

    if (choleraScore > 30 || waterContamination) {
      const probability = Math.min(95, choleraScore + (waterContamination ? 30 : 0));
      predictions.push({
        disease: 'Cholera',
        probability,
        casesExpected: Math.round(recentReports.length * (probability / 100) * 1.5),
        peakDate: this.calculatePeakDate(5),
        confidence: waterContamination ? 85 : 70
      });
    }

    // Typhoid prediction
    const typhoidIndicators = ['fever', 'abdominal', 'fatigue'];
    const typhoidScore = this.calculateDiseaseScore(symptomFrequency, typhoidIndicators);

    if (typhoidScore > 25) {
      predictions.push({
        disease: 'Typhoid',
        probability: Math.min(90, typhoidScore + 20),
        casesExpected: Math.round(recentReports.length * 0.6),
        peakDate: this.calculatePeakDate(7),
        confidence: 75
      });
    }

    // Diarrhea prediction
    const diarrheaScore = symptomFrequency['diarrhea'] || 0;

    if (diarrheaScore > 5) {
      predictions.push({
        disease: 'Acute Diarrhea',
        probability: Math.min(95, diarrheaScore * 8),
        casesExpected: Math.round(diarrheaScore * 1.3),
        peakDate: this.calculatePeakDate(3),
        confidence: 80
      });
    }

    // Hepatitis A prediction
    const hepatitisIndicators = ['fever', 'fatigue', 'abdominal'];
    const hepatitisScore = this.calculateDiseaseScore(symptomFrequency, hepatitisIndicators);
    const poorSanitation = this.hasPoorSanitation(environmentalReports);

    if (hepatitisScore > 20 && poorSanitation) {
      predictions.push({
        disease: 'Hepatitis A',
        probability: Math.min(85, hepatitisScore + 25),
        casesExpected: Math.round(recentReports.length * 0.4),
        peakDate: this.calculatePeakDate(10),
        confidence: 70
      });
    }

    return predictions.sort((a, b) => b.probability - a.probability);
  }

  // ==================== HELPER METHODS ====================

  private static groupByLocation<T extends HealthReport>(reports: T[]): Record<string, T[]> {
    return reports.reduce((acc, report) => {
      const key = `${report.location.district}, ${report.location.village || 'Unknown'}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(report);
      return acc;
    }, {} as Record<string, T[]>);
  }

  private static calculateSymptomFrequency(reports: HealthSymptomReport[]): Record<string, number> {
    const frequency: Record<string, number> = {};
    reports.forEach(report => {
      report.symptoms.forEach(symptom => {
        frequency[symptom] = (frequency[symptom] || 0) + 1;
      });
    });
    return frequency;
  }

  private static getRecentReports<T extends HealthReport>(reports: T[], days: number): T[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return reports.filter(r => new Date(r.timestamp) >= cutoffDate);
  }

  private static getReportsInRange<T extends HealthReport>(
    reports: T[],
    daysAgo: number,
    duration: number
  ): T[] {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - daysAgo);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - duration);

    return reports.filter(r => {
      const reportDate = new Date(r.timestamp);
      return reportDate >= startDate && reportDate < endDate;
    });
  }

  private static calculateGrowthRate(currentCount: number, previousCount: number): number {
    if (previousCount === 0) return currentCount > 0 ? 100 : 0;
    return ((currentCount - previousCount) / previousCount) * 100;
  }

  private static calculateAverageSeverity(reports: HealthSymptomReport[]): number {
    if (reports.length === 0) return 0;
    const sum = reports.reduce((acc, r) => acc + r.severity, 0);
    return sum / reports.length;
  }

  private static getHistoricalBaseline(_location: string): { mean: number; stdDev: number } {
    // Simulated historical data - in production, fetch from database
    // This would analyze past 6-12 months of data
    return {
      mean: 5, // Average cases per week
      stdDev: 2 // Standard deviation
    };
  }

  private static aggregateDailyCases(reports: HealthReport[]): Array<{ date: string; cases: number }> {
    const dailyMap: Record<string, number> = {};

    reports.forEach(report => {
      const date = report.timestamp.split('T')[0];
      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });

    return Object.entries(dailyMap)
      .map(([date, cases]) => ({ date, cases }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private static calculateTrend(dailyCases: Array<{ date: string; cases: number }>): number {
    if (dailyCases.length < 2) return 0;

    const recentCases = dailyCases.slice(-7);
    const sum = recentCases.reduce((acc, d) => acc + d.cases, 0);
    const avg = sum / recentCases.length;

    const olderCases = dailyCases.slice(-14, -7);
    const olderSum = olderCases.reduce((acc, d) => acc + d.cases, 0);
    const olderAvg = olderSum / olderCases.length;

    return avg - olderAvg;
  }

  private static calculateSeasonality(dailyCases: Array<{ date: string; cases: number }>): number {
    // Simplified seasonality factor
    return dailyCases.length > 0 ? dailyCases[dailyCases.length - 1].cases * 0.1 : 0;
  }

  private static calculateStandardError(dailyCases: Array<{ date: string; cases: number }>): number {
    if (dailyCases.length < 2) return 1;

    const mean = dailyCases.reduce((acc, d) => acc + d.cases, 0) / dailyCases.length;
    const variance = dailyCases.reduce((acc, d) => acc + Math.pow(d.cases - mean, 2), 0) / dailyCases.length;
    return Math.sqrt(variance);
  }

  private static getRiskLevel(score: number): RiskLevel {
    let level: 'Low' | 'Medium' | 'High' | 'Critical';
    let confidence: number;

    if (score >= this.RISK_THRESHOLDS.critical) {
      level = 'Critical';
      confidence = 95;
    } else if (score >= this.RISK_THRESHOLDS.high) {
      level = 'High';
      confidence = 90;
    } else if (score >= this.RISK_THRESHOLDS.medium) {
      level = 'Medium';
      confidence = 85;
    } else {
      level = 'Low';
      confidence = 80;
    }

    return { level, score: Math.round(score), confidence };
  }

  private static calculateWaterQualityScore(reports: WaterQualityReport[]): number {
    if (reports.length === 0) return 0;

    let score = 0;

    reports.forEach(report => {
      // pH outside WHO range (6.5-8.5)
      if (report.pH && (report.pH < 6.5 || report.pH > 8.5)) {
        score += 20;
      }

      // High turbidity (>5 NTU)
      if (report.turbidity && report.turbidity > 5) {
        score += 15;
      }

      // Bacterial contamination
      if (report.bacterialContamination === 'high') {
        score += 40;
      } else if (report.bacterialContamination === 'medium') {
        score += 25;
      }
    });

    return Math.min(100, score);
  }

  private static getWaterQualityExplanation(reports: WaterQualityReport[]): string {
    const contaminated = reports.filter(r =>
      r.bacterialContamination === 'high' || r.bacterialContamination === 'medium'
    ).length;

    if (contaminated > 0) {
      return `${contaminated} of ${reports.length} water sources show contamination`;
    }
    return 'Water quality within acceptable range';
  }

  private static calculateEnvironmentalScore(reports: EnvironmentalReport[]): number {
    if (reports.length === 0) return 0;

    let score = 0;

    reports.forEach(report => {
      // High rainfall increases risk
      if (report.rainfall && report.rainfall > 100) {
        score += 20;
      }

      // Sanitation issues
      if (report.sanitationIssues && report.sanitationIssues.length > 0) {
        score += report.sanitationIssues.length * 10;
      }

      // High humidity
      if (report.humidity && report.humidity > 80) {
        score += 15;
      }
    });

    return Math.min(100, score);
  }

  private static getEnvironmentalSummary(reports: EnvironmentalReport[]): string {
    if (reports.length === 0) return 'No data';

    const avgRainfall = reports.reduce((acc, r) => acc + (r.rainfall || 0), 0) / reports.length;
    const avgHumidity = reports.reduce((acc, r) => acc + (r.humidity || 0), 0) / reports.length;

    return `Rainfall: ${avgRainfall.toFixed(1)}mm, Humidity: ${avgHumidity.toFixed(1)}%`;
  }

  private static calculateDiseaseScore(
    symptomFrequency: Record<string, number>,
    indicators: string[]
  ): number {
    let score = 0;
    indicators.forEach(indicator => {
      score += (symptomFrequency[indicator] || 0) * 10;
    });
    return Math.min(100, score);
  }

  private static hasWaterContamination(reports: WaterQualityReport[]): boolean {
    const recentReports = this.getRecentReports(reports, 7);
    return recentReports.some(r =>
      r.bacterialContamination === 'high' || r.bacterialContamination === 'medium'
    );
  }

  private static hasPoorSanitation(reports: EnvironmentalReport[]): boolean {
    const recentReports = this.getRecentReports(reports, 7);
    return recentReports.some(r =>
      r.sanitationIssues && r.sanitationIssues.length > 2
    );
  }

  private static calculatePeakDate(daysAhead: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split('T')[0];
  }

  // ==================== PUBLIC API METHODS ====================

  /**
   * Generate comprehensive risk assessment for a location
   */
  static async generateRiskAssessment(
    location: string,
    healthReports: HealthSymptomReport[],
    waterReports: WaterQualityReport[],
    environmentalReports: EnvironmentalReport[]
  ): Promise<PredictionResult> {
    // Filter reports for the specific location
    const locationHealthReports = healthReports.filter(r =>
      r.location.district.toLowerCase().includes(location.toLowerCase())
    );
    const locationWaterReports = waterReports.filter(r =>
      r.location.district.toLowerCase().includes(location.toLowerCase())
    );
    const locationEnvReports = environmentalReports.filter(r =>
      r.location.district.toLowerCase().includes(location.toLowerCase())
    );

    return this.classifyRisk(
      locationHealthReports,
      locationWaterReports,
      locationEnvReports,
      location
    );
  }

  /**
   * Get all active clusters across all locations
   */
  static getActiveClusters(reports: HealthSymptomReport[]): SyndromicCluster[] {
    return this.detectSyndromicClusters(reports);
  }

  /**
   * Get time-series forecast for a location
   */
  static getForecast(reports: HealthReport[], days: number = 7): TimeSeriesForecast[] {
    return this.forecastTimeSeries(reports, days);
  }
}
