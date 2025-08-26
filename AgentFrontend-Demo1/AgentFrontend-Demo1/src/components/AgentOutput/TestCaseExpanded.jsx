import { MessageSquare, HelpCircle, Check, Flag } from "lucide-react";
import ActionButton from "../shared/ActionButton";

function TestCaseExpanded({ testCase, statusColor }) {
  const getStatusBgColor = (color) => {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 relative">
      {/* Extended colored bar for expanded section */}
      <div className={`absolute left-0 top-0 bottom-0 w-8 ${getStatusBgColor(statusColor)}`}></div>
      <div className="p-6 ml-8">
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {testCase.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-800 text-sm">{testCase.description}</p>
        </div>

        {/* Preconditions and Dependencies */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Preconditions</h4>
            <p className="text-gray-600 text-sm">{testCase.preconditions}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">Dependencies</h4>
            <p className="text-gray-600 text-sm">{testCase.dependencies}</p>
          </div>
        </div>

        {/* Test Steps */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 text-sm mb-2">Test Steps</h4>
          <ol className="list-decimal list-inside space-y-1">
            {testCase.testSteps.map((step, index) => (
              <li key={index} className="text-gray-600 text-sm">{step}</li>
            ))}
          </ol>
        </div>

        {/* Expected Result */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 text-sm mb-1">Expected Result</h4>
          <p className="text-gray-600 text-sm">{testCase.expectedResult}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <ActionButton icon={MessageSquare}>
            Comment
          </ActionButton>
          <ActionButton icon={HelpCircle}>
            Ask Question
          </ActionButton>
          <ActionButton icon={Check}>
            Approve
          </ActionButton>
          <ActionButton icon={Flag}>
            Flag Issue
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default TestCaseExpanded;