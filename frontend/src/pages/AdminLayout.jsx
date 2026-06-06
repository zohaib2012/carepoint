import { Link, Outlet, useLocation } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import { FiGrid, FiCalendar, FiUser, FiActivity, FiFileText, FiImage, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: FiCalendar },
  { to: '/admin/doctors', label: 'Doctors', icon: FiUser },
  { to: '/admin/services', label: 'Services', icon: FiActivity },
  { to: '/admin/blogs', label: 'Blogs', icon: FiFileText },
  { to: '/admin/gallery', label: 'Gallery', icon: FiImage },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (item) => {
    if (item.end) return location.pathname === '/admin';
    return location.pathname.startsWith(item.to);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
            <HiCalendar className="text-white text-xl" />
          </div>
          <span className="text-xl font-bold text-gray-900">Care<span className="gradient-text">Point</span></span>
        </Link>
        <div className="text-center mb-8 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-3 ring-2 ring-primary-100">
            <img src={user?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-semibold text-gray-900">{user?.name}</h3>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full mt-1 capitalize">Admin</span>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(item)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="text-lg" /> {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-auto">
          <FiLogOut /> Sign Out
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
