import { Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';


export default function App() {
  return (

    
    <Routes>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* User routes */}
      <Route path="/*" element={<UserRoutes />} />
      
    </Routes>
  );
}
