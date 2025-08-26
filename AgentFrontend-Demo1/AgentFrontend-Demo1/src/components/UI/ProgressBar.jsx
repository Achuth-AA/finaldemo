/**
 * Reusable Progress Bar Component
 * 
 * A progress indicator component that shows completion percentage.
 * Used for displaying autonomy levels, task progress, success rates, etc.
 * 
 * @param {Object} props - Progress bar properties
 * @param {number} props.value - Progress value (0-100)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {string} props.variant - Color variant ('default', 'success', 'warning', 'danger')
 * @param {string} props.size - Bar height ('sm', 'md', 'lg')
 * @param {boolean} props.showLabel - Whether to show percentage label
 * @param {string} props.label - Custom label text
 * @param {string} props.className - Additional CSS classes
 */

function ProgressBar({ 
  value, 
  max = 100, 
  variant = 'default', 
  size = 'md', 
  showLabel = false,
  label,
  className = '',
  ...props 
}) {
  // Calculate percentage for display
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Base progress bar container styles
  const containerStyles = 'w-full bg-gray-800 rounded-full overflow-hidden';
  
  // Variant-specific styles for different progress types
  const variantStyles = {
    default: 'bg-gradient-to-r from-blue-500 to-blue-400',
    success: 'bg-gradient-to-r from-green-500 to-green-400',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-400',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-400',
    cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-400'
  };
  
  // Size-specific styles for different bar heights
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2', 
    lg: 'h-3'
  };
  
  // Determine color based on value for auto-coloring
  const getAutoVariant = (value) => {
    if (value >= 90) return 'success';
    if (value >= 70) return 'default';
    if (value >= 50) return 'warning';
    return 'danger';
  };
  
  const finalVariant = variant === 'auto' ? getAutoVariant(percentage) : variant;
  
  return (
    <div className={className} {...props}>
      {/* Progress label */}
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-semibold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className={`${containerStyles} ${sizeStyles[size]}`}>
        {/* Progress bar fill */}
        <div 
          className={`${variantStyles[finalVariant]} h-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Circular Progress Component
 * 
 * A circular progress indicator for showing completion in a circle format.
 */
function CircularProgress({ 
  value, 
  max = 100, 
  size = 'md', 
  variant = 'default',
  showLabel = true,
  className = ''
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Size configurations for circular progress
  const sizeConfigs = {
    sm: { size: 40, strokeWidth: 4, fontSize: 'text-xs' },
    md: { size: 60, strokeWidth: 6, fontSize: 'text-sm' },
    lg: { size: 80, strokeWidth: 8, fontSize: 'text-base' }
  };
  
  const config = sizeConfigs[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Color variants for the circle
  const colorVariants = {
    default: 'stroke-blue-500',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    danger: 'stroke-red-500'
  };
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="none"
          className="text-gray-800"
        />
        {/* Progress circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-300 ease-out ${colorVariants[variant]}`}
        />
      </svg>
      {/* Center label */}
      {showLabel && (
        <span className={`absolute inset-0 flex items-center justify-center font-semibold text-white ${config.fontSize}`}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

// Export main ProgressBar component and circular variant
ProgressBar.Circular = CircularProgress;

export default ProgressBar;