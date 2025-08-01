import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BannerPage from './BannerPage';
import ContestPage from './ContestPage';
import AdminContestRegistrations from './AdminContestRegistrationPage';
import AdminWinners from './AdminWinner';
import AdminGames from './AdminGames';
import ReviewManager from './ReviewManager';
import AdminUsers from './AdminAllUser';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('banner');
  const [sidebarOpen, setSidebarOpen] = useState(true); // for mobile toggle

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin');
  }, [navigate]);

  const renderContent = () => {
    switch (selected) {
      case 'banner':
        return <BannerPage />;
      case 'contest':
        return <ContestPage />;
      case 'register-user':
        return <AdminUsers />;
      case 'add-winner':
        return <AdminWinners />;
      case 'add-games':
        return <AdminGames />;
      case 'add-reviews':
        return <ReviewManager />;
      default:
        return <div className="p-4 text-white">Select a section</div>;
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen text-white relative">
      {/* Sidebar */}
      <Sidebar
        onSelect={setSelected}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 p-4 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {renderContent()}
      </main>
    </div>
  );
}
