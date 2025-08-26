/**
 * Footer Section Component
 * 
 * Displays footer information including agent status, platform branding,
 * and mode indicators. Provides context about the current session.
 * 
 * @param {Object} props - Component properties
 * @param {number} props.agentCount - Number of assigned agents
 * @param {string} props.mode - Current operation mode ('AI-Assisted', 'Manual', etc.)
 * @param {string} props.platformName - Name of the platform
 * @param {boolean} props.showBranding - Whether to show platform branding
 */

function FooterSection({ 
  agentCount = 12,
  mode = 'AI-Assisted',
  platformName = 'TestQ AI-First Testing Platform',
  showBranding = true
}) {
  return (
    <div className="mt-6 text-center text-sm text-gray-500 space-y-3">
      {/* Agent status information */}
      <p className="text-gray-400">
        Working with {agentCount} assigned agents in {mode.toLowerCase()} mode
      </p>
      
      {/* Mode indicator with icon */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-blue-400 flex items-center gap-1">
          👤 {mode} mode: Human + AI collaboration active
        </span>
      </div>
      
      {/* Platform branding link */}
      {showBranding && (
        <button 
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors focus:outline-none focus:underline"
          onClick={() => {
            // Handle platform branding click
            console.log('Platform branding clicked');
          }}
        >
          🏢 {platformName} →
        </button>
      )}
      
      {/* Additional status indicators */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          System Online
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          AI Ready
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          {agentCount} Agents
        </span>
      </div>
      
      {/* Session information */}
      <div className="text-xs text-gray-600 pt-2 border-t border-gray-800">
        <p>Session active • Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default FooterSection;