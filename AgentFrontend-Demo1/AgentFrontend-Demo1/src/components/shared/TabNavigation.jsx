function TabNavigation({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="px-6">
      <div className="bg-custom-gradient rounded-full p-1">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-full font-medium transition-all text-center text-sm ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabNavigation;