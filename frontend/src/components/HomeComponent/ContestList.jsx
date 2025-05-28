import React, { useEffect, useState } from 'react';
import { Gamepad2, Trophy, Coins, Calendar, Users, Clock, Star, Crown, Sword } from 'lucide-react';

const ContestList = () => {
  const [contests, setContests] = useState([]);

  const fetchContests = async () => {
    try {
      const response = await fetch('https://gamearenahub.onrender.com/api/contests');
      const data = await response.json();
      setContests(data);
    } catch (err) {
      console.error('Error fetching contests:', err);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4  pb-26 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" /> */}
            <Sword className="w-8 h-8  text-yellow-400 animate-pulse" />
            <h2 className="text-3xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Available Contests
            </span>
          </h2>
          </div>
          
          {/* <p className="text-gray-300 text-sm mt-2">Choose your battle and claim victory</p> */}
        </div>

        {contests.length === 0 ? (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Trophy className="w-8 h-8 text-gray-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-600/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-lg font-medium">No Contests Available</p>
                <p className="text-gray-400 text-sm">New battles coming soon</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contests.map((contest, index) => (
              <div
                key={contest._id}
                className="relative backdrop-blur-md bg-white/8 border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/12 hover:shadow-purple-500/25 group"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-blue-400/5 opacity-30"></div>
                
                {/* Contest Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={contest.banner}
                    alt={contest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Premium overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
                    <Calendar className="w-3 h-3" />
                    {contest.status || 'UPCOMING'}
                  </div>
                  
                  {/* Gaming Badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-br from-purple-500/80 to-blue-600/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Premium Rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">Premium</span>
                  </div>
                </div>
                
                {/* Contest Details */}
                <div className="relative p-4 space-y-4">
                  {/* Title with premium styling */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors duration-300 flex items-center justify-between">
                      <span className="truncate pr-2">{contest.title}</span>
                      <Trophy className="w-4 h-4 text-yellow-400 animate-pulse flex-shrink-0" />
                    </h3>
                  </div>
                  
                  {/* Game Info Card */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Gamepad2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-purple-200 text-xs font-medium uppercase tracking-wide">Game</p>
                      <p className="text-white font-bold truncate">{contest.game}</p>
                    </div>
                  </div>
                  
                  {/* Entry Fee Card */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 transition-all duration-300 hover:from-green-500/20 hover:to-emerald-500/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-200 text-xs font-medium uppercase tracking-wide">Entry Fee</p>
                      <p className="text-white font-bold text-lg">₹{contest.entryFees}</p>
                    </div>
                    <div className="text-green-400">
                      <Crown className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Join Contest Button */}
                  {/* <div className="pt-2">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2">
                      <Sword className="w-4 h-4" />
                      Join Battle
                    </button>
                  </div> */}
                </div>
                
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestList;