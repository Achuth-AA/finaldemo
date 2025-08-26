/**
 * Main Layout Component (Refactored)
 * 
 * The main layout component that provides the overall structure for the application.
 * Manages navigation state, renders different views based on active section,
 * and coordinates between sidebar, header, and main content areas.
 * 
 * This refactored version uses smaller, focused components for better maintainability.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// Import layout components
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistantView from './Layout/AIAssistantView';
import AgentControlRefactored from './AgentControlRefactored';

// Import pages/views
import AgentGalleryView from './Layout/AgentGalleryView';

function LayoutRefactored() {
  // State for managing which section is currently active
  const [activeSection, setActiveSection] = useState('ai-assistant');
  
  /**
   * Handles message sending from AI assistant
   */
  const handleMessageSend = (message) => {
    console.log('Layout: Message sent:', message);
    // Here you could integrate with AI service, analytics, etc.
  };
  
  /**
   * Handles action card clicks from AI assistant view
   */
  const handleActionCardClick = (card) => {
    console.log('Layout: Action card clicked:', card.id);
    
    // Navigate to relevant sections based on card type
    switch (card.type) {
      case 'agents':
        setActiveSection('agent-control');
        break;
      case 'collaboration':
        setActiveSection('agent-gallery');
        break;
      default:
        console.log('No specific navigation for card type:', card.type);
    }
  };
  
  /**
   * Renders the appropriate content based on the active section
   */
  const renderSectionContent = (section) => {
    switch (section) {
      case 'ai-assistant':
        return (
          <AIAssistantView 
            onMessageSend={handleMessageSend}
            onActionCardClick={handleActionCardClick}
          />
        );
        
      case 'agent-control':
        return (
          <AgentControlRefactored 
            setActiveSection={setActiveSection} 
          />
        );
        
      case 'agent-gallery':
        return (
          <AgentGalleryView />
        );
        
      default:
        // Fallback to outlet for other routes
        return <Outlet />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-white text-white overflow-hidden">
      {/* Header - Full width across top */}
      <Header />
      
      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden bg-gray-950">
        {/* Sidebar navigation */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        {/* Main content area with gradient background */}
        <main className="flex-1 relative overflow-hidden bg-gray-950">
          {/* Background gradient layers for visual depth */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900/50 to-gray-950"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-gray-950/80"></div>
          </div>
          
          {/* Scrollable content container */}
          <div className="relative z-10 h-full overflow-y-auto">
            {activeSection ? (
              renderSectionContent(activeSection)
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutRefactored;