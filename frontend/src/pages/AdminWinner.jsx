import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User,
  Gamepad2,
  Hash,
  Gift,
  Medal,
  Image as ImageIcon,
  PlusCircle,
  X,
  ToggleRight,
  ToggleLeft,
} from 'lucide-react';
import CONFIG from '../config';

const games = ['Free Fire', 'PUBG', 'COD'];

export default function AdminWinners() {
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    gameUid: '',
    contest: '',
    prize: '',
    profile: null,
  });

  const [winners, setWinners] = useState([]);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchWinners();
    fetchContests();
  }, []);

  const fetchWinners = async () => {
    const res = await axios.get(`${CONFIG.API_BASE_URL}/api/winner/all`);
    setWinners(res.data);
  };

  const fetchContests = async () => {
    const res = await axios.get(`${CONFIG.API_BASE_URL}/api/contests`);
    setContests(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile') {
      setFormData({ ...formData, profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(`${CONFIG.API_BASE_URL}/api/winner/status/${id}`);
      fetchWinners();
    } catch {
      alert('Failed to update status');
    }
  };

  const deleteWinner = async (id) => {
    if (window.confirm('Are you sure you want to delete this winner?')) {
      try {
        await axios.delete(`${CONFIG.API_BASE_URL}/api/winner/delete/${id}`);
        fetchWinners();
      } catch {
        alert('Failed to delete winner');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    try {
      await axios.post(`${CONFIG.API_BASE_URL}/api/winner/create`, data);
      alert('Winner added');
      setFormData({ name: '', game: '', gameUid: '', contest: '', prize: '', profile: null });
      fetchWinners();
    } catch {
      alert('Failed to add winner');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-2xl ml-20 mt-5 font-bold mb-6 flex items-center gap-2 text-blue-300">
        <Medal /> Add Winner
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4 mb-10 bg-blue-900/60 p-6 rounded-xl shadow-md border border-blue-400/20 backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <User size={20} />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Gamepad2 size={20} />
          <select
            name="game"
            onChange={handleChange}
            value={formData.game}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          >
            <option value="">Select Game</option>
            {games.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Hash size={20} />
          <input
            type="text"
            name="gameUid"
            placeholder="Game UID"
            onChange={handleChange}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Medal size={20} />
          <select
            name="contest"
            onChange={handleChange}
            value={formData.contest}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          >
            <option value="">Select Contest</option>
            {contests.map((c, i) => (
              <option key={i} value={c.title}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Gift size={20} />
          <input
            type="text"
            name="prize"
            placeholder="Prize"
            onChange={handleChange}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <ImageIcon size={20} />
          <input
            type="file"
            name="profile"
            onChange={handleChange}
            required
            className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
          />
        </div>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 mt-2"
        >
          <PlusCircle size={18} /> Add Winner
        </button>
      </form>

      {/* Winners List */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-300">
        <Medal /> Winners List
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((w, i) => (
          <div
            key={i}
            className="bg-blue-900/60 backdrop-blur-md border border-blue-400/20 rounded-xl p-4 shadow-md"
          >
            <img
              src={w.profile}
              alt={w.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg text-blue-100">{w.name}</h3>
            <p className="text-sm text-blue-200"><Gamepad2 size={14} className="inline-block mr-1" /> {w.game}</p>
            <p className="text-sm text-blue-200"><Hash size={14} className="inline-block mr-1" /> UID: {w.gameUid}</p>
            <p className="text-sm text-blue-200"><Medal size={14} className="inline-block mr-1" /> {w.contest}</p>
            <p className="text-sm text-green-300"><Gift size={14} className="inline-block mr-1" /> ₹{w.prize}</p>

            <p className="mt-2 text-sm">
              Status:
              <span
                className={`ml-2 px-2 py-1 text-xs rounded ${
                  w.status === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {w.status}
              </span>
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => toggleStatus(w._id)}
                className="flex-1 text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1 justify-center"
              >
                {w.status === 'active' ? (
                  <>
                    <ToggleLeft size={20} /> Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight size={20} /> Activate
                  </>
                )}
              </button>
              <button
                onClick={() => deleteWinner(w._id)}
                className="flex-1 text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 justify-center"
              >
                <X size={20} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
