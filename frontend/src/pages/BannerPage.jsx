import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CONFIG from '../config';

export default function BannerPage() {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${CONFIG.API_BASE_URL}/api/banners`);
      setBanners(res.data);
    } catch {
      toast.error('Failed to load banners');
    }
  };

  const handleCreate = async () => {
    if (!title || !imageFile) return toast.warn('Title and image are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', imageFile);

    try {
      await axios.post(`${CONFIG.API_BASE_URL}/api/banners/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Banner uploaded successfully');
      setTitle('');
      setImageFile(null);
      fetchBanners();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  const toggleActive = async (id) => {
    try {
      await axios.patch(`${CONFIG.API_BASE_URL}/api/banners/${id}/toggle`);
      toast.success('Status updated');
      fetchBanners();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Toggle failed');
    }
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${CONFIG.API_BASE_URL}/api/banners/${id}`);
      toast.success('Banner deleted');
      fetchBanners();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-4 w-full text-white">
      <h2 className="text-3xl font-semibold mb-6">📢 Manage Banners</h2>

      {/* Create Form */}
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 backdrop-blur-md p-6 rounded-lg shadow-lg mb-8 border border-blue-600/20">
        <h3 className="text-lg font-medium mb-4">Create New Banner</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Banner title"
            className="bg-slate-800 text-white border border-blue-600 rounded px-4 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="text-white bg-slate-800 border border-blue-600 rounded px-4 py-2 w-full"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium w-full md:w-auto"
            onClick={handleCreate}
          >
            Upload
          </button>
        </div>
      </div>

      {/* Banner List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(banners) && banners.map((banner) => (
          <div
            key={banner._id}
            className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-lg p-4 shadow border border-slate-600/20"
          >
            <h4 className="text-lg font-semibold mb-2">{banner.title}</h4>
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-40 object-cover rounded mb-4 border border-slate-700"
            />
            <div className="flex flex-col md:flex-row gap-2">
              <button
                className={`w-full py-2 rounded text-white font-semibold ${
                  banner.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={() => toggleActive(banner._id)}
              >
                {banner.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                className="w-full py-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded"
                onClick={() => deleteBanner(banner._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
