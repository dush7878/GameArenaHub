import { useEffect, useState } from "react";
import axios from "axios";
import { Star, StarHalf, Filter, ArrowUpDown, Gamepad2, Trophy, Zap } from "lucide-react";
import CONFIG from "../../config";
const UserReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredGame, setFilteredGame] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${CONFIG.API_BASE_URL}/api/reviews`);
      const active = res.data.filter((r) => r.status === "active");
      setReviews(active);
    } catch (err) {
      console.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews
    .filter((r) => filteredGame === "all" || r.game === filteredGame)
    .sort((a, b) => {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    });

  const gameOptions = [...new Set(reviews.map((r) => r.game))];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-400" />
        );
      }
    }
    return stars;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Gamepad2 className="w-8 h-8 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Game Reviews
            </h1>
          </div>
          <p className="text-blue-200/80 text-lg">Discover what gamers are saying</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
            <select
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent appearance-none"
              value={filteredGame}
              onChange={(e) => setFilteredGame(e.target.value)}
            >
              <option value="all" className="bg-slate-800 text-white">All Games</option>
              {gameOptions.map((game) => (
                <option key={game} value={game} className="bg-slate-800 text-white">
                  {game}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
            <select
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent appearance-none"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc" className="bg-slate-800 text-white">Highest Rating</option>
              <option value="asc" className="bg-slate-800 text-white">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <div
              key={review._id}
              className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gaming accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-white/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-200/80">
                      <Gamepad2 className="w-4 h-4" />
                      <span className="text-sm">{review.game}</span>
                    </div>
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-black/20 rounded-full px-3 py-1 border border-white/20">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className={`font-bold ${getRatingColor(review.rating)}`}>
                    {review.rating}.0
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-blue-100/90 leading-relaxed mb-4 text-base">
                {review.review}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-blue-200/70 text-sm font-medium">
                  ({review.rating}/5)
                </span>
              </div>

              {/* Gaming glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Gamepad2 className="w-12 h-12 text-blue-300/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Reviews Found</h3>
              <p className="text-blue-200/60">No reviews match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReviewList;