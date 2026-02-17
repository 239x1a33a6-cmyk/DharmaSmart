export const districtInstructions = [
    {
        id: 'DI-2026-001',
        title: 'Urgent Dengue Prevention Drive',
        issuedBy: 'Dr. Ramesh Kumar (DHO)',
        date: '2026-02-10',
        priority: 'High',
        deadline: '2026-02-15',
        status: 'Pending', // Pending, In Progress, Completed
        description: 'Conduct door-to-door survey for stagnant water and distribute pamphlet #4.',
        attachment: 'dengue_prevention_guide.pdf'
    },
    {
        id: 'DI-2026-002',
        title: 'Maternal Health Awareness Week',
        issuedBy: 'State Health Mission',
        date: '2026-02-12',
        priority: 'Medium',
        deadline: '2026-02-20',
        status: 'In Progress',
        description: 'Organize a small group meeting for pregnant women regarding nutrition.',
        attachment: 'nutrition_chart.pdf'
    },
    {
        id: 'DI-2026-003',
        title: 'Polio Vaccination Camp Support',
        issuedBy: 'District Immunization Officer',
        date: '2026-02-08',
        priority: 'Critical',
        deadline: '2026-02-14',
        status: 'Completed',
        description: 'Ensure all children under 5 are mobilized for the camp on Sunday.',
        attachment: 'polio_checklist.pdf'
    }
];

export const awarenessSessions = [
    {
        id: 'AS-2026-101',
        topic: 'Hygiene & Handwashing',
        date: '2026-02-05',
        participants: 24,
        location: 'Community Hall',
        status: 'Completed',
        summary: 'Demonstrated 7-step handwashing technique. Distributed soap bars.'
    },
    {
        id: 'AS-2026-102',
        topic: 'Seasonal Flu Prevention',
        date: '2026-02-14',
        participants: 0,
        location: 'Anganwadi Center',
        status: 'Scheduled',
        summary: ''
    }
];

export const healthCamps = [
    {
        id: 'HC-2026-501',
        name: 'Monthly General Health Camp',
        date: '2026-02-18',
        doctor: 'Dr. Anjali Gupta',
        services: ['BP Check', 'Sugar Test', 'General Consultation'],
        target: 'Elderly & Pregnant Women',
        registered: 45,
        status: 'Upcoming'
    },
    {
        id: 'HC-2026-499',
        name: 'Eye Checkup Camp',
        date: '2026-01-20',
        doctor: 'Dr. V. Rao',
        services: ['Vision Test', 'Cataract Screening'],
        target: 'All Villagers',
        registered: 120,
        status: 'Completed'
    }
];

export const communicationArchive = [
    {
        id: 'MSG-2026-882',
        type: 'Alert',
        title: 'Boil Water Advisory',
        date: '2026-02-08',
        recipients: 142,
        status: 'Sent'
    },
    {
        id: 'MSG-2026-881',
        type: 'Camp Reminder',
        title: 'Polio Camp Tomorrow',
        date: '2026-02-13',
        recipients: 85,
        status: 'Scheduled'
    }
];
