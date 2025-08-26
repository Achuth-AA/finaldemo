/**
 * Agent Output Tabs Component
 * 
 * Tab navigation for the agent output interface. Allows switching between
 * output content, feedback form, and revision history.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.activeTab - Currently active tab ID
 * @param {function} props.onTabChange - Function called when tab changes
 */

import { Eye, MessageSquare, Clock } from 'lucide-react';
import Tabs from '../UI/Tabs';

function OutputTabs({ 
  activeTab = 'output', 
  onTabChange 
}) {
  // Tab configuration
  const tabs = [
    {
      id: 'output',
      label: 'Output',
      icon: Eye
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: MessageSquare
    },
    {
      id: 'history',
      label: 'History',
      icon: Clock
    }
  ];
  
  return (
    <div className="bg-gray-900 px-4">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        variant="default"
        size="md"
      />
    </div>
  );
}

export default OutputTabs;