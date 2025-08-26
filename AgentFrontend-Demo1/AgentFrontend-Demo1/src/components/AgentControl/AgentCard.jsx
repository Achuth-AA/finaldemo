import { Eye, MessageSquare, Settings, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import AgentOutput from "../AgentOutput";
import AgentSettings from "../AgentSettings";
import SummaryModal from "../SummaryModal";

// Agent name mapping for API calls (display name to database name)
const agentNameMapping = {
  "Jira Management Agent": "jira_mcp_agent",
  "Test Case Generator Agent": "test_case_generator_agent",
  "Test Data Agent": "test_data_root_agent",
  "Test Script Generator Agent": "test_script_root_agent",
  "Environment Readiness Agent": "env_readiness_agent",
  "Test Execution and DevOps Agent": "jenkins_automation_agent",
  "Test Reporting Agent": "Test_Report_generation_agent",
  "Test Failure Analysis Agent": "Test_Failure_Analysis_agent",
  "Self Healing Agent": "self_healing_root_agent",
  "Orchestration Agent": "orchestrator_agent",
};

// Helper function to get database agent name
const getDbAgentName = (displayName) => {
  return (
    agentNameMapping[displayName] ||
    displayName.toLowerCase().replace(/\s+/g, "_")
  );
};

function AgentCard({ agent }) {
  const {
    name,
    description,
    icon: Icon,
    iconColor,
    iconBgColor,
    confidence,
    badges,
    status,
    statusColor,
    currentTask,
    tasks,
    uptime,
    autonomyLevel
  } = agent;

  const [showViewOutputModel, setShowViewOutputModel] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [agentMetrics, setAgentMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default metrics object
  const defaultMetrics = {
    tokensConsumed: 0,
    executionTime: 0,
    tokensPerSecond: 0,
    lastEndTime: null,
  };

  // Fetch agent metrics when component mounts
  useEffect(() => {
    const fetchAgentMetrics = async () => {
      const dbName = getDbAgentName(name);
      try {
        setLoading(true);
        const response = await fetch(
          `http://10.107.45.15:8080/api/tokens/agent/${dbName}`
        );

        // Always expect 200 status from backend
        const data = await response.json();
        setAgentMetrics(data || defaultMetrics);
      } catch (err) {
        console.error("Error fetching agent metrics:", err);
        // Set default metrics on any error
        setAgentMetrics(defaultMetrics);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchAgentMetrics();
    }
  }, [name]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">{name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{confidence}%</div>
          <p className="text-xs text-gray-500 mt-0.5">Confidence</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {badges.map((badge, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${badge.bgColor} ${badge.textColor} text-xs rounded-full font-medium border ${
              badge.text === 'core' ? 'border-blue-200' :
              badge.text === 'critical' ? 'border-red-200' :
              badge.text === 'Assigned' ? 'border-green-200' :
              badge.text === 'working' ? 'border-blue-200' :
              badge.text === 'Active' ? 'border-green-200' :
              badge.text === 'integration' ? 'border-green-200' :
              badge.text === 'high' ? 'border-orange-200' :
              badge.text === 'medium' ? 'border-yellow-200' :
              'border-gray-200'
            }`}
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Current Task */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1.5">Current Task</p>
        <p className="text-sm text-gray-700 line-clamp-2">{currentTask}</p>
      </div>

      {/* Autonomy Level */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-gray-500">Autonomy Level</span>
          <span className="text-xs font-semibold text-gray-900">{autonomyLevel}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              autonomyLevel > 80 ? 'bg-green-500' : 
              autonomyLevel > 50 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${autonomyLevel}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between mb-4">
        <div className="text-xs">
          <span className="text-gray-500 font-medium">Tasks</span>
          <p className="text-gray-900 font-semibold text-sm mt-0.5">{tasks}</p>
        </div>
        <div className="text-xs text-right">
          <span className="text-gray-500 font-medium">Uptime</span>
          <p className="text-gray-900 font-semibold text-sm mt-0.5">{uptime}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1.5 justify-center">
        <button 
          onClick={() => setShowViewOutputModel(true)}
          className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
        >
          <Eye className="w-3.5 h-3.5" />
          View Output
        </button>
        <button 
          // onClick={() => setShowSummaryModal(true)}
          className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Feedback
        </button>
        <button className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium">
          <MessageSquare className="w-3.5 h-3.5" />
          Chat
        </button>
        <button 
        onClick={() => setShowSummaryModal(true)}
        className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium">
          <FileText className="w-3.5 h-3.5" />
          Summary
        </button>
        <button 
          onClick={() => setShowSettingsModal(true)}
          className="flex items-center justify-center px-1.5 py-1.5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {showViewOutputModel && (
        <AgentOutput onClose={setShowViewOutputModel} agent={agent} />
      )}

      {showSummaryModal && (
        <SummaryModal onClose={setShowSummaryModal} agent={agent} />
      )}

      {showSettingsModal && (
        <AgentSettings onClose={setShowSettingsModal} agent={agent} />
      )}
    </div>
  );
}

export default AgentCard;
