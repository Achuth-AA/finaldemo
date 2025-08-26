import { useState } from "react";
import Modal from "../shared/Modal";
import TabNavigation from "../shared/TabNavigation";
import OutputTab from "./OutputTab";
import FeedbackTab from "./FeedbackTab";
import { testCasesData } from "./testCasesData";

function AgentOutputRefactored({ onClose, agent }) {
  const { name } = agent;
  const [activeTab, setActiveTab] = useState("output");
  const [feedbackOption, setFeedbackOption] = useState("approve");
  const [comments, setComments] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("1");
  const [selectedFeature, setSelectedFeature] = useState("User Registration");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("All items");

  const tabs = [
    { id: "output", label: "Output" },
    { id: "feedback", label: "Feedback" },
    { id: "history", label: "History" }
  ];

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", { feedbackOption, comments });
    onClose(false);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${name}: Output Review`}
      width="600px"
    >
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
        {activeTab === "output" && (
          <OutputTab
            selectedSprint={selectedSprint}
            setSelectedSprint={setSelectedSprint}
            selectedFeature={selectedFeature}
            setSelectedFeature={setSelectedFeature}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            testCases={testCasesData}
          />
        )}

        {activeTab === "feedback" && (
          <FeedbackTab
            feedbackOption={feedbackOption}
            setFeedbackOption={setFeedbackOption}
            comments={comments}
            setComments={setComments}
            onSubmit={handleSubmitFeedback}
          />
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">History</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No history available</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AgentOutputRefactored;