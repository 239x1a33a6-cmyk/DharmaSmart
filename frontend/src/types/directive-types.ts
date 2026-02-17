
export type DirectivePriority = 'low' | 'medium' | 'high' | 'critical';
export type DirectiveStatus = 'pending' | 'acknowledged' | 'in_progress' | 'completed';
export type DirectiveType = 'order' | 'report_request' | 'campaign' | 'emergency';

export interface Directive {
    id: string;
    title: string;
    description: string;
    type: DirectiveType;
    priority: DirectivePriority;
    senderId: string;
    senderName: string;
    senderRole: string;
    recipients: {
        id: string; // user id or group id (e.g., 'all-asha-jorhat')
        name: string;
        role: string;
        status: DirectiveStatus;
        respondedAt?: string;
    }[];
    issuedAt: string;
    dueDate?: string;
    attachments?: string[];
}
