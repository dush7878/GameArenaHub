import { useEffect, useState } from 'react';
import CONFIG from '../../config';
const GameLogos = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/games`);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error('Failed to fetch games');
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="overflow-y-auto relative w-full flex justify-center">
      <div className="w-full max-w-7xl">

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex justify-center">
          <div className="flex gap-4 pt-5 overflow-x-auto pb-4 px-4 scrollbar-hide">
            {games.map((game, index) => (
              <div
                key={game._id}
                className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-blue-500/25 animate-bounce"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                  animationDirection: index % 2 === 0 ? 'normal' : 'reverse',
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-30 animate-pulse"></div>
                <img 
                  src={game.logo} 
                  alt={game.name} 
                  className="relative z-10 max-w-12 max-h-12 sm:max-w-16 sm:max-h-16 object-contain rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4  gap-6 justify-center pt-6">
          {games.map((game, index) => (
            <div
              key={game._id}
              className="relative w-28 h-28 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-blue-500/25 animate-pulse"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                animationDelay: `${index * 0.2}s`,
                animationDuration: '3s',
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-30 animate-pulse"></div>
              <img 
                src={game.logo} 
                alt={game.name} 
                className="relative z-10 max-w-20 max-h-20 object-contain rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameLogos;
