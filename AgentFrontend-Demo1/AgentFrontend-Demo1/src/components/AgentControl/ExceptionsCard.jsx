import { useState } from "react";
import {
  ArrowLeft,
  CheckSquare,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import { ExceptionType, Severity, Status } from "../../utils/exceptionData";

function ExceptionsCard() {
  const [activeFilter, setActiveFilter] = useState("all");

  const tabs = [
    { label: "All", value: "all" },
    { label: "Agent Issues", value: ExceptionType.AGENT_ISSUE },
    { label: "Test Failures", value: ExceptionType.TEST_FAILURE },
  ];

  const data = [
    {
      title: "Critical Test Failure",
      description:
        "Payment gateway integration tests are failing with 80% failure rate in production-like environment",
      dateTime: "8/2/2025, 9:23:18 AM",
      agent: "Test Execution Agent",
      exceptionType: ExceptionType.TEST_FAILURE,
      severity: Severity.CRITICAL,
      status: Status.UNACKNOWLEDGED,
      task: "task-001",
      assignedTo: "Karthik",
    },
    {
      title: "Agent Connectivity Issue",
      description:
        "Agent test-agent-04 failed to respond during scheduled heartbeat check. Potential network latency or crash.",
      dateTime: "8/2/2025, 9:12:44 AM",
      agent: "test-agent-04",
      exceptionType: ExceptionType.AGENT_ISSUE,
      severity: Severity.WARNING,
      status: Status.ACKNOWLEDGED,
      task: "heartbeat-monitor",
      assignedTo: "Karthik",
    },
  ];

  // Dynamically filter data
  const filteredData =
    activeFilter === "all"
      ? data
      : data.filter((item) => item.exceptionType === activeFilter);

  const getSeverityBadgeClass = (status) => {
    switch (status) {
      case Severity.CRITICAL:
        return "bg-red-500 text-white";
      case Severity.WARNING:
        return "bg-orange-300 text-white";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case Status.ACKNOWLEDGED:
        return "bg-orange-100 text-green-700";
      case Status.UNACKNOWLEDGED:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityTextBadgeClass = (status) => {
    switch (status) {
      case Severity.CRITICAL:
        return "text-red-700";
      case Severity.WARNING:
        return "text-yellow-800";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[1.05rem] font-medium">Exception Notifications</h3>
        <div className="flex gap-3">
          {tabs.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`px-2 py-1 border rounded-lg text-sm transition-colors
              ${
                activeFilter === btn.value
                  ? "bg-custom-gradient text-white border-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {btn.label} (
              {btn.value === "all"
                ? data.length
                : data.filter((item) => item.exceptionType === btn.value)
                    .length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filteredData.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-6 mb-6 border ${
            item.severity === Severity.CRITICAL
              ? "bg-red-50 border-red-200"
              : "bg-pink-50 border-yellow-200"
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`p-1 mt-2 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-50`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col items-center">
                  <h4 className="text-lg font-medium text-black">
                    {item.title}
                  </h4>
                  <div className="flex items-start gap-4 w-full">
                    <p className="px-2 py-1 border border-gray-500 text-black text-xs rounded-lg capitalize">
                      {item.exceptionType
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}
                    </p>
                    <p
                      className={`px-2 py-1 text-xs rounded-lg capitalize ${getSeverityBadgeClass(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-sm">
                  <span className="text-gray-500 pb-1">{item.dateTime}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded capitalize ${getStatusBadgeClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <p className={`mb-4 ${getSeverityTextBadgeClass(item.severity)}`}>
                {item.description}
              </p>

              <div className="grid grid-cols-3 gap-6 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Agent:</span>
                  <p
                    className={`font-medium ${getSeverityTextBadgeClass(
                      item.severity
                    )}`}
                  >
                    {item.agent}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Task:</span>
                  <p
                    className={`font-medium ${getSeverityTextBadgeClass(
                      item.severity
                    )}`}
                  >
                    {item.task}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Assigned To:</span>
                  <p className="text-orange-600 font-medium">
                    {item.assignedTo}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="px-2 py-1 bg-custom-gradient font-medium text-white rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                >
                  <CheckSquare className="w-4 h-4" />
                  Acknowledge
                </button>
                <button
                  className="px-2 py-1 bg-slate-50 font-medium hover:bg-white text-black rounded-lg text-sm 
                flex items-center gap-2 hover-popout"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  {item.exceptionType === ExceptionType.AGENT_ISSUE
                    ? "Investigate"
                    : "Take Action"}
                </button>
                <button
                  className={`px-2 py-1 bg-slate-50 font-medium hover:bg-white text-black rounded-lg text-sm 
                flex items-center gap-2 hover-popout`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {item.exceptionType === ExceptionType.AGENT_ISSUE
                    ? "Contact Agent"
                    : "Chat with Agent"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExceptionsCard;
