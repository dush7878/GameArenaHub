import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contests from '../pages/Contests';
import Live from '../pages/Live';
import Terms from '../pages/Terms';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';
import HelpandSupport from '../pages/HelpandSupport';

export default function UserRoutes() {
  return (
    <>
    <TopNavbar />
      <div className=""> {/* Padding for navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/registration" element={<Live />} />
          <Route path="/reviews" element={<Terms />} />
          <Route path="/help-support" element={<HelpandSupport />} />

         
        </Routes>
      </div>
      <BottomNavbar />
    </>
  );
}
