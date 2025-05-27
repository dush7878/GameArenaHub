import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await axios.get('https://gamearenahub.onrender.com/api/banners');
        // Filter active banners only
        setBanners(res.data.filter(b => b.isActive));
        setCurrentIndex(0); // reset slider on new data
      } catch (err) {
        console.error('Failed to fetch banners', err);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto aspect-[16/9] flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
        No active banners to display
      </div>
    );
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-lg select-none">
      <img
        src={banners[currentIndex].imageUrl}
        alt={banners[currentIndex].title || `Banner ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        draggable={false}
      />

    </div>
  );
}
