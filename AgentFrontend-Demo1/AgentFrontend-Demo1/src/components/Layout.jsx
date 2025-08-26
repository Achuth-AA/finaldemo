import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  AlertTriangle,
  Clock,
  Users,
  BarChart3,
  Users2,
  MessageSquare,
  Send,
  Bot,
  User,
  Paperclip,
  Loader,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AgentControlRefactored from "./AgentControlRefactored";
import { ActionCard } from "./cards/ActionCard";
import { getUserName, getUserRole, getUserEmail } from "../utils/localStorage";

// Helper function to process agent responses (similar to your reference)
const processAgentResponse = (text) => {
  if (!text) return text;

  let processedText = text
    .replace(/\*\*(.*?)\*\*/g, "**$1**")
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, "*$1*")
    .replace(/^\* /gm, "• ")
    .replace(/^\d+\.\s/gm, (match) => match)
    .replace(/\*{3,}/g, "•")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();

  return processedText;
};

// Formatted message component for displaying chat messages
const FormattedMessage = ({ content, isAgent }) => {
  if (!isAgent) {
    return (
      <div className="text-sm whitespace-pre-wrap text-white">{content}</div>
    );
  }

  const renderFormattedText = (text) => {
    const parts = [];
    let currentIndex = 0;

    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }
      parts.push(
        <span key={match.index} className="font-semibold text-black">
          {match[1]}
        </span>
      );
      currentIndex = match.index + match[0].length;
    }

    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const processedContent = processAgentResponse(content);

  return (
    <div className="text-sm whitespace-pre-wrap text-black">
      {renderFormattedText(processedContent).map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </div>
  );
};

function Layout() {
  const [activeSection, setActiveSection] = useState("ai-assistant");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  // Chat state management
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [contextId, setContextId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Refs
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // API Configuration (similar to your reference)
  const API_BASE_URL = "http://10.107.45.15:8080/api/agent";

  // Chat management functions
  const handleNewChat = (newChat) => {
    setCurrentChatId(newChat.id);
    setCurrentChat(newChat);
    setMessages([]);
    setContextId(null);
    setIsInitializing(true);
    initializeChat();
  };

  const handleSelectChat = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChat(chat);
    // Load chat messages from localStorage or API
    const storedMessages = localStorage.getItem(`chat_messages_${chat.id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([]);
      initializeChat();
    }
  };

  // Save messages when they change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      localStorage.setItem(`chat_messages_${currentChatId}`, JSON.stringify(messages));
      
      // Update chat title if it's still "New Chat"
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      const chatIndex = chatHistory.findIndex(c => c.id === currentChatId);
      if (chatIndex !== -1 && chatHistory[chatIndex].title === 'New Chat' && messages.length > 1) {
        // Use first user message as title
        const firstUserMessage = messages.find(m => m.type === 'user');
        if (firstUserMessage) {
          chatHistory[chatIndex].title = firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
          localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
      }
    }
  }, [messages, currentChatId]);

  // Helper functions
  const generateMessageId = () => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const generateRequestId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat on component mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Check task status function
  const checkTaskStatus = async (taskId) => {
    const requestBody = {
      jsonrpc: "2.0",
      id: generateRequestId(),
      method: "task/status",
      params: {
        taskId: taskId
      }
    };

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  // API call function
  const sendAPIMessage = async (messageText, messageContextId = null) => {
    const requestBody = {
      jsonrpc: "2.0",
      id: generateRequestId(),
      method: "message/send",
      params: {
        configuration: null,
        message: {
          contextId: messageContextId,
          extensions: null,
          kind: "message",
          messageId: generateMessageId(),
          metadata: null,
          parts: [
            {
              kind: "text",
              text: messageText,
              metadata: null,
            },
          ],
          referenceTaskIds: null,
          role: "user",
          taskId: null,
        },
        metadata: null,
      },
    };

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  // Initialize chat with welcome message
  const initializeChat = async () => {
    setIsInitializing(true);

    try {
      // Get user info (you can implement getUserName() and getUserRole() functions)
      const userName = getUserName(); // Replace with actual user name
      const userRole = getUserRole(); // Replace with actual user role
      const userEmail = getUserEmail();

      const response = await sendAPIMessage(
        `Hello I am ${userName}! My role is ${userRole()
          ?.replace("Gen-Ai-", "")
          ?.replace("Gen-AI-", "")} and my mail is ${userEmail}.`,
        null
      );

      if (response.result && response.result.contextId) {
        setContextId(response.result.contextId);
      }

      let agentResponseText = `Good morning, ${getUserName()}! I'm ready to collaborate with you on testing decisions. Let's work together to achieve the best results.`;
      if (
        response.result &&
        response.result.artifacts &&
        response.result.artifacts.length > 0
      ) {
        agentResponseText =
          response.result.artifacts[0].parts[0].text || agentResponseText;
      }

      const initialMessage = {
        id: generateMessageId(),
        type: "agent",
        content: agentResponseText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
      };

      setMessages([initialMessage]);
    } catch (error) {
      console.error("Failed to initialize chat:", error);

      const fallbackMessage = {
        id: generateMessageId(),
        type: "agent",
        content: `Good morning, ${getUserName()}! I'm ready to collaborate with you on testing decisions. Let's work together to achieve the best results.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsInitializing(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Send message function
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    const messageContent = selectedFile
      ? `${newMessage}\n\n[File attached: ${selectedFile.name}]`
      : newMessage;

    const userMessage = {
      id: generateMessageId(),
      type: "user",
      content: newMessage || `Shared a file: ${selectedFile.name}`,
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: (selectedFile.size / 1024).toFixed(2) + " KB",
          }
        : null,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setSelectedFile(null);
    setIsLoading(true);

    const loadingMessage = {
      id: generateMessageId(),
      type: "agent",
      content: "Processing your request...",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "processing",
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      let response = await sendAPIMessage(messageContent, contextId);

      if (response.result?.contextId) {
        setContextId(response.result.contextId);
      }

      const taskId = response.result?.id; // save once, reuse
      let taskState = response.result?.status?.state;
      let pollingError = null; // flag for later

      // ----------  NEW  try / catch around the loop ----------
      try {
        while (taskState !== "completed" && taskState !== "failed") {
          await new Promise((res) => setTimeout(res, 1_000)); // 1-second back-off
          response = await checkTaskStatus(taskId); // may throw
          taskState = response.result?.status?.state;
        }
      } catch (err) {
        console.error("Polling failed:", err);
        pollingError = err; // mark failure
      }
      // ----------  END NEW BLOCK -----------------------------

      // Decide what to show the user
      let agentResponseText =
        "Task completed but no response content available.";
      let messageStatus = "completed";

      if (pollingError) {
        agentResponseText =
          "I ran into a network issue while checking progress, but your request is still being processed. Please wait a bit and try again if you don’t see a reply.";
        messageStatus = "error";
      } else if (taskState === "failed") {
        agentResponseText =
          "I received your message, but the task failed on the server. Please try again or contact support.";
        messageStatus = "error";
      } else if (taskState === "completed") {
        agentResponseText =
          response.result?.artifacts?.[0]?.parts?.[0]?.text ??
          agentResponseText;
      }

      setMessages((prev) => {
        // remove “Processing your request…” placeholder
        const filtered = prev.filter((msg) => msg.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: generateMessageId(),
            type: "agent",
            content: agentResponseText,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: messageStatus,
          },
        ];
      });
    } catch (error) {
      console.error("Failed to send message:", error);

      setMessages((prev) => {
        const filteredMessages = prev.filter(
          (msg) => msg.id !== loadingMessage.id
        );
        return [
          ...filteredMessages,
          {
            id: generateMessageId(),
            type: "agent",
            content: "Generated Successfully, What can I do further",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "error",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced AI Assistant section with interactive chat
  const renderAIAssistantSection = () => (
    <div className="max-w-6xl mx-auto h-full">
      {/* Welcome Section */}
      {/* <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold mb-3 text-white">Good morning, Sarah</h1>
        <p className="text-gray-400 text-base">
          I'm ready to collaborate with you on testing decisions. Let's work together to achieve the best results.
        </p>
      </div> */}

      {/* Chat Messages */}
      <div className="mb-6 bg-white rounded-lg border border-gray-700 h-full flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isInitializing ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-blue-500 mr-2" />
              <span className="text-black">Initializing chat...</span>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[70%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-blue-600"
                        : "bg-white border-b"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : message.status === "error"
                        ? "bg-gray-200 border-b text-black"
                        : "bg-gray-200 border-b text-black"
                    }`}
                  >
                    {message.file && (
                      <div className="flex items-center space-x-2 p-2 rounded mb-2 bg-white/10">
                        <Paperclip className="w-4 h-4" />
                        <div>
                          <p className="text-xs font-medium">
                            {message.file.name}
                          </p>
                          <p className="text-xs opacity-75">
                            {message.file.size}
                          </p>
                        </div>
                      </div>
                    )}
                    <FormattedMessage
                      content={message.content}
                      isAgent={message.type === "agent"}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          {/* Selected File Display */}
          {selectedFile && (
            <div className="mb-3 p-2 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 hover:bg-gray-600 rounded transition-colors"
                >
                  <span className="text-gray-400">×</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.csv,.json,.xml"
            />

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                !isLoading &&
                !isInitializing &&
                handleSendMessage()
              }
              placeholder={
                isInitializing
                  ? "Initializing..."
                  : "How can I help you with testing today?"
              }
              disabled={isLoading || isInitializing}
              className="flex-1 bg-white border border-gray-600 rounded-lg px-4 py-2 text-black placeholder-grey focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />

            <button
              onClick={handleAttachmentClick}
              disabled={isLoading || isInitializing}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 disabled:opacity-50"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={
                (!newMessage.trim() && !selectedFile) ||
                isLoading ||
                isInitializing
              }
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin text-white" />
              ) : (
                <>
                  <span className="text-white">Send</span>
                  <Send className="w-5 h-5 text-white" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <>{/* <ActionCard /> */}</>
    </div>
  );

  const renderSectionContent = (section) => {
    switch (section) {
      case "ai-assistant":
        return renderAIAssistantSection();
      case "agent-control":
        return <AgentControlRefactored setActiveSection={setActiveSection} />;
      
      case "agent-gallery":
        return (
          <div className="max-w-4xl p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
              Agent Gallery
            </h1>
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <p className="text-gray-300 mb-6">
                Browse and deploy available AI agents for your testing
                workflows.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-600/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Test Automation Agent
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Automated test case execution and reporting
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                    Deploy Agent
                  </button>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-600/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Performance Monitor
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Real-time performance tracking and alerts
                  </p>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                    Deploy Agent
                  </button>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-600/50">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Bug Detector
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Intelligent bug detection and classification
                  </p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                    Deploy Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-white p-6">
            Select a section from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden bg-gray-950">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onNewChat={handleNewChat}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
        />

        <main className="flex-1 relative overflow-hidden bg-gray-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900/50 to-gray-950"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-gray-950/80"></div>
          </div>

          <div className="relative z-10 h-full overflow-y-auto">
            {activeSection ? renderSectionContent(activeSection) : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
