/**
 * UI Components Index
 * 
 * Central export file for all reusable UI components.
 * This allows for clean imports throughout the application.
 * 
 * Usage:
 *   import { Button, Card, Badge } from '@/components/UI';
 *   import Button from '@/components/UI/Button';
 */

// Export all UI components
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Badge } from './Badge';
export { default as ProgressBar } from './ProgressBar';
export { default as Tabs } from './Tabs';
export { default as Input } from './Input';

// Re-export specific component variants for convenience
export { default as StatusBadge } from './Badge';
export { default as CircularProgress } from './ProgressBar';
export { default as PasswordInput } from './Input';
export { default as SearchInput } from './Input';
export { default as Textarea } from './Input';