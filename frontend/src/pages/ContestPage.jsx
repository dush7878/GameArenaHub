import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  PlusCircle,
  Gamepad2,
  CalendarClock,
  UploadCloud,
  BadgeDollarSign,
  Trash2,
  PlayCircle,
  StopCircle,
  Filter,
} from 'lucide-react';

const GAME_OPTIONS = ['Free Fire', 'PUBG', 'COD'];
const STATUS_OPTIONS = ['upcoming', 'live', 'ended'];

export default function ContestPage() {
  const [bannerFile, setBannerFile] = useState(null);
  const [game, setGame] = useState(GAME_OPTIONS[0]);
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [entryFees, setEntryFees] = useState('');
  const [contests, setContests] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchContests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contests');
      setContests(res.data);
    } catch {
      toast.error('Failed to fetch contests');
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleCreateContest = async () => {
    if (!bannerFile || !game || !title || !dateTime || !entryFees) {
      toast.warn('Please fill all fields and select a banner image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('banner', bannerFile);
      formData.append('game', game);
      formData.append('title', title);
      formData.append('dateTime', dateTime);
      formData.append('status', status);
      formData.append('entryFees', entryFees);

      await axios.post('http://localhost:5000/api/contests/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Contest created');
      setBannerFile(null);
      setGame(GAME_OPTIONS[0]);
      setTitle('');
      setDateTime('');
      setStatus('upcoming');
      setEntryFees('');
      fetchContests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create contest');
    }
  };

  const updateContestStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/contests/${id}/status`, { status: newStatus });
      toast.success('Status updated');
      fetchContests();
    } catch {
      toast.error('Status update failed');
    }
  };

  const deleteContest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contests/${id}`);
      toast.success('Deleted');
      fetchContests();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filteredContests = filter === 'all' ? contests : contests.filter((c) => c.status === filter);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Gamepad2 className="text-blue-400" /> Manage Contests
      </h2>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 backdrop-blur-md rounded-lg p-6 mb-10 border border-blue-500/20 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <UploadCloud size={18} /> Upload Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            />
            {bannerFile && (
              <img
                src={URL.createObjectURL(bannerFile)}
                alt="Banner"
                className="mt-3 w-full h-32 object-cover rounded border border-blue-400/20"
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label className="flex items-center gap-2">
              <Gamepad2 size={18} />
              Game
            </label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            >
              {GAME_OPTIONS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <label className="mt-2 flex items-center gap-2">
              <PlusCircle size={18} />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            />

            <label className="mt-2 flex items-center gap-2">
              <CalendarClock size={18} />
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            />

            <label className="mt-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <label className="mt-2 flex items-center gap-2">
              <BadgeDollarSign size={18} />
              Entry Fees
            </label>
            <input
              type="number"
              value={entryFees}
              onChange={(e) => setEntryFees(e.target.value)}
              className="w-full border border-blue-500 bg-slate-800/50 p-2 rounded"
            />
          </div>
        </div>

        <button
          onClick={handleCreateContest}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} /> Create Contest
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <Filter className="text-blue-400" />
        {['all', ...STATUS_OPTIONS].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full border ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 border-slate-700 text-blue-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Contest Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredContests.length === 0 ? (
          <p className="text-gray-300">No contests found.</p>
        ) : (
          filteredContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 backdrop-blur-md border border-blue-500/20 shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <img
                src={contest.banner}
                alt={contest.title}
                className="w-full h-40 object-cover rounded mb-4 border border-blue-600/30"
              />
              <h3 className="text-xl font-semibold mb-2">{contest.title}</h3>
              <p>Game: {contest.game}</p>
              <p>
                Date: <strong>{new Date(contest.dateTime).toLocaleString()}</strong>
              </p>
              <p>Entry Fee: ${contest.entryFees}</p>
              <p>
                Status:{' '}
                <span
                  className={`capitalize font-semibold ${
                    contest.status === 'live'
                      ? 'text-green-400'
                      : contest.status === 'ended'
                      ? 'text-red-400'
                      : 'text-gray-300'
                  }`}
                >
                  {contest.status}
                </span>
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {contest.status !== 'ended' && (
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded flex items-center justify-center gap-1"
                    onClick={() =>
                      updateContestStatus(
                        contest._id,
                        contest.status === 'live' ? 'ended' : 'live'
                      )
                    }
                  >
                    {contest.status === 'live' ? <StopCircle size={16} /> : <PlayCircle size={16} />}
                    {contest.status === 'live' ? 'End Contest' : 'Go Live'}
                  </button>
                )}
                <button
                  onClick={() => deleteContest(contest._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded flex items-center justify-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
