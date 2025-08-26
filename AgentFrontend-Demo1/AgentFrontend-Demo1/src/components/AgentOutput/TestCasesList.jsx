import { useState } from "react";
import TestCaseCard from "./TestCaseCard";
import TestCaseExpanded from "./TestCaseExpanded";

function TestCasesList({ testCases }) {
  const [expandedTestCase, setExpandedTestCase] = useState(null);

  const handleToggleExpand = (testCaseId) => {
    setExpandedTestCase(expandedTestCase === testCaseId ? null : testCaseId);
  };

  return (
    <div className="space-y-3">
      {testCases.map((testCase) => (
        <div key={testCase.id}>
          <TestCaseCard
            testCase={testCase}
            isExpanded={expandedTestCase === testCase.id}
            onToggle={() => handleToggleExpand(testCase.id)}
            statusColor={testCase.statusColor}
          />
          {expandedTestCase === testCase.id && (
            <TestCaseExpanded 
              testCase={testCase} 
              statusColor={testCase.statusColor}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default TestCasesList;