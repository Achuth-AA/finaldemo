import { useState, useEffect } from "react";
import { agentData, performanceData } from "./agentData";
import agentTabMapping from "./agentTabMapping";
import { Users, TrendingUp, AlertTriangle, CheckSquare, Clock, Zap, BarChart3, GitBranch, Database, Code, Bug, FileText, Activity, Bot, Bell, Shield, Cpu, TestTube, Settings, Network, Monitor, Wrench } from "lucide-react";
import MyAssignedTasks from "./MyAssignedTasks";
import { MetricData } from "../../utils/metricData";
import AgentTabs from "./AgentTabs";
import AgentCard from "./AgentCard";
import AgentPerformanceCard from "./AgentPerformanceCard";
import TaskOverview from "./TaskOverview";
import ExceptionsCard from "./ExceptionsCard";
import NavigationTabs from "../cards/NavigationTabs";
import {
  AIAGENTSNAVTABS,
  LIFECYCLEMANAGEMENT,
  projectLifecycleData,
  tasks,
} from "../../utils/data";
import MetricCardList from "../UI/MetricCardList";
import AgentEcosystem from "../cards/AgentEcosystem";
import AutonomousAssisted from "../cards/AutonomousAssisted";
import ProjectDetailedCard from "../cards/ProjectDetailedCard";

const getInitialTab = (section) => {
  if (section === "agent-tasks" || section === "agent-exception") {
    return "lifecycle";
  }
  return "agents";
};

function AgentControl({ activeSection }) {
  const [activeTab, setActiveTab] = useState(() =>
    getInitialTab(activeSection)
  );
  const [activeAgentTab, setActiveAgentTab] = useState("all");
  
  // Orchestrator data states
  const [orchestratorTokens, setOrchestratorTokens] = useState(null);
  const [agentSummaries, setAgentSummaries] = useState({});
  const [loading, setLoading] = useState(false);

  // Filter agents based on active tab
  const getFilteredAgents = () => {
    if (!activeAgentTab || activeAgentTab === "all") return agentData;
    const mappedAgents = agentTabMapping[activeAgentTab] || [];
    return agentData.filter((agent) => mappedAgents.includes(agent.name));
  };
    const agentNotifications = [
    {
      id: 1,
      icon: "Users",
      title: "Jira Management Agent",
      description: "Successfully synchronized 15 user stories and tracked 3 defects across project lifecycle",
      timestamp: "2 hours ago",
      type: "info",
      status: "active"
    },
    {
      id: 2,
      icon: "FileText",
      title: "Test Case Generator Agent",
      description: "Generated 28 comprehensive test cases with 100% coverage across functional scenarios",
      timestamp: "45 minutes ago",
      type: "success",
      status: "completed"
    },
    {
      id: 3,
      icon: "Database",
      title: "Test Data Agent",
      description: "Created 23 synthetic test data records and identified 5 database sources for testing",
      timestamp: "1 hour ago",
      type: "info",
      status: "completed"
    },
    {
      id: 4,
      icon: "Code",
      title: "Test Script Generator Agent",
      description: "Automated 13 web scripts with 85% test automation coverage achieved",
      timestamp: "30 minutes ago",
      type: "success",
      status: "error"
    },
    {
      id: 5,
      icon: "Shield",
      title: "Environment Readiness Agent",
      description: "Environment health check completed - All systems operational and ready for testing",
      timestamp: "3 hours ago",
      type: "success",
      status: "active"
    },
    {
      id: 6,
      icon: "Cpu",
      title: "Test Execution & DevOps Agent",
      description: "Jenkins pipeline triggered successfully - 95% test pass rate achieved in latest build",
      timestamp: "1.5 hours ago",
      type: "success",
      status: "warning"
    },
    {
      id: 7,
      icon: "BarChart3",
      title: "Test Reporting Agent",
      description: "Generated comprehensive test reports with detailed analytics and performance metrics",
      timestamp: "4 hours ago",
      type: "info",
      status: "active"
    },
    {
      id: 8,
      icon: "AlertTriangle",
      title: "Test Failure Analysis Agent",
      description: "Analyzed 2 test failures and provided root cause analysis with recommended fixes",
      timestamp: "25 minutes ago",
      type: "warning",
      status: "processing"
    },
    {
      id: 9,
      icon: "Wrench",
      title: "Self Healing Agent",
      description: "Auto-resolved 3 test environment issues and optimized system performance by 15%",
      timestamp: "50 minutes ago",
      type: "success",
      status: "active"
    },
    {
      id: 10,
      icon: "Bot",
      title: "Orchestrator Agent",
      description: "Coordinating workflows across 9 agents - All systems synchronized and operational",
      timestamp: "5 minutes ago",
      type: "info",
      status: "processing"
    }
  ];
  // Get icon component by name
  const getIconComponent = (iconName) => {
    const icons = {
      Users, FileText, Database, Code, Shield, Cpu, BarChart3, AlertTriangle, Wrench, Bot
    };
    return icons[iconName] || Bell;
  };
 
  // Get status color
  const getStatusColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };
 
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'orchestrating': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
 
  // Notifications Component
const NotificationsSection = () => (
  <div className="mt-8">
    {/* Header Section */}
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-indigo-100 p-2 rounded-lg">
        <Bell className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Agent Activity Notifications</h3>
        <p className="text-gray-600">Real-time updates on agent operations and achievements</p>
      </div>
      <div className="ml-auto">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
          {agentNotifications.length} Recent Activities
        </span>
      </div>
    </div>

    {/* Notifications List - Single Column */}
    <div className="space-y-3">
      {agentNotifications.map((notification) => {
        const IconComponent = getIconComponent(notification.icon);
        const statusStyles = getNotificationStyles(notification.status);
        
        return (
          <div
            key={notification.id}
            className={`rounded-xl border-l-4 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${statusStyles.background} ${statusStyles.border}`}
          >
            <div className="flex items-start gap-4">
              {/* Icon Section */}
              <div className={`p-2.5 rounded-full ${statusStyles.iconBg}`}>
                <IconComponent className={`w-5 h-5 ${statusStyles.iconColor}`} />
              </div>

              {/* Content Section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-3 ${statusStyles.badge}`}>
                    {notification.status}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notification.timestamp}
                  </span>
                  <button className={`text-xs font-medium hover:underline transition-colors ${statusStyles.linkColor}`}>
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Helper function for status-based styling
const getNotificationStyles = (status) => {
  const styles = {
    completed: {
      background: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-l-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      badge: 'bg-green-100 text-green-800',
      linkColor: 'text-green-600 hover:text-green-800'
    },
    warning: {
      background: 'bg-gradient-to-r from-amber-50 to-yellow-50',
      border: 'border-l-amber-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800',
      linkColor: 'text-amber-600 hover:text-amber-800'
    },
    error: {
      background: 'bg-gradient-to-r from-red-50 to-rose-50',
      border: 'border-l-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badge: 'bg-red-100 text-red-800',
      linkColor: 'text-red-600 hover:text-red-800'
    },
   active: {
      background: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      border: 'border-l-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      linkColor: 'text-blue-600 hover:text-blue-800'
    },
    processing: {
      background: 'bg-gradient-to-r from-purple-50 to-indigo-50',
      border: 'border-l-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800',
      linkColor: 'text-purple-600 hover:text-purple-800'
    },
    default: {
      background: 'bg-gradient-to-r from-gray-50 to-slate-50',
      border: 'border-l-gray-400',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-800',
      linkColor: 'text-gray-600 hover:text-gray-800'
    }
  };

  return styles[status.toLowerCase()] || styles.default;
};

 

  const filteredAgents = getFilteredAgents();

  // Fetch orchestrator and agent data
  useEffect(() => {
    if (activeTab === "orchestrator") {
      fetchOrchestratorData();
    }
  }, [activeTab]);

  const fetchOrchestratorData = async () => {
    setLoading(true);
    try {
      // Fetch orchestrator tokens
      const orchestratorResponse = await fetch("http://10.107.45.15:8080/api/tokens/agent/orchestrator_agent");
      if (orchestratorResponse.ok) {
        const orchestratorData = await orchestratorResponse.json();
        setOrchestratorTokens(orchestratorData);
      }

      // Fetch all agent summaries
      const summaries = {};
      
      // Fetch test case data
      try {
        const testCaseResponse = await fetch("http://10.107.45.15:8080/api/testcases/summary");
        if (testCaseResponse.ok) {
          summaries.testCase = await testCaseResponse.json();
        }
      } catch (err) {
        console.error("Error fetching test case data:", err);
      }

      // Fetch test data summary
      try {
        const testDataResponse = await fetch("http://10.107.45.15:8080/api/testdata/summary");
        if (testDataResponse.ok) {
          summaries.testData = await testDataResponse.json();
        }
      } catch (err) {
        console.error("Error fetching test data summary:", err);
      }

      // Fetch test script summary
      try {
        const testScriptResponse = await fetch("http://10.107.45.15:8080/api/testscripts/summary");
        if (testScriptResponse.ok) {
          summaries.testScript = await testScriptResponse.json();
        }
      } catch (err) {
        console.error("Error fetching test script summary:", err);
      }

      // Fetch Jira metrics
      try {
        const jiraResponse = await fetch("http://10.107.45.15:8080/api/jira/summary");
        if (jiraResponse.ok) {
          summaries.jira = await jiraResponse.json();
        }
      } catch (err) {
        console.error("Error fetching Jira metrics:", err);
      }

      setAgentSummaries(summaries);
    } catch (error) {
      console.error("Error fetching orchestrator data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Orchestrator Overview Component
  const OrchestratorOverview = () => (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Orchestrator Dashboard</h2>
              <p className="text-indigo-100">Central coordination and workflow management</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-200 mb-1">Status</div>
            <div className="bg-green-500 px-4 py-2 rounded-full text-sm font-medium">
              ACTIVE
            </div>
          </div>
        </div>

        {orchestratorTokens && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium text-indigo-100">Total Tokens</span>
              </div>
              <div className="text-2xl font-bold">
                {formatTokens(orchestratorTokens.tokensConsumed)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium text-indigo-100">Agent Coordination Overhead</span>
              </div>
              <div className="text-2xl font-bold">
                {formatExecutionTime(orchestratorTokens.executionTime)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium text-indigo-100">Tokens/Sec</span>
              </div>
              <div className="text-2xl font-bold">
                {orchestratorTokens.tokensPerSecond || 0}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-medium text-indigo-100">Agents Managed</span>
              </div>
              <div className="text-2xl font-bold">
                {Object.keys(agentSummaries).length}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-medium text-indigo-100">Uptime (%)</span>
              </div>
              <div className="text-2xl font-bold">
                66 %
              </div>
            </div>
             <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-medium text-indigo-100">Human Intervention Rate (HIR)</span>
              </div>
              <div className="text-2xl font-bold">
                2/7 
              </div>
              
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-medium text-indigo-100">Latency</span>
              </div>
              <div className="text-2xl font-bold">
                31s
              </div>
            </div>
             <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium text-indigo-100">Task Success Rate</span>
              </div>
              <div className="text-2xl font-bold">
              100%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Agent Summary Cards
  const AgentSummaryCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Test Case Generator Agent */}
      {agentSummaries.testCase && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Test Case Generator</h3>
                <p className="text-blue-100 text-sm">Latest execution results</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">{agentSummaries.testCase.count || 0}</div>
                <div className="text-sm text-blue-100">Test Cases</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">{agentSummaries.testCase.statistics?.total_documents || 0}</div>
                <div className="text-sm text-blue-100">Total Paths</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  agentSummaries.testCase.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {agentSummaries.testCase.status?.toUpperCase()}
                </span>
                <span className="text-gray-500 text-sm">{agentSummaries.testCase.action_performed}</span>
              </div>
              <p className="text-gray-600 text-sm">{agentSummaries.testCase.message}</p>
            </div>
            
            {agentSummaries.testCase.statistics?.by_subtype && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Test Distribution</h5>
                <div className="space-y-2">
                  {Object.entries(agentSummaries.testCase.statistics.by_subtype).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{type}</span>
                      <span className="text-sm font-bold text-blue-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test Data Agent */}
      {agentSummaries.testData && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Test Data Agent</h3>
                <p className="text-green-100 text-sm">Data generation summary</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.testData.agentic_tile?.total_test_data_generated || 0}
                </div>
                <div className="text-sm text-green-100">Total Generated</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.testData.agent_summary?.synthetic_test_data_generated || 0}
                </div>
                <div className="text-sm text-green-100">Synthetic Data</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-2">
                <strong>Execution ID:</strong> {agentSummaries.testData.execution_id}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Last Updated:</strong> {
                  agentSummaries.testData.timestamp 
                    ? new Date(agentSummaries.testData.timestamp).toLocaleDateString() 
                    : 'N/A'
                }
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Data Sources</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database Sources</span>
                  <span className="text-sm font-bold text-green-600">
                    {agentSummaries.testData.agent_summary?.test_data_identified_from_database || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Synthetic Data</span>
                  <span className="text-sm font-bold text-green-600">
                    {agentSummaries.testData.agent_summary?.synthetic_test_data_generated || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Script Generator Agent */}
      {agentSummaries.testScript && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Test Script Generator</h3>
                <p className="text-purple-100 text-sm">Automation script metrics</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.testScript.test_metrics?.scripts_generated?.total || 0}
                </div>
                <div className="text-sm text-purple-100">Scripts Generated</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.testScript.test_metrics?.automation_coverage || 85}%
                </div>
                <div className="text-sm text-purple-100">Coverage</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Test Cases</span>
                  <div className="font-bold text-gray-900">
                    {agentSummaries.testScript.test_metrics?.total_test_cases || 0}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Accuracy</span>
                  <div className="font-bold text-gray-900">
                    {agentSummaries.testScript.test_metrics?.automatable_tests || 65}%
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Script Types</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Web Scripts</span>
                  <span className="text-sm font-bold text-purple-600">
                    {agentSummaries.testScript.test_metrics?.scripts_generated?.web || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mobile Scripts</span>
                  <span className="text-sm font-bold text-purple-600">
                    {agentSummaries.testScript.test_metrics?.scripts_generated?.mobile || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Scripts</span>
                  <span className="text-sm font-bold text-purple-600">
                    {agentSummaries.testScript.test_metrics?.scripts_generated?.api || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jira Management Agent */}
      {agentSummaries.jira && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Jira Management</h3>
                <p className="text-cyan-100 text-sm">
                  Project: {agentSummaries.jira.agentic_title_details?.project_name || 'N/A'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.jira.agentic_title_details?.extracted_user_stories || 0}
                </div>
                <div className="text-sm text-cyan-100">User Stories</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <div className="text-2xl font-bold">
                  {agentSummaries.jira.agentic_summary?.total_tests?.total_tests_in_project || 'XBAN'}
                </div>
                <div className="text-sm text-cyan-100">Project Name</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Defects</h5>
                <div className="text-2xl font-bold text-red-600">
                  {agentSummaries.jira.agentic_summary?.total_defects?.total_defects_in_project || 0}
                </div>
                <div className="text-sm text-gray-500">In Project</div>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Tests Uploaded</h5>
                <div className="text-2xl font-bold text-green-600">
                  {agentSummaries.jira.agentic_summary?.total_tests?.tests_uploaded_to_jira || 26}
                </div>
                <div className="text-sm text-gray-500">To Jira</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-700 mb-2">User Story Distribution</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lead Assigned</span>
                  <span className="font-bold text-cyan-600">
                    {agentSummaries.jira.agentic_summary?.total_user_stories?.test_lead_total_assigned_user_stories_by_all_users || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engineer Extracted</span>
                  <span className="font-bold text-cyan-600">
                    {agentSummaries.jira.agentic_summary?.total_user_stories?.test_engineer_total_extracted_user_stories || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handleSectionTabChange = (section) => {
    switch (section) {
      case "agent-tasks":
      case "agent-exception":
        return (
          <>
            <AutonomousAssisted />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={LIFECYCLEMANAGEMENT}
            />
          </>
        );
      case "agent-control":
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
      default:
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Alert Notifications */}
      <div className="px-6 pt-4 flex gap-4">
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-red-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Critical Issue</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-red-500 font-bold text-xl mx-2">1</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-orange-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Pending tasks</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-orange-500 font-bold text-xl mx-2">2</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className=" px-6 mt-4">
        <div className="bg-custom-gradient rounded-3xl p-1" style={{ color:"white"}}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("agents")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "agents"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setActiveTab("orchestrator")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "orchestrator"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Orchestrator
            </button>
            <button
              onClick={() => setActiveTab("lifecycle")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "lifecycle"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Lifecycle Management
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "performance"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "tasks"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Tasks & Workflows
            </button>
            <button
              onClick={() => setActiveTab("exceptions")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "exceptions"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Exceptions
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "agents" && (
          <div className="space-y-6">
            {/* Agent Control Header */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Agent Control</h2>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Sub-navigation Pills */}
            <AgentTabs
              activeTab={activeAgentTab}
              setActiveTab={setActiveAgentTab}
            />

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "orchestrator" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* <Bot className="w-6 h-6 text-indigo-600" /> */}
              {/* <h2 className="text-2xl font-bold text-gray-900">Orchestrator Dashboard</h2> */}
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading orchestrator data...</span>
              </div>
            ) : (
              <>
                <OrchestratorOverview />
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Agent Ecosystem Summary</h3>
                  <p className="text-gray-600 mb-6">
                    Real-time overview of all managed agents and their current operational status
                  </p>
                </div>
                
                <AgentSummaryCards />
                
                {Object.keys(agentSummaries).length === 0 && (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Agent Data Available</h3>
                    <p className="text-gray-500">Agent summaries will appear here once data is available.</p>
                  </div>
                )}
              </>
            )}
                            <NotificationsSection />

          </div>
        )}

        {activeTab === "lifecycle" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Lifecycle Management</h2>
            {projectLifecycleData.map((data) => (
              <ProjectDetailedCard key={data.title} projectData={data} />
            ))}
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Agent Performance Overview</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.map((agent, index) => (
                  <AgentPerformanceCard key={index} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rest of your existing tabs remain the same */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            {/* Your existing tasks content */}
          </div>
        )}

        {activeTab === "exceptions" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Exceptions</h2>
            <ExceptionsCard />
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentControl;
