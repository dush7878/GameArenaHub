import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Gamepad2, Upload, Trash2 } from 'lucide-react';

const AdminGames = () => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/games');
      setGames(res.data);
    } catch {
      toast.error('Failed to fetch games');
    }
  };

  const handleAddGame = async () => {
    if (!name || !logo) return toast.warn('Game name and logo required');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);

    try {
      await axios.post('http://localhost:5000/api/games', formData);
      toast.success('Game added');
      setName('');
      setLogo(null);
      fetchGames();
    } catch (err) {
      toast.error('Add game failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      toast.success('Game deleted');
      fetchGames();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl ml-15 mt-5 font-bold mb-6 flex items-center gap-2 text-blue-300">
        <Gamepad2 size={24} /> Manage Games
      </h2>

      {/* Form Section */}
      <div className="bg-blue-900/60 p-4 sm:p-6 rounded-xl shadow-md border border-blue-400/20 backdrop-blur-md mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Game Name"
          className="p-2 bg-blue-800/40 border border-blue-600 rounded text-white w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="p-2 bg-blue-800/40 border border-blue-600 rounded text-white w-full"
          onChange={(e) => setLogo(e.target.files[0])}
        />

        <button
          onClick={handleAddGame}
          className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <Upload size={18} /> Add Game
        </button>
      </div>

      {/* Game List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((game) => (
          <div
            key={game._id}
            className="bg-blue-900/50 border border-blue-400/20 backdrop-blur-md p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={game.logo}
                alt={game.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span className="font-semibold text-blue-100">{game.name}</span>
            </div>
            <button
              onClick={() => handleDelete(game._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-1"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGames;
