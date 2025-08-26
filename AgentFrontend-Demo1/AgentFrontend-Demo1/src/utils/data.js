import {
  Activity,
  AlertTriangle,
  CheckSquare,
  Network,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const tasks = [
  {
    id: 1,
    title: "Review Payment Gateway Security Test Results",
    description:
      "Critical security vulnerabilities detected in payment flow - requires immediate review and sign-off",
    agent: "Test Failure Analysis Agent",
    status: "critical",
    statusText: "needs approval",
    dueDate: "8/3/2025",
    estimatedTime: "4h",
    actual: "2.5h",
  },
  {
    id: 2,
    title: "Configure Load Testing Environment",
    description:
      "Setup and configuration of load testing environment - blocked by security review completion",
    agent: "Environment Readiness Agent",
    status: "high",
    statusText: "blocked",
    dueDate: "3/2/2025",
    estimatedTime: "6h",
    actual: "",
  },
  {
    id: 3,
    title: "Validate Mobile Regression Test Cases",
    description:
      "Review and validate generated test cases for mobile application regression testing",
    agent: "Smart Test Review Agent",
    status: "medium",
    statusText: "pending",
    dueDate: "8/6/2025",
    estimatedTime: "8h",
    actual: "",
  },
];

export const SECTION_METADATA = {
  
  "agent-exception": {
    title: "Exception Management",
    description:
      "Review and manage system exceptions, alerts, and critical issues requiring attention",
  },
  "agent-tasks": {
    title: "Active Tasks",
    description: "View your assigned tasks, deadlines, and workflow status",
  },
};

export const AIAGENTSNAVTABS = [
  { id: "agents", label: "Agents", icon: Users },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "exceptions", label: "Exceptions", icon: AlertTriangle },
];

export const LIFECYCLEMANAGEMENT = [
  { id: "lifecycle", label: "Lifecycle Management", icon: Workflow },
  { id: "agents", label: "Agents", icon: Users },
  // { id: "orchestrator", label: "Orchestrator", icon: Network },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "tasks", label: "Tasks & workflow", icon: CheckSquare },
  { id: "exceptions", label: "Exceptions", icon: AlertTriangle },
];

export const projectLifecycleData = [
  {
    icon: Activity,
    title: "Test Lifecycle Management",
    project: "BNPL Integration",
    access: "Contributor Access",
    overalProgress: "40%",
    projectProgress: "50%",
    stagesActive: "4 of 8 stages active",
    status: [
      {id: 1, type: "Completed", value: 2, valueColor: "green-500" },
      {id: 2, type: "In Progress", value: 2, valueColor: "blue-500" },
      {id: 3, type: "Pending", value: 4, valueColor: "teal-700" },
      {id: 4, type: "Blocked", value: 0, valueColor: "red-500" },
    ],
  },
];
