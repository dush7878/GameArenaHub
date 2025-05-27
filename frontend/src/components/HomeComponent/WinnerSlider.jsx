import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrophy, FaCrown, FaMedal, FaGamepad } from 'react-icons/fa';

const WinnerSlider = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get('https://gamearenahub.onrender.com/api/winner/active');
        setWinners(res.data);
      } catch (err) {
        console.error('Failed to fetch winners:', err);
        // Fallback demo data for development
        setWinners([
          { name: 'Alex Chen', gameName: 'PUBG Mobile', prize: '₹5000', profile: 'https://via.placeholder.com/100' },
          { name: 'Sarah Kim', gameName: 'Free Fire', prize: '₹3000', profile: 'https://via.placeholder.com/100' },
          { name: 'Mike Johnson', gameName: 'Call of Duty', prize: '₹2500', profile: 'https://via.placeholder.com/100' },
          { name: 'Priya Sharma', gameName: 'BGMI', prize: '₹4000', profile: 'https://via.placeholder.com/100' },
          { name: 'David Lee', gameName: 'Fortnite', prize: '₹3500', profile: 'https://via.placeholder.com/100' },
        ]);
      }
    };
    fetchWinners();
  }, []);

  // Get appropriate icon based on prize amount or position
  const getWinnerIcon = (index) => {
    if (index === 0) return <FaCrown className="text-yellow-400 text-lg" />;
    if (index === 1) return <FaTrophy className="text-yellow-500 text-lg" />;
    if (index === 2) return <FaMedal className="text-orange-400 text-lg" />;
    return <FaGamepad className="text-violet-400 text-lg" />;
  };

  return (
    <div className="relative py-10 overflow-hidden">
      {/* Transparent background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
      
      {/* Scrolling container */}
      <div className="relative">
        <div className="flex animate-scroll-right space-x-6">
          {/* Duplicate winners for seamless loop */}
          {[...winners, ...winners].map((winner, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 group"
            >
              {/* Winner Card with glassmorphism */}
              <div className="relative">
                {/* Card shadow */}
                <div className="absolute inset-0 bg-black/20 blur-xl rounded-2xl transform translate-y-2"></div>
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-white/10 via-violet-500/15 to-purple-500/10 backdrop-blur-lg rounded-2xl border border-violet-300/30 shadow-2xl shadow-violet-900/30 group-hover:shadow-violet-800/40 transition-all duration-500 p-6 min-w-[200px]">
                  
                  {/* Winner icon positioned at top right */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-violet-600/80 to-purple-600/80 backdrop-blur-lg rounded-full p-2 border border-violet-400/40 shadow-lg">
                    {getWinnerIcon(idx % winners.length)}
                  </div>
                  
                  {/* Profile section */}
                  <div className="flex flex-col items-center text-center">
                    {/* Profile image with premium styling */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-purple-500/30 rounded-full blur-sm"></div>
                      <img
                        src={winner.profile}
                        alt={winner.name}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-violet-400 to-purple-400 shadow-lg"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&background=8b5cf6&color=ffffff&size=100`;
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Winner details */}
                    <h3 className="text-lg font-bold bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent mb-1">
                      {winner.name}
                    </h3>
                    
                    <p className="text-xs text-violet-300/80 mb-2 flex items-center">
                      <FaGamepad className="mr-1 text-violet-400" />
                      {winner.gameName}
                    </p>
                    
                    {/* Prize amount with special styling */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg blur-sm"></div>
                      <div className="relative bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-yellow-400/30">
                        <p className="text-sm font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent flex items-center">
                          <FaTrophy className="mr-1 text-yellow-400" />
                          {winner.prize}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom glow effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fade effects on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

// Add this CSS to your global styles or component
const styles = `
@keyframes scroll-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-right {
  animation: scroll-right 30s linear infinite;
}

.animate-scroll-right:hover {
  animation-play-state: paused;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default WinnerSlider;