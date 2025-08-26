
function NavigationTabs({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="p-2 bg-custom-gradient shadow-md rounded-lg mx-6">
      <div className="flex justify-center gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 hover:bg-custom-gradient hover:text-white"
                  : "text-blue-200 hover:text-custom-gradient hover:bg-custom-gradient"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationTabs;
