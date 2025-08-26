import { 
  FileText, 
  Zap, 
  AlertTriangle, 
  Laptop, 
  Users, 
  Activity, 
  Shield, 
  GitBranch, 
  Package, 
  Settings,
  Clock
} from 'lucide-react';

export const agentData = [
  {
    id: 1,
    name: 'Jira Management Agent',
    description: 'Creates comprehensive test cases and leverages existing test patterns',
    icon: FileText,
    iconColor: 'text-blue-400',
    iconBgColor: 'bg-blue-500/20',
    confidence: 94,
    statusDot: 'bg-blue-400',
    badges: [
      { text: 'core', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
      { text: 'critical', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
      { text: 'Assigned', bgColor: 'bg-green-500/20', textColor: 'text-green-400' }
    ],
    status: 'Working',
    statusColor: 'bg-blue-500',
    currentTask: 'Generating test suite for payment integration using existing patterns',
    tasks: 234,
    uptime: '99.2%',
    autonomyLevel: 62
  },
  {
    id: 2,
    name: 'Test Case Generator Agent',
    description: 'Executes test scripts with intelligent orchestration and monitoring',
    icon: Zap,
    iconColor: 'text-blue-400',
    iconBgColor: 'bg-blue-500/20',
    confidence: 91,
    statusDot: 'bg-green-400',
    badges: [
      { text: 'core', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
      { text: 'critical', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
      { text: 'Assigned', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
      { text: 'My Tasks', bgColor: 'bg-blue-500', textColor: 'text-white' }
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    currentTask: 'Executing regression suite across multiple environments',
    tasks: 1247,
    uptime: '98.7%',
    autonomyLevel: 67
  },
  {
    id: 3,
    name: 'Test Data Agent',
    description: 'Generates test data synthetically',
    icon: Package,
    iconColor: 'text-purple-400',
    iconBgColor: 'bg-purple-500/20',
    confidence: 88,
    statusDot: 'bg-green-400',
    badges: [
      { text: 'analysis', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
      { text: 'high', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Assigned', bgColor: 'bg-green-500/20', textColor: 'text-green-400' }
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    currentTask: 'Analyzing payment gateway security test failures',
    tasks: 567,
    uptime: '97.3%',
    autonomyLevel: 70
  },
  {
    id: 4,
    name: 'Test Script Generator Agent',
    description: 'Generates test scripts',
    icon: Laptop,
    iconColor: 'text-green-400',
    iconBgColor: 'bg-green-500/20',
    confidence: 85,
    statusDot: 'bg-yellow-400',
    badges: [
      { text: 'integration', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
      { text: 'medium', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Assigned', bgColor: 'bg-green-500/20', textColor: 'text-green-400' }
    ],
    status: 'Waiting',
    statusColor: 'bg-yellow-500',
    currentTask: 'Preparing load testing environment configuration',
    tasks: 189,
    uptime: '95.1%',
    autonomyLevel: 65
  },
  {
    id: 5,
    name: 'Environment Readiness Agent',
    description: 'Validates Test Environment Readiness',
    icon: Shield,
    iconColor: 'text-red-400',
    iconBgColor: 'bg-red-500/20',
    confidence: 97,
    statusDot: 'bg-red-400',
    badges: [
      { text: 'core', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
      { text: 'critical', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Alert',
    statusColor: 'bg-red-500',
    currentTask: 'Detected SQL injection vulnerability in user authentication',
    tasks: 423,
    uptime: '99.5%',
    autonomyLevel: 68,
    alertType: 'critical'
  },
  {
    id: 6,
    name: 'Test Execution and DevOps Agent',
    description: 'Executes scripts on test environment',
    icon: GitBranch,
    iconColor: 'text-cyan-400',
    iconBgColor: 'bg-cyan-500/20',
    confidence: 90,
    statusDot: 'bg-green-400',
    badges: [
      { text: 'integration', bgColor: 'bg-cyan-500/20', textColor: 'text-cyan-400' },
      { text: 'medium', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    currentTask: 'Testing GraphQL mutations for user profile updates',
    tasks: 678,
    uptime: '96.4%',
    autonomyLevel: 70
  },
    {
    id: 7,
    name: 'Test Reporting Agent',
    description: 'Generates comprehensive test reports and analytics',
    icon: Package,
    iconColor: 'text-purple-400',
    iconBgColor: 'bg-purple-500/20',
    confidence: 87,
    statusDot: 'bg-green-400',
    badges: [
      { text: 'core', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
      { text: 'medium', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    currentTask: 'Generating synthetic data for payment module testing',
    tasks: 445,
    uptime: '94.2%',
    autonomyLevel: 63
  },
  {
    id: 8,
    name: 'Test Failure Analysis Agent',
    description: 'Analyzes test failures and provides intelligent recommendations',
    icon: Activity,
    iconColor: 'text-teal-400',
    iconBgColor: 'bg-teal-500/20',
    confidence: 95,
    statusDot: 'bg-green-400',
    badges: [
      { text: 'analysis', bgColor: 'bg-teal-500/20', textColor: 'text-teal-400' },
      { text: 'high', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Active',
    statusColor: 'bg-green-500',
    currentTask: 'Monitoring test suite performance across 8 environments',
    tasks: 1892,
    uptime: '99.9%',
    autonomyLevel: 60
  },
  {
    id: 9,
    name: 'Self Healing Agent',
    description: 'Automatically detects and applies corrective actions for test failures by updating scripts or configurations',
    icon: Settings,
    iconColor: 'text-blue-400',
    iconBgColor: 'bg-blue-500/20',
    confidence: 84,
    statusDot: 'bg-yellow-400',
    badges: [
      { text: 'integration', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
      { text: 'medium', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Waiting',
    statusColor: 'bg-yellow-500',
    currentTask: 'Waiting for Jenkins pipeline to complete deployment',
    tasks: 523,
    uptime: '92.6%',
    autonomyLevel: 66
  },
  {
    id: 10,
    name: 'Orchestration Agent',
    description: 'Coordinates all agents, manages execution flow, SME review, activation, and monitors agent performance',
    icon: Settings,
    iconColor: 'text-blue-400',
    iconBgColor: 'bg-blue-500/20',
    confidence: 84,
    statusDot: 'bg-yellow-400',
    badges: [
      { text: 'integration', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
      { text: 'medium', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      { text: 'Available', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' }
    ],
    status: 'Waiting',
    statusColor: 'bg-yellow-500',
    currentTask: 'Waiting for Jenkins pipeline to complete deployment',
    tasks: 523,
    uptime: '92.6%',
    autonomyLevel: 69
  }
];

export const performanceData = [
  {
    name: 'Orchestrator',
    icon: Users,
    iconColor: 'text-gray-400',
    successRate: 92.7,
    transactions: 445,
    avgResponse: '2.42s',
    barColor: 'green'
  },
  {
    name: 'Test Case Generator Agent',
    icon: Clock,
    iconColor: 'text-gray-400',
    successRate: 82.8,
    transactions: 485,
    avgResponse: '1.43s',
    barColor: 'green'
  },
  {
    name: 'Test Execution Agent',
    icon: Activity,
    iconColor: 'text-gray-400',
    successRate: 85.2,
    transactions: 498,
    avgResponse: '2.08s',
    barColor: 'green'
  },
  {
    name: 'RMS PM Tool Connector Agent',
    icon: Package,
    iconColor: 'text-gray-400',
    successRate: 95.0,
    transactions: 120,
    avgResponse: '0.89s',
    barColor: 'green'
  },
  {
    name: 'DevOps Connector Agent',
    icon: GitBranch,
    iconColor: 'text-gray-400',
    successRate: 79.1,
    transactions: 234,
    avgResponse: '3.21s',
    barColor: 'yellow'
  },
  {
    name: 'Environment Readiness Agent',
    icon: Laptop,
    iconColor: 'text-gray-400',
    successRate: 77.6,
    transactions: 156,
    avgResponse: '4.75s',
    barColor: 'yellow'
  }
];
