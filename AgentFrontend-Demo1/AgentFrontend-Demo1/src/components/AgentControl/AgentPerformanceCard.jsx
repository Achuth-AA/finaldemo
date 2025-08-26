import { Activity } from "lucide-react";

function AgentPerformanceCard({ agent }) {
  const {
    name,
    icon: Icon,
    iconColor,
    successRate,
    transactions,
    avgResponse,
    barColor = "green",
  } = agent;

  const getBarColorClass = (color) => {
    switch (color) {
      case "green":
        return "bg-emerald-500";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  const getIconColorClass = (color) => {
    // Convert the existing color classes to work with light theme
    return (
      color?.replace("text-", "")?.replace("-400", "-600") || "text-gray-600"
    );
  };

  return (
    <div className="bg-slate-50 rounded-lg p-6 hover:-translate-y-[0.075rem] hover:shadow-lg transition-colors shadow-md">
      <div className="flex items-center gap-2 pb-6">
        <div>
          <Icon className={`w-4 h-4 ${getIconColorClass(iconColor)}`} />
        </div>
        <h4 className="text-sm font-semibold text-black">{name}</h4>
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center">
          <span className="text-[0.85rem] font-medium text-gray-600">
            Success Rate
          </span>
          <span className="text-md font-bold text-black">{successRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getBarColorClass(
              barColor
            )} h-2 mt-2 rounded-full transition-all duration-300`}
            style={{ width: `${successRate}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-start justify-between ">
        <div className="bg-gray-50 rounded-lg pt-2">
          <p className="text-[0.85rem] font-medium text-gray-500 tracking-wide mb-1">
            Transactions
          </p>
          <p className="text-sm font-medium text-black">{transactions}</p>
        </div>
        <div className="bg-gray-50 rounded-lg pt-2">
          <p className="text-[0.85rem] font-medium text-gray-500 tracking-wide mb-1">
            Avg Response
          </p>
          <p className=" text-sm font-medium text-black">{avgResponse}</p>
        </div>
      </div>

      <button className="w-full bg-slate-50 hover:bg-white hover:shadow-lg text-black shadow-md rounded-lg py-1 mt-4 text-sm font-medium transition-colors flex items-center justify-center gap-2">
        <Activity className="w-4 h-4" />
        View Details
      </button>
    </div>
  );
}

export default AgentPerformanceCard;
