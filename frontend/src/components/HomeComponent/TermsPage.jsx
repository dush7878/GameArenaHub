import React from 'react';
import {
  Mail, Instagram, Youtube, Shield, Gamepad2, Trophy, Zap
} from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-400">Effective Date: [Launch Date]</p>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 mb-8">
          <div className="grid gap-6">
            {/* Key Rules */}
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Key Rules</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>• Age 13+ required</div>
                <div>• No cheating allowed</div>
                <div>• Payment verification needed</div>
                <div>• No refunds after registration</div>
              </div>
            </div>

            {/* Prizes */}
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-yellow-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Prizes & Payouts</h2>
              </div>
              <div className="text-gray-300">
                <p>• Top 3 players win prize money</p>
                <p>• Payouts via UPI/Paytm/Bank (3-7 days)</p>
                <p>• Winners selected by leaderboard/admin</p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">Important</h2>
              </div>
              <div className="text-gray-300">
                <p>• Admin decisions are final</p>
                <p>• We're not liable for game server issues</p>
                <p>• Terms may be updated anytime</p>
                <p>• Your content may be used for promotion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="mailto:battlerenaofficial@gmail.com" 
               className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all hover:scale-105 group">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white text-center font-medium">Email</p>
              <p className="text-gray-400 text-sm text-center">battlerenaofficial@gmail.com</p>
            </a>
            
            <a href="https://instagram.com/battlerena.in" target="_blank" rel="noopener noreferrer"
               className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/60 transition-all hover:scale-105 group">
              <Instagram className="w-8 h-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white text-center font-medium">Instagram</p>
              <p className="text-gray-400 text-sm text-center">@battlerena.in</p>
            </a>
            
            <a href="https://youtube.com/@battlerena" target="_blank" rel="noopener noreferrer"
               className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-red-500/30 hover:border-red-400/60 transition-all hover:scale-105 group">
              <Youtube className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-white text-center font-medium">YouTube</p>
              <p className="text-gray-400 text-sm text-center">BattleRena Tournaments</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;