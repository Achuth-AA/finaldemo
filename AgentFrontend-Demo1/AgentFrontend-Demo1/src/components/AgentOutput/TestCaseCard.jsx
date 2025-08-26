import { ChevronDown } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

function TestCaseCard({ testCase, isExpanded, onToggle, statusColor }) {
  const getStatusBgColor = (color) => {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Collapsed View */}
      <div 
        className="p-4 relative cursor-pointer"
        onClick={onToggle}
      >
        {/* Colored half circle on the left */}
        <div className={`absolute left-0 top-1 bottom-1 w-8 ${getStatusBgColor(statusColor)} rounded-l-2xl`}></div>
        
        <div className="flex items-center justify-between ml-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-medium text-gray-900">{testCase.id}:</span>
              <span className="text-gray-900">{testCase.title}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{testCase.duration}</span>
              <span>•</span>
              <span>{testCase.complexity}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={testCase.status} color={statusColor} />
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-[-90deg]'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCaseCard;