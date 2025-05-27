import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

// You can add auth check here or inside AdminDashboard
export default function AdminRoutes() {
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');
  console.log(isAdminLoggedIn);

  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="dashboard"
        element={
          isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
        }
      />
      {/* Redirect /admin to /admin/login if no auth */}
      <Route
        path=""
        element={<Navigate to="login" replace />}
      />
    </Routes>
  );
}