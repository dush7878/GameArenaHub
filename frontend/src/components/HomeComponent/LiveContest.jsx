import React, { useEffect, useState } from 'react';
import { Gamepad2, Trophy, Coins, Zap, Users, Clock, Play, Target, Crown } from 'lucide-react';

const LiveContest = () => {
  const [liveContests, setLiveContests] = useState([]);

  const fetchLiveContests = async () => {
    try {
      const res = await fetch('https://gamearenahub.onrender.com/api/contests');
      const data = await res.json();
      const live = data.filter(contest => contest.status === 'live');
      setLiveContests(live);
    } catch (err) {
      console.error('Failed to fetch live contests');
    }
  };

  useEffect(() => {
    fetchLiveContests();
  }, []);

  return (
    <div className="  p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <Zap className="w-8 h-8 text-orange-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 text-red-500 animate-ping opacity-50">
                <Zap className="w-full h-full" />
              </div>
            </div>
            <span className=" text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Live Contests
            </span>
            {/* <Crown className="w-6 h-6 text-yellow-400 animate-bounce" /> */}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            
          </h2>
          <p className="text-gray-300 text-sm mt-2">Join premium gaming battles now</p>
        </div>

        {liveContests.length === 0 ? (
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Gamepad2 className="w-8 h-8 text-gray-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-600/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-lg font-medium">No Live Contests</p>
                <p className="text-gray-400 text-sm">Check back soon for new battles</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {liveContests.map((contest, index) => (
              <div
                key={contest._id}
                className="relative backdrop-blur-md bg-white/8 border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/12 hover:shadow-blue-500/25 group"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-30"></div>

                {/* Contest Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={contest.banner}
                    alt={contest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Premium overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Live Badge - Premium Style */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
                    <Play className="w-3 h-3 animate-pulse" />
                    LIVE
                  </div>

                  {/* Gaming Badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>

                  {/* Active Players Indicator */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    <Users className="w-3 h-3" />
                    <span className="font-medium">Live</span>
                  </div>
                </div>

                {/* Contest Details */}
                

                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveContest;