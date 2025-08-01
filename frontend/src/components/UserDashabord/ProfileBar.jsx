import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ProfileBar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    // Retrieve user from localStorage (or fetch from backend if needed)
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('User Data:', userData);
    if (token && userData) {
      setUser(userData);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="bg-violet-900/40 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 shadow-md border border-white/10">
        
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover border-2 border-violet-400 shadow-sm"
      />

      <div className="text-white text-sm space-y-1">
        <div className="font-semibold text-base">{user.name || 'Gamer'}</div>
        <div>🎮 UID: <span className="text-violet-300">{user.gameUID}</span></div>
        <div>🕹 Game: <span className="text-violet-300">{user.gameName}</span></div>
        <div>💰 Wallet: ₹{user.wallet ?? 0} | 🏆 Winnings: ₹{user.winningMoney ?? 0}</div>
      </div>

      <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
    </div>
  );
}
