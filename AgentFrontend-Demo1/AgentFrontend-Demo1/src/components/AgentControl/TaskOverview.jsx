import {
  Target,
  CheckSquare,
  Eye,
  MessageSquare,
  Play,
  CircleX,
} from "lucide-react";

function TaskOverview({ tasks }) {
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
    <div className="bg-slate-50 rounded-lg p-6 hover:-translate-y-[0.075rem] hover:shadow-lg transition-colors shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-4 h-4" />
        <h3 className="text-sm font-medium">My Task Overview</h3>
      </div>

      {/* Task Overview Stats */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="w-48 bg-blue-50 rounded-lg px-6 py-2 text-center">
          <p className="text-lg font-bold text-blue-600">1</p>
          <p className="text-gray-600 text-sm">Pending Tasks</p>
        </div>
        <div className="w-48 bg-orange-50 rounded-lg px-6 py-2 text-center">
          <p className="text-lg font-bold text-orange-600 ">1</p>
          <p className="text-gray-600 text-sm">In Progress</p>
        </div>
        <div className="w-48 bg-red-50 rounded-lg px-6 py-2 text-center">
          <p className="text-lg font-bold text-red-600 ">1</p>
          <p className="text-gray-600 text-sm">Blocked</p>
        </div>
        <div className="w-48 bg-green-50 rounded-lg px-6 py-2 text-center">
          <p className="text-lg font-bold text-green-600 ">0</p>
          <p className="text-gray-600 text-sm">Completed</p>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-lg p-5 mb-2 border ${
              task.status === "high"
                ? "bg-red-100"
                : task.status === "critical"
                ? "bg-orange-50"
                : "bg-steal-100"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4
                    className={`text-md font-medium ${getTextColorClass(
                      task.status
                    )}`}
                  >
                    {task.title}
                  </h4>
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
                    <span className={`${getTextColorClass(task.status)} pl-2`}>
                      {task.agent}
                    </span>
                  </div>
                  <div>
                    <span className="text-cyan-700">Due Date:</span>
                    <span className={`${getTextColorClass(task.status)} pl-2`}>
                      {task.dueDate}
                    </span>
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
                      <span
                        className={`${getTextColorClass(task.status)} pl-2`}
                      >
                        {task.actual}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between flex-wrap gap-3">
                  {/* Conditional buttons based on task status */}
                  {task.statusText === "needs approval" && (
                    <>
                      <button
                        className="px-2 py-1 bg-custom-gradient font-medium text-white rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                      >
                        <CheckSquare className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        className="px-2 py-1 bg-slate-50 font-medium hover:bg-white text-black rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                      >
                        <CircleX className="w-4 h-4" />
                        Request Changes
                      </button>
                    </>
                  )}

                  {task.statusText === "pending" && (
                    <button className="px-2 py-1 bg-custom-gradient font-medium text-white rounded-lg text-sm 
                flex items-center gap-2 hover-popout">
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  )}
                </div>
                <div className="flex justify-start gap-2">
                  <button
                    className="px-2 py-1 bg-slate-50 font-medium hover:bg-white text-black rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                  >
                    <Eye className="w-4 h-4" />
                    View Output
                  </button>
                  <button
                    className="px-2 py-1 bg-slate-50 font-medium hover:bg-white text-black rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskOverview;
