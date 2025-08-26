/**
 * Reusable Tabs Component
 * 
 * A tab navigation component that allows switching between different content panels.
 * Provides consistent styling and behavior for tabbed interfaces.
 * 
 * @param {Object} props - Tabs properties
 * @param {Array} props.tabs - Array of tab objects with { id, label, icon?, count?, disabled? }
 * @param {string} props.activeTab - Currently active tab ID
 * @param {function} props.onTabChange - Function called when tab changes
 * @param {string} props.variant - Tab style variant ('default', 'pills', 'underline')
 * @param {string} props.size - Tab size ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 */

function Tabs({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  variant = 'underline', 
  size = 'md',
  className = '',
  ...props 
}) {
  // Base tab styles that apply to all variants
  const baseTabStyles = 'inline-flex items-center gap-2 font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant-specific styles for different tab types
  const variantStyles = {
    default: {
      container: 'flex gap-2',
      tab: 'px-4 py-2 rounded-lg',
      active: 'bg-gray-800 text-white',
      inactive: 'text-gray-400 hover:text-white hover:bg-gray-800/50'
    },
    pills: {
      container: 'flex gap-2',
      tab: 'px-4 py-2 rounded-full',
      active: 'bg-blue-600 text-white',
      inactive: 'text-gray-400 hover:text-white hover:bg-gray-800'
    },
    underline: {
      container: 'flex gap-8 border-b border-gray-800',
      tab: 'pb-3 border-b-2',
      active: 'text-white border-blue-500',
      inactive: 'text-gray-400 border-transparent hover:text-white'
    }
  };
  
  // Size-specific styles for different tab sizes
  const sizeStyles = {
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-3',
    lg: 'text-base px-6 py-4'
  };
  
  const currentVariant = variantStyles[variant];
  
  return (
    <div className={`${currentVariant.container} ${className}`} {...props}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        // Combine styles for current tab state
        const tabClassName = `
          ${baseTabStyles} 
          ${currentVariant.tab} 
          ${isActive ? currentVariant.active : currentVariant.inactive}
          ${variant !== 'underline' ? sizeStyles[size] : ''}
        `.trim();
        
        return (
          <button
            key={tab.id}
            className={tabClassName}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            aria-selected={isActive}
            role="tab"
          >
            {/* Tab icon */}
            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
            
            {/* Tab label */}
            <span>{tab.label}</span>
            
            {/* Tab count/badge */}
            {tab.count !== undefined && (
              <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-700 text-gray-300'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Tab Panel Component
 * 
 * A content container for tab content that handles visibility based on active tab.
 */
function TabPanel({ 
  children, 
  tabId, 
  activeTab, 
  className = '',
  ...props 
}) {
  // Only render content if this panel is active
  if (activeTab !== tabId) {
    return null;
  }
  
  return (
    <div 
      className={`mt-6 ${className}`} 
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Tab Container Component
 * 
 * A wrapper component that combines tabs and panels with proper accessibility.
 */
function TabContainer({ children, className = '' }) {
  return (
    <div className={className} role="tablist">
      {children}
    </div>
  );
}

// Export main Tabs component and related components
Tabs.Panel = TabPanel;
Tabs.Container = TabContainer;

export default Tabs;