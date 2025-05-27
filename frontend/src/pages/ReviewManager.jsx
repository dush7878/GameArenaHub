import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Star, Trash2, EyeOff, Eye, MessageCircle } from 'lucide-react';

const ReviewManager = () => {
  const [form, setForm] = useState({ name: '', game: '', review: '', rating: '', status: 'active' });
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axios.get('https://gamearenahub.onrender.com/api/reviews');
    setReviews(res.data);
  };

  const handleSubmit = async () => {
    const { name, game, review, rating } = form;
    if (!name || !game || !review || !rating) return toast.warn('All fields are required');
    try {
      await axios.post('https://gamearenahub.onrender.com/api/reviews', form);
      toast.success('Review added');
      setForm({ name: '', game: '', review: '', rating: '', status: 'active' });
      fetchReviews();
    } catch {
      toast.error('Failed to create review');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://gamearenahub.onrender.com/api/reviews/${id}`);
    toast.success('Review deleted');
    fetchReviews();
  };

  const toggleStatus = async (id) => {
    await axios.patch(`https://gamearenahub.onrender.com/api/reviews/${id}/toggle`);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl ml-15 mt-5 font-bold mb-6 text-blue-300 flex"><MessageCircle/> Manage Reviews</h2>

      {/* Create Review */}
      <div className="bg-blue-900/50 backdrop-blur-lg border border-blue-400/20 p-4 sm:p-6 rounded-xl shadow space-y-4 mb-8">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
        />
        <input
          type="text"
          placeholder="Game Name"
          value={form.game}
          onChange={(e) => setForm({ ...form, game: e.target.value })}
          className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
        />
        <textarea
          placeholder="Review"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="w-full p-2 bg-blue-800/40 border border-blue-600 rounded text-white"
        />
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
        >
          Submit Review
        </button>
      </div>

      {/* Review List */}
      <div className="grid gap-4">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-blue-900/50 backdrop-blur-md border border-blue-400/20 p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="space-y-1 text-white w-full">
              <h4 className="font-bold text-lg">{r.name} <span className="text-sm text-gray-400">({r.game})</span></h4>
              <p className="text-sm">{r.review}</p>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} /> {r.rating} / 5
              </div>
              <p className="text-sm text-gray-300">Status: <span className={`font-semibold ${r.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>{r.status}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleStatus(r._id)}
                className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-white w-full sm:w-auto ${
                  r.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {r.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                {r.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="flex items-center justify-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded w-full sm:w-auto"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManager;
