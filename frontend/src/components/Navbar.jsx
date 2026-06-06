import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX, HiCalendar } from 'react-icons/hi';
import { FiLogOut, FiUser, FiGrid, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'doctor') return '/doctor';
    return '/dashboard';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-solid shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 group-hover:scale-105 transition-all duration-300">
              <HiCalendar className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Care<span className="gradient-text">Point</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-50 text-primary-600 text-sm font-medium hover:bg-primary-100 transition-all"
                >
                  <FiGrid className="text-sm" />
                  Dashboard
                </Link>
                <Link
                  to="/book-appointment"
                  className="btn-primary btn-sm shadow-lg shadow-primary-500/20"
                >
                  Book Now
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Sign Out"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary btn-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary btn-sm shadow-lg shadow-primary-500/20">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2.5 rounded-2xl hover:bg-gray-100 transition-all"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-2xl animate-slideDown">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
              {user ? (
                <>
                  <Link to={getDashboardLink()} onClick={() => setOpen(false)} 
                    className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-primary-50 text-primary-600 text-sm font-medium">
                    <FiGrid /> Dashboard
                  </Link>
                  <Link to="/book-appointment" onClick={() => setOpen(false)} 
                    className="btn-primary block text-center">
                    Book Appointment
                  </Link>
                  <button onClick={() => { logout(); setOpen(false); }} 
                    className="flex items-center gap-2 px-4 py-3.5 rounded-2xl text-red-500 text-sm font-medium w-full hover:bg-red-50 transition-all">
                    <FiLogOut /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} 
                    className="block text-center btn-secondary">Sign In</Link>
                  <Link to="/register" onClick={() => setOpen(false)} 
                    className="block text-center btn-primary">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
