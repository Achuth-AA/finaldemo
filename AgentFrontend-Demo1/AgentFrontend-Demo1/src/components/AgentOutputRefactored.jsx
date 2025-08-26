/**
 * Agent Output Component (Refactored)
 * 
 * A full-screen interface for reviewing agent output, providing feedback,
 * and viewing revision history. Composed of smaller, focused components
 * for better maintainability and testing.
 * 
 * This refactored version breaks down the large component into:
 * - OutputHeader: Header with agent info and close button
 * - OutputTabs: Tab navigation between different sections
 * - OutputContent: Main output display with actions
 * - FeedbackForm: Feedback submission interface
 * - HistoryPanel: Revision and feedback history
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import smaller components
import OutputHeader from './AgentOutput/OutputHeader';
import OutputTabs from './AgentOutput/OutputTabs';
import OutputContent from './AgentOutput/OutputContent';
import FeedbackForm from './AgentOutput/FeedbackForm';
import HistoryPanel from './AgentOutput/HistoryPanel';
import Tabs from './UI/Tabs';

function AgentOutputRefactored() {
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('output');
  
  /**
   * Handles closing the output view
   */
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };
  
  /**
   * Handles feedback form submission
   */
  const handleFeedbackSubmit = async (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    
    try {
      // Here you would typically send the feedback to your API
      // await submitFeedback(feedbackData);
      
      // Show success message or redirect
      alert('Feedback submitted successfully!');
      
      // Optionally switch to history tab to show the new feedback
      setActiveTab('history');
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };
  
  /**
   * Handles output export
   */
  const handleExport = () => {
    console.log('Exporting output...');
    // Implement export logic here
    // This could download as PDF, JSON, etc.
  };
  
  /**
   * Handles output copy to clipboard
   */
  const handleCopy = () => {
    console.log('Copying output...');
    // Implement copy to clipboard logic here
    navigator.clipboard?.writeText('Agent output content...')
      .then(() => {
        alert('Output copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        alert('Failed to copy output');
      });
  };
  
  /**
   * Renders the appropriate tab content based on active tab
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'output':
        return (
          <OutputContent
            title="Test Case Generator Agent Output"
            status="pending review"
            generatedDate="8/2/2025, 9:55:13 AM"
            confidence={85}
            progress={75}
            progressStatus="In Progress"
            onExport={handleExport}
            onCopy={handleCopy}
          />
        );
        
      case 'feedback':
        return (
          <FeedbackForm 
            onSubmit={handleFeedbackSubmit}
            initialFeedback="approve"
            initialComments=""
          />
        );
        
      case 'history':
        return (
          <HistoryPanel />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header section */}
      <OutputHeader 
        agentName="Test Case Generator Agent"
        description="Review agent work and provide feedback"
        confidence={94}
        onClose={handleClose}
      />
      
      {/* Tab navigation */}
      <OutputTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Main content area */}
      <div className="flex-1 bg-gray-950 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Tab content */}
          <Tabs.Panel 
            tabId={activeTab} 
            activeTab={activeTab}
          >
            {renderTabContent()}
          </Tabs.Panel>
        </div>
      </div>
    </div>
  );
}

export default AgentOutputRefactored;