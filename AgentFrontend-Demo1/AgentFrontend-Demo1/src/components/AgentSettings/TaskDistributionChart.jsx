function TaskDistributionChart() {
  const taskData = [
    { name: "Test Execution", percentage: 45, color: "blue-500" },
    { name: "Analysis", percentage: 25, color: "green-500" },
    { name: "Data Generation", percentage: 15, color: "red-500" },
    { name: "Reporting", percentage: 10, color: "yellow-500" },
    { name: "Monitoring", percentage: 5, color: "purple-500" }
  ];

  return (
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
          {taskData.map((task, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 bg-${task.color} rounded-full`}></div>
              <span className="text-sm">{task.name}</span>
              <span className="text-sm font-medium ml-auto">{task.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskDistributionChart;