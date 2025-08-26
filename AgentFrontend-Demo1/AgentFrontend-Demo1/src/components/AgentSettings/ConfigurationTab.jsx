import { ChevronDown } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";

function ConfigurationTab({
  autonomyLevel, setAutonomyLevel,
  confidenceLevel, setConfidenceLevel,
  maxTasks, setMaxTasks,
  autoRetryAttempts, setAutoRetryAttempts,
  enableAutoLearning, setEnableAutoLearning,
  enableProactiveAnalysis, setEnableProactiveAnalysis,
  notificationLevel, setNotificationLevel,
  cpuUsage, setCpuUsage,
  memoryUsage, setMemoryUsage,
  networkUsage, setNetworkUsage,
  securityLevel, setSecurityLevel,
  dataRetention, setDataRetention
}) {
  return (
    <div className="space-y-6">
      {/* Core Intelligence Settings */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          ⚙️ Core intelligence settings
        </h3>
        
        <ProgressBar
          value={autonomyLevel}
          color="green"
          label="Autonomy Level"
          description="Higher autonomy allows the agent to make more decisions independently"
        />

        <ProgressBar
          value={confidenceLevel}
          color="green"
          label="Confidence Level"
          description="Minimum confidence required before agent executes actions"
        />

        {/* Max Concurrent Tasks & Auto-retry */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Tasks</label>
            <div className="relative">
              <input
                type="number"
                value={maxTasks}
                onChange={(e) => setMaxTasks(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-retry Attempts</label>
            <div className="relative">
              <input
                type="number"
                value={autoRetryAttempts}
                onChange={(e) => setAutoRetryAttempts(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Behavior Settings */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          ⚡ Behavior settings
        </h3>
        
        {/* Toggle Switches */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Enable Auto-learning</div>
              <div className="text-xs text-gray-500">Allow agent to learn from past experiences</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableAutoLearning}
                onChange={(e) => setEnableAutoLearning(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Enable Proactive Analysis</div>
              <div className="text-xs text-gray-500">Proactively analyze and suggest improvements</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableProactiveAnalysis}
                onChange={(e) => setEnableProactiveAnalysis(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Notification Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notification Level</label>
          <div className="flex gap-2">
            {["All", "Critical", "Errors", "None"].map((level) => (
              <button
                key={level}
                onClick={() => setNotificationLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  notificationLevel === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Limits */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          💾 Resource Limits
        </h3>
        
        <ProgressBar
          value={cpuUsage}
          color="blue"
          label="CPU Usage Limit"
        />

        <ProgressBar
          value={memoryUsage}
          color="blue"
          label="Memory Usage Limit"
        />

        <ProgressBar
          value={networkUsage}
          color="blue"
          label="Network Usage Limit"
        />
      </div>

      {/* Security & Privacy */}
      <div className="bg-gray-50 rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          🔒 Security & Privacy
        </h3>
        
        {/* Security Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Security Level</label>
          <div className="flex gap-2">
            {["Standard", "Enhanced", "Maximum"].map((level) => (
              <button
                key={level}
                onClick={() => setSecurityLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  securityLevel === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period (days)</label>
          <div className="relative">
            <select
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationTab;