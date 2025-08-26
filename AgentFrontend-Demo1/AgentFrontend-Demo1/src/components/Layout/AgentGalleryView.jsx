/**
 * Agent Gallery View Component
 * 
 * Displays a gallery of available AI agents that can be deployed.
 * Shows agent information, capabilities, and deployment options.
 */

import Card from '../UI/Card';
import Button from '../UI/Button';

// Sample agent gallery data
const availableAgents = [
  {
    id: 'test-automation',
    name: 'Test Automation Agent',
    description: 'Automated test case execution and reporting',
    status: 'available',
    variant: 'primary'
  },
  {
    id: 'performance-monitor',
    name: 'Performance Monitor',
    description: 'Real-time performance tracking and alerts',
    status: 'available',
    variant: 'success'
  },
  {
    id: 'bug-detector',
    name: 'Bug Detector',
    description: 'Intelligent bug detection and classification',
    status: 'available',
    variant: 'purple'
  }
];

/**
 * Individual Agent Card Component
 */
function AgentGalleryCard({ agent }) {
  const handleDeploy = () => {
    console.log(`Deploying agent: ${agent.id}`);
    // Add deployment logic here
  };
  
  const getVariantColor = (variant) => {
    const colors = {
      primary: 'bg-blue-600 hover:bg-blue-700',
      success: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700'
    };
    return colors[variant] || colors.primary;
  };
  
  return (
    <Card padding="md" className="border border-gray-600/50">
      <Card.Header>
        <Card.Title className="text-lg">{agent.name}</Card.Title>
      </Card.Header>
      
      <Card.Content>
        <p className="text-sm text-gray-400 mb-3">
          {agent.description}
        </p>
      </Card.Content>
      
      <Card.Footer className="mt-0 pt-3">
        <Button
          onClick={handleDeploy}
          className={`w-full ${getVariantColor(agent.variant)}`}
          size="sm"
        >
          Deploy Agent
        </Button>
      </Card.Footer>
    </Card>
  );
}

/**
 * Main Agent Gallery View Component
 */
function AgentGalleryView() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Agent Gallery</h1>
        <p className="text-gray-300">
          Browse and deploy available AI agents for your testing workflows.
        </p>
      </div>
      
      {/* Agent gallery grid */}
      <Card 
        variant="elevated" 
        className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50"
        padding="lg"
      >
        <Card.Content>
          <p className="text-gray-300 mb-6">
            Browse and deploy available AI agents for your testing workflows.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAgents.map((agent) => (
              <AgentGalleryCard key={agent.id} agent={agent} />
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default AgentGalleryView;