export const interventionTasks = [
  {
    id: 'TASK-001',
    title: 'Cholera Outbreak Response - Majuli',
    description: 'Conduct door-to-door health screening and distribute ORS packets',
    location: 'Majuli District, Assam',
    assignedTo: 'Priya Sharma (ASHA Worker)',
    assignedToRole: 'ASHA Worker',
    dueDate: '2024-01-18',
    createdDate: '2024-01-15',
    priority: 'critical',
    status: 'in_progress',
    progress: 65,
    type: 'health_screening',
    affectedPopulation: 12500,
    resources: ['ORS Packets (5000)', 'Chlorine Tablets (2000)', 'Health Education Materials'],
    timeline: [
      { date: '2024-01-15 09:30', action: 'Task created and assigned', user: 'District Officer' },
      { date: '2024-01-15 11:45', action: 'Task accepted by field worker', user: 'Priya Sharma' },
      { date: '2024-01-16 08:00', action: 'Started door-to-door screening', user: 'Priya Sharma' },
      { date: '2024-01-16 14:30', action: 'Screened 450 households, distributed 1200 ORS packets', user: 'Priya Sharma' },
      { date: '2024-01-17 09:15', action: 'Identified 23 suspected cases, referred to PHC', user: 'Priya Sharma' }
    ],
    outcomes: {
      householdsScreened: 450,
      casesIdentified: 23,
      orsDistributed: 1200,
      referrals: 23
    }
  },
  {
    id: 'TASK-002',
    title: 'Water Quality Testing - Dibrugarh',
    description: 'Test all community water sources for bacterial contamination',
    location: 'Dibrugarh District, Assam',
    assignedTo: 'Rajesh Kumar (Lab Technician)',
    assignedToRole: 'Lab Technician',
    dueDate: '2024-01-17',
    createdDate: '2024-01-14',
    priority: 'high',
    status: 'in_progress',
    progress: 80,
    type: 'water_testing',
    affectedPopulation: 8200,
    resources: ['Water Testing Kits (50)', 'Sample Collection Bottles (200)', 'Transport Vehicle'],
    timeline: [
      { date: '2024-01-14 10:00', action: 'Task created and assigned', user: 'State Authority' },
      { date: '2024-01-14 15:20', action: 'Equipment collected from district lab', user: 'Rajesh Kumar' },
      { date: '2024-01-15 07:30', action: 'Started water source testing', user: 'Rajesh Kumar' },
      { date: '2024-01-15 16:45', action: 'Tested 40 sources, 8 contaminated', user: 'Rajesh Kumar' },
      { date: '2024-01-16 11:00', action: 'Submitted contamination report', user: 'Rajesh Kumar' }
    ],
    outcomes: {
      sourcesTest: 40,
      contaminated: 8,
      safe: 32,
      samplesCollected: 120
    }
  },
  {
    id: 'TASK-003',
    title: 'Community Health Education - Silchar',
    description: 'Conduct awareness sessions on hygiene and safe water practices',
    location: 'Silchar, Cachar District',
    assignedTo: 'Anita Devi (Health Educator)',
    assignedToRole: 'Health Educator',
    dueDate: '2024-01-20',
    createdDate: '2024-01-15',
    priority: 'medium',
    status: 'pending',
    progress: 25,
    type: 'education',
    affectedPopulation: 6800,
    resources: ['Educational Posters (500)', 'Handwashing Demonstration Kits', 'Audio-Visual Equipment'],
    timeline: [
      { date: '2024-01-15 14:00', action: 'Task created and assigned', user: 'District Officer' },
      { date: '2024-01-16 09:00', action: 'Materials prepared and reviewed', user: 'Anita Devi' },
      { date: '2024-01-16 15:30', action: 'Scheduled 5 community sessions', user: 'Anita Devi' }
    ],
    outcomes: {
      sessionsPlanned: 5,
      sessionsCompleted: 1,
      attendees: 85,
      materialsDistributed: 120
    }
  },
  {
    id: 'TASK-004',
    title: 'Medical Supply Distribution - Jorhat',
    description: 'Distribute antibiotics and rehydration supplies to affected areas',
    location: 'Jorhat District, Assam',
    assignedTo: 'Vikram Singh (Supply Officer)',
    assignedToRole: 'Supply Officer',
    dueDate: '2024-01-16',
    createdDate: '2024-01-13',
    priority: 'high',
    status: 'completed',
    progress: 100,
    type: 'supply_distribution',
    affectedPopulation: 4500,
    resources: ['Antibiotics (2000 doses)', 'ORS Packets (3000)', 'IV Fluids (500 units)'],
    timeline: [
      { date: '2024-01-13 11:00', action: 'Task created and assigned', user: 'State Authority' },
      { date: '2024-01-13 14:30', action: 'Supplies collected from central warehouse', user: 'Vikram Singh' },
      { date: '2024-01-14 08:00', action: 'Started distribution to 8 PHCs', user: 'Vikram Singh' },
      { date: '2024-01-14 17:00', action: 'Completed distribution to all PHCs', user: 'Vikram Singh' },
      { date: '2024-01-15 10:00', action: 'Submitted completion report with signatures', user: 'Vikram Singh' }
    ],
    outcomes: {
      phcsSupplied: 8,
      antibioticsDistributed: 2000,
      orsDistributed: 3000,
      ivFluidsDistributed: 500
    }
  },
  {
    id: 'TASK-005',
    title: 'Rapid Response Team Deployment - Tinsukia',
    description: 'Deploy medical team for outbreak investigation and containment',
    location: 'Tinsukia District, Assam',
    assignedTo: 'Dr. Meena Patel (Medical Officer)',
    assignedToRole: 'Medical Officer',
    dueDate: '2024-01-19',
    createdDate: '2024-01-16',
    priority: 'critical',
    status: 'in_progress',
    progress: 40,
    type: 'rapid_response',
    affectedPopulation: 3200,
    resources: ['Medical Team (5 members)', 'Ambulance', 'Emergency Medical Kits', 'PPE Supplies'],
    timeline: [
      { date: '2024-01-16 08:00', action: 'Emergency alert received', user: 'System' },
      { date: '2024-01-16 09:30', action: 'Rapid response team assembled', user: 'Dr. Meena Patel' },
      { date: '2024-01-16 12:00', action: 'Team deployed to affected area', user: 'Dr. Meena Patel' },
      { date: '2024-01-16 16:45', action: 'Initial assessment completed, 45 cases identified', user: 'Dr. Meena Patel' }
    ],
    outcomes: {
      casesExamined: 120,
      casesConfirmed: 45,
      hospitalized: 12,
      samplesCollected: 45
    }
  },
  {
    id: 'TASK-006',
    title: 'Sanitation Improvement - Guwahati',
    description: 'Install handwashing stations in high-risk community areas',
    location: 'Guwahati, Kamrup District',
    assignedTo: 'Ramesh Bora (Sanitation Worker)',
    assignedToRole: 'Sanitation Worker',
    dueDate: '2024-01-22',
    createdDate: '2024-01-16',
    priority: 'medium',
    status: 'pending',
    progress: 15,
    type: 'sanitation',
    affectedPopulation: 15000,
    resources: ['Handwashing Stations (20)', 'Soap Dispensers (40)', 'Water Tanks (20)'],
    timeline: [
      { date: '2024-01-16 13:00', action: 'Task created and assigned', user: 'District Officer' },
      { date: '2024-01-17 10:00', action: 'Site survey completed', user: 'Ramesh Bora' },
      { date: '2024-01-17 14:30', action: 'Equipment ordered and scheduled for delivery', user: 'Ramesh Bora' }
    ],
    outcomes: {
      sitesIdentified: 20,
      stationsInstalled: 3,
      pending: 17
    }
  }
];

export const medicalSupplies = [
  {
    id: 'SUP-001',
    name: 'ORS Packets',
    category: 'Rehydration',
    totalStock: 50000,
    currentStock: 32400,
    allocated: 17600,
    location: 'District Medical Store, Guwahati',
    status: 'adequate',
    lastRestocked: '2024-01-10',
    expiryDate: '2025-06-30'
  },
  {
    id: 'SUP-002',
    name: 'Antibiotics (Ciprofloxacin)',
    category: 'Medication',
    totalStock: 10000,
    currentStock: 2800,
    allocated: 7200,
    location: 'District Medical Store, Guwahati',
    status: 'low',
    lastRestocked: '2024-01-05',
    expiryDate: '2025-12-31'
  },
  {
    id: 'SUP-003',
    name: 'IV Fluids (Ringer Lactate)',
    category: 'Rehydration',
    totalStock: 5000,
    currentStock: 3200,
    allocated: 1800,
    location: 'District Medical Store, Guwahati',
    status: 'adequate',
    lastRestocked: '2024-01-12',
    expiryDate: '2025-09-30'
  },
  {
    id: 'SUP-004',
    name: 'Chlorine Tablets',
    category: 'Water Treatment',
    totalStock: 20000,
    currentStock: 800,
    allocated: 19200,
    location: 'District Medical Store, Guwahati',
    status: 'critical',
    lastRestocked: '2024-01-08',
    expiryDate: '2026-03-31'
  },
  {
    id: 'SUP-005',
    name: 'Zinc Supplements',
    category: 'Medication',
    totalStock: 15000,
    currentStock: 9500,
    allocated: 5500,
    location: 'District Medical Store, Guwahati',
    status: 'adequate',
    lastRestocked: '2024-01-14',
    expiryDate: '2025-08-31'
  },
  {
    id: 'SUP-006',
    name: 'Rapid Diagnostic Kits',
    category: 'Testing',
    totalStock: 2000,
    currentStock: 450,
    allocated: 1550,
    location: 'District Medical Store, Guwahati',
    status: 'low',
    lastRestocked: '2024-01-11',
    expiryDate: '2025-04-30'
  },
  {
    id: 'SUP-007',
    name: 'PPE Kits',
    category: 'Safety',
    totalStock: 8000,
    currentStock: 5200,
    allocated: 2800,
    location: 'District Medical Store, Guwahati',
    status: 'adequate',
    lastRestocked: '2024-01-13',
    expiryDate: '2026-12-31'
  },
  {
    id: 'SUP-008',
    name: 'Water Testing Kits',
    category: 'Testing',
    totalStock: 500,
    currentStock: 280,
    allocated: 220,
    location: 'District Medical Store, Guwahati',
    status: 'adequate',
    lastRestocked: '2024-01-09',
    expiryDate: '2025-11-30'
  }
];

export const waterSources = [
  {
    id: 'WS-001',
    name: 'Community Well #12',
    type: 'Well',
    location: 'Majuli District, Assam',
    issue: 'High bacterial contamination detected',
    action: 'Chlorination and source protection',
    progress: 85,
    status: 'in_progress',
    assignedTo: 'Ravi Sharma',
    startDate: '2024-01-14',
    targetDate: '2024-01-18',
    affectedHouseholds: 450
  },
  {
    id: 'WS-002',
    name: 'Handpump Station A',
    type: 'Handpump',
    location: 'Dibrugarh District, Assam',
    issue: 'Turbidity exceeds safe limits',
    action: 'Filter installation and maintenance',
    progress: 100,
    status: 'completed',
    assignedTo: 'Suresh Kumar',
    startDate: '2024-01-10',
    targetDate: '2024-01-15',
    affectedHouseholds: 280
  },
  {
    id: 'WS-003',
    name: 'River Water Intake Point',
    type: 'River',
    location: 'Silchar, Cachar District',
    issue: 'Seasonal contamination from upstream',
    action: 'Advanced filtration system setup',
    progress: 60,
    status: 'in_progress',
    assignedTo: 'Amit Borah',
    startDate: '2024-01-12',
    targetDate: '2024-01-20',
    affectedHouseholds: 1200
  },
  {
    id: 'WS-004',
    name: 'Community Tank #5',
    type: 'Tank',
    location: 'Jorhat District, Assam',
    issue: 'Algae growth and pH imbalance',
    action: 'Tank cleaning and pH correction',
    progress: 100,
    status: 'completed',
    assignedTo: 'Pradeep Das',
    startDate: '2024-01-08',
    targetDate: '2024-01-13',
    affectedHouseholds: 320
  },
  {
    id: 'WS-005',
    name: 'Borewell #23',
    type: 'Borewell',
    location: 'Tinsukia District, Assam',
    issue: 'Mechanical failure and contamination risk',
    action: 'Pump replacement and disinfection',
    progress: 40,
    status: 'in_progress',
    assignedTo: 'Kamal Singh',
    startDate: '2024-01-15',
    targetDate: '2024-01-22',
    affectedHouseholds: 180
  },
  {
    id: 'WS-006',
    name: 'Public Tap System',
    type: 'Piped Water',
    location: 'Guwahati, Kamrup District',
    issue: 'Leakage causing secondary contamination',
    action: 'Pipeline repair and chlorination',
    progress: 25,
    status: 'pending',
    assignedTo: 'Bikash Gogoi',
    startDate: '2024-01-16',
    targetDate: '2024-01-25',
    affectedHouseholds: 850
  }
];

export const fieldWorkers = [
  { id: 'FW-001', name: 'Priya Sharma', role: 'ASHA Worker', location: 'Majuli District', activeTasks: 3, completedTasks: 24 },
  { id: 'FW-002', name: 'Rajesh Kumar', role: 'Lab Technician', location: 'Dibrugarh District', activeTasks: 2, completedTasks: 18 },
  { id: 'FW-003', name: 'Anita Devi', role: 'Health Educator', location: 'Silchar', activeTasks: 1, completedTasks: 15 },
  { id: 'FW-004', name: 'Vikram Singh', role: 'Supply Officer', location: 'Jorhat District', activeTasks: 0, completedTasks: 32 },
  { id: 'FW-005', name: 'Dr. Meena Patel', role: 'Medical Officer', location: 'Tinsukia District', activeTasks: 2, completedTasks: 28 },
  { id: 'FW-006', name: 'Ramesh Bora', role: 'Sanitation Worker', location: 'Guwahati', activeTasks: 1, completedTasks: 21 }
];

export const performanceMetrics = {
  totalTasksCreated: 156,
  totalTasksCompleted: 132,
  averageCompletionTime: '2.4 hours',
  onTimeCompletionRate: 94,
  fieldWorkersActive: 48,
  totalPopulationReached: 125000,
  suppliesDistributed: 45000,
  waterSourcesRemediated: 23
};
