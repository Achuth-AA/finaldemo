/**
 * Agent History Panel Component
 * 
 * Displays a chronological list of revisions, approvals, and comments
 * for the agent output. Shows user interactions and feedback history.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.historyItems - Array of history items to display
 * @param {boolean} props.loading - Whether history is being loaded
 */

import Card from '../UI/Card';
import Badge from '../UI/Badge';

// Default history data for demonstration
const defaultHistoryData = [
  {
    id: 1,
    user: 'Sarah Chen',
    type: 'revision',
    date: '8/2/2025, 9:27:56 AM',
    comment: 'Please add more edge cases for password validation. The current test cases miss scenarios for special characters and length requirements.'
  },
  {
    id: 2,
    user: 'Michael Rodriguez',
    type: 'approval',
    date: '8/2/2025, 8:57:56 AM',
    comment: 'Great work on the user registration flows. The test coverage looks comprehensive.'
  },
  {
    id: 3,
    user: 'Sarah Chen',
    type: 'comment',
    date: '8/2/2025, 7:57:56 AM',
    comment: 'Consider adding performance test cases for high-load scenarios.'
  }
];

/**
 * Individual History Item Component
 */
function HistoryItem({ item }) {
  /**
   * Gets user initials for avatar display
   */
  const getUserInitials = (userName) => {
    return userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };
  
  /**
   * Gets badge variant for history item type
   */
  const getTypeVariant = (type) => {
    switch (type) {
      case 'approval':
        return 'success';
      case 'revision':
        return 'warning';
      case 'comment':
        return 'default';
      case 'rejection':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  /**
   * Formats the action type for display
   */
  const formatActionType = (type) => {
    switch (type) {
      case 'approval':
        return 'approved';
      case 'revision':
        return 'requested revision';
      case 'comment':
        return 'commented';
      case 'rejection':
        return 'rejected';
      default:
        return type;
    }
  };
  
  return (
    <Card padding="lg" className="border border-gray-700/50">
      <div className="flex items-start gap-4">
        {/* User avatar */}
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium text-sm">
            {getUserInitials(item.user)}
          </span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with user, action, and timestamp */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-medium text-white">{item.user}</h3>
            <Badge variant={getTypeVariant(item.type)}>
              {formatActionType(item.type)}
            </Badge>
            <span className="text-sm text-gray-400">{item.date}</span>
          </div>
          
          {/* Comment content */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {item.comment}
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Loading State Component
 */
function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} padding="lg" className="animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/**
 * Empty State Component
 */
function EmptyState() {
  return (
    <Card padding="lg" className="text-center">
      <p className="text-gray-400">No history available yet.</p>
      <p className="text-gray-500 text-sm mt-1">
        Feedback and revisions will appear here as they're submitted.
      </p>
    </Card>
  );
}

/**
 * Main History Panel Component
 */
function HistoryPanel({ 
  historyItems = defaultHistoryData,
  loading = false
}) {
  // Show loading state
  if (loading) {
    return <LoadingState />;
  }
  
  // Show empty state if no items
  if (!historyItems || historyItems.length === 0) {
    return <EmptyState />;
  }
  
  // Render history items
  return (
    <div className="space-y-4">
      {/* History header */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">
          Revision History
        </h3>
        <p className="text-gray-400 text-sm">
          Track all feedback, revisions, and approvals for this output.
        </p>
      </div>
      
      {/* History items list */}
      {historyItems.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default HistoryPanel;