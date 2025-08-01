import BannerSlider from "../components/HomeComponent/BannerSlider";
import WinnerSlider from "../components/HomeComponent/WinnerSlider";
import PlaySection from "../components/HomeComponent/PlaySection";
import GameLogos from "../components/HomeComponent/GamesLogo";
import ContestSearchByGameUID from "../components/HomeComponent/contestSerachbygameUid";

export default function Home() {
  return (
    <div className="min-h-screen pb-10 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pt-3 px-1">
      {/* Premium violet gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 -z-10"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content container */}
      <div className="relative text-center">

        {/* Banner Section with glassmorphism */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-800/20 via-purple-700/15 to-violet-800/20 backdrop-blur-sm rounded-3xl border border-violet-400/20 shadow-2xl shadow-violet-900/30"></div>
          <div className="relative p-1 rounded-3xl">
            <BannerSlider />
          </div>
        </div>

        {/* Winners and Games Section */}
        <div className="mt-4 space-y-8">

          <WinnerSlider />

          {/* Game Logos with glassmorphism container */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
            🎮 Featured Games
          </h2>
          <GameLogos />
        </div>

        {/* COntest Check  */}
        <div className="mt-4 space-y-8 p-4 rounded-2xl">


          <ContestSearchByGameUID />

        </div>

        {/* Play Section with premium glassmorphism */}
        <div className="mt-16 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/15 via-purple-500/20 to-indigo-600/15 backdrop-blur-xl rounded-3xl border border-violet-200/25 shadow-2xl shadow-violet-900/40 group-hover:shadow-violet-800/50 transition-all duration-700"></div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-violet-400/30 rounded-full blur-sm"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400/25 rounded-full blur-sm"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/40 rounded-full blur-sm animate-pulse"></div>

          <PlaySection />

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"></div>
        </div>

      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-violet-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/50 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping delay-1000"></div>
      </div>
    </div>
  );
}