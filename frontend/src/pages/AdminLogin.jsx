import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://gamearenahub.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Server error, try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
