/**
 * Welcome Section Component
 * 
 * Displays the main welcome message and greeting for the AI assistant interface.
 * Shows a personalized greeting with user information and introduction text.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.userName - Name of the current user (default: 'Sarah')
 * @param {string} props.greeting - Time-based greeting (default: 'Good morning')
 * @param {React.ReactNode} props.icon - Icon to display in the welcome section
 */

import { MessageSquare } from 'lucide-react';

function WelcomeSection({ 
  userName = 'Sarah', 
  greeting = 'Good morning',
  icon = <MessageSquare className="w-6 h-6" />
}) {
  return (
    <div className="mb-6 text-center">
      {/* Welcome icon */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Personalized greeting */}
      <h1 className="text-2xl font-semibold mb-3 text-white">
        {greeting}, {userName}
      </h1>
      
      {/* Introduction text */}
      <p className="text-gray-400 text-base max-w-2xl mx-auto">
        I'm ready to collaborate with you on testing decisions. Let's work together to achieve the best results.
      </p>
    </div>
  );
}

export default WelcomeSection;