/**
 * Backend API Service for Django REST Framework
 * 
 * This service handles ALL communication with the Django backend:
 * - Login/Logout with JWT tokens
 * - Fetching data (reports, districts, etc.)
 * - Creating, updating, and deleting records
 * - Automatic token refresh when expired
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// All available API endpoints
export const API_ENDPOINTS = {
    // Authentication
    login: '/auth/login/',
    refresh: '/auth/refresh/',
    profile: '/auth/profile/',

    // ASHA Reports
    ashaReports: '/asha/reports/',
    waterQuality: '/asha/water-quality/',

    // Districts & Villages
    districts: '/district/boundaries/',
    villages: '/district/villages/',
    districtStats: (id: number) => `/district/boundaries/${id}/dashboard_stats/`,

    // Clinical Reports
    clinicalReports: '/clinical/reports/',

    // Alerts
    alerts: '/alerts/district-alerts/',

    // State
    advisories: '/state/advisories/',
    stateStats: '/state/advisories/dashboard_stats/',

    // Analytics
    riskScores: '/analytics/risk-scores/',
    auditLogs: '/analytics/audit-logs/',
    predict: '/analytics/predict/',
};

// Interface for login response
interface LoginResponse {
    access: string;
    refresh: string;
}

// Interface for user profile
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
    roles: Array<{
        id: number;
        name: string;
        description: string;
    }>;
}

export interface AshaReport {
    id: number;
    username: string;
    district_name: string;
    village_name: string;
    symptoms_json: {
        patientName?: string;
        symptoms: Record<string, boolean>;
        ageGroup?: string;
        severity?: string;
        waterSource?: string;
        submitted_by?: string;
    };
    geo_point: string;
    created_at: string;
    is_processed: boolean;
}

/**
 * Main Backend API Service Class
 */
class BackendApiService {
    private baseUrl = API_BASE_URL;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    constructor() {
        // Load tokens from localStorage on initialization
        this.loadTokens();
    }

    /**
     * Load tokens from localStorage
     */
    private loadTokens() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
    }

    /**
     * Save tokens to localStorage
     */
    private saveTokens(access: string, refresh?: string) {
        this.accessToken = access;
        localStorage.setItem('access_token', access);

        if (refresh) {
            this.refreshToken = refresh;
            localStorage.setItem('refresh_token', refresh);
        }
    }

    /**
     * Clear all tokens
     */
    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    /**
     * Get current access token
     */
    getAccessToken(): string | null {
        return this.accessToken;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.accessToken;
    }

    /**
     * Refresh the access token using the refresh token
     */
    private async refreshAccessToken(): Promise<void> {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.refresh}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: this.refreshToken }),
        });

        if (!response.ok) {
            this.clearTokens();
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        this.saveTokens(data.access);
    }

    /**
     * Generic request handler with automatic token refresh
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

        // Prepare headers
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Add authorization header if token exists
        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        // Make the request
        let response = await fetch(url, { ...options, headers });

        // If 401 (Unauthorized), try to refresh token and retry
        if (response.status === 401 && this.refreshToken) {
            try {
                await this.refreshAccessToken();

                // Retry the original request with new token
                headers['Authorization'] = `Bearer ${this.accessToken}`;
                response = await fetch(url, { ...options, headers });
            } catch (error) {
                // Refresh failed, redirect to login
                this.clearTokens();
                throw new Error('Authentication failed. Please login again.');
            }
        }

        // Handle errors
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        // Return JSON response
        return response.json();
    }

    /**
     * Login with username and password
     */
    async login(username: string, password: string): Promise<LoginResponse> {
        const data = await this.request<LoginResponse>(API_ENDPOINTS.login, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        this.saveTokens(data.access, data.refresh);
        return data;
    }

    /**
     * Logout and clear tokens
     */
    logout() {
        this.clearTokens();
    }

    /**
     * Get current user profile
     */
    async getProfile(): Promise<UserProfile> {
        return this.request<UserProfile>(API_ENDPOINTS.profile);
    }

    /**
     * Update user profile
     */
    async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        return this.patch<UserProfile>(API_ENDPOINTS.profile, data);
    }

    /**
     * Generic GET request
     */
    async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

// Export a single instance
export const backendApi = new BackendApiService();
