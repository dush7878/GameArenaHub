import { Headset, Gamepad2, HelpCircle, MessageCircle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const navigate = useNavigate();

  return (
    <>
      {/* Background blur overlay */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900/95 via-blue-900/90 to-transparent backdrop-blur-xl z-40"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Gaming glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-indigo-500/20 blur-xl"></div>
        
        <div className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-5">
            {/* Logo Section */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              {/* Gaming Logo Container */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/games_logo.png" 
                    alt="Logo" 
                    className="h-8 w-8 mb-1 object-contain filter brightness-110" 
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
                </div>
                {/* Gaming accent dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              
              {/* Brand Name */}
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent tracking-wider font-mono">
                  GameArena HUB
                </h1>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>

            {/* Help & Support Section */}
            <div className="flex items-center gap-3">
              {/* Gaming Status Indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-semibold tracking-wide font-mono">ONLINE</span>
              </div>

              {/* Help Button */}
              <button
                className="group relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-xl px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                onClick={() => navigate("/help-support")}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <MessageCircle className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" />
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-sm font-bold text-blue-100 group-hover:text-white transition-colors duration-300 font-mono tracking-wide hidden sm:inline">
                    SUPPORT
                  </span>
                </div>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Gaming accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            </div>
          </div>
          
          {/* Bottom gaming accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        </div>
      </header>
      
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
}