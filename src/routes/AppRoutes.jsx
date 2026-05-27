import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Admissions from '../pages/Admissions.jsx';
import Careers from '../pages/Careers.jsx';
import Gallery from '../pages/Gallery.jsx';
import Academics from '../pages/Academics.jsx';
import StudentGrowth from '../pages/StudentGrowth.jsx';
import Parents from '../pages/Parents.jsx';
import Contact from '../pages/Contact.jsx';
import AdminLogin from '../pages/AdminLogin.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('school_admin_token');
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/student-growth" element={<StudentGrowth />} />
      <Route path="/parents" element={<Parents />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
