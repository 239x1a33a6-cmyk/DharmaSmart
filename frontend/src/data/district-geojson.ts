// District boundary GeoJSON data for Telangana districts
// Centered on Hyderabad (17.385, 78.4867)

export interface DistrictAnalytics {
    districtName: string;
    totalCases: number;
    activeCases: number;
    recovered: number;
    waterContaminationAlerts: number;
    riskScore: number;
    lastUpdated: string;
}

export const districtAnalyticsData: Record<string, DistrictAnalytics> = {
    'Hyderabad': {
        districtName: 'Hyderabad',
        totalCases: 1245,
        activeCases: 187,
        recovered: 1032,
        waterContaminationAlerts: 4,
        riskScore: 62,
        lastUpdated: new Date().toISOString(),
    },
    'Rangareddy': {
        districtName: 'Rangareddy',
        totalCases: 876,
        activeCases: 134,
        recovered: 721,
        waterContaminationAlerts: 6,
        riskScore: 71,
        lastUpdated: new Date().toISOString(),
    },
    'Medchal-Malkajgiri': {
        districtName: 'Medchal-Malkajgiri',
        totalCases: 654,
        activeCases: 98,
        recovered: 542,
        waterContaminationAlerts: 3,
        riskScore: 58,
        lastUpdated: new Date().toISOString(),
    },
    'Warangal': {
        districtName: 'Warangal',
        totalCases: 423,
        activeCases: 67,
        recovered: 342,
        waterContaminationAlerts: 8,
        riskScore: 82,
        lastUpdated: new Date().toISOString(),
    },
    'Karimnagar': {
        districtName: 'Karimnagar',
        totalCases: 312,
        activeCases: 45,
        recovered: 258,
        waterContaminationAlerts: 5,
        riskScore: 55,
        lastUpdated: new Date().toISOString(),
    },
    'Khammam': {
        districtName: 'Khammam',
        totalCases: 287,
        activeCases: 38,
        recovered: 241,
        waterContaminationAlerts: 7,
        riskScore: 74,
        lastUpdated: new Date().toISOString(),
    },
    'Nizamabad': {
        districtName: 'Nizamabad',
        totalCases: 198,
        activeCases: 29,
        recovered: 163,
        waterContaminationAlerts: 2,
        riskScore: 41,
        lastUpdated: new Date().toISOString(),
    },
    'Nalgonda': {
        districtName: 'Nalgonda',
        totalCases: 356,
        activeCases: 52,
        recovered: 294,
        waterContaminationAlerts: 9,
        riskScore: 78,
        lastUpdated: new Date().toISOString(),
    },
    'Adilabad': {
        districtName: 'Adilabad',
        totalCases: 145,
        activeCases: 18,
        recovered: 122,
        waterContaminationAlerts: 3,
        riskScore: 38,
        lastUpdated: new Date().toISOString(),
    },
    'Mahabubnagar': {
        districtName: 'Mahabubnagar',
        totalCases: 278,
        activeCases: 41,
        recovered: 229,
        waterContaminationAlerts: 6,
        riskScore: 67,
        lastUpdated: new Date().toISOString(),
    },
};

export const districtBoundaries: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { DISTRICT: 'Hyderabad', STATE: 'Telangana', CODE: 'TS-HYD' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.35, 17.30], [78.40, 17.28], [78.45, 17.30], [78.52, 17.33],
                    [78.57, 17.37], [78.58, 17.42], [78.55, 17.47], [78.50, 17.50],
                    [78.44, 17.50], [78.38, 17.47], [78.34, 17.42], [78.33, 17.36],
                    [78.35, 17.30],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Rangareddy', STATE: 'Telangana', CODE: 'TS-RNG' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [77.9, 17.0], [78.1, 16.9], [78.35, 17.0], [78.55, 17.1],
                    [78.7, 17.25], [78.65, 17.45], [78.5, 17.55], [78.3, 17.55],
                    [78.1, 17.45], [77.95, 17.3], [77.85, 17.15], [77.9, 17.0],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Medchal-Malkajgiri', STATE: 'Telangana', CODE: 'TS-MED' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.35, 17.47], [78.45, 17.50], [78.55, 17.50], [78.65, 17.55],
                    [78.70, 17.62], [78.65, 17.70], [78.55, 17.72], [78.42, 17.70],
                    [78.32, 17.62], [78.30, 17.55], [78.35, 17.47],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Warangal', STATE: 'Telangana', CODE: 'TS-WGL' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [79.2, 17.7], [79.4, 17.65], [79.65, 17.7], [79.8, 17.85],
                    [79.85, 18.05], [79.75, 18.2], [79.55, 18.3], [79.35, 18.25],
                    [79.2, 18.1], [79.1, 17.9], [79.15, 17.75], [79.2, 17.7],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Karimnagar', STATE: 'Telangana', CODE: 'TS-KNR' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.8, 18.2], [79.0, 18.15], [79.2, 18.2], [79.35, 18.35],
                    [79.4, 18.55], [79.3, 18.7], [79.1, 18.75], [78.9, 18.65],
                    [78.75, 18.5], [78.7, 18.35], [78.8, 18.2],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Khammam', STATE: 'Telangana', CODE: 'TS-KHM' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [79.8, 17.0], [80.05, 16.95], [80.3, 17.05], [80.5, 17.2],
                    [80.55, 17.45], [80.4, 17.65], [80.2, 17.75], [79.95, 17.7],
                    [79.75, 17.5], [79.65, 17.25], [79.8, 17.0],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Nizamabad', STATE: 'Telangana', CODE: 'TS-NZB' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [77.8, 18.5], [78.0, 18.45], [78.25, 18.5], [78.4, 18.65],
                    [78.45, 18.85], [78.35, 19.0], [78.15, 19.05], [77.95, 18.95],
                    [77.8, 18.8], [77.75, 18.65], [77.8, 18.5],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Nalgonda', STATE: 'Telangana', CODE: 'TS-NLG' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.7, 16.7], [78.95, 16.65], [79.2, 16.75], [79.4, 16.9],
                    [79.5, 17.1], [79.4, 17.35], [79.2, 17.45], [78.95, 17.4],
                    [78.75, 17.2], [78.65, 17.0], [78.7, 16.7],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Adilabad', STATE: 'Telangana', CODE: 'TS-ADL' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.3, 19.3], [78.55, 19.25], [78.8, 19.3], [79.0, 19.45],
                    [79.1, 19.65], [79.0, 19.8], [78.75, 19.85], [78.5, 19.75],
                    [78.3, 19.6], [78.2, 19.45], [78.3, 19.3],
                ]],
            },
        },
        {
            type: 'Feature',
            properties: { DISTRICT: 'Mahabubnagar', STATE: 'Telangana', CODE: 'TS-MBN' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [77.4, 16.2], [77.7, 16.1], [78.0, 16.2], [78.25, 16.4],
                    [78.35, 16.65], [78.2, 16.85], [77.95, 16.95], [77.65, 16.85],
                    [77.4, 16.65], [77.3, 16.4], [77.4, 16.2],
                ]],
            },
        },
    ],
};

export function getRiskColor(score: number): string {
    if (score > 80) return '#e31a1c';
    if (score > 60) return '#fd8d3c';
    if (score > 40) return '#feb24c';
    return '#31a354';
}

export function getRiskLabel(score: number): string {
    if (score > 80) return 'Critical';
    if (score > 60) return 'High';
    if (score > 40) return 'Moderate';
    return 'Low';
}
