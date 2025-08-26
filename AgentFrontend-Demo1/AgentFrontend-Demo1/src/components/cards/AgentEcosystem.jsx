import { Users } from "lucide-react";

function AgentEcosystem(){
    return (
        <div className="rounded-lg pl-6 pb-4 pt-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-3 mb-2">
              <h2 className="text-xl font-semibold">
                Enhanced AI Agent Ecosystem
              </h2>
              <h3 className="px-2 bg-[#dbeafe] text-blue-800 text-[0.75rem] font-medium rounded-full flex items-center gap-1">
                <Users className="w-3 h-3" />
                Engineer Access
              </h3>
            </div>
            <div>
              <p className="text-gray-400 mt-1">
                Advanced multi-agent testing team with 12 accessible agents and
                4 assigned tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mr-6">
            <button className="px-4 py-2 bg-custom-gradient hover:bg-gray-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Testing Features
            </button>
          </div>
        </div>
      </div>
    );
}

export default AgentEcosystem;