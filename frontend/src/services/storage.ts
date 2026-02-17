// Storage Service - Manages IndexedDB for offline data storage

export class StorageService {
  private static readonly DB_NAME = 'HealthSurveillanceDB';
  private static readonly DB_VERSION = 1;
  private static readonly STORES = {
    REPORTS: 'reports',
    SYNC_QUEUE: 'syncQueue',
    CACHE: 'cache'
  };

  private static db: IDBDatabase | null = null;

  // Initialize IndexedDB
  static async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB initialization failed');
        reject(false);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains(this.STORES.REPORTS)) {
          const reportStore = db.createObjectStore(this.STORES.REPORTS, { keyPath: 'id' });
          reportStore.createIndex('timestamp', 'timestamp', { unique: false });
          reportStore.createIndex('reportType', 'reportType', { unique: false });
          reportStore.createIndex('syncStatus', 'syncStatus', { unique: false });
        }

        if (!db.objectStoreNames.contains(this.STORES.SYNC_QUEUE)) {
          db.createObjectStore(this.STORES.SYNC_QUEUE, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(this.STORES.CACHE)) {
          const cacheStore = db.createObjectStore(this.STORES.CACHE, { keyPath: 'key' });
          cacheStore.createIndex('expiry', 'expiry', { unique: false });
        }
      };
    });
  }

  // Save report to IndexedDB
  static async saveReport(report: any): Promise<boolean> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.REPORTS], 'readwrite');
      const store = transaction.objectStore(this.STORES.REPORTS);
      const request = store.put(report);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(false);
    });
  }

  // Get all reports
  static async getAllReports(): Promise<any[]> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.REPORTS], 'readonly');
      const store = transaction.objectStore(this.STORES.REPORTS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject([]);
    });
  }

  // Get reports by sync status
  static async getReportsBySyncStatus(status: string): Promise<any[]> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.REPORTS], 'readonly');
      const store = transaction.objectStore(this.STORES.REPORTS);
      const index = store.index('syncStatus');
      const request = index.getAll(status);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject([]);
    });
  }

  // Update report
  static async updateReport(report: any): Promise<boolean> {
    return this.saveReport(report);
  }

  // Delete report
  static async deleteReport(reportId: string): Promise<boolean> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.REPORTS], 'readwrite');
      const store = transaction.objectStore(this.STORES.REPORTS);
      const request = store.delete(reportId);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(false);
    });
  }

  // Clear old reports (older than specified days)
  static async clearOldReports(daysToKeep: number = 30): Promise<number> {
    if (!this.db) await this.initialize();

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffTimestamp = cutoffDate.toISOString();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.REPORTS], 'readwrite');
      const store = transaction.objectStore(this.STORES.REPORTS);
      const index = store.index('timestamp');
      const request = index.openCursor();

      let deletedCount = 0;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          if (cursor.value.timestamp < cutoffTimestamp) {
            cursor.delete();
            deletedCount++;
          }
          cursor.continue();
        } else {
          resolve(deletedCount);
        }
      };

      request.onerror = () => reject(0);
    });
  }

  // Cache operations
  static async setCache(key: string, value: any, expiryMinutes: number = 60): Promise<boolean> {
    if (!this.db) await this.initialize();

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + expiryMinutes);

    const cacheItem = {
      key,
      value,
      expiry: expiry.toISOString()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.CACHE], 'readwrite');
      const store = transaction.objectStore(this.STORES.CACHE);
      const request = store.put(cacheItem);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(false);
    });
  }

  static async getCache(key: string): Promise<any | null> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.CACHE], 'readonly');
      const store = transaction.objectStore(this.STORES.CACHE);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        if (result && new Date(result.expiry) > new Date()) {
          resolve(result.value);
        } else {
          if (result) {
            // Delete expired cache
            this.deleteCache(key);
          }
          resolve(null);
        }
      };
      request.onerror = () => reject(null);
    });
  }

  static async deleteCache(key: string): Promise<boolean> {
    if (!this.db) await this.initialize();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORES.CACHE], 'readwrite');
      const store = transaction.objectStore(this.STORES.CACHE);
      const request = store.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(false);
    });
  }

  // Get database size estimate
  static async getStorageEstimate(): Promise<{ usage: number; quota: number } | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0
      };
    }
    return null;
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  StorageService.initialize().catch(console.error);
}
