import { Bell, MessageSquare, Settings, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VirtuaLogo from "../assets/image001.png";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("userName");
    navigate("/");
  };
  return (
    <header className="relative bg-custom-gradient backdrop-blur-md  px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Platform Name */}
        <div className="flex items-center gap-4">
          <h2 className="text-white"><strong>Helio Assure</strong></h2>
          <span className="bg-gray-600/40 backdrop-blur-sm text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-500/30">
            AI-First Testing Platform
          </span>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-all hover:backdrop-blur-sm">
            <Bell className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Messages */}
          <button className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-all hover:backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-all hover:backdrop-blur-sm">
            <Settings className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          </button>

          {/* Dark Mode Toggle */}
          <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-all hover:backdrop-blur-sm">
            <Moon className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          </button>

          <button
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-all hover:backdrop-blur-sm"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
