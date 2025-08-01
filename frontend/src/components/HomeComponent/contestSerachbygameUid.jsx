import { useState } from "react";
import axios from "axios";
import { Search, Trophy, User, Gamepad2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import CONFIG from "../../config";
const ContestSearchByGameUID = () => {
  const [gameUID, setGameUID] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setResult(null);
    setMessage("");
    setIsLoading(true);

    if (!gameUID.trim()) {
      setMessage("Please enter a valid Game UID.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${CONFIG.API_BASE_URL}/api/contest/search?uid=${gameUID}`);
      const data = res.data;
      if (!data || data.status !== "approved") {
        setMessage("No approved contest registration found for this Game UID.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setMessage("Error fetching contest registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center rounded-2xl">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-mono">
                CONTEST CHECK
              </h1>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
          <p className="text-blue-200/80 text-lg font-mono">Verify your contest registration status</p>
        </div>

        {/* Search Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 mb-6">
          {/* Gaming accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Gamepad2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={gameUID}
                onChange={(e) => setGameUID(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your Game UID..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent font-mono text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{isLoading ? "SEARCHING..." : "SEARCH"}</span>
              </div>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="relative overflow-hidden rounded-2xl bg-red-500/10 backdrop-blur-md border border-red-400/30 p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-400/30">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-300 font-bold font-mono">SEARCH FAILED</h3>
                <p className="text-red-200/80">{message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="relative overflow-hidden rounded-2xl bg-green-500/10 backdrop-blur-md border border-green-400/30 p-8">
            {/* Success accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"></div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-300 font-mono">REGISTRATION FOUND!</h3>
                <p className="text-green-200/80">Your contest registration is approved and active.</p>
              </div>
            </div>

            <div className="grid gap-4">
              {/* Player Name */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-200/60 text-sm font-mono uppercase tracking-wider">Player Name</p>
                  <p className="text-white font-bold text-lg">{result.name}</p>
                </div>
              </div>

              {/* Contest Name */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                  <Trophy className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-purple-200/60 text-sm font-mono uppercase tracking-wider">Contest</p>
                  <p className="text-white font-bold text-lg">{result.contestName}</p>
                </div>
              </div>

              {/* Game UID */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-400/30">
                  <Gamepad2 className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <p className="text-indigo-200/60 text-sm font-mono uppercase tracking-wider">Game UID</p>
                  <p className="text-white font-bold text-lg font-mono">{result.gameUid}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-bold font-mono tracking-wider">APPROVED</span>
                </div>
              </div>
            </div>

            {/* Gaming glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-50 pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestSearchByGameUID;