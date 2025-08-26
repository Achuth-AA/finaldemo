import { Eye, MessageSquare, Settings, FileText } from "lucide-react";

function AgentActions({ 
  onViewOutput, 
  onFeedback, 
  onSettings, 
  onSummary 
}) {
  return (
    <div className="flex gap-1.5 justify-center">
      <button 
        onClick={onViewOutput}
        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
      >
        <Eye className="w-3.5 h-3.5" />
        View Output
      </button>
      <button 
        onClick={onFeedback}
        className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Feedback
      </button>
      <button 
        onClick={() => {}} // Chat functionality placeholder
        className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Chat
      </button>
      <button 
        onClick={onSummary}
        className="flex items-center justify-center gap-1 px-2 py-1.5 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
      >
        <FileText className="w-3.5 h-3.5" />
        Summary
      </button>
      <button 
        onClick={onSettings}
        className="flex items-center justify-center px-1.5 py-1.5 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}

export default AgentActions;