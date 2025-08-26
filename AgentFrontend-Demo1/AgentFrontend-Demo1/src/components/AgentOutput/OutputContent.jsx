/**
 * Agent Output Content Component
 * 
 * Displays the main output content from the agent including analysis results,
 * progress indicators, and action buttons for exporting or copying content.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Output section title
 * @param {string} props.status - Current status ('pending review', 'completed', etc.)
 * @param {string} props.generatedDate - Date when output was generated
 * @param {number} props.confidence - Confidence level (0-100)
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.progressStatus - Progress status text
 * @param {React.ReactNode} props.content - Main content to display
 * @param {function} props.onExport - Function called when export is clicked
 * @param {function} props.onCopy - Function called when copy is clicked
 */

import { Download, Copy } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import ProgressBar from '../UI/ProgressBar';

function OutputContent({ 
  title = 'Test Case Generator Agent Output',
  status = 'pending review',
  generatedDate = '8/2/2025, 9:55:13 AM',
  confidence = 85,
  progress = 75,
  progressStatus = 'In Progress',
  content,
  onExport,
  onCopy
}) {
  /**
   * Handles export button click
   */
  const handleExport = () => {
    console.log('Exporting agent output...');
    if (onExport) {
      onExport();
    }
  };
  
  /**
   * Handles copy button click
   */
  const handleCopy = () => {
    console.log('Copying agent output...');
    if (onCopy) {
      onCopy();
    }
  };
  
  /**
   * Gets status badge variant based on status text
   */
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending review':
        return 'warning';
      case 'in progress':
        return 'primary';
      case 'failed':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card padding="lg">
        {/* Content header */}
        <Card.Header>
          <div className="flex items-center justify-between mb-4">
            <Card.Title className="text-xl">{title}</Card.Title>
            <Badge variant={getStatusVariant(status)}>
              {status}
            </Badge>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span>Generated {generatedDate}</span>
            <span className="text-blue-400">Confidence: {confidence}%</span>
          </div>
        </Card.Header>
        
        {/* Main content area */}
        <Card.Content>
          {content ? (
            <div className="prose prose-invert max-w-none">
              {content}
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg">
                Agent analysis and recommendations will appear here.
              </p>
            </div>
          )}
        </Card.Content>
        
        {/* Progress section */}
        <div className="mt-6">
          <ProgressBar
            value={progress}
            variant="auto"
            showLabel={true}
            label={`Status: ${progressStatus}`}
          />
        </div>
        
        {/* Action buttons */}
        <Card.Footer>
          <div className="flex gap-4">
            <Button
              onClick={handleExport}
              variant="secondary"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export
            </Button>
            <Button
              onClick={handleCopy}
              variant="secondary"
              leftIcon={<Copy className="w-4 h-4" />}
            >
              Copy
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default OutputContent;