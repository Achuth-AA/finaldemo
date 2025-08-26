// SummaryModal.jsx
import { X, TrendingUp, Clock, Zap, Calendar, FileText, RefreshCw, CheckCircle, AlertTriangle, Database, Code, BarChart3, Users, Bug } from "lucide-react";
import { useState, useEffect } from "react";

function SummaryModal({ onClose, agent }) {
  const [summaryData, setSummaryData] = useState(null);
  const [testCaseData, setTestCaseData] = useState(null);
  const [testDataSummary, setTestDataSummary] = useState(null);
  const [testScriptSummary, setTestScriptSummary] = useState(null);
  const [testFailureData, setTestFailureData] = useState(null);

  const [jiraMetrics, setJiraMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Helper function to get database agent name (same as in AgentCard)
  const getDbAgentName = (displayName) => {
    const agentNameMapping = {
      "Jira Management Agent": "jira_mcp_agent",
      "Test Case Generator Agent": "test_case_generator_agent",
      "Test Data Agent": "test_data_root_agent",
      "Test Script Generator Agent": "test_script_root_agent",
      "Environment Readiness Agent": "env_readiness_agent",
      "Test Execution and DevOps Agent": "autonomous_test_execution_agent",
      "Test Reporting Agent": "Test_Report_generation_agent",
      "Test Failure Analysis Agent": "Test_Failure_Analysis_agent",
      "Self Healing Agent": "self_healing_root_agent",
      "Orchestration Agent": "orchestrator_agent",
    };
    
    return (
      agentNameMapping[displayName] ||
      displayName.toLowerCase().replace(/\s+/g, "_")
    );
  };

  // Check agent types
  const isTestCaseAgent = agent.name === "Test Case Generator Agent";
  const isTestDataAgent = agent.name === "Test Data Agent";
  const isTestScriptAgent = agent.name === "Test Script Generator Agent";
  const isJiraAgent = agent.name === "Jira Management Agent";
  const isTestFailureAgent = agent.name === "Test Failure Analysis Agent";


  // Fetch test case data for Test Case Generator Agent
  const fetchTestCaseData = async () => {
    try {
      const response = await fetch("http://10.107.45.15:8080/api/testcases/summary");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestCaseData(data);
    } catch (err) {
      console.error("Error fetching test case data:", err);
    }
  };

  // Fetch test data summary for Test Data Agent
  const fetchTestDataSummary = async () => {
    try {
      const response = await fetch("http://10.107.45.15:8080/api/testdata/summary");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestDataSummary(data);
    } catch (err) {
      console.error("Error fetching test data summary:", err);
    }
  };

  // Fetch test script summary for Test Script Generator Agent
  const fetchTestScriptSummary = async () => {
    try {
      const response = await fetch("http://10.107.45.15:8080/api/testscripts/summary");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestScriptSummary(data);
    } catch (err) {
      console.error("Error fetching test script summary:", err);
    }
  };

  // Fetch Jira metrics for Jira Management Agent
  const fetchJiraMetrics = async () => {
    try {
      const response = await fetch("http://10.107.45.15:8080/api/jira/summary");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJiraMetrics(data);
    } catch (err) {
      console.error("Error fetching Jira metrics:", err);
    }
  };
  // Fetch test failure analysis data for Test Failure Analysis Agent
const fetchTestFailureAnalysis = async () => {
  try {
    const response = await fetch("http://10.107.45.15:8080/api/testfailure/summary");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setTestFailureData(data);
  } catch (err) {
    console.error("Error fetching test failure analysis data:", err);
  }
};


  // Fetch summary data using the same API as AgentCard
  useEffect(() => {
    const fetchSummaryData = async () => {
      const dbName = getDbAgentName(agent.name);
      try {
        setLoading(true);
        
        // Fetch regular summary data
        const response = await fetch(
          `http://10.107.45.15:8080/api/tokens/agent/${dbName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSummaryData(data);

        // Fetch agent-specific data based on agent type
        if (isTestCaseAgent) {
          await fetchTestCaseData();
        } else if (isTestDataAgent) {
          await fetchTestDataSummary();
        } else if (isTestScriptAgent) {
          await fetchTestScriptSummary();
        } else if (isJiraAgent) {
          await fetchJiraMetrics();
        } else if (isTestFailureAgent){
          await fetchTestFailureAnalysis();
        }
      } catch (err) {
        console.error("Error fetching summary data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (agent?.name) {
      fetchSummaryData();
    }
  }, [agent, isTestCaseAgent, isTestDataAgent, isTestScriptAgent, isJiraAgent,isTestFailureAgent]);

  // Helper functions for formatting
  const formatTokens = (tokens) => {
    if (!tokens) return "0";
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const formatExecutionTime = (seconds) => {
    if (!seconds) return "0 min";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.round(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const renderTestFailureSpecificContent = () => {
  if (!testFailureData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">No test failure analysis data available</span>
        </div>
      </div>
    );
  }

  const data = testFailureData.data || {};
  const metrics = data.metrics || {};
  const analysisDetails = data.analysisDetails || {};

  return (
    <div className="space-y-6">
      {/* Test Failure Analysis Overview */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <Bug className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-800">Test Failure Analysis Summary</h3>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {analysisDetails.status || 'COMPLETED'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Total Scripts</div>
            <div className="text-2xl font-bold text-blue-600">{data.totalScripts || 0}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Application Issues</div>
            <div className="text-2xl font-bold text-orange-600">{data.applicationIssues || 0}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Automation Issues</div>
            <div className="text-2xl font-bold text-red-600">{data.automationIssues || 0}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">Recommendations</div>
            <div className="text-2xl font-bold text-green-600">{data.totalRecommendations || 0}</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <strong>Analysis Status:</strong> {analysisDetails.status || 'COMPLETED'} • 
          <strong> Scripts Analyzed:</strong> {analysisDetails.scriptsAnalyzed || data.totalScripts || 0}
        </div>
      </div>

      {/* Issue Distribution */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-red-500" />
          Issue Distribution Analysis
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-orange-50 rounded border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-orange-700">Application Issues</span>
              <span className="text-xl font-bold text-orange-800">{data.applicationIssues || 0}</span>
            </div>
            <div className="text-xs text-orange-600">
              {metrics.issueDistribution?.application?.percentage || 0}% of total scripts
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${metrics.issueDistribution?.application?.percentage || 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="p-4 bg-red-50 rounded border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-700">Automation Issues</span>
              <span className="text-xl font-bold text-red-800">{data.automationIssues || 0}</span>
            </div>
            <div className="text-xs text-red-600">
              {metrics.issueDistribution?.automation?.percentage || 0}% of total scripts
            </div>
            <div className="w-full bg-red-200 rounded-full h-2 mt-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${metrics.issueDistribution?.automation?.percentage || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Health Metrics */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Test Suite Health Overview
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded border">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {metrics.overallHealth?.healthScore || 0}%
            </div>
            <div className="text-sm font-medium text-green-700">Health Score</div>
            <div className="text-xs text-green-600 mt-1">Overall test suite health</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded border">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {metrics.overallHealth?.scriptsWithIssues || 0}
            </div>
            <div className="text-sm font-medium text-red-700">Scripts with Issues</div>
            <div className="text-xs text-red-600 mt-1">Require attention</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded border">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {metrics.overallHealth?.scriptsHealthy || 0}
            </div>
            <div className="text-sm font-medium text-blue-700">Healthy Scripts</div>
            <div className="text-xs text-blue-600 mt-1">No issues found</div>
          </div>
        </div>
      </div>

      {/* Summary Text */}
      {data.summary && (
        <div className="bg-gray-50 border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            Detailed Analysis Report
          </h4>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-auto max-h-64">
            {data.summary}
          </pre>
        </div>
      )}
    </div>
  );
};

  // Test Case Generator Agent specific content
  const renderTestCaseSpecificContent = () => {
    if (!testCaseData) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">No test case execution data available</span>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Test Case Execution Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Latest Test Case Execution</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              testCaseData.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {testCaseData.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Total Test Cases</div>
              <div className="text-2xl font-bold text-blue-600">{testCaseData.count}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Paths</div>
              <div className="text-2xl font-bold text-green-600">{testCaseData.statistics?.total_documents || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Action</div>
              <div className="text-sm font-medium text-purple-600">{testCaseData.action_performed}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Output File</div>
              <div className="text-xs text-gray-700 truncate" title={testCaseData.file_path}>
                {testCaseData.file_path?.split('/').pop() || 'N/A'}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <strong>Message:</strong> {testCaseData.message}
          </div>
        </div>

        {/* Test Case Type Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            Test Case Distribution
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Type */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">By Type</h5>
              <div className="space-y-2">
                {testCaseData.statistics?.by_type && Object.entries(testCaseData.statistics.by_type).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-sm font-medium text-blue-700">{type}</span>
                    <span className="text-sm font-bold text-blue-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Subtype */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">By Subtype</h5>
              <div className="space-y-2">
                {testCaseData.statistics?.by_subtype && Object.entries(testCaseData.statistics.by_subtype).map(([subtype, count]) => (
                  <div key={subtype} className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium text-green-700 capitalize">{subtype}</span>
                    <span className="text-sm font-bold text-green-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Breakdown */}
        {/* <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Test Cases by Document
          </h4>
          
          <div className="space-y-3">
            {testCaseData.statistics?.by_document?.map((doc, index) => (
              <div key={doc.document_id} className="bg-gray-50 p-4 rounded border">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-700">Document {index + 1}</span>
                  <span className="text-sm font-bold text-indigo-600">{doc.test_cases_count} test cases</span>
                </div>
                <div className="text-xs text-gray-600 break-all">
                  <strong>Path:</strong> {truncateText(doc.path, 150)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <strong>ID:</strong> {doc.document_id}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    );
  };

  // Test Data Agent specific content
  const renderTestDataSpecificContent = () => {
    if (!testDataSummary) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">No test data summary available</span>
          </div>
        </div>
      );
    }


    const summary = testDataSummary.agent_summary || {};
    const tile = testDataSummary.agentic_tile || {};

    return (
      <div className="space-y-6">
        {/* Test Data Generation Overview */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Test Data Generation Summary</h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Total Generated</div>
              <div className="text-2xl font-bold text-green-600">{tile.total_test_data_generated || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">From Database</div>
              <div className="text-2xl font-bold text-blue-600">{summary.test_data_identified_from_database || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Synthetic Data</div>
              <div className="text-2xl font-bold text-purple-600">{summary.synthetic_test_data_generated || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Pending</div>
              <div className="text-2xl font-bold text-orange-600">{summary.to_be_identified_mapped_test_data || 0}</div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <strong>Execution ID:</strong> {testDataSummary.execution_id || 'N/A'}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Last Updated:</strong> {testDataSummary.timestamp ? new Date(testDataSummary.timestamp).toLocaleString() : 'N/A'}
          </div>
        </div>

        {/* Test Data Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-500" />
            Data Generation Breakdown
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm font-medium text-green-700">Total Identified & Generated</span>
              <span className="text-lg font-bold text-green-800">{summary.total_test_data_identified_and_generated || 0}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="text-sm text-blue-700 mb-1">Database Sources</div>
                <div className="text-xl font-bold text-blue-800">{summary.test_data_identified_from_database || 0}</div>
                <div className="text-xs text-blue-600 mt-1">
                  {((summary.test_data_identified_from_database || 0) / (summary.total_test_data_identified_and_generated || 1) * 100).toFixed(1)}% of total
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded">
                <div className="text-sm text-purple-700 mb-1">Synthetic Generation</div>
                <div className="text-xl font-bold text-purple-800">{summary.synthetic_test_data_generated || 0}</div>
                <div className="text-xs text-purple-600 mt-1">
                  {((summary.synthetic_test_data_generated || 0) / (summary.total_test_data_identified_and_generated || 1) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Test Script Generator Agent specific content
  const renderTestScriptSpecificContent = () => {
    if (!testScriptSummary) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">No test script summary available</span>
          </div>
        </div>
      );
    }

    const metrics = testScriptSummary.test_metrics || {};
    const scripts = metrics.scripts_generated || {};

    return (
      <div className="space-y-6">
        {/* Test Script Generation Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">Test Script Generation Summary</h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Total Test Cases</div>
              <div className="text-2xl font-bold text-blue-600">{metrics.total_test_cases || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Scripts Generated</div>
              <div className="text-2xl font-bold text-purple-600">{scripts.total || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Script Validity Rate</div>
              <div className="text-2xl font-bold text-green-600">{metrics.automatable_tests || 65}%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Coverage %</div>
              <div className="text-2xl font-bold text-orange-600">{metrics.automation_coverage || 85}%</div>
            </div>
          </div>
        </div>

        {/* Script Type Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-500" />
            Script Generation Breakdown
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-700">Web Scripts</span>
                <span className="text-xl font-bold text-blue-800">{scripts.web || 0}</span>
              </div>
              <div className="text-xs text-blue-600">
                {scripts.total > 0 ? ((scripts.web || 0) / scripts.total * 100).toFixed(1) : 0}% of total scripts
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">Mobile Scripts</span>
                <span className="text-xl font-bold text-green-800">{scripts.mobile || 0}</span>
              </div>
              <div className="text-xs text-green-600">
                {scripts.total > 0 ? ((scripts.mobile || 0) / scripts.total * 100).toFixed(1) : 0}% of total scripts
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-700">API Scripts</span>
                <span className="text-xl font-bold text-orange-800">{scripts.api || 0}</span>
              </div>
              <div className="text-xs text-orange-600">
                {scripts.total > 0 ? ((scripts.api || 0) / scripts.total * 100).toFixed(1) : 0}% of total scripts
              </div>
            </div>
          </div>

          {/* Automation Metrics */}
          {/* <div className="mt-6 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-3">Automation Metrics</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-1">Automation Feasibility</div>
                <div className="text-lg font-bold text-gray-800">{metrics.automation_feasibility || 0}%</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-1">Coverage Achieved</div>
                <div className="text-lg font-bold text-gray-800">{metrics.automation_coverage || 0}%</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  // Jira Management Agent specific content
  const renderJiraSpecificContent = () => {
    if (!jiraMetrics) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">No Jira metrics available</span>
          </div>
        </div>
      );
    }

    const summary = jiraMetrics.agentic_summary || {};
    const titleDetails = jiraMetrics.agentic_title_details || {};
    const userStories = summary.total_user_stories || {};
    const defects = summary.total_defects || {};
    const tests = summary.total_tests || {};

    return (
      <div className="space-y-6">
        {/* Jira Project Overview */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-gray-800">Jira Project Management Summary</h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
              {titleDetails.project_name || 'PROJECT'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Extracted Stories</div>
              <div className="text-2xl font-bold text-cyan-600">{titleDetails.extracted_user_stories || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Total Defects</div>
              <div className="text-2xl font-bold text-red-600">{defects.total_defects_in_project || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Tests in Project</div>
              <div className="text-2xl font-bold text-green-600">{tests.total_tests_in_project || 0}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Tests Uploaded</div>
              <div className="text-2xl font-bold text-purple-600">{tests.tests_uploaded_to_jira || 0}</div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <strong>Project:</strong> {titleDetails.project_name || 'N/A'}
          </div>
        </div>

        {/* User Stories Management */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            User Stories Management
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded border">
              <div className="text-sm text-blue-700 mb-2">Test Lead Assigned</div>
              <div className="text-2xl font-bold text-blue-800">
                {userStories.test_lead_total_assigned_user_stories_by_all_users || 0}
              </div>
              <div className="text-xs text-blue-600 mt-1">Total assigned by all users</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded border">
              <div className="text-sm text-green-700 mb-2">Engineer Extracted</div>
              <div className="text-2xl font-bold text-green-800">
                {userStories.test_engineer_total_extracted_user_stories || 0}
              </div>
              <div className="text-xs text-green-600 mt-1">Extracted by engineers</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded border">
              <div className="text-sm text-orange-700 mb-2">Engineer Assigned</div>
              <div className="text-2xl font-bold text-orange-800">
                {userStories.test_engineer_total_assigned_user_stories || 0}
              </div>
              <div className="text-xs text-orange-600 mt-1">Currently assigned</div>
            </div>
          </div>
        </div>

        {/* Defects & Testing Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Defects Section */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-500" />
              Defects Management
            </h4>
            
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded">
                <div className="text-sm text-red-700 mb-1">Total Defects</div>
                <div className="text-xl font-bold text-red-800">{defects.total_defects_in_project || 0}</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded">
                <div className="text-sm text-yellow-700 mb-1">Assigned for Retest (Lead)</div>
                <div className="text-lg font-bold text-yellow-800">
                  {defects.total_defects_assigned_for_retest_by_engineers_lead || 0}
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded">
                <div className="text-sm text-orange-700 mb-1">Assigned for Retest (Engineer)</div>
                <div className="text-lg font-bold text-orange-800">
                  {defects.total_defects_assigned_for_retesting_engineer || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Tests Section */}
          <div className="bg-white border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Tests Management
            </h4>
            
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded">
                <div className="text-sm text-green-700 mb-1">Total Tests</div>
                <div className="text-xl font-bold text-green-800">{tests.total_tests_in_project || 0}</div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded">
                <div className="text-sm text-purple-700 mb-1">Uploaded to Jira</div>
                <div className="text-lg font-bold text-purple-800">{tests.tests_uploaded_to_jira || 0}</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-700 mb-1">Upload Progress</div>
                <div className="text-lg font-bold text-gray-800">
                  {tests.total_tests_in_project > 0 
                    ? ((tests.tests_uploaded_to_jira || 0) / tests.total_tests_in_project * 100).toFixed(1) 
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Get the appropriate subtitle based on agent type
const getAgentSubtitle = () => {
  if (isTestCaseAgent) return 'Performance Overview & Test Case Generation Summary';
  if (isTestDataAgent) return 'Performance Overview & Test Data Generation Summary';
  if (isTestScriptAgent) return 'Performance Overview & Test Script Generation Summary';
  if (isJiraAgent) return 'Performance Overview & Jira Management Summary';
  if (isTestFailureAgent) return 'Performance Overview & Test Failure Analysis Summary';  // ADD THIS LINE
  return 'Performance Overview & Execution Summary';
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${agent.iconBgColor} rounded-lg flex items-center justify-center`}>
              <agent.icon className={`w-5 h-5 ${agent.iconColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {agent.name} Summary
              </h2>
              <p className="text-sm text-gray-500">
                {getAgentSubtitle()}
              </p>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            <span className="ml-3 text-gray-600">Loading summary...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Error loading summary</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics Grid for ALL agents */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Total Tokens</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatTokens(summaryData?.tokensConsumed)}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Execution Time</span>
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {formatExecutionTime(summaryData?.executionTime)}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Tokens/Sec</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {summaryData?.tokensPerSecond || 0}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Last Updated</span>
                </div>
                <div className="text-sm font-bold text-orange-800">
                  {formatTimeAgo(summaryData?.lastUpdated || summaryData?.lastEndTime)}
                </div>
              </div>
            </div>

   
{(isTestCaseAgent || isTestDataAgent || isTestScriptAgent || isJiraAgent || isTestFailureAgent) && (  // ADD isTestFailureAgent
  <div>
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {isTestCaseAgent && "Test Case Generation Details"}
        {isTestDataAgent && "Test Data Generation Details"}
        {isTestScriptAgent && "Test Script Generation Details"}
        {isJiraAgent && "Jira Management Details"}
        {isTestFailureAgent && "Test Failure Analysis Details"}  {/* ADD THIS LINE */}
      </h3>
      
      {isTestCaseAgent && renderTestCaseSpecificContent()}
      {isTestDataAgent && renderTestDataSpecificContent()}
      {isTestScriptAgent && renderTestScriptSpecificContent()}
      {isJiraAgent && renderJiraSpecificContent()}
      {isTestFailureAgent && renderTestFailureSpecificContent()}  {/* ADD THIS LINE */}
    </div>
  </div>
)}

            {/* Execution Timeline - Show for ALL agents */}
            {summaryData?.lastStartTime && summaryData?.lastEndTime && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Last Execution Timeline</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Start Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastStartTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">End Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastEndTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                      <span className="text-sm text-blue-700">Duration:</span>
                      <span className="text-sm font-bold text-blue-900">
                        {formatExecutionTime(summaryData?.executionTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryModal;
