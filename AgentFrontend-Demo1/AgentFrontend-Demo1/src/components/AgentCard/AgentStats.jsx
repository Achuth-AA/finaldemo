function AgentStats({ tasks, uptime }) {
  return (
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
  );
}

export default AgentStats;