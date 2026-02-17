import { useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import {
  mockPredictionResults,
  mockSyndromicClusters,
  mockTimeSeriesForecasts,
  mockModelMetrics
} from '../../mocks/ml-predictions';

export default function AnalyticsPage() {
  const [selectedLocation, setSelectedLocation] = useState('Majuli');
  const [_selectedModel, _setSelectedModel] = useState<'anomaly' | 'forecast' | 'risk'>('risk');
  const [_isLoading, _setIsLoading] = useState(false);

  const currentPrediction = mockPredictionResults.find(
    p => p.location.district === selectedLocation
  ) || mockPredictionResults[0];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <i className="ri-brain-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI/ML Analytics Pipeline</h1>
                <p className="text-gray-600 mt-1">Predictive outbreak detection with explainable AI</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="ri-information-line"></i>
              <span>Model Version: {currentPrediction.modelVersion} | Last Updated: {new Date(currentPrediction.timestamp).toLocaleString()}</span>
            </div>
          </div>

          {/* Location Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="ri-map-pin-line mr-2"></i>
              Select Location for Analysis
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockPredictionResults.map((pred) => (
                <button
                  key={pred.location.district}
                  onClick={() => setSelectedLocation(pred.location.district)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all whitespace-nowrap ${selectedLocation === pred.location.district
                      ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300'
                    }`}
                >
                  <div className="text-sm">{pred.location.district}</div>
                  <div className={`text-xs mt-1 font-semibold ${pred.riskLevel.level === 'Critical' ? 'text-red-600' :
                      pred.riskLevel.level === 'High' ? 'text-orange-600' :
                        pred.riskLevel.level === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                    }`}>
                    {pred.riskLevel.level} Risk
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Assessment Card */}
          <div className={`rounded-xl shadow-lg border-2 p-8 mb-6 ${getRiskColor(currentPrediction.riskLevel.level)}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <i className="ri-alert-line text-4xl"></i>
                  <div>
                    <h2 className="text-2xl font-bold">{currentPrediction.riskLevel.level} Risk Level</h2>
                    <p className="text-sm opacity-80 mt-1">
                      {currentPrediction.location.village && `${currentPrediction.location.village}, `}
                      {currentPrediction.location.district}, {currentPrediction.location.state}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-1">{currentPrediction.riskLevel.score}</div>
                <div className="text-sm opacity-80">Risk Score</div>
                <div className="text-xs mt-2 opacity-70">
                  {currentPrediction.riskLevel.confidence}% Confidence
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                <i className="ri-time-line"></i>
                <span>Early Warning: {currentPrediction.earlyWarningDays} Days Advance Notice</span>
              </div>
              <p className="text-sm opacity-90">
                AI models predict potential outbreak with {currentPrediction.riskLevel.confidence}% confidence.
                Immediate preventive measures recommended.
              </p>
            </div>
          </div>

          {/* Predicted Diseases */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-virus-line text-red-500"></i>
              Predicted Disease Outbreaks
            </h3>
            <div className="space-y-4">
              {currentPrediction.predictedDiseases.map((disease, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{disease.disease}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Expected Peak: {new Date(disease.peakDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-600">{disease.probability}%</div>
                      <div className="text-xs text-gray-500">Probability</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">{disease.casesExpected}</div>
                      <div className="text-xs text-gray-600 mt-1">Expected Cases</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{disease.confidence}%</div>
                      <div className="text-xs text-gray-600 mt-1">Model Confidence</div>
                    </div>
                  </div>

                  {/* Probability Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${disease.probability}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explainable AI - Risk Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <i className="ri-lightbulb-line text-yellow-500"></i>
                Explainable AI: Risk Factor Breakdown
              </h3>
              <div className="text-sm text-gray-600">
                <i className="ri-information-line mr-1"></i>
                Transparent AI Decision Making
              </div>
            </div>

            <div className="space-y-4">
              {currentPrediction.factors.map((factor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{factor.factor}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getImpactColor(factor.impact)}`}>
                          {factor.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.explanation}</p>
                      <div className="text-sm font-semibold text-gray-700">
                        Value: <span className="text-teal-600">{factor.value}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-teal-600">{factor.contribution}%</div>
                      <div className="text-xs text-gray-500 mt-1">Weight</div>
                    </div>
                  </div>

                  {/* Contribution Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                    <div
                      className={`h-3 rounded-full transition-all ${factor.impact === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          factor.impact === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                            'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                      style={{ width: `${factor.contribution}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <i className="ri-shield-check-line text-2xl text-teal-600 mt-1"></i>
                <div>
                  <h4 className="font-bold text-teal-900 mb-1">AI Transparency Guarantee</h4>
                  <p className="text-sm text-teal-800">
                    All predictions are based on validated data sources and explainable algorithms.
                    Each risk factor's contribution is calculated and displayed for full transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ri-bar-chart-box-line text-blue-500"></i>
              ML Model Performance Metrics
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Anomaly Detection */}
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-radar-line text-2xl text-purple-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Anomaly Detection</h4>
                    <p className="text-xs text-gray-600">Pattern Recognition</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="font-bold text-purple-600">{mockModelMetrics.anomalyDetection.accuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Precision</span>
                    <span className="font-bold text-purple-600">{mockModelMetrics.anomalyDetection.precision}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Recall</span>
                    <span className="font-bold text-purple-600">{mockModelMetrics.anomalyDetection.recall}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">F1 Score</span>
                    <span className="font-bold text-purple-600">{mockModelMetrics.anomalyDetection.f1Score}%</span>
                  </div>
                </div>
              </div>

              {/* Time-Series Forecasting */}
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-line-chart-line text-2xl text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Time-Series Forecast</h4>
                    <p className="text-xs text-gray-600">Trend Prediction</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="font-bold text-blue-600">{mockModelMetrics.timeSeriesForecasting.accuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MAE</span>
                    <span className="font-bold text-blue-600">{mockModelMetrics.timeSeriesForecasting.mae}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">RMSE</span>
                    <span className="font-bold text-blue-600">{mockModelMetrics.timeSeriesForecasting.rmse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MAPE</span>
                    <span className="font-bold text-blue-600">{mockModelMetrics.timeSeriesForecasting.mape}%</span>
                  </div>
                </div>
              </div>

              {/* Risk Classification */}
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-2xl text-teal-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Risk Classification</h4>
                    <p className="text-xs text-gray-600">Severity Assessment</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="font-bold text-teal-600">{mockModelMetrics.riskClassification.accuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Precision</span>
                    <span className="font-bold text-teal-600">{mockModelMetrics.riskClassification.precision}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Recall</span>
                    <span className="font-bold text-teal-600">{mockModelMetrics.riskClassification.recall}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">F1 Score</span>
                    <span className="font-bold text-teal-600">{mockModelMetrics.riskClassification.f1Score}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Syndromic Surveillance Clusters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-group-line text-orange-500"></i>
              Active Syndromic Clusters
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Real-time detection of symptom clustering across geographic areas
            </p>

            <div className="space-y-3">
              {mockSyndromicClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className={`border-l-4 rounded-lg p-4 ${cluster.isAnomalous
                      ? 'border-red-500 bg-red-50'
                      : 'border-yellow-500 bg-yellow-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{cluster.location}</h4>
                        {cluster.isAnomalous && (
                          <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded whitespace-nowrap">
                            ANOMALOUS
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {cluster.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Started: {new Date(cluster.startDate).toLocaleDateString('en-IN')} |
                        Severity: {cluster.severity.toFixed(1)}/10
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-red-600">{cluster.caseCount}</div>
                      <div className="text-xs text-gray-600 mb-2">Cases</div>
                      <div className={`text-sm font-bold ${cluster.growthRate > 100 ? 'text-red-600' : 'text-orange-600'
                        }`}>
                        +{cluster.growthRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">Growth</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-calendar-line text-green-500"></i>
              7-Day Case Forecast
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Time-series prediction with confidence intervals
            </p>

            <div className="space-y-3">
              {mockTimeSeriesForecasts.map((forecast, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">
                        {new Date(forecast.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Range: {forecast.lowerBound} - {forecast.upperBound} cases
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{forecast.predictedCases}</div>
                      <div className="text-xs text-gray-600">Predicted Cases</div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${forecast.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      {forecast.confidence}% Confidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
