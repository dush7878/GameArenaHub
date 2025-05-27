import { useEffect, useState } from 'react';
import {
  User,
  Phone,
  Gamepad2,
  Trophy,
  Instagram,
  Star,
  CreditCard,
  CheckCircle,
  Crown
} from 'lucide-react';

export default function ContestRegistration() {
  const [form, setForm] = useState({
    name: '',
    number: '',
    gameUid: '',
    game: '',
    instagramId: '',
    gameLevel: '',
    contestName: '',
    transactionId: '',
    acceptedTerms: false,
  });
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const games = ['Free Fire', 'PUBG', 'COD'];

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch('https://gamearenahub.onrender.com/api/contest/upcoming');
        const data = await res.json();
        setUpcomingContests(data);
      } catch (error) {
        console.error('Failed to load contests:', error);
      }
    };
    fetchContests();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://gamearenahub.onrender.com/api/contest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        setForm({
          name: '',
          number: '',
          gameUid: '',
          game: '',
          instagramId: '',
          gameLevel: '',
          contestName: '',
          transactionId: '',
          acceptedTerms: false,
        });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden pb-26">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Contest Registration
            </h1>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        {/* Main Container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Gaming Information Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Game Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Gamepad2 className="w-4 h-4" />
                  Select Game
                </label>
                <select
                  name="game"
                  value={form.game}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                >
                  <option value="" className="bg-slate-800">Choose your game</option>
                  {games.map((game, i) => (
                    <option key={i} value={game} className="bg-slate-800">{game}</option>
                  ))}
                </select>
              </div>

              {/* Game UID */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Gamepad2 className="w-4 h-4" />
                  Game UID
                </label>
                <input
                  type="text"
                  name="gameUid"
                  value={form.gameUid}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your game UID"
                  required
                />
              </div>
            </div>

            {/* Contest and Level Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contest Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Trophy className="w-4 h-4" />
                  Select Contest
                </label>
                <select
                  name="contestName"
                  value={form.contestName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                >
                  <option value="" className="bg-slate-800">Choose contest</option>
                  {upcomingContests.map((contest) => (
                    <option key={contest.id} value={contest.id} className="bg-slate-800">
                      {contest.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Game Level */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Star className="w-4 h-4" />
                  Game Level
                </label>
                <input
                  type="text"
                  name="gameLevel"
                  value={form.gameLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your skill level"
                  required
                />
              </div>
            </div>

            {/* Social and Payment Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Instagram ID */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <Instagram className="w-4 h-4" />
                  Instagram ID
                </label>
                <input
                  type="text"
                  name="instagramId"
                  value={form.instagramId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="@yourusername"
                  required
                />
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-blue-200 font-medium text-sm">
                  <CreditCard className="w-4 h-4" />
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={form.transactionId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter transaction ID"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={form.acceptedTerms}
                onChange={handleChange}
                className="w-5 h-5 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400/50 focus:ring-2"
                required
              />
              <label className="flex items-center gap-2 text-blue-200 text-sm">
                I accept the terms & conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!form.acceptedTerms || isSubmitting}
              className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 border border-white/20 
    ${form.acceptedTerms && !isSubmitting
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 hover:scale-[1.02] hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                {isSubmitting ? 'Registering...' : 'Register for Contest'}
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
} 