/**
 * Message Input Component
 * 
 * A chat input interface that allows users to send messages to the AI assistant.
 * Features a text input field with a send button and proper keyboard handling.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.placeholder - Placeholder text for the input field
 * @param {function} props.onSend - Function called when message is sent
 * @param {string} props.value - Current input value
 * @param {function} props.onChange - Function called when input changes
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.isLoading - Whether the input is in loading state
 */

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Button from '../UI/Button';

function MessageInput({ 
  placeholder = "How can I help you with testing today?",
  onSend,
  value: controlledValue,
  onChange: controlledOnChange,
  disabled = false,
  isLoading = false
}) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState('');
  
  // Use controlled value if provided, otherwise use internal state
  const inputValue = controlledValue !== undefined ? controlledValue : internalValue;
  const handleChange = controlledOnChange || setInternalValue;
  
  /**
   * Handles sending the message
   * Calls onSend callback with current input value and clears the input
   */
  const handleSend = () => {
    const messageText = inputValue.trim();
    if (messageText && onSend && !isLoading) {
      onSend(messageText);
      // Clear input after sending (only for uncontrolled mode)
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };
  
  /**
   * Handles keyboard events
   * Sends message when Enter is pressed (without Shift)
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };
  
  /**
   * Handles input change events
   */
  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };
  
  return (
    <div className="mb-6">
      <div className="relative">
        {/* Message input field */}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled || isLoading}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-28 text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        
        {/* Send button */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            onClick={handleSend}
            disabled={disabled || !inputValue.trim() || isLoading}
            variant="primary"
            size="md"
            rightIcon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            className="px-5 py-2.5"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
      
      {/* Input instructions (optional) */}
      <p className="mt-2 text-xs text-gray-500 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}

export default MessageInput;
