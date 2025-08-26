/**
 * AI Assistant View Component
 * 
 * The main view component for the AI assistant interface. Combines all sections
 * including welcome message, input, action cards, and footer into a cohesive layout.
 * 
 * @param {Object} props - Component properties
 * @param {function} props.onMessageSend - Function called when user sends a message
 * @param {function} props.onActionCardClick - Function called when action card is clicked
 */

// import WelcomeSection from './WelcomeSection';
import MessageInput from './MessageInput';
import ActionCardsGrid from './ActionCardsGrid';
import FooterSection from './FooterSection';

function AIAssistantView({ 
  onMessageSend,
  onActionCardClick
}) {
  /**
   * Handles message sending from the input component
   */
  const handleMessageSend = (message) => {
    console.log('Message sent:', message);
    
    // Call parent handler if provided
    if (onMessageSend) {
      onMessageSend(message);
    }
    
    // Default message handling logic
    // This could integrate with AI service, save to history, etc.
  };
  
  /**
   * Handles action card clicks
   */
  const handleActionCardClick = (card) => {
    console.log('Action card clicked:', card.id);
    
    // Call parent handler if provided
    if (onActionCardClick) {
      onActionCardClick(card);
    }
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome section with greeting */}
      
      {/* Message input interface */}
      <MessageInput 
        onSend={handleMessageSend}
        placeholder="How can I help you with testing today?"
      />
      
      {/* Action cards grid */}
      <ActionCardsGrid 
        onCardClick={handleActionCardClick}
      />
      
      {/* Footer with status information */}
      <FooterSection 
        agentCount={12}
        mode="AI-Assisted"
        platformName="TestQ AI-First Testing Platform"
      />
    </div>
  );
}

export default AIAssistantView;