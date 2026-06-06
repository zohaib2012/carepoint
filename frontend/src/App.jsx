import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminLayout from './pages/AdminLayout';
import AdminDashboardHome from './pages/AdminDashboardHome';
import AdminAppointments from './pages/AdminAppointments';
import AdminDoctors from './pages/AdminDoctors';
import AdminServices from './pages/AdminServices';
import AdminBlogs from './pages/AdminBlogs';
import AdminGallery from './pages/AdminGallery';
import AdminUsers from './pages/AdminUsers';

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDoctorDash = location.pathname === '/doctor' || location.pathname.startsWith('/doctor/');
  const isDashboard = location.pathname.startsWith('/dashboard');
  const hideLayout = isAdmin || isDoctorDash || isDashboard;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      <main className={hideLayout ? '' : 'pt-20 flex-1'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['patient']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute roles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardHome />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
