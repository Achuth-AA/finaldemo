/**
 * Reusable Badge Component
 * 
 * A small status indicator component used to show labels, statuses, counts, etc.
 * Provides consistent styling for different types of information.
 * 
 * @param {Object} props - Badge properties
 * @param {React.ReactNode} props.children - Badge content (text, numbers, etc.)
 * @param {string} props.variant - Badge style variant ('default', 'primary', 'success', 'warning', 'danger', 'info')
 * @param {string} props.size - Badge size ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.dot - Whether to show as a dot indicator
 */

function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  dot = false,
  ...props 
}) {
  // Base badge styles that apply to all variants
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  // Variant-specific styles for different badge types
  const variantStyles = {
    default: 'bg-gray-600 text-white',
    primary: 'bg-blue-500/20 text-blue-400',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400', 
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-cyan-500/20 text-cyan-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
    teal: 'bg-teal-500/20 text-teal-400',
    indigo: 'bg-indigo-500/20 text-indigo-400'
  };
  
  // Size-specific styles for different badge sizes
  const sizeStyles = {
    sm: dot ? 'w-2 h-2' : 'px-2 py-1 text-xs',
    md: dot ? 'w-3 h-3' : 'px-2 py-1 text-xs', 
    lg: dot ? 'w-4 h-4' : 'px-3 py-1 text-sm'
  };
  
  // Combine all styles into final className
  const badgeClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  // Return dot badge if dot prop is true
  if (dot) {
    return <span className={badgeClassName} {...props} />;
  }
  
  return (
    <span className={badgeClassName} {...props}>
      {children}
    </span>
  );
}

/**
 * Status Badge Component
 * 
 * A specialized badge for showing status with predefined styles.
 */
function StatusBadge({ status, className = '' }) {
  // Map status values to badge variants
  const statusVariants = {
    active: 'success',
    working: 'primary', 
    waiting: 'warning',
    alert: 'danger',
    blocked: 'danger',
    pending: 'default',
    completed: 'success',
    'in-progress': 'warning',
    critical: 'danger',
    high: 'warning',
    medium: 'info',
    low: 'success'
  };
  
  const variant = statusVariants[status.toLowerCase()] || 'default';
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}

// Export main Badge component and specialized variants
Badge.Status = StatusBadge;

export default Badge;