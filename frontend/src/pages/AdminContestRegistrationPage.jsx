import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckCircle2,
  XCircle,
  UserCheck,
  Gamepad2,
  BadgeDollarSign,
  Hash,
  Instagram,
  Stamp,
  User,
  CalendarDays,
  Smartphone,
} from 'lucide-react';

export default function AdminContestRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('https://gamearenahub.onrender.com/api/contest/all');
      setRegistrations(res.data);
    } catch {
      alert('Failed to load registrations');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `https://gamearenahub.onrender.com/api/contest/update-status/${id}`,
        { status: newStatus }
      );
      setRegistrations(prev =>
        prev.map(r => (r._id === id ? { ...r, status: res.data.status } : r))
      );
    } catch {
      alert('Status update failed');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 mt-8 flex items-center gap-2 ml-4">
        <UserCheck className="text-blue-400" />
        Contest Registrations
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-auto rounded-lg shadow-lg border border-blue-500/20 bg-gradient-to-br from-blue-900/60 to-blue-800/40 backdrop-blur-md">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-700/30 text-blue-200 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3 text-left">S. No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Game</th>
              <th className="px-4 py-3 text-left">UID</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Instagram</th>
              <th className="px-4 py-3 text-left">Contest</th>
              <th className="px-4 py-3 text-left">Txn ID</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, i) => (
              <tr
                key={r._id}
                className="hover:bg-blue-800/30 transition duration-150"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.number}</td>
                <td className="px-4 py-3">{r.game}</td>
                <td className="px-4 py-3">{r.gameUid}</td>
                <td className="px-4 py-3">{r.gameLevel}</td>
                <td className="px-4 py-3">{r.instagramId}</td>
                <td className="px-4 py-3">{r.contestName}</td>
                <td className="px-4 py-3">{r.transactionId}</td>
                <td className="px-4 py-3 font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      r.status === 'approved'
                        ? 'bg-green-600 text-white'
                        : r.status === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-yellow-500 text-black'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => updateStatus(r._id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {registrations.length === 0 && (
          <p className="text-center text-gray-400">No registrations yet.</p>
        )}
        {registrations.map((r, i) => (
          <div
            key={r._id}
            className="bg-blue-900/60 backdrop-blur-md rounded-xl p-5 shadow-lg border border-blue-500/20 space-y-3"
          >
            

            <div className="text-sm space-y-2 text-blue-100">
              <p className="flex items-center gap-2">
                <User size={16} /> <span>{r.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <Smartphone size={16} /> {r.number}
              </p>
              <p className="flex items-center gap-2">
                <Gamepad2 size={16} /> {r.game} | Level: {r.gameLevel}
              </p>
              <p className="flex items-center gap-2">
                <BadgeDollarSign size={16} /> UID: {r.gameUid}
              </p>
              <p className="flex items-center gap-2">
                <Instagram size={16} /> {r.instagramId}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays size={16} /> {r.contestName}
              </p>
              <p className="flex items-center gap-2">
                <BadgeDollarSign size={16} /> Txn: {r.transactionId}
              </p>
              <p className="flex items-center gap-2">
                <Stamp size={16} />Status:<span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    r.status === 'approved'
                      ? 'bg-green-600 text-white'
                      : r.status === 'rejected'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  {r.status}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => updateStatus(r._id, 'approved')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs flex items-center justify-center gap-1"
              >
                <CheckCircle2 size={14} /> Approve
              </button>
              <button
                onClick={() => updateStatus(r._id, 'rejected')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs flex items-center justify-center gap-1"
              >
                <XCircle size={14} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
