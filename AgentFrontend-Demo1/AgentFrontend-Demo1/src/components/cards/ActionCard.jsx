import {
  AlertTriangle,
  Clock,
  Users,
  BarChart3,
  Users2,
  MessageSquare,
} from "lucide-react";
export const ActionCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Critical Issues */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-base font-medium text-white">
            1 Critical Issues
          </h3>
        </div>
        <p className="text-gray-400 text-sm">Immediate attention required</p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-yellow-400" />
          <h3 className="text-base font-medium text-white">2 Pending Tasks</h3>
        </div>
        <p className="text-gray-400 text-sm">Your tasks need attention</p>
      </div>

      {/* Active Agents */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-5 h-5 text-green-400" />
          <h3 className="text-base font-medium text-white">11 Active Agents</h3>
        </div>
        <p className="text-gray-400 text-sm">Monitor your assigned AI agents</p>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-medium text-white">
            Performance Metrics
          </h3>
        </div>
        <p className="text-gray-400 text-sm">
          View testing performance and analytics
        </p>
      </div>

      {/* Collaboration Hub */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <Users2 className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-medium text-white">
            Collaboration Hub
          </h3>
        </div>
        <p className="text-gray-400 text-sm">
          Access pending approvals and AI recommendations
        </p>
      </div>

      {/* Chat with Test Case Generator */}
      <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-medium text-white">
            Chat with Test Case Generator Agent
          </h3>
        </div>
        <p className="text-gray-400 text-sm">
          Collaborate on current testing tasks
        </p>
      </div>
    </div>
  );
};
