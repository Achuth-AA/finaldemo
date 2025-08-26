/**
 * Sidebar Navigation Component
 *
 * Provides the main navigation interface for the application.
 * Contains user profile, project status, navigation items, and system status.
 *
 * Features:
 * - User profile with team member dropdown
 * - Current project status and progress
 * - Navigation buttons for different sections
 * - AI briefing with system status and real-time token consumption
 * - Real-time status indicators
 * - Chat history with search functionality
 * - New chat creation
 *
 * @param {Object} props - Component properties
 * @param {string} props.activeSection - Currently active section ID
 * @param {function} props.setActiveSection - Function to change active section
 * @param {function} props.onNewChat - Function to create new chat
 * @param {string} props.currentChatId - Currently active chat ID
 * @param {function} props.onSelectChat - Function to select a chat
 */

import { useState, useEffect } from "react";
import {
  FolderOpen,
  Settings,
  MessageSquare,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";
import { getUserName, getUserRole } from "../utils/localStorage";

function Sidebar({ activeSection, setActiveSection, onNewChat, currentChatId, onSelectChat }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Sample chat history data - in production, this would come from API or localStorage
  useEffect(() => {
    const storedChats = localStorage.getItem('chatHistory');
    if (storedChats) {
      setChatHistory(JSON.parse(storedChats));
    } else {
      // Initialize with sample data
      const initialChats = [
        { id: '1', title: 'API rate limit testing scenarios', timestamp: new Date().toISOString() },
        { id: '2', title: 'Multi-agent coordination debugging', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', title: 'SQL injection prevention validation', timestamp: new Date(Date.now() - 172800000).toISOString() },
        { id: '4', title: 'E2E workflow automation review', timestamp: new Date(Date.now() - 259200000).toISOString() },
        { id: '5', title: 'Performance benchmarking setup', timestamp: new Date(Date.now() - 345600000).toISOString() },
      ];
      setChatHistory(initialChats);
      localStorage.setItem('chatHistory', JSON.stringify(initialChats));
    }
  }, []);

  // Filter chats based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chatHistory);
    } else {
      const filtered = chatHistory.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chatHistory]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: new Date().toISOString()
    };
    const updatedChats = [newChat, ...chatHistory];
    setChatHistory(updatedChats);
    localStorage.setItem('chatHistory', JSON.stringify(updatedChats));
    if (onNewChat) onNewChat(newChat);
    setActiveSection("ai-assistant");
  };

  const handleSelectChat = (chat) => {
    if (onSelectChat) onSelectChat(chat);
    setActiveSection("ai-assistant");
  };

  return (
    // Main sidebar container with backdrop blur and proper scrolling
    <div className="w-72 bg-[#1e40af] flex flex-col h-full overflow-hidden">
      <div className="p-3 space-y-3 flex-shrink-0">
        {/* User Profile Section with dropdown */}
        <div className="bg-[#2563eb] rounded-xl p-2.5">
          <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-full flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#FFFFFF1A] rounded-full flex items-center justify-center text-xs font-medium text-white">
              {getUserName()
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-white text-sm">{getUserName()}</h3>
              <p className="text-xs text-blue-100">
                {getUserRole()?.replace("Gen-Ai-", "")?.replace("Gen-AI-", "")}
              </p>
            </div>
            <ChevronDown className={`w-3 h-3 text-white transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Current Project Card */}
        <div className="bg-[#2563eb] rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium text-blue-100 uppercase tracking-wider">
              CURRENT PROJECT
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[10px] text-white">Active</span>
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#FFFFFF1A] rounded-lg flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-white font-medium block text-sm">X-Bank Trade finance</span>
              <span className="text-[10px] text-blue-100">BAN</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-blue-100">Test Progress: 20%</span>
              <span className="text-[10px] text-white">12/45 Complete</span>
            </div>
            <div className="w-full bg-[#1e40af] rounded-full h-1.5">
              <div
                className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: "20%" }}
              ></div>
            </div>
          </div>

          {/* Project Stats */}
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between items-center">
              <span className="text-blue-100">Environment:</span>
              <span className="text-white">Staging</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100">Sprint End:</span>
              <span className="text-white">9 days left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100">Sprint Id:</span>
              <span className="text-white">Q3-S1</span>
            </div>
          </div>
        </div>

        {/* AI Assistant Button */}
        <button
          onClick={() => setActiveSection("ai-assistant")}
          className={`w-full text-left transition-all duration-200 rounded-xl p-2.5 ${
            activeSection === "ai-assistant"
              ? "bg-white text-blue-600 shadow-lg"
              : "bg-[#2563eb] text-white hover:bg-[#3b82f6]"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <div>
              <p className="font-medium text-sm">AI Assistant</p>
              <p className={`text-[10px] ${
                activeSection === "ai-assistant"
                  ? "text-blue-500"
                  : "text-blue-100"
              }`}>
                Chat with your AI testing Assistant
              </p>
            </div>
          </div>
        </button>

        {/* Agent Control Button */}
        <button
          onClick={() => setActiveSection("agent-control")}
          className={`w-full text-left transition-all duration-200 rounded-xl p-2.5 ${
            activeSection === "agent-control"
              ? "bg-white text-blue-600 shadow-lg"
              : "bg-[#2563eb] text-white hover:bg-[#3b82f6]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <div>
              <p className="font-medium text-sm">Agent Control</p>
              <p className={`text-[10px] ${
                activeSection === "agent-control"
                  ? "text-blue-500"
                  : "text-blue-100"
              }`}>
                Monitor your assigned agents
              </p>
            </div>
          </div>
        </button>

        {/* New Chat Button
        <button
          onClick={handleNewChat}
          className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-xl p-2.5 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium text-sm">New Chat</span>
        </button> */}
      </div>

      {/* Chat History Section */}
      {/* <div className="flex-1 overflow-hidden flex flex-col px-3 pb-3">
        <div className="mb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-200" />
            <input
              type="text"
              placeholder="Recent Chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a2354] text-white placeholder-blue-200 rounded-lg py-2 pl-8 pr-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-[#0d2961]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 ${
                  currentChatId === chat.id
                    ? "bg-[#2563eb] text-white"
                    : "text-blue-100 hover:bg-[#1e40af]/50 hover:text-white"
                }`}
              >
                <p className="text-xs font-medium truncate">{chat.title}</p>
                <p className="text-[10px] opacity-70 mt-0.5">
                  {new Date(chat.timestamp).toLocaleDateString()}
                </p>
              </button>
            ))
          ) : (
            <div className="text-center text-blue-200 text-xs py-3">
              No chats found
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
