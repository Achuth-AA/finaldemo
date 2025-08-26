import { ChevronDown } from "lucide-react";
import StatisticsCards from "./StatisticsCards";
import SearchAndFilter from "./SearchAndFilter";
import TestCasesList from "./TestCasesList";

function OutputTab({ 
  selectedSprint, 
  setSelectedSprint, 
  selectedFeature, 
  setSelectedFeature,
  searchQuery,
  setSearchQuery,
  filterOption,
  setFilterOption,
  testCases
}) {
  const statistics = [
    { value: "24", label: "Total Cases" },
    { value: "18", label: "Functional" },
    { value: "6", label: "Non-functional" },
    { value: "92%", label: "Coverage" }
  ];

  const filterOptions = ["All items", "Pending", "Approved"];

  return (
    <div className="space-y-6">
      {/* Sprint and Feature Dropdowns */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sprint</label>
          <div className="relative">
            <select
              value={selectedSprint}
              onChange={(e) => setSelectedSprint(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Feature</label>
          <div className="relative">
            <select
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="User Registration">User Registration</option>
              <option value="Login">Login</option>
              <option value="Payment">Payment</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Test Cases Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">User Registration Test Cases</h2>
          <p className="text-sm text-gray-600">Generated 8/9/2025 1:12:15 PM</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded">
            pending review
          </span>
          <span className="text-blue-600 text-sm font-medium">Confidence: 94%</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards stats={statistics} />

      {/* Search and Filter */}
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        filterOptions={filterOptions}
      />

      {/* Test Cases List */}
      <TestCasesList testCases={testCases} />
    </div>
  );
}

export default OutputTab;