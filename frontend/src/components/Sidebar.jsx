import {
  ImageIcon,
  TrophyIcon,
  UsersIcon,
  Gamepad2Icon,
  StarIcon,
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar({ onSelect, isOpen, setIsOpen }) {
  const [active, setActive] = useState('banner');

  const handleSelect = (section) => {
    setActive(section);
    onSelect(section);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const navItems = [
    { key: 'banner', label: 'Banner', icon: <ImageIcon size={18} /> },
    { key: 'contest', label: 'Contest', icon: <TrophyIcon size={18} /> },
    { key: 'register-user', label: 'Register User', icon: <UsersIcon size={18} /> },
    { key: 'add-winner', label: 'Add Winners', icon: <TrophyIcon size={18} /> },
    { key: 'add-games', label: 'Add Games', icon: <Gamepad2Icon size={18} /> },
    { key: 'add-reviews', label: 'Add Reviews', icon: <StarIcon size={18} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-slate-700 rounded">
          {isOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 p-6 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
        bg-gradient-to-b from-blue-900/60 to-blue-800/40 backdrop-blur-md text-white shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboardIcon size={22} /> Admin Panel
        </h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
              ${active === item.key ? 'bg-blue-600/70' : 'hover:bg-blue-700/40'}`}
              onClick={() => handleSelect(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
