import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CONFIG from '../config'; // Adjust if needed

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/userdashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-700 via-purple-700 to-violet-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-sm text-white space-y-5"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {error && (
          <div className="bg-red-500/80 text-white p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400 text-white"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400 text-white"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 transition text-white font-medium py-2 px-4 rounded"
        >
          Login
        </button>

        <div className="text-center text-sm mt-4 space-y-2">
          <Link
            to="/forgot-password"
            className="text-violet-300 hover:underline block"
          >
            Forgot Password?
          </Link>
          <span className="text-white/70">Don't have an account?</span>
          <Link
            to="/register"
            className="inline-block mt-1 bg-white/20 hover:bg-white/30 text-white font-medium py-1.5 px-4 rounded"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
