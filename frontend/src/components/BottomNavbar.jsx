import { NavLink } from 'react-router-dom';
import { FaHome, FaTrophy, FaVideo, FaFileAlt } from 'react-icons/fa';

export default function BottomNavbar() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center text-xs transition-all duration-300 ease-out relative group ${
      isActive 
        ? 'text-violet-200 font-semibold scale-105' 
        : 'text-violet-300/70 hover:text-violet-200 hover:scale-105'
    } p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm`;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Glassmorphism container with premium violet theme */}
      <div className="relative mx-3 mb-4 rounded-2xl overflow-hidden">
        {/* Glass background with violet gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 via-purple-800/30 to-violet-900/40 backdrop-blur-xl"></div>
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl border border-violet-400/20 shadow-lg shadow-violet-900/20"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/5 to-transparent animate-pulse"></div>
        
        {/* Content container */}
        <div className="relative flex justify-around items-center py-3 px-2">
          <NavLink to="/" className={linkClass}>
            <div className="relative">
              <FaHome size={22} className="mb-1 drop-shadow-sm" />
              <span className="text-[10px] font-medium tracking-wide">Home</span>
              {/* Active indicator */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </NavLink>
          
          <NavLink to="/contests" className={linkClass}>
            <div className="relative">
              <FaTrophy size={22} className="mb-1 drop-shadow-sm" />
              <span className="text-[10px] font-medium tracking-wide">Contests</span>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </NavLink>
          
          <NavLink to="/registration" className={linkClass}>
            <div className="relative">
              <FaVideo size={22} className="mb-1 drop-shadow-sm" />
              <span className="text-[10px] font-medium tracking-wide">Registration</span>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </NavLink>
          
          <NavLink to="/reviews" className={linkClass}>
            <div className="relative">
              <FaFileAlt size={22} className="mb-1 drop-shadow-sm" />
              <span className="text-[10px] font-medium tracking-wide">Reviews</span>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </NavLink>
        </div>
        
        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"></div>
      </div>
    </div>
  );
}