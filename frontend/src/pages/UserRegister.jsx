import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../config';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    displayGameName: '',
    gameUID: '',
    gameName: '',
    phone: '',
    password: '',
    profilePic: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'profilePic') {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('displayGameName', formData.displayGameName);
    data.append('gameUID', formData.gameUID);
    data.append('gameName', formData.gameName);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('profilePic', formData.profilePic);

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.message || 'Registration failed');
        return;
      }

      navigate('/login');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-700 via-purple-700 to-violet-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-sm text-white space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Create Account</h2>

        {error && (
          <div className="bg-red-500/80 text-white p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="text"
          name="displayGameName"
          placeholder="Display Game Name (e.g. AP STAR)"
          value={formData.displayGameName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="text"
          name="gameUID"
          placeholder="Game UID"
          value={formData.gameUID}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="text"
          name="gameName"
          placeholder="Game Name"
          value={formData.gameName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none text-white"
        />

        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full text-sm text-white/80"
        />

        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 transition text-white font-medium py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
