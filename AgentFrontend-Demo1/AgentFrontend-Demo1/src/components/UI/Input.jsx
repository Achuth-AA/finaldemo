/**
 * Reusable Input Components
 * 
 * A collection of form input components with consistent styling and behavior.
 * Supports various input types and provides proper accessibility features.
 */

import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

/**
 * Base Input Component
 * 
 * @param {Object} props - Input properties
 * @param {string} props.type - Input type ('text', 'email', 'password', etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.error - Error message to display
 * @param {string} props.label - Input label
 * @param {boolean} props.required - Whether the input is required
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {string} props.size - Input size ('sm', 'md', 'lg')
 */
const Input = forwardRef(({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  label,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  size = 'md',
  className = '',
  id,
  ...props 
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base input styles that apply to all variants
  const baseStyles = 'w-full bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
  
  // Error state styles
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-blue-500';
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  // Icon padding adjustments
  const iconPadding = {
    left: leftIcon ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : ''
  };
  
  const inputClassName = `${baseStyles} ${errorStyles} ${sizeStyles[size]} ${iconPadding.left} ${iconPadding.right} ${className}`;
  
  return (
    <div className="w-full">
      {/* Input label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input container with icons */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputClassName}
          {...props}
        />
        
        {/* Right icon */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Password Input Component
 * 
 * A specialized input component for passwords with show/hide toggle functionality.
 */
function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-gray-400 hover:text-gray-300 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      }
    />
  );
}

/**
 * Search Input Component
 * 
 * A specialized input component for search functionality with search icon.
 */
function SearchInput({ onSearch, ...props }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(e.target.value);
    }
  };
  
  return (
    <Input
      {...props}
      type="search"
      leftIcon={<Search className="w-5 h-5" />}
      onKeyPress={handleKeyPress}
    />
  );
}

/**
 * Textarea Component
 * 
 * A multi-line text input component with consistent styling.
 */
const Textarea = forwardRef(({ 
  placeholder = '',
  value,
  onChange,
  error,
  label,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  id,
  ...props 
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-colors';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-blue-500';
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Export all input components
Input.Password = PasswordInput;
Input.Search = SearchInput;
Input.Textarea = Textarea;

export default Input;