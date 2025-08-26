function GoalCard({ goal, isPrimary = true }) {
  const getColorClasses = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-4 relative overflow-hidden">
      {/* Colored section on left */}
      <div className={`absolute left-0 top-1 bottom-1 w-12 ${getColorClasses(goal.color)} rounded-l-3xl`}></div>
      
      <div className="ml-16">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
            <div className="flex gap-4 text-sm">
              <span className="text-blue-600">Target: {goal.target}</span>
              {goal.deadline && <span className="text-blue-600">Deadline: {goal.deadline}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`${getPriorityColor(goal.priority)} text-white text-xs font-medium px-2 py-1 rounded`}>
              {goal.priority}
            </span>
            <span className="text-lg font-bold text-gray-900">{goal.progress}%</span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getColorClasses(goal.color)}`}
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;