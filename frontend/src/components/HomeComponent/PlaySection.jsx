import React from 'react'
import { FaUserPlus, FaGamepad, FaTrophy, FaArrowRight } from 'react-icons/fa'

function PlaySection() {
  return (
    <div className="pb-20 pt-5 relative bg-black/50 rounded-2xl ">
      {/* Dark background overlay */}
      {/* <div className="absolute inset-0 bg-black/50"></div> */}
      
      {/* Subtle violet glow elements */}
      <div className="absolute top-10 left-20 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-600/8 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 ">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        
        {/* Horizontal Steps Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-6">
          
          {/* Step 1: Register */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start group lg:flex-1">
            {/* Circle with dark glassmorphism */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-black/40 to-purple-500/15 backdrop-blur-xl rounded-full border border-violet-400/30 shadow-2xl shadow-violet-900/50 group-hover:shadow-violet-700/60 transition-all duration-500"></div>
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full">
                <FaUserPlus className="text-3xl text-violet-300 group-hover:text-violet-200 transition-colors duration-300" />
              </div>
              {/* Step number - dark theme */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border border-violet-400/50">
                1
              </div>
            </div>
            
            {/* Content Card - to the right */}
            <div className="mt-6 lg:mt-0 lg:ml-6 relative group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-violet-900/20 to-black/40 backdrop-blur-lg rounded-xl border border-violet-500/20 shadow-xl shadow-black/50"></div>
              <div className="relative p-5 text-center lg:text-left max-w-xs">
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                  Register
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sign up and choose a contest to join. Fill in your game ID and other details.
                </p>
              </div>
            </div>
          </div>

          {/* Connecting Arrow */}
          <div className="hidden lg:flex items-center justify-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-violet-500/60 to-purple-500/60"></div>
              <FaArrowRight className="text-violet-400/80 text-lg animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-r from-purple-500/60 to-violet-500/60"></div>
            </div>
          </div>

          {/* Step 2: Play & Win */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start group lg:flex-1">
            {/* Circle with dark glassmorphism */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-black/40 to-indigo-500/15 backdrop-blur-xl rounded-full border border-purple-400/30 shadow-2xl shadow-purple-900/50 group-hover:shadow-purple-700/60 transition-all duration-500"></div>
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full">
                <FaGamepad className="text-3xl text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </div>
              {/* Step number */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border border-purple-400/50">
                2
              </div>
            </div>
            
            {/* Content Card - to the right */}
            <div className="mt-6 lg:mt-0 lg:ml-6 relative group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 shadow-xl shadow-black/50"></div>
              <div className="relative p-5 text-center lg:text-left max-w-xs">
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  Play & Win
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Join the match, compete with others, and aim for the top spot.
                </p>
              </div>
            </div>
          </div>

          {/* Connecting Arrow */}
          <div className="hidden lg:flex items-center justify-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-purple-500/60 to-indigo-500/60"></div>
              <FaArrowRight className="text-purple-400/80 text-lg animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-r from-indigo-500/60 to-violet-500/60"></div>
            </div>
          </div>

          {/* Step 3: Get Prizes */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start group lg:flex-1">
            {/* Circle with dark glassmorphism */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-black/40 to-violet-500/15 backdrop-blur-xl rounded-full border border-indigo-400/30 shadow-2xl shadow-indigo-900/50 group-hover:shadow-indigo-700/60 transition-all duration-500"></div>
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full">
                <FaTrophy className="text-3xl text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300" />
              </div>
              {/* Step number */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border border-indigo-400/50">
                3
              </div>
            </div>
            
            {/* Content Card - to the right */}
            <div className="mt-6 lg:mt-0 lg:ml-6 relative group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-indigo-900/20 to-black/40 backdrop-blur-lg rounded-xl border border-indigo-500/20 shadow-xl shadow-black/50"></div>
              <div className="relative p-5 text-center lg:text-left max-w-xs">
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  Get Prizes
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Winners receive instant rewards via UPI, Paytm, or in-game currency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call-to-Action */}
        <div className="mt-16 flex justify-center">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-violet-900/30 to-black/80 backdrop-blur-xl rounded-full border border-violet-400/40 shadow-2xl shadow-violet-900/60 group-hover:shadow-violet-700/80 transition-all duration-500"></div>
            <div className="relative px-8 py-4 rounded-full flex items-center space-x-3">
              <span className="text-xl">🚀</span>
              <span className="text-violet-300 font-semibold group-hover:text-violet-200 transition-colors">Start Your Gaming Journey</span>
              <span className="text-xl">🎮</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaySection;