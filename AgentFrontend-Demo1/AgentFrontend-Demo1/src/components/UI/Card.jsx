/**
 * Reusable Card Component
 * 
 * A flexible card container component that provides consistent styling
 * for content sections throughout the application.
 * 
 * @param {Object} props - Card properties
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether the card should have hover effects
 * @param {string} props.variant - Card style variant ('default', 'bordered', 'elevated')
 * @param {string} props.padding - Card padding size ('none', 'sm', 'md', 'lg')
 */

function Card({ 
  children, 
  className = '', 
  hover = false, 
  variant = 'default',
  padding = 'md',
  ...props 
}) {
  // Base card styles that apply to all variants
  const baseStyles = 'bg-gray-900 rounded-lg transition-colors';
  
  // Variant-specific styles for different card types
  const variantStyles = {
    default: 'border border-gray-700',
    bordered: 'border-2 border-gray-600',
    elevated: 'border border-gray-700 shadow-lg',
    transparent: 'bg-transparent border-none'
  };
  
  // Hover effect styles
  const hoverStyles = hover ? 'hover:border-gray-600 hover:bg-gray-800 cursor-pointer' : '';
  
  // Padding styles for different spacing needs
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // Combine all styles into final className
  const cardClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${paddingStyles[padding]} ${className}`;
  
  return (
    <div className={cardClassName} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Header Component
 * 
 * A header section for cards that typically contains title and actions.
 */
function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Title Component
 * 
 * A title component for card headers.
 */
function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-white ${className}`}>
      {children}
    </h3>
  );
}

/**
 * Card Content Component
 * 
 * A content wrapper for card body content.
 */
function CardContent({ children, className = '' }) {
  return (
    <div className={`text-gray-300 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Footer Component
 * 
 * A footer section for cards that typically contains actions or metadata.
 */
function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-800 ${className}`}>
      {children}
    </div>
  );
}

// Export main Card component and sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;