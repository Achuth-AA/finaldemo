import { AlertTriangle, Clock, Users, BarChart3, Users2, MessageSquare } from 'lucide-react';

function Dashboard() {
  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Good morning,</h1>
        <p className="text-gray-400">
          I'm ready to collaborate with you on testing decisions. Let's work together to achieve the best results.
        </p>
      </div>

      {/* Alert Notifications */}
      <div className="space-y-4 mb-8">
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="text-red-400">1 critical issue require immediate attention</span>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-400">2 tasks need your attention</span>
        </div>
      </div>

      {/* Chat Input */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="How can I help you with testing today?"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-24 focus:outline-none focus:border-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 px-4 py-1.5 rounded-md text-sm">
            Send
          </button>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Critical Issues */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">1 Critical Issues</h3>
          </div>
          <p className="text-gray-400 text-sm">Immediate attention required</p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">2 Pending Tasks</h3>
          </div>
          <p className="text-gray-400 text-sm">Your tasks need attention</p>
        </div>

        {/* Active Agents */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">11 Active Agents</h3>
          </div>
          <p className="text-gray-400 text-sm">Monitor your assigned AI agents</p>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">Performance Metrics</h3>
          </div>
          <p className="text-gray-400 text-sm">View testing performance and analytics</p>
        </div>

        {/* Collaboration Hub */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Users2 className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">Collaboration Hub</h3>
          </div>
          <p className="text-gray-400 text-sm">Access pending approvals and AI recommendations</p>
        </div>

        {/* Chat with Test Case Generator */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-medium">Chat with Test Case Generator Agent</h3>
          </div>
          <p className="text-gray-400 text-sm">Collaborate on current testing tasks</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Working with 12 assigned agents in AI-assisted mode</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-blue-400">👤 AI-Assisted mode: Human + AI collaboration active</span>
        </div>
        <button className="mt-4 text-blue-400 hover:text-blue-300">
          🏢 TestQ AI-First Testing Platform →
        </button>
      </div>
    </div>
  );
}

export default Dashboard;