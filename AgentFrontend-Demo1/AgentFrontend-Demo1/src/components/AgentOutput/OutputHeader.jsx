/**
 * Agent Output Header Component
 * 
 * Displays the header section for the agent output page including agent name,
 * description, confidence level, and close button.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.agentName - Name of the agent
 * @param {string} props.description - Agent description text
 * @param {number} props.confidence - Confidence percentage (0-100)
 * @param {React.ReactNode} props.icon - Agent icon component
 * @param {function} props.onClose - Function called when close button is clicked
 */

import { X, Zap } from 'lucide-react';
import Badge from '../UI/Badge';

function OutputHeader({ 
  agentName = 'Test Case Generator Agent',
  description = 'Review agent work and provide feedback',
  confidence = 94,
  icon = <Zap className="w-6 h-6 text-blue-400" />,
  onClose
}) {
  /**
   * Handles the close button click
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Default close behavior - go back in history
      window.history.back();
    }
  };
  
  /**
   * Gets the confidence level color based on the value
   */
  const getConfidenceColor = (value) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between p-4">
        {/* Left side - Agent info */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">
            {agentName} Output Review
          </h1>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            aria-label="Close output review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Right side - Agent status and confidence */}
        <div className="flex items-center gap-6">
          {/* Agent status indicator */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Agent</span>
            <Badge.dot variant="primary" size="sm" />
          </div>
          
          {/* Confidence display */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${getConfidenceColor(confidence)}`}>
              {confidence}%
            </div>
            <div className="text-xs text-gray-400">Confidence</div>
          </div>
          
          {/* Agent icon */}
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Description text */}
      <p className="text-gray-400 text-sm px-4 pb-4">
        {description}
      </p>
    </div>
  );
}

export default OutputHeader;