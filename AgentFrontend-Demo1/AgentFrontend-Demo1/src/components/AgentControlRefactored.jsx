import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";
import AgentControl from "./AgentControl/AgentControl";

function AgentControlRefactored({ activeSection,setActiveSection,agentTitle,
   agentDescription }) {
  
  const navigate = useNavigate();
console.log(agentTitle);
  

  return (
    <div className="min-h-screen bg-landing-gradient text-black">
      {/* Header */}
      <div className="pl-6 pt-6 pb-2">
        <button
          onClick={activeSection ? () => setActiveSection("ai-assistant") : ()=>navigate('/home')}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-4 transition-colors hover:shadow-md hover:rounded-2xl hover:p-1 hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Chat</span>
        </button>

        <h1 className="text-2xl font-semibold mb-2 text-black">{agentTitle}</h1>
        <p className="text-gray-600">
          {agentDescription}
        </p>
      </div>
      <>
        <AgentControl activeSection={activeSection}/>
      </>
      
    </div>
  );
}

export default AgentControlRefactored;
