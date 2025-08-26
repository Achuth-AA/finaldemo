function AgentProgress({ autonomyLevel }) {
  const getProgressColor = (level) => {
    if (level > 80) return 'bg-green-500';
    if (level > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-500">Autonomy Level</span>
        <span className="text-xs font-semibold text-gray-900">{autonomyLevel}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(autonomyLevel)}`}
          style={{ width: `${autonomyLevel}%` }}
        ></div>
      </div>
    </div>
  );
}

export default AgentProgress;