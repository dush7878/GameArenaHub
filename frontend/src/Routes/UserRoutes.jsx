import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contests from '../pages/Contests';
import Live from '../pages/Live';
import Terms from '../pages/Terms';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';
import HelpandSupport from '../pages/HelpandSupport';
import LoginPage from '../pages/UserLogin';
import RegisterPage from '../pages/UserRegister';
import UserDashboard from '../components/UserDashabord/userDashbaord';
import PrivateRoute from './userPrivateroutes';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/userdashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}


        </Routes>
      </div>
      <BottomNavbar />
    </>
  );
}
