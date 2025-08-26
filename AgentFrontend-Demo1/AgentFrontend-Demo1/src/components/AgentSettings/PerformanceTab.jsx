import StatisticsCards from "../AgentOutput/StatisticsCards";
import PerformanceChart from "./PerformanceChart";
import TaskDistributionChart from "./TaskDistributionChart";

function PerformanceTab() {
  const performanceStats = [
    { value: "97%", label: "Confidence" },
    { value: "423", label: "Tasks Completed" },
    { value: "99.8%", label: "Uptime" },
    { value: "96.2%", label: "Success Rate" }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Stats */}
      <StatisticsCards stats={performanceStats} />

      {/* Resource Usage Chart */}
      <PerformanceChart />

      {/* Task Distribution */}
      <TaskDistributionChart />
    </div>
  );
}

export default PerformanceTab;