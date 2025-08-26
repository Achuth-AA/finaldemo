import { useState, useMemo, useEffect } from "react";
import { X, ChevronDown, Download, FileText, Database, Code, Users, Bug, Activity, Shield, BarChart3, Wrench } from "lucide-react";

// Function to extract statistics from real API JSON
function extractStatistics(data) {
  if (!data || !data.summary) {
    return { total: "-", functional: "-", nonFunctional: "-", coverage: "-", accuracy: "-" };
  }
  
  const stats = data.summary;
  const total = stats.total_test_cases || "-";
  const functional = stats.by_type?.Functional || 0;
  const nonFunctional = stats.by_type?.["Non-Functional"] || 0;
  const coverage = total === "-" ? "-" : "85%";
  const accuracy = "100%";
  
  return { total, functional, nonFunctional, coverage, accuracy };
}

// Transform API data to component format
function transformApiDataToTestCases(apiData) {
  if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
    return [];
  }

  const transformedCases = [];
  
  apiData.data.forEach(document => {
    if (document.testCases && Array.isArray(document.testCases)) {
      document.testCases.forEach(testCase => {
        const transformedCase = {
          id: testCase.testCaseId || `TC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: testCase.testScenario || "No scenario provided",
          complexity: getComplexityFromSubtype(testCase.subType),
          duration: getDurationFromSubtype(testCase.subType),
          status: "approved",
          statusColor: getStatusColorFromSubtype(testCase.subType),
          description: testCase.testScenario || "No description available",
          tags: getTagsFromTestCase(testCase),
          preconditions: testCase.prerequisites ? testCase.prerequisites.join('; ') : "No prerequisites specified",
          dependencies: "Standard system dependencies",
          testSteps: testCase.testSteps || ["No steps provided"],
          expectedResult: Array.isArray(testCase.expectedResult) 
            ? testCase.expectedResult.join('; ') 
            : testCase.expectedResult || "No expected result specified"
        };
        
        transformedCases.push(transformedCase);
      });
    }
  });
  
  return transformedCases;
}

// Helper functions for transformation
function getComplexityFromSubtype(subType) {
  switch (subType) {
    case 'happy': return 'Low complexity';
    case 'error': return 'Medium complexity';
    case 'exception': return 'High complexity';
    case 'exploratory': return 'High complexity';
    default: return 'Medium complexity';
  }
}

function getDurationFromSubtype(subType) {
  switch (subType) {
    case 'happy': return '10 mins';
    case 'error': return '15 mins';
    case 'exception': return '20 mins';
    case 'exploratory': return '25 mins';
    default: return '15 mins';
  }
}

function getStatusColorFromSubtype(subType) {
  switch (subType) {
    case 'happy': return 'green';
    case 'error': return 'orange';
    case 'exception': return 'red';
    case 'exploratory': return 'blue';
    default: return 'blue';
  }
}

function getTagsFromTestCase(testCase) {
  const tags = [];
  
  if (testCase.subType) {
    tags.push(testCase.subType);
  }
  
  if (testCase.testCaseType) {
    tags.push(testCase.testCaseType.toLowerCase());
  }
  
  const scenario = (testCase.testScenario || '').toLowerCase();
  if (scenario.includes('upload')) tags.push('upload');
  if (scenario.includes('error')) tags.push('error handling');
  if (scenario.includes('valid')) tags.push('validation');
  if (scenario.includes('file')) tags.push('file processing');
  
  return tags.slice(0, 4);
}




const mockTestScripts = [
  {
    id: "TS_WEB_001",
    name: "Invoice Upload Automation",
    type: "Web",
    framework: "Selenium WebDriver",
    status: "Generated",
    statusColor: "green",
    coverage: "95%",
    lines: 156,
    description: "Automated test script for invoice upload functionality including validation and error handling",
    lastModified: "2024-08-21 14:30:00"
  },
  {
    id: "TS_API_001",
    name: "User Authentication API Test",
    type: "API",
    framework: "RestAssured",
    status: "Generated",
    statusColor: "green",
    coverage: "100%",
    lines: 89,
    description: "API automation script for user authentication endpoints with comprehensive validation",
    lastModified: "2024-08-21 13:45:00"
  },
  {
    id: "TS_MOB_001",
    name: "Mobile Dashboard Navigation",
    type: "Mobile",
    framework: "Appium",
    status: "In Progress",
    statusColor: "orange",
    coverage: "75%",
    lines: 203,
    description: "Mobile automation script for dashboard navigation and core functionality testing",
    lastModified: "2024-08-21 12:15:00"
  }
];

const mockJiraItems = [
  { id: "PROJ-123", type: "User Story", title: "Invoice Upload Feature", status: "In Progress", assignee: "John Doe", priority: "High" },
  { id: "PROJ-124", type: "User Story", title: "Dashboard Analytics", status: "Done", assignee: "Jane Smith", priority: "Medium" },
  { id: "PROJ-125", type: "Bug", title: "Upload validation error", status: "Open", assignee: "Mike Johnson", priority: "Critical" },
  { id: "PROJ-126", type: "Test", title: "Invoice validation tests", status: "Uploaded", assignee: "QA Team", priority: "High" }
];

const mockEnvironmentData = [
  { service: "Application URL", status: "Healthy", uptime: "99.1%", lastCheck: "1 min ago", response: "45ms" },

];

const mockExecutionResults = [
  { suite: "Smoke Tests", total: 25, passed: 24, failed: 1, skipped: 0, duration: "5m 32s", success: "96%" },
  { suite: "Regression Tests", total: 156, passed: 148, failed: 6, skipped: 2, duration: "45m 18s", success: "95%" },
  { suite: "API Tests", total: 67, passed: 67, failed: 0, skipped: 0, duration: "12m 45s", success: "100%" },
  { suite: "Performance Tests", total: 12, passed: 10, failed: 2, skipped: 0, duration: "2h 15m", success: "83%" }
];

const mockReports = [
  { name: "Daily Test Summary", type: "PDF", size: "2.3 MB", generated: "2024-08-21 16:30", status: "Ready" },
  { name: "Coverage Analysis", type: "HTML", size: "1.8 MB", generated: "2024-08-21 15:45", status: "Ready" },
  { name: "Performance Metrics", type: "Excel", size: "890 KB", generated: "2024-08-21 14:20", status: "Ready" },
  { name: "Defect Trend Analysis", type: "PDF", size: "1.2 MB", generated: "2024-08-21 13:15", status: "Ready" }
];

const mockFailureAnalysis = [
  { testId: "TC_LOGIN_001", failure: "Element not found", rootCause: "UI timing issue", recommendation: "Add explicit wait", priority: "High" },
  { testId: "TC_UPLOAD_002", failure: "Timeout exception", rootCause: "Large file processing", recommendation: "Increase timeout to 60s", priority: "Medium" },
  { testId: "TC_API_003", failure: "500 Internal Error", rootCause: "Database connection", recommendation: "Check DB connectivity", priority: "Critical" }
];

const mockSelfHealingActions = [
  { timestamp: "2024-08-21 16:45", issue: "Element locator changed", action: "Updated XPath selector", status: "Resolved", impact: "3 tests fixed" },
  { timestamp: "2024-08-21 15:30", issue: "Timeout in login flow", action: "Increased wait time", status: "Resolved", impact: "Login tests stabilized" },
  { timestamp: "2024-08-21 14:15", issue: "Stale element reference", action: "Refreshed element cache", status: "Resolved", impact: "UI tests optimized" }
];

function AgentOutput({ onClose, agent }) {
  const { name } = agent;

  const [isVisible, setIsVisible] = useState(false);
  const [expandedTestCase, setExpandedTestCase] = useState(null);
  const [activeTab, setActiveTab] = useState("output");
  const [feedbackOption, setFeedbackOption] = useState("approve");
  const [comments, setComments] = useState("");
  const [statistics, setStatistics] = useState({
    total: "0",
    functional: "0",
    nonFunctional: "0",
    coverage: "0%",
    accuracy: "0%"
  });
  const [testCases, setTestCases] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [testDataResults, setTestDataResults] = useState([]);
const [testDataLoading, setTestDataLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    setExpandedTestCase(null);
    setActiveTab("output");
    setFeedbackOption("approve");
    setComments("");
    
    if (name === "Test Case Generator Agent") {
      fetchTestCaseData();
    } else {
      setStatistics({
        total: "-", functional: "-", nonFunctional: "-", coverage: "-", accuracy: "-"
      });
      setTestCases([]);
    }
  }, [name]);
    // Update the useEffect to fetch test data for Test Data Agent
useEffect(() => {
  setIsVisible(true);
  setExpandedTestCase(null);
  setActiveTab("output");
  setFeedbackOption("approve");
  setComments("");
  if (name === "Test Case Generator Agent") {
    fetchTestCaseData();
  } else if (name === "Test Data Agent") {
    fetchTestDataResults();
  } else {
    setStatistics({
      total: "-", functional: "-", nonFunctional: "-", coverage: "-", accuracy: "-"
    });
    setTestCases([]);
  }
}, [name]);

  const fetchTestCaseData = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch("http://10.107.45.15:8080/api/testcases/all");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      setApiData(data);
      
      const extractedStats = extractStatistics(data);
      setStatistics(extractedStats);
      
      const transformedTestCases = transformApiDataToTestCases(data);
      console.log("Transformed Test Cases:", transformedTestCases);
      setTestCases(transformedTestCases);
      
    } catch (error) {
      console.error("Error fetching test case data:", error);
      setStatistics({
        total: "0",
        functional: "0", 
        nonFunctional: "0",
        coverage: "0%",
        accuracy: "0%"
      });
      setTestCases([]);
    } finally {
      setLoadingStats(false);
    }
  };

  function getStatusBgColor(color) {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  }

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => onClose(false), 300);
  }

  function handleSubmitFeedback() {
    console.log("Feedback submitted:", { feedbackOption, comments });
    setFeedbackOption("approve");
    setComments("");
    onClose(false);
  }

  // Test Case Generator specific content with API data
  const renderTestCaseGeneratorContent = () => (
    <>
      {/* Statistics Grid */}
      <div className="bg-blue-50 rounded-2xl p-6 mb-4">
        <div className="grid grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {loadingStats ? <span className="animate-pulse">--</span> : statistics.coverage}
            </div>
            <div className="text-sm text-gray-600 mt-1">Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {loadingStats ? <span className="animate-pulse">--</span> : statistics.total}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Cases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {loadingStats ? <span className="animate-pulse">--</span> : statistics.accuracy}
            </div>
            <div className="text-sm text-gray-600 mt-1">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {loadingStats ? <span className="animate-pulse">--</span> : statistics.functional}
            </div>
            <div className="text-sm text-gray-600 mt-1">Functional</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {loadingStats ? <span className="animate-pulse">--</span> : statistics.nonFunctional}
            </div>
            <div className="text-sm text-gray-600 mt-1">Non-functional</div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loadingStats && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading test cases...</span>
        </div>
      )}

      {/* Test Cases */}
      {!loadingStats && (
        <div>
          {testCases.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No test cases available from API.</p>
              {apiData && (
                <p className="text-sm mt-2">
                  API Response: {apiData.success ? "Success" : "Failed"} - 
                  {apiData.data ? `${apiData.data.length} documents found` : "No data"}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">
                Showing {testCases.length} test cases from API
              </div>
              {testCases.map((testCase) => (
                <div key={testCase.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  {/* Collapsed View */}
                  <div
                    className="p-4 relative cursor-pointer"
                    onClick={() => setExpandedTestCase(expandedTestCase === testCase.id ? null : testCase.id)}
                  >
                    <div className={`absolute left-0 top-1 bottom-1 w-8 ${getStatusBgColor(testCase.statusColor)} rounded-l-2xl`}></div>
                    <div className="flex items-center justify-between ml-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-900">{testCase.id}:</span>
                          <span className="text-gray-900">{testCase.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{testCase.duration}</span>
                          <span>•</span>
                          <span>{testCase.complexity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`${getStatusBgColor(testCase.statusColor)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                          {testCase.status}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTestCase === testCase.id ? 'rotate-180' : 'rotate-[-90deg]'}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded View */}
                  {expandedTestCase === testCase.id && (
                    <div className="border-t border-gray-200 bg-gray-50 relative">
                      <div className={`absolute left-0 top-0 bottom-0 w-8 ${getStatusBgColor(testCase.statusColor)}`}></div>
                      <div className="p-6 ml-8">
                        {/* Tags */}
                        <div className="flex gap-2 mb-4">
                          {testCase.tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-gray-800 text-sm">{testCase.description}</p>
                        </div>
                        
                        {/* Preconditions and Dependencies */}
                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Preconditions</h4>
                            <p className="text-gray-600 text-sm">{testCase.preconditions}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Dependencies</h4>
                            <p className="text-gray-600 text-sm">{testCase.dependencies}</p>
                          </div>
                        </div>
                        
                        {/* Test Steps */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 text-sm mb-2">Test Steps</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {testCase.testSteps.map((step, idx) => (
                              <li key={idx} className="text-gray-600 text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        {/* Expected Result */}
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">Expected Result</h4>
                          <p className="text-gray-600 text-sm">{testCase.expectedResult}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );

 
// Helper function for better data type detection
const determineDataType = (value) => {
  if (value === null || value === undefined) return 'Null';
  if (typeof value === 'number') return 'Number';
  if (typeof value === 'boolean') return 'Boolean';
  if (typeof value === 'string') {
    if (value.includes('@') && value.includes('.')) return 'Email';
    if (value.match(/^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}:\d{2})?$/)) return 'DateTime';
    if (value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) return 'IP Address';
    if (value.match(/^[A-Z]{3}\d+$/)) return 'Reference ID';
  }
  return 'String';
};

// Helper function for status mapping
const mapStatusToSource = (status) => {
  const statusMap = {
    'Database': 'Database',
    'Generated': 'Synthetic',
    'Manual': 'Manual Entry'
  };
  return statusMap[status] || 'Unknown';
};

const fetchTestDataResults = async () => {
  setTestDataLoading(true);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch("http://10.107.45.15:8080/api/testdata/all", {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorMessage = response.status === 404 
        ? "Test data endpoint not found" 
        : `Server error: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log("Test Data API Response:", data);
    
    if (data.success && data.data && data.data.test_cases_with_data) { // ⭐ Fixed property name
      // Validate that test_cases_with_data is an array
      if (!Array.isArray(data.data.test_cases_with_data)) {
        console.error("Expected test_cases_with_data to be an array, got:", typeof data.data.test_cases_with_data);
        setTestDataResults([]);
        return;
      }

      const transformedTestData = data.data.test_cases_with_data.flatMap((testCase, index) => {
        const testDataObj = testCase.testdata || {};
        
        return Object.entries(testDataObj).map(([key, value]) => ({
          id: `${testCase.testCaseId}_${index}_${key}`,
          testCaseId: testCase.testCaseId,
          entity: key.split('.')[0] || 'Unknown',
          field: key.split('.')[1] || key, // ⭐ Fixed: was key.split('.')
          dataType: determineDataType(value),
          sampleValue: value,
          source: mapStatusToSource(testCase.status),
          status: testCase.status,
          subType: testCase.subType
        }));
      });
      
      console.log(`Processed ${transformedTestData.length} test data entries from ${data.data.test_cases_with_data.length} test cases`);
      setTestDataResults(transformedTestData);
    } else {
      console.warn("Invalid response structure:", data);
      setTestDataResults([]);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Request timeout:", error);
    } else {
      console.error("Error fetching test data:", error);
    }
    setTestDataResults([]);
  } finally {
    setTestDataLoading(false);
  }
};

const renderTestDataSpecificContent = () => {
  // Memoize calculations for better performance
  const statistics = useMemo(() => {
    if (testDataLoading || testDataResults.length === 0) {
      return { total: 0, synthetic: 0, database: 0, coverage: 0 };
    }

    const total = testDataResults.length;
    const synthetic = testDataResults.filter(item => item.source === 'Synthetic').length;
    const database = testDataResults.filter(item => item.source === 'Database').length;
    const coverage = total > 0 ? Math.round(((synthetic + database) / total) * 100) : 0;

    return { total, synthetic, database, coverage };
  }, [testDataResults, testDataLoading]);

  // Helper function to truncate long values
  const formatSampleValue = (value, maxLength = 50) => {
    if (value === null || value === undefined) return 'null';
    const stringValue = String(value);
    return stringValue.length > maxLength 
      ? `${stringValue.substring(0, maxLength)}...` 
      : stringValue;
  };

  // Enhanced status badge styling
  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'Generated': 'bg-green-100 text-green-800 border-green-200',
      'Database': 'bg-blue-100 text-blue-800 border-blue-200',
      'Manual': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSourceBadgeClass = (source) => {
    const sourceClasses = {
      'Database': 'bg-blue-100 text-blue-800 border-blue-200',
      'Synthetic': 'bg-purple-100 text-purple-800 border-purple-200',
      'Manual Entry': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return sourceClasses[source] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div>
      {/* Enhanced Statistics Cards */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {testDataLoading ? (
                <span className="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
              ) : (
                statistics.total.toLocaleString()
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Records</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-700">
              {testDataLoading ? (
                <span className="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
              ) : (
                statistics.synthetic.toLocaleString()
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">Synthetic</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">
              {testDataLoading ? (
                <span className="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
              ) : (
                statistics.database.toLocaleString()
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">Database</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">
              {testDataLoading ? (
                <span className="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
              ) : (
                `${statistics.coverage}%`
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">Coverage</div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {testDataLoading && (
        <div className="flex items-center justify-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading test data...</span>
        </div>
      )}

      {/* Enhanced Test Data Table */}
      {!testDataLoading && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Generated Test Data
              </h3>
              <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                {statistics.total.toLocaleString()} records
              </span>
            </div>
          </div>

          {/* Table Content */}
          {statistics.total === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Database className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No test data available</p>
              <p className="text-sm">Test data will appear here once generated from the API.</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                          Test Case
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Entity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Field
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                          Sample Value
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {testDataResults.map((row, index) => (
                        <tr 
                          key={row.id} 
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-800">
                            {row.testCaseId}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            {row.entity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {row.field}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">
                              {row.dataType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                            <div 
                              className="max-w-xs truncate cursor-pointer hover:text-blue-600" 
                              title={String(row.sampleValue)}
                            >
                              {formatSampleValue(row.sampleValue)}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSourceBadgeClass(row.source)}`}>
                              {row.source}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


  // Get output content based on agent name
  const getOutputContent = () => {
    switch (name) {
      case "Test Case Generator Agent":
        return renderTestCaseGeneratorContent();

      case "Test Data Agent":
        return renderTestDataSpecificContent();
       

      case "Test Script Generator Agent":
        return (
          <div>
            <div className="bg-purple-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">13</div>
                  <div className="text-sm text-gray-600 mt-1">Scripts Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600 mt-1">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">448</div>
                  <div className="text-sm text-gray-600 mt-1">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600 mt-1">Frameworks</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {mockTestScripts.map((script) => (
                <div key={script.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{script.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{script.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(script.statusColor)} text-white`}>
                      {script.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{script.type}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Framework:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{script.framework}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Coverage:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{script.coverage}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Lines:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{script.lines}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Last modified: {script.lastModified}</span>
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                      <Download className="w-4 h-4" />
                      Download Script
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
         case "Jira Management Agent":
        return (
          <div>
            <div className="bg-cyan-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1</div>
                  <div className="text-sm text-gray-600 mt-1">User Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600 mt-1">Defects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600 mt-1">Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Sync Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Jira Items Management
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockJiraItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">{item.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.title}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Done' ? 'bg-green-100 text-green-800' :
                            item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'Uploaded' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.assignee}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            item.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Environment Readiness Agent":
        return (
          <div>
            <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600 mt-1">Healthy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">99.1%</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">45ms</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Response</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Environment Health Status
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockEnvironmentData.map((env, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{env.service}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            env.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {env.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{env.uptime}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{env.lastCheck}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{env.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Test Execution and DevOps Agent":
        return (
          <div>
            <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">260</div>
                  <div className="text-sm text-gray-600 mt-1">Total Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">251</div>
                  <div className="text-sm text-gray-600 mt-1">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">9</div>
                  <div className="text-sm text-gray-600 mt-1">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">95.8%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Test Execution Results
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Suite</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passed</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockExecutionResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{result.suite}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{result.total}</td>
                        <td className="px-4 py-3 text-sm text-green-600 font-medium">{result.passed}</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-medium">{result.failed}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{result.duration}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            parseFloat(result.success) >= 95 ? 'bg-green-100 text-green-800' :
                            parseFloat(result.success) >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.success}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Test Reporting Agent":
        return (
          <div>
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4</div>
                  <div className="text-sm text-gray-600 mt-1">Reports Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">6.2</div>
                  <div className="text-sm text-gray-600 mt-1">Total Size (MB)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600 mt-1">Formats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Ready</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {mockReports.map((report, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                        <p className="text-gray-600 text-sm">Generated on {report.generated}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{report.type}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Size:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{report.size}</span>
                    </div>
                    <div className="text-right">
                      <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Test Failure Analysis Agent":
        return (
          <div>
            <div className="bg-red-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">3</div>
                  <div className="text-sm text-gray-600 mt-1">Failures Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Root Cause Found</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600 mt-1">Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">1</div>
                  <div className="text-sm text-gray-600 mt-1">Critical</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  Failure Analysis Results
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failure</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Root Cause</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockFailureAnalysis.map((failure, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">{failure.testId}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{failure.failure}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{failure.rootCause}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{failure.recommendation}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            failure.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            failure.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {failure.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Self Healing Agent":
        return (
          <div>
            <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600 mt-1">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15%</div>
                  <div className="text-sm text-gray-600 mt-1">Performance Gain</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600 mt-1">Tests Optimized</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {mockSelfHealingActions.map((action, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Wrench className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{action.issue}</h3>
                        <p className="text-gray-600 text-sm">{action.timestamp}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {action.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Action Taken:</span>
                      <p className="text-sm font-medium text-gray-900 mt-1">{action.action}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Impact:</span>
                      <p className="text-sm font-medium text-gray-900 mt-1">{action.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Orchestration Agent":
        return (
          <div>
            <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">9</div>
                  <div className="text-sm text-gray-600 mt-1">Agents Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600 mt-1">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15</div>
                  <div className="text-sm text-gray-600 mt-1">Workflows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">98.5%</div>
                  <div className="text-sm text-gray-600 mt-1">Uptime</div>
                </div>
              </div>
            </div>
            <div className="text-center py-12 text-gray-500">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Orchestration Dashboard</h3>
              <p>Central coordination and workflow management system is operational</p>
            </div>
          </div>
        );



      default:
        return (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-md mx-auto text-center text-gray-400 my-32">
            No output to display for <span className="font-semibold">{name}</span>.
          </div>
        );
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Panel */}
      <div className={`absolute right-0 top-0 h-full w-[700px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {name}: Output Review
          </h1>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 px-6 py-2 border-b border-gray-100">
          <button
            onClick={() => setActiveTab("output")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "output" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >Output</button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "feedback" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >Feedback</button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >History</button>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
          {activeTab === "output" && getOutputContent()}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Provide Feedback</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Review the agent's work and provide guidance for improvement.
                </p>
                
                {/* Feedback Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setFeedbackOption("approve")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "approve"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setFeedbackOption("revision")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "revision"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✏️ Request Revision
                  </button>
                  <button
                    onClick={() => setFeedbackOption("reject")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "reject"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🚫 Reject
                  </button>
                </div>
                
                {/* Comments Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any comments or approval notes..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={8}
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  onClick={handleSubmitFeedback}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  ✓ Submit Approval
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">History</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No history available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentOutput;
