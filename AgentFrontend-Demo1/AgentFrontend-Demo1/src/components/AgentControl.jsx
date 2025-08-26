import { useState } from "react";
import {
  ArrowLeft,
  Users,
  BarChart3,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  Package,
  GitBranch,
  Laptop,
  Eye,
  MessageSquare,
  Play,
  Target,
  Zap,
  Shield,
  FileText,
  Settings,
} from "lucide-react";

function AgentControl({ setActiveSection }) {
  const [activeTab, setActiveTab] = useState("agents");
  const [activeAgentTab, setActiveAgentTab] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Review Payment Gateway Security Test Results",
      description:
        "Critical security vulnerabilities detected in payment flow - requires immediate review and sign-off",
      agent: "Test Failure Analysis Agent",
      status: "critical",
      statusText: "needs approval",
      dueDate: "8/3/2025",
      estimatedTime: "4h",
      actual: "2.5h",
    },
    {
      id: 2,
      title: "Configure Load Testing Environment",
      description:
        "Setup and configuration of load testing environment - blocked by security review completion",
      agent: "Environment Readiness Agent",
      status: "high",
      statusText: "blocked",
      dueDate: "3/2/2025",
      estimatedTime: "6h",
      actual: "",
    },
    {
      id: 3,
      title: "Validate Mobile Regression Test Cases",
      description:
        "Review and validate generated test cases for mobile application regression testing",
      agent: "Smart Test Review Agent",
      status: "medium",
      statusText: "pending",
      dueDate: "8/6/2025",
      estimatedTime: "8h",
      actual: "",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-gray-700 text-white";
      case "medium":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusTextBadgeClass = (statusText) => {
    switch (statusText) {
      case "needs approval":
        return "bg-red-500 text-white";
      case "blocked":
        return "bg-red-600 text-white";
      case "pending":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="h-full bg-gray-950 text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <button
          onClick={() => setActiveSection("ai-assistant")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Chat</span>
        </button>

        <h1 className="text-2xl font-semibold mb-2">AI Agents</h1>
        <p className="text-gray-400">
          Work with your assigned AI testing agents and view active testing
          tasks
        </p>
      </div>

      {/* Enhanced AI Agent Ecosystem Card */}
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Enhanced AI Agent Ecosystem
            </h2>
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full flex items-center gap-1">
              <Users className="w-3 h-3" />
              Engineer Access
            </span>
          </div>
          <p className="text-gray-400">
            Advanced multi-agent testing team with 12 accessible agents and 4
            assigned tasks
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setActiveTab("agents")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
              activeTab === "agents"
                ? "text-blue-400 border-blue-400"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Agents</span>
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
              activeTab === "performance"
                ? "text-blue-400 border-blue-400"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Performance</span>
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
              activeTab === "tasks"
                ? "text-blue-400 border-blue-400"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>My Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab("exceptions")}
            className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
              activeTab === "exceptions"
                ? "text-blue-400 border-blue-400"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Exceptions (1)</span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "agents" && (
          <div className="space-y-6">
            {/* Existing My Assigned Tasks Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <CheckSquare className="w-3 h-3" />
                </div>
                <h3 className="text-lg font-medium">My Assigned Tasks (4)</h3>
              </div>

              {/* Task Cards */}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg p-5 border ${
                    task.status === "high" && task.statusText === "blocked"
                      ? "bg-red-900/20 border-red-700"
                      : "bg-gray-900 border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium">{task.title}</h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusTextBadgeClass(
                            task.statusText
                          )}`}
                        >
                          {task.statusText}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-gray-500">Agent:</span>
                          <span className="text-gray-300 ml-2">
                            {task.agent}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Due Date:</span>
                          <span className="text-gray-300 ml-2">
                            {task.dueDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Estimated:</span>
                          <span className="text-gray-300 ml-2">
                            {task.estimatedTime}
                          </span>
                        </div>
                        {task.actual && (
                          <div>
                            <span className="text-gray-500">Actual:</span>
                            <span className="text-green-400 ml-2">
                              {task.actual}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Testing Features Button */}
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <CheckSquare className="w-4 h-4" />
                  Testing Features
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-medium mb-6">AI Agent Ecosystem</h3>
            </div>

            {/* Agent Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-800">
              <button
                onClick={() => setActiveAgentTab("all")}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeAgentTab === "all"
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                All Agents (12)
              </button>
              <button
                onClick={() => setActiveAgentTab("orchestration")}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeAgentTab === "orchestration"
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                Orchestration (1)
              </button>
              <button
                onClick={() => setActiveAgentTab("core-testing")}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeAgentTab === "core-testing"
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <Zap className="w-4 h-4" />
                Core Testing (5)
              </button>
              <button
                onClick={() => setActiveAgentTab("integration")}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeAgentTab === "integration"
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <GitBranch className="w-4 h-4" />
                Integration (2)
              </button>
              <button
                onClick={() => setActiveAgentTab("analysis")}
                className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeAgentTab === "analysis"
                    ? "text-white border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analysis (4)
              </button>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Case Generator Agent */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        Test Case Generator Agent
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      </h3>
                      {/* <p className="text-sm text-gray-400">Creates comprehensive test cases and leverages existing test patterns</p> */}
                    </div>
                  </div>
                  {/* <div className="text-right">
                    <div className="text-3xl font-bold">94%</div>
                    <div className="text-xs text-gray-400">Confidence</div>
                  </div> */}
                </div>

                {/* <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">core</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">critical</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Assigned</span>
                </div> */}

                {/* <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">Working</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-400 mb-1">Current Task</p>
                    <p className="text-sm font-medium">Generating test suite for payment integration using existing patterns</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Tasks:</span>
                      <span className="ml-2 font-semibold">234</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Uptime:</span>
                      <span className="ml-2 font-semibold">99.2%</span>
                    </div>
                  </div>
                </div> */}

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Autonomy Level
                    </span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium text-center mb-3">
                  Agent Work Review
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => window.open("/agent-output", "_blank")}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Output
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </button>
                </div>
              </div>

              {/* Test Execution Agent */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        Test Execution Agent
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      </h3>
                      <p className="text-sm text-gray-400">
                        Executes test scripts with intelligent orchestration and
                        monitoring
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">91%</div>
                    <div className="text-xs text-gray-400">Confidence</div>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                    core
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                    critical
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    Assigned
                  </span>
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                    My Tasks
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">
                      Active
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-400 mb-1">Current Task</p>
                    <p className="text-sm font-medium">
                      Executing regression suite across multiple environments
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Tasks:</span>
                      <span className="ml-2 font-semibold">1247</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Uptime:</span>
                      <span className="ml-2 font-semibold">98.7%</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Autonomy Level
                    </span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>

                <div className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium text-center mb-3">
                  Agent Work Review
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => window.open("/agent-output", "_blank")}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Output
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-lg font-medium">
                Agent Performance Overview
              </h3>
            </div>

            {/* Performance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Orchestrator */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">Orchestrator</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">92.7%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "92.7%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">445</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">2.42s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>

              {/* Test Case Generator Agent */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">Test Case Generator Agent</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">82.8%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "82.8%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">485</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">1.43s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>

              {/* Test Execution Agent */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">Test Execution Agent</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">85.2%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85.2%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">498</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">2.08s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>

              {/* RMS PM Tool Connector Agent */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">RMS PM Tool Connector Agent</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">95.0%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">120</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">0.89s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>

              {/* DevOps Connector Agent */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">DevOps Connector Agent</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">79.1%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "79.1%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">234</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">3.21s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>

              {/* Environment Readiness Agent */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Laptop className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium">Environment Readiness Agent</h4>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-xl font-semibold">77.6%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "77.6%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Transactions</p>
                    <p className="font-semibold">156</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Avg Response</p>
                    <p className="font-semibold">4.75s</p>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5" />
              <h3 className="text-lg font-medium">My Task Overview</h3>
            </div>

            {/* Task Overview Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-blue-400 mb-2">1</p>
                <p className="text-gray-400 text-sm">Pending Tasks</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-orange-400 mb-2">1</p>
                <p className="text-gray-400 text-sm">In Progress</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-red-400 mb-2">1</p>
                <p className="text-gray-400 text-sm">Blocked</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-green-400 mb-2">0</p>
                <p className="text-gray-400 text-sm">Completed</p>
              </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
              {/* Task 1 - Critical */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium">
                        Review Payment Gateway Security Test Results
                      </h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">
                        critical
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500 text-white">
                        needs approval
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Critical security vulnerabilities detected in payment flow
                      - requires immediate review and sign-off
                    </p>

                    <div className="grid grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500">Agent:</p>
                        <p className="text-gray-300">
                          Test Failure Analysis Agent
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Due Date:</p>
                        <p className="text-gray-300">8/3/2025</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Estimated:</p>
                        <p className="text-gray-300">4h</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Actual:</p>
                        <p className="text-green-400">2.5h</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <CheckSquare className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                      Request Changes
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Output
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Task 2 - High/Blocked */}
              <div className="bg-red-900/20 rounded-lg p-5 border border-red-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium">
                        Configure Load Testing Environment
                      </h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-white">
                        high
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-600 text-white">
                        blocked
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Setup and configuration of load testing environment -
                      blocked by security review completion
                    </p>

                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500">Agent:</p>
                        <p className="text-gray-300">
                          Environment Readiness Agent
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Due Date:</p>
                        <p className="text-red-300">3/2/2025</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Estimated:</p>
                        <p className="text-gray-300">6h</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Output
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Task 3 - Medium/Pending */}
              <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium">
                        Validate Mobile Regression Test Cases
                      </h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-600 text-white">
                        medium
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-500 text-white">
                        pending
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Review and validate generated test cases for mobile
                      application regression testing
                    </p>

                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500">Agent:</p>
                        <p className="text-gray-300">Smart Test Review Agent</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Due Date:</p>
                        <p className="text-gray-300">8/6/2025</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Estimated:</p>
                        <p className="text-gray-300">8h</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <Eye className="w-4 h-4" />
                      View Output
                    </button>
                    <button className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Task 4 - Empty card visible at bottom */}
              <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50 h-24">
                {/* Empty task placeholder */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentControl;
