import { useState } from "react";
import Modal from "../shared/Modal";
import TabNavigation from "../shared/TabNavigation";
import ConfigurationTab from "./ConfigurationTab";
import GoalsTab from "./GoalsTab";
import PerformanceTab from "./PerformanceTab";

function AgentSettingsRefactored({ onClose, agent }) {
  const { name } = agent;
  const [activeTab, setActiveTab] = useState("configuration");

  // Configuration state
  const [autonomyLevel, setAutonomyLevel] = useState(85);
  const [confidenceLevel, setConfidenceLevel] = useState(75);
  const [maxTasks, setMaxTasks] = useState(5);
  const [autoRetryAttempts, setAutoRetryAttempts] = useState(3);
  const [enableAutoLearning, setEnableAutoLearning] = useState(true);
  const [enableProactiveAnalysis, setEnableProactiveAnalysis] = useState(true);
  const [notificationLevel, setNotificationLevel] = useState("Critical");
  const [cpuUsage, setCpuUsage] = useState(80);
  const [memoryUsage, setMemoryUsage] = useState(70);
  const [networkUsage, setNetworkUsage] = useState(60);
  const [securityLevel, setSecurityLevel] = useState("Enhanced");
  const [dataRetention, setDataRetention] = useState(30);

  const tabs = [
    { id: "configuration", label: "Configuration" },
    { id: "goals", label: "Goals & Targets" },
    { id: "performance", label: "Performance" },
    { id: "health", label: "Health" }
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${name}: Settings`}
      width="600px"
    >
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
        {activeTab === "configuration" && (
          <ConfigurationTab
            autonomyLevel={autonomyLevel}
            setAutonomyLevel={setAutonomyLevel}
            confidenceLevel={confidenceLevel}
            setConfidenceLevel={setConfidenceLevel}
            maxTasks={maxTasks}
            setMaxTasks={setMaxTasks}
            autoRetryAttempts={autoRetryAttempts}
            setAutoRetryAttempts={setAutoRetryAttempts}
            enableAutoLearning={enableAutoLearning}
            setEnableAutoLearning={setEnableAutoLearning}
            enableProactiveAnalysis={enableProactiveAnalysis}
            setEnableProactiveAnalysis={setEnableProactiveAnalysis}
            notificationLevel={notificationLevel}
            setNotificationLevel={setNotificationLevel}
            cpuUsage={cpuUsage}
            setCpuUsage={setCpuUsage}
            memoryUsage={memoryUsage}
            setMemoryUsage={setMemoryUsage}
            networkUsage={networkUsage}
            setNetworkUsage={setNetworkUsage}
            securityLevel={securityLevel}
            setSecurityLevel={setSecurityLevel}
            dataRetention={dataRetention}
            setDataRetention={setDataRetention}
          />
        )}

        {activeTab === "goals" && <GoalsTab />}

        {activeTab === "performance" && <PerformanceTab />}

        {activeTab === "health" && (
          <div className="space-y-6">
            <div className="text-center py-8 text-gray-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Monitoring</h3>
              <p>Health monitoring features coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AgentSettingsRefactored;