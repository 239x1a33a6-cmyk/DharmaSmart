// Data Ingestion Service - Handles all data collection and processing

import {
  HealthReport,
  HealthSymptomReport,
  WaterQualityReport,
  EnvironmentalReport,
  SyncQueueItem
} from '../types/health-data';
import { DataValidationService } from './data-validation';

export class DataIngestionService {
  private static readonly STORAGE_KEY = 'health_reports';
  private static readonly SYNC_QUEUE_KEY = 'sync_queue';
  private static readonly API_ENDPOINT = '/api/reports'; // Backend API endpoint

  // Submit Health Report
  static async submitHealthReport(report: Omit<HealthSymptomReport, 'id' | 'timestamp' | 'status' | 'syncStatus'>): Promise<{ success: boolean; message: string; reportId?: string }> {
    try {
      // Generate unique ID and timestamp
      const fullReport: HealthSymptomReport = {
        ...report,
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        syncStatus: 'offline'
      };

      // Validate report
      const validation = DataValidationService.validateHealthReport(fullReport);

      if (!validation.isValid) {
        return {
          success: false,
          message: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      // Check for duplicates
      const existingReports = this.getLocalReports();
      if (DataValidationService.isDuplicate(fullReport, existingReports)) {
        return {
          success: false,
          message: 'Duplicate report detected. A similar report was submitted recently.'
        };
      }

      // Use standardized data
      const standardizedReport = validation.standardizedData as HealthSymptomReport;

      // Save locally first (offline-first approach)
      this.saveLocalReport(standardizedReport);

      // Try to sync with server
      const syncResult = await this.syncToServer(standardizedReport);

      if (syncResult.success) {
        standardizedReport.syncStatus = 'synced';
        this.updateLocalReport(standardizedReport);

        return {
          success: true,
          message: 'Report submitted successfully',
          reportId: standardizedReport.id
        };
      } else {
        // Add to sync queue for later
        this.addToSyncQueue(standardizedReport);

        return {
          success: true,
          message: 'Report saved locally. Will sync when connection is available.',
          reportId: standardizedReport.id
        };
      }
    } catch (_error) {
      console.error('Error submitting health report:', _error);
      return {
        success: false,
        message: 'Failed to submit report. Please try again.'
      };
    }
  }

  // Submit Water Quality Report
  static async submitWaterReport(report: Omit<WaterQualityReport, 'id' | 'timestamp' | 'status' | 'syncStatus'>): Promise<{ success: boolean; message: string; reportId?: string }> {
    try {
      const fullReport: WaterQualityReport = {
        ...report,
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        syncStatus: 'offline'
      };

      const validation = DataValidationService.validateWaterReport(fullReport);

      if (!validation.isValid) {
        return {
          success: false,
          message: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      const standardizedReport = validation.standardizedData as WaterQualityReport;
      this.saveLocalReport(standardizedReport);

      const syncResult = await this.syncToServer(standardizedReport);

      if (syncResult.success) {
        standardizedReport.syncStatus = 'synced';
        this.updateLocalReport(standardizedReport);

        return {
          success: true,
          message: 'Water quality report submitted successfully',
          reportId: standardizedReport.id
        };
      } else {
        this.addToSyncQueue(standardizedReport);

        return {
          success: true,
          message: 'Report saved locally. Will sync when connection is available.',
          reportId: standardizedReport.id
        };
      }
    } catch (_error) {
      console.error('Error submitting water report:', _error);
      return {
        success: false,
        message: 'Failed to submit report. Please try again.'
      };
    }
  }

  // Submit Environmental Report
  static async submitEnvironmentalReport(report: Omit<EnvironmentalReport, 'id' | 'timestamp' | 'status' | 'syncStatus'>): Promise<{ success: boolean; message: string; reportId?: string }> {
    try {
      const fullReport: EnvironmentalReport = {
        ...report,
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        syncStatus: 'offline'
      };

      const validation = DataValidationService.validateEnvironmentalReport(fullReport);

      if (!validation.isValid) {
        return {
          success: false,
          message: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      const standardizedReport = validation.standardizedData as EnvironmentalReport;
      this.saveLocalReport(standardizedReport);

      const syncResult = await this.syncToServer(standardizedReport);

      if (syncResult.success) {
        standardizedReport.syncStatus = 'synced';
        this.updateLocalReport(standardizedReport);

        return {
          success: true,
          message: 'Environmental report submitted successfully',
          reportId: standardizedReport.id
        };
      } else {
        this.addToSyncQueue(standardizedReport);

        return {
          success: true,
          message: 'Report saved locally. Will sync when connection is available.',
          reportId: standardizedReport.id
        };
      }
    } catch (_error) {
      console.error('Error submitting environmental report:', _error);
      return {
        success: false,
        message: 'Failed to submit report. Please try again.'
      };
    }
  }

  // Parse SMS Data (format: "HEALTH|symptoms|severity|location")
  static parseSMSData(smsText: string): Partial<HealthSymptomReport> | null {
    try {
      const parts = smsText.split('|');

      if (parts[0].toUpperCase() !== 'HEALTH' || parts.length < 4) {
        return null;
      }

      const symptoms = parts[1].split(',').map(s => s.trim());
      const severity = parseInt(parts[2]);
      const location = parts[3].split(',');

      return {
        reportType: 'health',
        symptoms,
        severity,
        location: {
          village: location[0]?.trim(),
          district: location[1]?.trim() || '',
          state: location[2]?.trim() || '',
          geotagged: false
        },
        ageGroup: 'adult', // Default
        dateOfSymptoms: new Date().toISOString().split('T')[0],
        timeOfSymptoms: new Date().toTimeString().split(' ')[0],
        reporter: {
          type: 'citizen'
        }
      };
    } catch (_error) {
      console.error('Error parsing SMS data:', _error);
      return null;
    }
  }

  // Parse IVR Data
  static parseIVRData(ivrData: any): Partial<HealthSymptomReport> | null {
    try {
      return {
        reportType: 'health',
        symptoms: ivrData.symptoms || [],
        severity: ivrData.severity || 1,
        ageGroup: ivrData.ageGroup || 'adult',
        location: {
          district: ivrData.district || '',
          state: ivrData.state || '',
          village: ivrData.village,
          geotagged: false
        },
        dateOfSymptoms: ivrData.date || new Date().toISOString().split('T')[0],
        timeOfSymptoms: ivrData.time || new Date().toTimeString().split(' ')[0],
        reporter: {
          type: 'citizen',
          phone: ivrData.callerPhone
        }
      };
    } catch (_error) {
      console.error('Error parsing IVR data:', _error);
      return null;
    }
  }

  // Sync to Server
  private static async syncToServer(report: HealthReport): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if online
      if (!navigator.onLine) {
        return { success: false, error: 'No internet connection' };
      }

      // Simulate API call (replace with actual backend endpoint)
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report)
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: `Server error: ${response.status}` };
      }
    } catch (_error) {
      // Network error - will retry later
      return { success: false, error: 'Network error' };
    }
  }

  // Local Storage Operations
  private static saveLocalReport(report: HealthReport): void {
    const reports = this.getLocalReports();
    reports.push(report);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
  }

  private static updateLocalReport(report: HealthReport): void {
    const reports = this.getLocalReports();
    const index = reports.findIndex(r => r.id === report.id);

    if (index !== -1) {
      reports[index] = report;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
    }
  }

  private static getLocalReports(): HealthReport[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Sync Queue Operations
  private static addToSyncQueue(report: HealthReport): void {
    const queue = this.getSyncQueue();

    const queueItem: SyncQueueItem = {
      id: report.id,
      data: report,
      attempts: 0,
      lastAttempt: new Date().toISOString()
    };

    queue.push(queueItem);
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
  }

  private static getSyncQueue(): SyncQueueItem[] {
    const data = localStorage.getItem(this.SYNC_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Process Sync Queue (call this periodically or on connection restore)
  static async processSyncQueue(): Promise<{ synced: number; failed: number }> {
    const queue = this.getSyncQueue();
    let synced = 0;
    let failed = 0;

    const remainingQueue: SyncQueueItem[] = [];

    for (const item of queue) {
      if (item.attempts >= 5) {
        // Max retries reached
        failed++;
        continue;
      }

      const result = await this.syncToServer(item.data);

      if (result.success) {
        // Update local report status
        item.data.syncStatus = 'synced';
        this.updateLocalReport(item.data);
        synced++;
      } else {
        // Add back to queue with incremented attempts
        item.attempts++;
        item.lastAttempt = new Date().toISOString();
        item.error = result.error;
        remainingQueue.push(item);
        failed++;
      }
    }

    // Update queue
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(remainingQueue));

    return { synced, failed };
  }

  // Get Pending Sync Count
  static getPendingSyncCount(): number {
    return this.getSyncQueue().length;
  }

  // Generate Unique ID
  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get All Reports (for dashboard)
  static getAllReports(): HealthReport[] {
    return this.getLocalReports();
  }

  // Get Reports by Type
  static getReportsByType(type: 'health' | 'environmental' | 'water'): HealthReport[] {
    return this.getLocalReports().filter(r => r.reportType === type);
  }

  // Get Reports by Date Range
  static getReportsByDateRange(startDate: string, endDate: string): HealthReport[] {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return this.getLocalReports().filter(r => {
      const reportTime = new Date(r.timestamp).getTime();
      return reportTime >= start && reportTime <= end;
    });
  }

  // Clear Old Reports (keep last 30 days)
  static clearOldReports(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const reports = this.getLocalReports().filter(r => {
      const reportDate = new Date(r.timestamp);
      return reportDate >= thirtyDaysAgo;
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
  }
}

// Auto-sync on connection restore
window.addEventListener('online', () => {
  DataIngestionService.processSyncQueue();
});
