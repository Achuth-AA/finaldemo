/**
 * Agent Feedback Form Component
 *
 * Provides an interface for users to submit feedback on agent output.
 * Includes approval options (approve, revision, reject) and comment field.
 *
 * @param {Object} props - Component properties
 * @param {function} props.onSubmit - Function called when form is submitted
 * @param {string} props.initialFeedback - Initial feedback option ('approve', 'revision', 'reject')
 * @param {string} props.initialComments - Initial comments text
 */

import { useState } from "react";
import { ThumbsUp, Edit3, XCircle, Send } from "lucide-react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";

function FeedbackForm({
  onSubmit,
  initialFeedback = "approve",
  initialComments = "",
}) {
  // Form state
  const [feedbackOption, setFeedbackOption] = useState(initialFeedback);
  const [comments, setComments] = useState(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback options configuration
  const feedbackOptions = [
    {
      id: "approve",
      label: "Approve",
      icon: ThumbsUp,
      variant: "success",
      description: "Accept the agent output as is",
    },
    {
      id: "revision",
      label: "Request Revision",
      icon: Edit3,
      variant: "warning",
      description: "Request changes to the output",
    },
    {
      id: "reject",
      label: "Reject",
      icon: XCircle,
      variant: "danger",
      description: "Reject the output completely",
    },
  ];

  /**
   * Handles feedback option selection
   */
  const handleFeedbackChange = (optionId) => {
    setFeedbackOption(optionId);
  };

  /**
   * Handles comments input change
   */
  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const feedbackData = {
        option: feedbackOption,
        comments: comments.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting feedback:", feedbackData);

      if (onSubmit) {
        await onSubmit(feedbackData);
      }

      // Reset form after successful submission
      setComments("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Gets button variant based on selection state
   */
  const getButtonVariant = (optionId, selectedOption) => {
    const option = feedbackOptions.find((opt) => opt.id === optionId);
    return selectedOption === optionId ? option.variant : "ghost";
  };

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <Card.Header>
          <Card.Title className="text-xl mb-2">Provide Feedback</Card.Title>
          <p className="text-gray-400 text-sm">
            Review the agent's work and provide guidance for improvement
          </p>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <Card.Content>
            {/* Feedback options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Feedback Decision
              </label>
              <div className="flex gap-4">
                {feedbackOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = feedbackOption === option.id;

                  return (
                    <Button
                      key={option.id}
                      type="button"
                      onClick={() => handleFeedbackChange(option.id)}
                      variant={getButtonVariant(option.id, feedbackOption)}
                      leftIcon={<Icon className="w-4 h-4" />}
                      className={`flex-1 ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-offset-gray-900"
                          : ""
                      }`}
                      aria-pressed={isSelected}
                      title={option.description}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Comments section */}
            <div className="mb-6">
              <Input.Textarea
                label="Comments (Optional)"
                placeholder="Add any comments or approval notes..."
                value={comments}
                onChange={handleCommentsChange}
                rows={6}
                disabled={isSubmitting}
              />
            </div>
          </Card.Content>

          {/* Submit button */}
          <Card.Footer>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback & Regenerate"}
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
}

export default FeedbackForm;
