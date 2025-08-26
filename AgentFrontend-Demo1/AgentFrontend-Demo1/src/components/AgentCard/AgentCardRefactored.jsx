import { useState, useEffect } from "react";
import AgentOutputRefactored from "../AgentOutput/AgentOutputRefactored";
import AgentSettingsRefactored from "../AgentSettings/AgentSettingsRefactored";
import SummaryModal from "../SummaryModal";
import AgentHeader from "./AgentHeader";
import AgentBadges from "./AgentBadges";
import AgentProgress from "./AgentProgress";
import AgentStats from "./AgentStats";
import AgentActions from "./AgentActions";

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

function AgentCardRefactored({ agent }) {
  const { name, currentTask } = agent;

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
      <AgentHeader agent={agent} />
      
      <AgentBadges badges={agent.badges} />

      {/* Current Task */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1.5">Current Task</p>
        <p className="text-sm text-gray-700 line-clamp-2">{currentTask}</p>
      </div>

      <AgentProgress autonomyLevel={agent.autonomyLevel} />
      
      <AgentStats tasks={agent.tasks} uptime={agent.uptime} />

      <AgentActions
        onViewOutput={() => setShowViewOutputModel(true)}
        onFeedback={() => setShowSummaryModal(true)}
        onSettings={() => setShowSettingsModal(true)}
        onSummary={() => setShowSummaryModal(true)}
      />

      {showViewOutputModel && (
        <AgentOutputRefactored onClose={setShowViewOutputModel} agent={agent} />
      )}

      {showSummaryModal && (
        <SummaryModal onClose={setShowSummaryModal} agent={agent} />
      )}

      {showSettingsModal && (
        <AgentSettingsRefactored onClose={setShowSettingsModal} agent={agent} />
      )}
    </div>
  );
}

export default AgentCardRefactored;