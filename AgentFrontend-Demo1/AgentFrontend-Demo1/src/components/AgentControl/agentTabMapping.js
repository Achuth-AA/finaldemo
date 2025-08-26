// // Canonical tab-wise grouping of agent names
// const agentTabMapping = {
//     all: [], // Empty means show all agents
//     orchestration: [
//       'Orchestration Agent'
//     ],
//     core: [
//       'Test Case Generator Agent',
//       'Test Execution and DevOps Agent',
//       'Environment Readiness Agent',
//       'Test Script Generator Agent',
//       'Test Data Agent'
//     ],
//     integration: [
//       'Jira Management Agent'
//     ],
//     analysis: [
//       'Test Reporting Agent',
//       'Test Failure Analysis Agent',
//       'Self Healing Agent',
//       'Test Summarization Agent'
//     ],
//     // Legacy mappings kept for backwards compatibility
//     design: [
//       'Test Case Generator Agent',
//       'Jira Management Agent',
//       'Test Data Agent',
//       'Test Script Generator Agent'
//     ],
//     execution: [
//       'Environment Readiness Agent',
//       'Test Execution and DevOps Agent',
//       'Jenkins Connector Agent'
//     ],
//     report: [
//       'Test Reporting Agent',
//       'Test Summarization Agent'
//     ],
//     maintenance: [
//       'Self Healing Agent',
//       'Test Failure Analysis Agent'
//     ],
//     orchestrator: [
//       'Orchestration Agent'
//     ]
//   };
  
//   export default agentTabMapping;  


  // Canonical tab-wise grouping of agent names
const agentTabMapping = {
    design: [
      'Test Case Generator Agent',
      'Jira Management Agent',
      'Test Data Agent',
      'Test Script Generator Agent'
    ],
    execution: [
      'Environment Readiness Agent',
      'Test Execution and DevOps Agent',
      'Jenkins Connector Agent' // Assuming Jenkins agent will be added later
    ],
    report: [
      'Test Reporting Agent',
      'Test Summarization Agent' // Assuming summarizer is future agent
    ],
    maintenance: [
      'Self Healing Agent',
      'Test Failure Analysis Agent'
    ],
    orchestrator: [
      'Orchestration Agent'
    ]
  };
  
  export default agentTabMapping;  