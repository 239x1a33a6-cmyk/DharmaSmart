// Super Admin Dashboard Type Definitions

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    status: 'active' | 'suspended' | 'inactive';
    district?: string;
    phc?: string;
    village?: string;
    phone?: string;
    mfaEnabled: boolean;
    lastLogin?: string;
    createdAt: string;
    profileComplete: boolean;
}

export type UserRole =
    | 'SUPER_ADMIN'
    | 'DISTRICT_ADMIN'
    | 'PHC_ADMIN'
    | 'ASHA_WORKER'
    | 'COMMUNITY_MEMBER'
    | 'DHO'
    | 'STATE_AUTHORITY';

export interface Permission {
    id: string;
    name: string;
    category: 'users' | 'districts' | 'reports' | 'settings' | 'data' | 'system';
    description: string;
}

export interface Role {
    id: string;
    name: string;
    displayName: string;
    permissions: string[]; // Permission IDs
    userCount: number;
    isSystem: boolean; // Cannot be deleted
}

export interface District {
    id: string;
    name: string;
    state: string;
    code: string;
    population: number;
    area: number; // sq km
    phcCount: number;
    ashaCount: number;
    status: 'active' | 'suspended' | 'inactive';
    riskIndex: number; // 0-100
    alertFrequency: number; // alerts per week
    complianceScore: number; // 0-100
    districtCollector?: string;
    districtAdminId?: string;
    createdAt: string;
    lastUpdated: string;
}

export interface PHC {
    id: string;
    name: string;
    districtId: string;
    districtName: string;
    code: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    population: number;
    ashaWorkers: number;
    status: 'active' | 'inactive' | 'maintenance';
    facilities: string[];
    adminId?: string;
    contactPhone?: string;
    performanceScore: number; // 0-100
    lastInspection?: string;
    createdAt: string;
}

export interface AuditLog {
    id: string;
    timestamp: string;
    userId: string;
    userName: string;
    userRole: UserRole;
    action: AuditAction;
    category: AuditCategory;
    details: string;
    ipAddress?: string;
    entityType?: string;
    entityId?: string;
    changes?: Record<string, { old: any; new: any }>;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    isAnomalous?: boolean;
    metadata?: Record<string, any>;
}

export type AuditAction =
    | 'login'
    | 'logout'
    | 'create'
    | 'update'
    | 'delete'
    | 'suspend'
    | 'activate'
    | 'permission_change'
    | 'role_assign'
    | 'password_reset'
    | 'mfa_enable'
    | 'mfa_disable'
    | 'export'
    | 'import'
    | 'settings_change'
    | 'emergency_mode';

export type AuditCategory =
    | 'authentication'
    | 'user_management'
    | 'district_management'
    | 'permissions'
    | 'security'
    | 'data'
    | 'system';

export interface AutomationRule {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    trigger: {
        type: 'symptom_spike' | 'water_quality' | 'threshold' | 'schedule' | 'manual';
        conditions: Record<string, any>;
    };
    actions: {
        type: 'notify' | 'escalate' | 'create_campaign' | 'send_alert' | 'trigger_backup';
        config: Record<string, any>;
    }[];
    schedule?: string; // cron expression
    lastRun?: string;
    executionCount: number;
    createdBy: string;
    createdAt: string;
}

export interface SecurityMetric {
    mfaEnforced: boolean;
    mfaAdoptionRate: number; // percentage
    encryptionStatus: {
        atRest: boolean;
        inTransit: boolean;
    };
    lastBackup?: string;
    backupStatus: 'success' | 'failed' | 'in_progress';
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    securityScore: number; // 0-100
    activeAdmins: number;
    failedLoginAttempts: number;
    suspiciousActivities: number;
}

export interface GlobalSettings {
    branding: {
        logo?: string;
        primaryColor: string;
        secondaryColor: string;
        theme: 'light' | 'dark' | 'auto';
    };
    authentication: {
        passwordMinLength: number;
        passwordRequireSpecialChar: boolean;
        passwordRequireNumber: boolean;
        passwordRequireUppercase: boolean;
        sessionTimeout: number; // minutes
        ssoEnabled: boolean;
    };
    notifications: {
        smsEnabled: boolean;
        smsGateway?: string;
        emailEnabled: boolean;
        emailSmtp?: string;
        pushEnabled: boolean;
    };
    features: {
        satelliteMaps: boolean;
        aiPredictions: boolean;
        offlineSync: boolean;
        autoAlerts: boolean;
    };
    localization: {
        defaultLanguage: string;
        supportedLanguages: string[];
    };
    dataRetention: {
        auditLogs: number; // days
        userActivity: number;
        healthReports: number;
    };
}

export interface EmergencyAction {
    id: string;
    type: 'maintenance_mode' | 'emergency_broadcast' | 'disable_logins' | 'account_lock';
    status: 'active' | 'resolved';
    message?: string;
    initiatedBy: string;
    initiatedAt: string;
    resolvedAt?: string;
    affectedUsers?: number;
    metadata?: Record<string, any>;
}

export interface DashboardWidget {
    id: string;
    type: 'metric' | 'chart' | 'map' | 'table' | 'alert';
    title: string;
    config: Record<string, any>;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface DashboardLayout {
    id: string;
    name: string;
    widgets: DashboardWidget[];
    isDefault: boolean;
    createdBy: string;
    createdAt: string;
}

export interface SystemMetric {
    label: string;
    value: string | number;
    trend?: string;
    icon: string;
    color: string;
    drillDownPath?: string;
}

export interface AIModelConfig {
    id: string;
    name: string;
    type: 'anomaly_detection' | 'forecasting' | 'risk_classification';
    enabled: boolean;
    version: string;
    accuracy: number;
    lastTrained?: string;
    threshold: number;
    parameters: Record<string, any>;
}

export interface Report {
    id: string;
    name: string;
    type: 'user_activity' | 'district_performance' | 'health_trends' | 'custom';
    schedule?: string; // cron expression
    format: 'pdf' | 'excel' | 'csv';
    recipients: string[];
    lastGenerated?: string;
    createdBy: string;
    createdAt: string;
}
