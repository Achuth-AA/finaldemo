import { Users, Zap, GitBranch, BarChart3, Settings } from "lucide-react";

function AgentTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "design", label: "Design", count: 4, icon: Zap }, 
    { id: "execution", label: "Execute", count: 2, icon: GitBranch }, 
    { id: "report", label: "Report", count: 1, icon: BarChart3 }, 
    { id: "maintenance", label: "Maintain", count: 2, icon: Users }, 
    { id: "orchestrator", label: "Orchestrator", count: 1, icon: Settings },
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center hover:-translate-y-[0.05rem] hover:shadow-blue-200 gap-1 py-1 px-2 text-sm font-medium transition-colors shadow-lg  rounded-lg ${
              activeTab === tab.id
                 ? "bg-blue-600 text-white"
                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            <span>
              ({tab.count})
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default AgentTabs;
