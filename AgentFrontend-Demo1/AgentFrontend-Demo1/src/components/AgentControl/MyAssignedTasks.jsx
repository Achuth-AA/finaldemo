import { Target } from "lucide-react";

function MyAssignedTasks({ tasks }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-blue-200";
      case "medium":
        return "bg-gray-100 border border-gray-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getTextColorClass = (status) => {
    switch (status) {
      case "critical":
        return "text-orange-500";
      case "high":
        return "text-red-600";
      case "medium":
        return "text-cyan-900";
      default:
        return "text-gray-500";
    }
  };

  const getStatusTextBadgeClass = (statusText) => {
    switch (statusText) {
      case "needs approval":
        return "bg-blue-100 text-blue-600";
      case "blocked":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-gray-100 border border-gray-500";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4" />
        <h3 className="text-md">My Assigned Tasks (4)</h3>
      </div>

      {/* Task Cards */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounded-lg p-5 mb-2 border ${
            task.status === "high"? 'bg-red-100' : task.status === "critical"
              ? "bg-orange-50"
              : "bg-steal-100"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className={`text-lg font-medium ${getTextColorClass(task.status)}`}>{task.title}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusTextBadgeClass(
                    task.statusText
                  )}`}
                >
                  {task.statusText}
                </span>
              </div>
              <p className="text-cyan-700 text-sm mb-3">{task.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-cyan-700">Agent:</span>
                  <span className={`${getTextColorClass(task.status)} pl-2`}>{task.agent}</span>
                </div>
                <div>
                  <span className="text-cyan-700">Due Date:</span>
                  <span className={`${getTextColorClass(task.status)} pl-2`}>{task.dueDate}</span>
                </div>
                <div>
                  <span className="text-cyan-700">Estimated:</span>
                  <span className={`${getTextColorClass(task.status)} pl-2`}>
                    {task.estimatedTime}
                  </span>
                </div>
                {task.actual && (
                  <div>
                    <span className="text-gray-500">Actual:</span>
                    <span className={`${getTextColorClass(task.status)} pl-2`}>{task.actual}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyAssignedTasks;
