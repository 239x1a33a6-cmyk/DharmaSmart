// API Service - Backend endpoints for data ingestion

import {
  HealthReport,
  HealthSymptomReport,
  WaterQualityReport,
  EnvironmentalReport
} from '../types/health-data';

export class APIService {
  private static readonly BASE_URL = '/api';

  // Health Report Endpoints
  static async submitHealthReport(report: HealthSymptomReport): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(report)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Water Quality Report Endpoints
  static async submitWaterReport(report: WaterQualityReport): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/water`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(report)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Environmental Report Endpoints
  static async submitEnvironmentalReport(report: EnvironmentalReport): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/environmental`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(report)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // SMS Data Submission
  static async submitSMSData(smsData: { phone: string; message: string; timestamp: string }): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(smsData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // IVR Data Submission
  static async submitIVRData(ivrData: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/ivr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(ivrData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Batch Report Submission (for sync queue)
  static async submitBatchReports(reports: HealthReport[]): Promise<{ success: boolean; results?: any[]; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ reports })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, results: data.results };
      } else {
        return { success: false, error: data.message || 'Batch submission failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Get Reports (with filters)
  static async getReports(filters?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    district?: string;
    status?: string;
  }): Promise<{ success: boolean; data?: HealthReport[]; error?: string }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }

      const response = await fetch(`${this.BASE_URL}/reports?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.reports };
      } else {
        return { success: false, error: data.message || 'Failed to fetch reports' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Get Report by ID
  static async getReportById(reportId: string): Promise<{ success: boolean; data?: HealthReport; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/${reportId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.report };
      } else {
        return { success: false, error: data.message || 'Report not found' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Update Report Status
  static async updateReportStatus(reportId: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/reports/${reportId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Update failed' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Get Statistics
  static async getStatistics(filters?: {
    startDate?: string;
    endDate?: string;
    district?: string;
  }): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const queryParams = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }

      const response = await fetch(`${this.BASE_URL}/statistics?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.statistics };
      } else {
        return { success: false, error: data.message || 'Failed to fetch statistics' };
      }
    } catch (_error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Helper: Get Auth Token
  private static getAuthToken(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.token || '';
    }
    return '';
  }

  // Check API Health
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/health`, {
        method: 'GET'
      });
      return response.ok;
    } catch (_error) {
      return false;
    }
  }
}
