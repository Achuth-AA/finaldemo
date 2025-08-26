import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

function AgentSettings({ onClose, agent }) {
  const { name } = agent;
  const [activeTab, setActiveTab] = useState("configuration");
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(false), 300);
  };

  const goals = [
    {
      title: "Maintain 95% test success rate",
      target: "95",
      deadline: "8/14/2025",
      progress: 94,
      priority: "critical",
      color: "red"
    },
    {
      title: "Reduce average test execution time",
      target: "< 2 min",
      deadline: "8/14/2025",
      progress: 67,
      priority: "high",
      color: "orange"
    },
    {
      title: "Increase test coverage by 90%",
      target: "90%",
      deadline: "8/14/2025",
      progress: 87,
      priority: "high",
      color: "orange"
    }
  ];

  const secondaryGoals = [
    {
      title: "Optimize resource utilization",
      target: "<70% avg",
      progress: 87,
      priority: "medium",
      color: "blue"
    },
    {
      title: "Reduce false positive alerts",
      target: "<5%",
      progress: 59,
      priority: "medium",
      color: "blue"
    }
  ];

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Right-side sliding panel */}
      <div className={`absolute right-0 top-0 h-full w-[600px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {name}: Settings
          </h1>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Blue Gradient Navigation Tabs */}
        <div className="px-6">
          <div className="bg-custom-gradient rounded-full p-1">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("configuration")}
                className={`flex-1 px-4 py-3 rounded-full font-medium transition-all text-center text-sm ${
                  activeTab === "configuration"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Configuration
              </button>
              <button
                onClick={() => setActiveTab("goals")}
                className={`flex-1 px-4 py-3 rounded-full font-medium transition-all text-center text-sm ${
                  activeTab === "goals"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Goals & Targets
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`flex-1 px-4 py-3 rounded-full font-medium transition-all text-center text-sm ${
                  activeTab === "performance"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab("health")}
                className={`flex-1 px-4 py-3 rounded-full font-medium transition-all text-center text-sm ${
                  activeTab === "health"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Health
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
          {activeTab === "configuration" && (
            <div className="space-y-6">
              {/* Core Intelligence Settings */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  ⚙️ Core intelligence settings
                </h3>
                
                {/* Autonomy Level */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Autonomy Level: {autonomyLevel}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-lg h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-lg transition-all duration-300"
                        style={{ width: `${autonomyLevel}%` }}
                      ></div>
                    </div>
                    <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                      Higher autonomy allows the agent to make more decisions independently
                    </div>
                  </div>
                </div>

                {/* Confidence Level */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Confidence Level: {confidenceLevel}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-lg h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-lg transition-all duration-300"
                        style={{ width: `${confidenceLevel}%` }}
                      ></div>
                    </div>
                    <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                      Minimum confidence required before agent executes actions
                    </div>
                  </div>
                </div>

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
                
                {/* CPU Usage */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">CPU Usage Limit: {cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-lg h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-lg transition-all duration-300"
                      style={{ width: `${cpuUsage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Memory Usage */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Memory Usage Limit: {memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-lg h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-lg transition-all duration-300"
                      style={{ width: `${memoryUsage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Network Usage */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Network Usage Limit: {networkUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-lg h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-lg transition-all duration-300"
                      style={{ width: `${networkUsage}%` }}
                    ></div>
                  </div>
                </div>
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
          )}

          {activeTab === "goals" && (
            <div className="space-y-6">
              {/* Primary Goals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  🎯 Primary Goals
                </h3>
                
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="bg-gray-50 rounded-3xl p-4 relative overflow-hidden">
                      {/* Colored section on left */}
                      <div className={`absolute left-0 top-1 bottom-1 w-12 ${goal.color === 'red' ? 'bg-red-500' : 'bg-orange-500'} rounded-l-3xl`}></div>
                      
                      <div className="ml-16">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
                            <div className="flex gap-4 text-sm">
                              <span className="text-blue-600">Target: {goal.target}</span>
                              <span className="text-blue-600">Deadline: {goal.deadline}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`${goal.priority === 'critical' ? 'bg-red-500' : 'bg-orange-500'} text-white text-xs font-medium px-2 py-1 rounded`}>
                              {goal.priority}
                            </span>
                            <span className="text-lg font-bold text-gray-900">{goal.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-xs text-gray-600 mb-1">Progress</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${goal.color === 'red' ? 'bg-red-500' : 'bg-orange-500'}`}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Goals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  🎯 Secondary Goals
                </h3>
                
                <div className="space-y-4">
                  {secondaryGoals.map((goal, index) => (
                    <div key={index} className="bg-gray-50 rounded-3xl p-4 relative overflow-hidden">
                      {/* Blue colored section on left */}
                      <div className="absolute left-0 top-1 bottom-1 w-12 bg-blue-500 rounded-l-3xl"></div>
                      
                      <div className="ml-16">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
                            <div className="text-sm">
                              <span className="text-blue-600">Target: {goal.target}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                              {goal.priority}
                            </span>
                            <span className="text-lg font-bold text-gray-900">{goal.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-xs text-gray-600 mb-1">Progress</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              {/* Performance Stats */}
              <div className="bg-blue-50 rounded-3xl p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">97%</div>
                    <div className="text-sm text-gray-600 mt-1">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">423</div>
                    <div className="text-sm text-gray-600 mt-1">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">99.8%</div>
                    <div className="text-sm text-gray-600 mt-1">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">96.2%</div>
                    <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Resource Usage Chart */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage Over Time</h3>
                <div className="h-48 bg-white rounded-lg p-4 relative overflow-hidden">
                  {/* Dummy Area Chart */}
                  <div className="relative h-full">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                      <span>200</span>
                      <span>150</span>
                      <span>100</span>
                      <span>50</span>
                      <span>0</span>
                    </div>
                    
                    {/* Chart area */}
                    <div className="ml-8 h-full relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0">
                        <div className="h-full border-l border-gray-200"></div>
                        <div className="absolute top-0 w-full border-t border-gray-200"></div>
                        <div className="absolute top-1/4 w-full border-t border-gray-100"></div>
                        <div className="absolute top-1/2 w-full border-t border-gray-100"></div>
                        <div className="absolute top-3/4 w-full border-t border-gray-100"></div>
                        <div className="absolute bottom-0 w-full border-t border-gray-200"></div>
                      </div>
                      
                      {/* Area charts */}
                      <svg className="absolute inset-0 w-full h-full">
                        {/* CPU area */}
                        <path
                          d="M0,120 Q60,100 120,110 T240,105 Q300,95 360,100 L360,160 L0,160 Z"
                          fill="rgba(239, 68, 68, 0.3)"
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="2"
                        />
                        {/* Memory area */}
                        <path
                          d="M0,140 Q60,125 120,130 T240,125 Q300,120 360,125 L360,160 L0,160 Z"
                          fill="rgba(34, 197, 94, 0.3)"
                          stroke="rgb(34, 197, 94)"
                          strokeWidth="2"
                        />
                        {/* Network area */}
                        <path
                          d="M0,150 Q60,145 120,148 T240,145 Q300,140 360,145 L360,160 L0,160 Z"
                          fill="rgba(59, 130, 246, 0.3)"
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="2"
                        />
                      </svg>
                      
                      {/* Time indicator */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                        <span className="text-red-500">●</span> 08:00 <span className="text-gray-400">CPU: 65</span>
                      </div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
                      <span>00:00</span>
                      <span>04:00</span>
                      <span>08:00</span>
                      <span>12:00</span>
                      <span>16:00</span>
                      <span>20:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Distribution */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
                <div className="flex items-center gap-6">
                  {/* Pie Chart */}
                  <div className="w-32 h-32 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Test Execution - 45% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="20"
                        strokeDasharray="113 251"
                        strokeDashoffset="0"
                      />
                      {/* Analysis - 25% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#22c55e"
                        strokeWidth="20"
                        strokeDasharray="63 251"
                        strokeDashoffset="-113"
                      />
                      {/* Data Generation - 15% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="20"
                        strokeDasharray="38 251"
                        strokeDashoffset="-176"
                      />
                      {/* Reporting - 10% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="20"
                        strokeDasharray="25 251"
                        strokeDashoffset="-214"
                      />
                      {/* Monitoring - 5% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="20"
                        strokeDasharray="13 251"
                        strokeDashoffset="-239"
                      />
                    </svg>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Test Execution</span>
                      <span className="text-sm font-medium ml-auto">45%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Analysis</span>
                      <span className="text-sm font-medium ml-auto">25%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Data Generation</span>
                      <span className="text-sm font-medium ml-auto">15%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Reporting</span>
                      <span className="text-sm font-medium ml-auto">10%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Monitoring</span>
                      <span className="text-sm font-medium ml-auto">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-6">
              <div className="text-center py-8 text-gray-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Monitoring</h3>
                <p>Health monitoring features coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentSettings;