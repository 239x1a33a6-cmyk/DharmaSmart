// Data Validation Service - Implements WHO/IDSP Standards

import {
  HealthReport,
  HealthSymptomReport,
  WaterQualityReport,
  EnvironmentalReport,
  ValidationResult,
  DISEASE_CASE_DEFINITIONS,
  LocationData,
  ReporterInfo
} from '../types/health-data';

export class DataValidationService {
  // Validate Health Symptom Report
  static validateHealthReport(report: HealthSymptomReport): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required field validation
    if (!report.symptoms || report.symptoms.length === 0) {
      errors.push('At least one symptom is required');
    }

    if (!report.severity || report.severity < 1 || report.severity > 5) {
      errors.push('Severity must be between 1 and 5');
    }

    if (!report.ageGroup) {
      errors.push('Age group is required');
    }

    if (!report.dateOfSymptoms) {
      errors.push('Date of symptoms is required');
    }

    // Location validation
    const locationValidation = this.validateLocation(report.location);
    errors.push(...locationValidation.errors);
    warnings.push(...locationValidation.warnings);

    // Reporter validation
    const reporterValidation = this.validateReporter(report.reporter);
    errors.push(...reporterValidation.errors);

    // Disease case definition matching
    const diseaseMatch = this.matchDiseaseDefinition(report);
    if (diseaseMatch.length > 0) {
      warnings.push(`Possible diseases: ${diseaseMatch.join(', ')}`);
    }

    // Timestamp validation
    if (!report.timestamp) {
      errors.push('Timestamp is required');
    } else {
      const reportDate = new Date(report.timestamp);
      const now = new Date();
      if (reportDate > now) {
        errors.push('Report timestamp cannot be in the future');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardizedData: errors.length === 0 ? this.standardizeHealthReport(report) : undefined
    };
  }

  // Validate Water Quality Report
  static validateWaterReport(report: WaterQualityReport): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!report.sourceType) {
      errors.push('Water source type is required');
    }

    // pH validation (WHO standard: 6.5-8.5)
    if (report.pH !== undefined) {
      if (report.pH < 0 || report.pH > 14) {
        errors.push('pH must be between 0 and 14');
      } else if (report.pH < 6.5 || report.pH > 8.5) {
        warnings.push('pH outside WHO recommended range (6.5-8.5)');
      }
    }

    // Turbidity validation (WHO standard: <5 NTU)
    if (report.turbidity !== undefined && report.turbidity > 5) {
      warnings.push('Turbidity exceeds WHO standard (>5 NTU)');
    }

    // Bacterial contamination alert
    if (report.bacterialContamination === 'high' || report.bacterialContamination === 'medium') {
      warnings.push('Water contamination detected - immediate action required');
    }

    const locationValidation = this.validateLocation(report.location);
    errors.push(...locationValidation.errors);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardizedData: errors.length === 0 ? this.standardizeWaterReport(report) : undefined
    };
  }

  // Validate Environmental Report
  static validateEnvironmentalReport(report: EnvironmentalReport): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const locationValidation = this.validateLocation(report.location);
    errors.push(...locationValidation.errors);

    if (report.temperature !== undefined && (report.temperature < -10 || report.temperature > 60)) {
      warnings.push('Temperature reading seems unusual');
    }

    if (report.humidity !== undefined && (report.humidity < 0 || report.humidity > 100)) {
      errors.push('Humidity must be between 0 and 100');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardizedData: errors.length === 0 ? report : undefined
    };
  }

  // Validate Location Data
  private static validateLocation(location: LocationData): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!location.district) {
      errors.push('District is required');
    }

    if (!location.state) {
      errors.push('State is required');
    }

    if (!location.village && !location.ward) {
      warnings.push('Village or ward information recommended for better tracking');
    }

    // GPS validation
    if (location.gps) {
      const { latitude, longitude, accuracy } = location.gps;
      
      if (latitude < -90 || latitude > 90) {
        errors.push('Invalid latitude');
      }
      
      if (longitude < -180 || longitude > 180) {
        errors.push('Invalid longitude');
      }

      if (accuracy && accuracy > 100) {
        warnings.push('GPS accuracy is low (>100m)');
      }
    } else {
      warnings.push('GPS coordinates not provided - manual location entry used');
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  // Validate Reporter Information
  private static validateReporter(reporter: ReporterInfo): ValidationResult {
    const errors: string[] = [];

    if (!reporter.type) {
      errors.push('Reporter type is required');
    }

    const validTypes = ['citizen', 'asha', 'clinic', 'phc', 'district', 'state'];
    if (reporter.type && !validTypes.includes(reporter.type)) {
      errors.push('Invalid reporter type');
    }

    if (reporter.phone && !/^[6-9]\d{9}$/.test(reporter.phone)) {
      errors.push('Invalid Indian phone number format');
    }

    if (reporter.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reporter.email)) {
      errors.push('Invalid email format');
    }

    return { isValid: errors.length === 0, errors, warnings: [] };
  }

  // Match symptoms to disease case definitions
  private static matchDiseaseDefinition(report: HealthSymptomReport): string[] {
    const matches: string[] = [];

    Object.entries(DISEASE_CASE_DEFINITIONS).forEach(([disease, definition]) => {
      const hasRequiredSymptoms = definition.symptoms.every(symptom =>
        report.symptoms.some(s => s.toLowerCase().includes(symptom.toLowerCase()))
      );

      const meetsSeverity = report.severity >= definition.minSeverity;

      if (hasRequiredSymptoms && meetsSeverity) {
        matches.push(disease);
      }
    });

    return matches;
  }

  // Standardize Health Report (normalize data format)
  private static standardizeHealthReport(report: HealthSymptomReport): HealthSymptomReport {
    return {
      ...report,
      symptoms: report.symptoms.map(s => s.toLowerCase().trim()),
      location: this.standardizeLocation(report.location),
      timestamp: new Date(report.timestamp).toISOString(),
      status: 'validated'
    };
  }

  // Standardize Water Report
  private static standardizeWaterReport(report: WaterQualityReport): WaterQualityReport {
    return {
      ...report,
      location: this.standardizeLocation(report.location),
      timestamp: new Date(report.timestamp).toISOString(),
      status: 'validated'
    };
  }

  // Standardize Location Data
  private static standardizeLocation(location: LocationData): LocationData {
    return {
      ...location,
      village: location.village?.trim(),
      ward: location.ward?.trim(),
      district: location.district.trim(),
      state: location.state.trim(),
      geotagged: !!location.gps
    };
  }

  // De-duplication check (returns true if duplicate found)
  static isDuplicate(newReport: HealthReport, existingReports: HealthReport[]): boolean {
    return existingReports.some(existing => {
      const timeDiff = Math.abs(
        new Date(newReport.timestamp).getTime() - new Date(existing.timestamp).getTime()
      );
      
      // Consider duplicate if same location and within 1 hour
      const sameLocation = 
        existing.location.district === newReport.location.district &&
        existing.location.village === newReport.location.village;
      
      const withinTimeWindow = timeDiff < 3600000; // 1 hour in milliseconds

      return sameLocation && withinTimeWindow && existing.reportType === newReport.reportType;
    });
  }
}
