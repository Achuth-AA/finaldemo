import ActionButton from "../shared/ActionButton";

function FeedbackTab({ feedbackOption, setFeedbackOption, comments, setComments, onSubmit }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Provide Feedback</h2>
        <p className="text-gray-600 text-sm mb-6">
          Review the agent's work and provide guidance for improvement
        </p>

        {/* Feedback Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFeedbackOption("approve")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              feedbackOption === "approve"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✓ Approve
          </button>
          <button
            onClick={() => setFeedbackOption("revision")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              feedbackOption === "revision"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ✏️ Request Revision
          </button>
          <button
            onClick={() => setFeedbackOption("reject")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              feedbackOption === "reject"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚫 Reject
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments (optional)
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add any comments or approval notes..."
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={8}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          ✓ Submit Approval
        </button>
      </div>
    </div>
  );
}

export default FeedbackTab;