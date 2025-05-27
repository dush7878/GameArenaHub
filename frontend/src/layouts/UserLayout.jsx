import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page content grows to fill the space above the navbar */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Always pinned at the bottom */}
      <BottomNavbar />
    </div>
  );
}
