/**
 * Action Cards Grid Component
 * 
 * Displays a grid of action cards that provide quick access to different features
 * and sections of the application. Each card shows relevant metrics and status.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.cards - Array of card objects to display
 * @param {function} props.onCardClick - Function called when a card is clicked
 */

import { 
  AlertTriangle, 
  Clock, 
  Users, 
  BarChart3, 
  Users2, 
  MessageSquare 
} from 'lucide-react';
import Card from '../UI/Card';

// Default action cards configuration
const defaultCards = [
  {
    id: 'critical-issues',
    title: '1 Critical Issues',
    description: 'Immediate attention required',
    icon: AlertTriangle,
    iconColor: 'text-blue-400',
    count: 1,
    type: 'critical'
  },
  {
    id: 'pending-tasks',
    title: '2 Pending Tasks', 
    description: 'Your tasks need attention',
    icon: Clock,
    iconColor: 'text-blue-400',
    count: 2,
    type: 'tasks'
  },
  {
    id: 'active-agents',
    title: '11 Active Agents',
    description: 'Monitor your assigned AI agents',
    icon: Users,
    iconColor: 'text-blue-400',
    count: 11,
    type: 'agents'
  },
  {
    id: 'performance-metrics',
    title: 'Performance Metrics',
    description: 'View testing performance and analytics',
    icon: BarChart3,
    iconColor: 'text-blue-400',
    count: null,
    type: 'metrics'
  },
  {
    id: 'collaboration-hub',
    title: 'Collaboration Hub',
    description: 'Access pending approvals and AI recommendations',
    icon: Users2,
    iconColor: 'text-blue-400',
    count: null,
    type: 'collaboration'
  },
  {
    id: 'chat-generator',
    title: 'Chat with Test Case Generator Agent',
    description: 'Collaborate on current testing tasks',
    icon: MessageSquare,
    iconColor: 'text-blue-400',
    count: null,
    type: 'chat'
  }
];

/**
 * Individual Action Card Component
 * 
 * Renders a single action card with icon, title, description, and click handling.
 */
function ActionCard({ card, onClick }) {
  const Icon = card.icon;
  
  /**
   * Handles card click events
   */
  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  
  return (
    <Card 
      hover 
      className="cursor-pointer" 
      onClick={handleClick}
      padding="sm"
    >
      {/* Card header with icon and title */}
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${card.iconColor}`} />
        <h3 className="text-sm font-medium text-white">{card.title}</h3>
      </div>
      
      {/* Card description */}
      <p className="text-gray-400 text-xs leading-relaxed">
        {card.description}
      </p>
      
      {/* Optional count badge */}
      {card.count !== null && (
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
            {card.count} items
          </span>
        </div>
      )}
    </Card>
  );
}

/**
 * Main Action Cards Grid Component
 */
function ActionCardsGrid({ 
  cards = defaultCards, 
  onCardClick,
  className = ''
}) {
  /**
   * Handles individual card click events
   */
  const handleCardClick = (card) => {
    console.log(`Action card clicked: ${card.id}`);
    
    // Call parent click handler if provided
    if (onCardClick) {
      onCardClick(card);
    }
    
    // Default actions based on card type
    switch (card.type) {
      case 'critical':
        // Navigate to critical issues
        break;
      case 'tasks':
        // Navigate to task management
        break;
      case 'agents':
        // Navigate to agent control
        break;
      case 'metrics':
        // Navigate to performance dashboard
        break;
      case 'collaboration':
        // Navigate to collaboration hub
        break;
      case 'chat':
        // Open chat interface
        break;
      default:
        console.log('Unknown card type:', card.type);
    }
  };
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {cards.map((card) => (
        <ActionCard 
          key={card.id} 
          card={card} 
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default ActionCardsGrid;