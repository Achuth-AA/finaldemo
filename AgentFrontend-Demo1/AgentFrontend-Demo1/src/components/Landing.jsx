import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Clock,
  TriangleAlert,
} from "lucide-react";
import { getUserName } from "../utils/localStorage";

import Sidebar from "./Sidebar";
import Header from "./Header";
import AgentControlRefactored from "./AgentControlRefactored";
import { SECTION_METADATA } from "../utils/data";

/* ──────────────────────────────────── */
function Landing() {
  const [activeSection, setActiveSection] = useState("ai-assistant");
  const [agentTitle, setAgentTitle] = useState("AI Agents");
  const [agentDescription, setAgentDescription] = useState(
    "Work with your assigned AI testing agents and view outputs tasks"
  );
  const [chatText, setChatText] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();

  /* common redirect helper */
  const goToChat = (initialMsg = "") =>
    navigate(
      "/chat",
      initialMsg ? { state: { initialMessage: initialMsg } } : undefined
    );

  /* handle Send button or Enter key */
  const handleSend = () => {
    goToChat(chatText.trim());
    setChatText(""); // clear the field
  };

  const handleSectionChange = (section) => {
    const meta = SECTION_METADATA[section];
    if (meta) {
      setAgentTitle(meta.title);
      setAgentDescription(meta.description);
    }
    setActiveSection(section);
  };

  // Chat management functions
  const handleNewChat = (newChat) => {
    setCurrentChatId(newChat.id);
    setCurrentChat(newChat);
    // Navigate to chat page with new chat
    navigate("/chat", { state: { newChat } });
  };

  const handleSelectChat = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChat(chat);
    // Navigate to chat page with selected chat
    navigate("/chat", { state: { selectedChat: chat } });
  };

  const navigateToMonitorCenter = (title) => {
    switch (title) {
      case "15 User Stories":
        handleSectionChange("agent-exception");
        break;
      case "5 Pending Tasks":
        handleSectionChange("agent-tasks");
        break;
      case "11 Active Agents":
        handleSectionChange("agent-control");
        break;
      default:
        handleSectionChange("agent-control");
        break;
    }
  };

  /* ---------- Section Renderer ---------- */
  const renderSectionContent = (section) => {
    switch (section) {
      case "ai-assistant":
        return (
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-8 pt-20">
            <div className="max-w-4xl mx-auto w-full">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Good morning, {getUserName()}
                  </h1>
                </div>
                <p className="text-black">
                  I'm ready to collaborate with you on testing decisions.<br/>
                  Let's work together to achieve the best results.
                </p>
              </div>

              {/* Search/Chat Input */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="How can I help you with testing today?"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault(), handleSend();
                    }}
                    className="w-full bg-white text-gray-900 border border-gray-200 rounded-full py-3 px-5 pr-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                  <button
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-custom-gradient hover:bg-reverse-gradient text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Alert Notifications */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                <div className="bg-white border border-gray-200 rounded-full py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                  {/* Red half circle on the left with gap */}
                  <div className="absolute left-1 top-1 bottom-1 w-10 bg-red-500 rounded-l-full"></div>
                  <div className="flex items-center justify-between px-6 relative z-10">
                    <div className="flex items-center gap-4 ml-8">
                      <div>
                        <span className="text-sm text-red-700 font-semibold">Critical issue</span>
                        <div className="text-xs text-gray-800">Immediate attention required</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-red-500">1</span>
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-full py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                  {/* Orange half circle on the left with gap */}
                  <div className="absolute left-1 top-1 bottom-1 right-1 w-10 bg-orange-500 rounded-l-full"></div>
                  <div className="flex items-center justify-between px-6 relative z-10">
                    <div className="flex items-center gap-4 ml-8">
                      <div>
                        <span className="text-sm text-orange-700 font-semibold">Pending tasks</span>
                        <div className="text-xs text-gray-800">Immediate attention required</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-orange-500">2</span>
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => navigateToMonitorCenter("11 Active Agents")}
                  className="bg-custom-gradient hover:bg-reverse-gradient text-white py-3 px-4 rounded-3xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  View 11 Active Agents
                </button>
                
                <button
                  onClick={() => goToChat()}
                  className="bg-custom-gradient hover:bg-reverse-gradient text-white py-3 px-4 rounded-3xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  View Performance Metrics
                </button>
                
                <button
                  onClick={() => goToChat()}
                  className="bg-custom-gradient hover:bg-reverse-gradient text-white py-3 px-4 rounded-3xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Collaboration Hub
                </button>
                
                <button
                  onClick={() => goToChat()}
                  className="bg-custom-gradient hover:bg-reverse-gradient text-white py-3 px-4 rounded-3xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Chat with Orchestrator
                </button>
              </div>
            </div>
          </div>
        );

      case "agent-control":
      case "agent-exception":
      case "agent-tasks":
        return (
          <AgentControlRefactored
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
            agentTitle={agentTitle}
            agentDescription={agentDescription}
          />
        );

      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  /* ---------- Layout ---------- */
  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onNewChat={handleNewChat}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
        />

        <main className="flex-1 relative overflow-hidden">
          {/* section content */}
          <div className="h-full overflow-y-auto">
            {activeSection ? renderSectionContent(activeSection) : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;
