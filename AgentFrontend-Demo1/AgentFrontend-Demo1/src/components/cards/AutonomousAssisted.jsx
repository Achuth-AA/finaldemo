import { Bot, Users, User, Zap } from "lucide-react";
import { useState } from "react";

function AutonomousAssisted() {
  const [autonomous, setAutonomous] = useState(true);

  return (
    <div className="flex items-center justify-between">
      {/* Labels */}
      <div className="flex items-center justify-start gap-3 my-4 mx-6">
        <h3 className="px-2 bg-[#dbeafe] shadow-sm text-blue-800 text-[0.75rem] font-medium rounded-full flex items-center gap-1">
          <User className="w-3 h-3" />
          Engineer Access
        </h3>
        {!autonomous ? (
          <h3 className="px-2 bg-[#dbeafe] shadow-sm text-blue-800 text-[0.75rem] font-medium rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" />
            AI-Assisted Mode
          </h3>
        ) : (
          <h3 className="px-2 bg-green-50 shadow-sm text-green-800 text-[0.75rem] font-medium rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Autonomous Mode
          </h3>
        )}
      </div>

      {/* Sliding Pill Buttons */}
      <div className="relative flex w-64 bg-slate-200 rounded-3xl p-1 shadow-inner mr-6 mb-2">
        {/* Sliding pill */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-2xl bg-custom-gradient transition-all duration-300 ease-in-out z-0
          ${autonomous ? "left-1" : "left-1/2"}
          `}
        ></div>

        {/* Buttons */}
        <button
          className={`flex-1 z-10 relative flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-2xl transition-all duration-300 ease-in-out
            ${autonomous ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-black"}
          `}
          onClick={() => setAutonomous(true)}
        >
          <Bot className="w-4 h-4" />
          Autonomous
        </button>

        <button
          className={`flex-1 z-10 relative flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-2xl transition-all duration-300 ease-in-out
            ${!autonomous ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-black"}
          `}
          onClick={() => setAutonomous(false)}
        >
          <Users className="w-4 h-4" />
          Assisted
        </button>
      </div>
    </div>
  );
}

export default AutonomousAssisted;
