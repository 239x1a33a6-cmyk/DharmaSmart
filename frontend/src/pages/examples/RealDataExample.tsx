/**
 * EXAMPLE: How to Use Real Backend Data
 * 
 * This file shows you how to replace mock/fake data with real data from Django.
 * Copy this pattern to any of your pages that need real data.
 */

import { useState, useEffect } from 'react';
import { backendApi, API_ENDPOINTS } from '@/services/backend-api';

// Define the data structure (matches Django model)
interface AshaReport {
    id: number;
    user: number;
    district: number;
    village: number;
    symptoms_json: {
        fever?: boolean;
        cough?: boolean;
        diarrhea?: boolean;
        rash?: boolean;
    };
    geo_point: {
        type: string;
        coordinates: [number, number]; // [longitude, latitude]
    };
    created_at: string;
}

export default function RealDataExample() {
    // State for storing the data
    const [reports, setReports] = useState<AshaReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data when component loads
    useEffect(() => {
        fetchReports();
    }, []);

    // Function to fetch ASHA reports from backend
    const fetchReports = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching reports from:', API_ENDPOINTS.ashaReports);

            // Create a timeout to prevent hanging forever
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            // Call the API (this gets real data from Django!)
            const data = await backendApi.get<AshaReport[]>(API_ENDPOINTS.ashaReports, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('Successfully fetched reports:', data);
            setReports(data);
        } catch (err) {
            let errorMessage = 'Failed to fetch reports';

            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    errorMessage = 'Request timed out. Is the backend running?';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            console.error('Error fetching reports:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new report
    const createReport = async () => {
        try {
            const newReport = {
                symptoms_json: {
                    fever: true,
                    cough: true,
                    diarrhea: false,
                    rash: false,
                },
                // Add other required fields
            };

            await backendApi.post(API_ENDPOINTS.ashaReports, newReport);

            // Refresh the list
            await fetchReports();

            alert('Report created successfully!');
        } catch (err) {
            alert('Failed to create report');
            console.error(err);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading real data from backend...</div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-red-500 text-xl font-bold">Error: {error}</div>
                <div className="text-gray-600">Make sure you are logged in and the backend is running.</div>
                <button
                    onClick={fetchReports}
                    className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    // Show the data
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">ASHA Reports (Real Data)</h1>
                <button
                    onClick={createReport}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create New Report
                </button>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    Total Reports: <strong>{reports.length}</strong>
                </p>
                <p className="text-sm text-green-600">
                    ✓ This is REAL data from the Django database!
                </p>
            </div>

            <div className="grid gap-4">
                {reports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 bg-white shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">Report #{report.id}</h3>
                                <p className="text-sm text-gray-500">
                                    Created: {new Date(report.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                Real Data
                            </span>
                        </div>

                        <div className="mt-3">
                            <h4 className="font-medium">Symptoms:</h4>
                            <ul className="mt-1 space-y-1">
                                {Object.entries(report.symptoms_json).map(([symptom, present]) => (
                                    <li key={symptom} className="flex items-center gap-2">
                                        <span className={present ? 'text-red-500' : 'text-gray-400'}>
                                            {present ? '✓' : '✗'}
                                        </span>
                                        <span className="capitalize">{symptom}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                            Location: {report.geo_point.coordinates[1].toFixed(4)},
                            {report.geo_point.coordinates[0].toFixed(4)}
                        </div>
                    </div>
                ))}
            </div>

            {reports.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No reports found. Create one to get started!
                </div>
            )}
        </div>
    );
}

/**
 * HOW TO USE THIS IN YOUR PAGES:
 * 
 * 1. Copy the fetchReports() function pattern
 * 2. Replace API_ENDPOINTS.ashaReports with your endpoint
 * 3. Update the interface to match your data structure
 * 4. Replace your mock data with the real data from state
 * 
 * Example:
 * 
 * OLD CODE:
 *   import { mockAshaReports } from '@/mocks/asha-mock-data';
 *   const reports = mockAshaReports;
 * 
 * NEW CODE:
 *   const [reports, setReports] = useState([]);
 *   useEffect(() => {
 *     backendApi.get(API_ENDPOINTS.ashaReports).then(setReports);
 *   }, []);
 */
