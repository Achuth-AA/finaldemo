/**
 * Main Application Component (Refactored)
 * 
 * The root component of the application that sets up routing and provides
 * the overall application structure. This refactored version uses the
 * new smaller, well-documented components for better maintainability.
 * 
 * Features:
 * - React Router setup for navigation
 * - Layout component with sidebar and main content
 * - Route configuration for different pages
 * - Refactored components integration
 * 
 * Route Structure:
 * - / : Main layout with sidebar (nested routes)
 *   - / : Dashboard (index route)  
 *   - /projects : Projects page
 *   - /test-runner : Test runner interface
 *   - /reports : Reports and analytics
 *   - /agent-gallery : Agent gallery page
 *   - /settings : Application settings
 * - /agent-output : Full-screen agent output review (no sidebar)
 * 
 * @returns {JSX.Element} The main application component
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import refactored layout components
import LayoutRefactored from './components/LayoutRefactored';

// Import page components
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TestRunner from './pages/TestRunner';
import Reports from './pages/Reports';
import AgentGallery from './pages/AgentGallery';
import Settings from './pages/Settings';

// Import refactored agent output component
import AgentOutputRefactored from './components/AgentOutputRefactored';

function AppRefactored() {
  return (
    <Router>
      <Routes>
        {/* Main application routes with sidebar layout */}
        <Route path="/" element={<LayoutRefactored />}>
          {/* Dashboard - Default landing page */}
          <Route index element={<Dashboard />} />
          
          {/* Project management interface */}
          <Route path="projects" element={<Projects />} />
          
          {/* Test execution and monitoring */}
          <Route path="test-runner" element={<TestRunner />} />
          
          {/* Analytics and reporting */}
          <Route path="reports" element={<Reports />} />
          
          {/* Agent marketplace and deployment */}
          <Route path="agent-gallery" element={<AgentGallery />} />
          
          {/* Application configuration */}
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Full-screen agent output review (no sidebar) */}
        <Route path="/agent-output" element={<AgentOutputRefactored />} />
        
        {/* 404 fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

/**
 * 404 Not Found Page Component
 * 
 * Displayed when user navigates to a route that doesn't exist.
 * Provides navigation back to the main application.
 */
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default AppRefactored;