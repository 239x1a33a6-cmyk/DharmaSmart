
import { Directive } from '../types/directive-types';

export const mockDirectives: Directive[] = [
    {
        id: 'dir-001',
        title: 'Urgent: Dengue Fumigation Drive',
        description: 'Initiate fumigation in all Sector-4 villages immediately due to rising cases.',
        type: 'order',
        priority: 'high',
        senderId: 'user-2', // District Admin ID
        senderName: 'Dr. Priya Sharma (DHO)',
        senderRole: 'DISTRICT_ADMIN',
        recipients: [
            { id: 'user-5', name: 'Lakshmi Devi', role: 'ASHA_WORKER', status: 'pending' },
            { id: 'user-8', name: 'Rita Das', role: 'ASHA_WORKER', status: 'acknowledged', respondedAt: '2024-06-15T10:00:00Z' },
        ],
        issuedAt: '2024-06-15T09:00:00Z',
        dueDate: '2024-06-16T18:00:00Z',
    },
    {
        id: 'dir-002',
        title: 'Submit Weekly Water Quality Report',
        description: 'Please submit the water quality samples for all community wells by Friday.',
        type: 'report_request',
        priority: 'medium',
        senderId: 'user-2',
        senderName: 'Dr. Priya Sharma (DHO)',
        senderRole: 'DISTRICT_ADMIN',
        recipients: [
            { id: 'user-5', name: 'Lakshmi Devi', role: 'ASHA_WORKER', status: 'completed', respondedAt: '2024-06-14T14:30:00Z' },
        ],
        issuedAt: '2024-06-12T09:00:00Z',
        dueDate: '2024-06-14T17:00:00Z',
    },
    {
        id: 'dir-003',
        title: 'Vaccination Camp Awareness',
        description: 'Conduct door-to-door awareness for the upcoming Polio camp on Sunday.',
        type: 'campaign',
        priority: 'low',
        senderId: 'user-2',
        senderName: 'Dr. Priya Sharma (DHO)',
        senderRole: 'DISTRICT_ADMIN',
        recipients: [
            { id: 'user-5', name: 'Lakshmi Devi', role: 'ASHA_WORKER', status: 'pending' },
            { id: 'user-9', name: 'Meera Oil', role: 'ASHA_WORKER', status: 'pending' },
        ],
        issuedAt: '2024-06-15T08:00:00Z',
        dueDate: '2024-06-18T10:00:00Z',
    },
];
