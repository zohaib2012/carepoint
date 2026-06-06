import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiLogOut, FiClock, FiCheckCircle, FiXCircle, FiEdit2 } from 'react-icons/fi';
import { HiCalendar } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

export default function Dashboard() {
  const { user, logout, updateUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState('upcoming');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    API.get('/appointments/my').then(({ data }) => setAppointments(data)).catch(() => {});
    if (user) setProfile({ name: user.name, email: user.email, phone: user.phone || '' });
  }, [user]);

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', icon: FiClock },
    { key: 'past', label: 'Past', icon: FiCheckCircle },
    { key: 'cancelled', label: 'Cancelled', icon: FiXCircle },
  ];

  const filtered = appointments.filter((a) => {
    if (tab === 'upcoming') return a.status === 'pending' || a.status === 'confirmed';
    if (tab === 'past') return a.status === 'completed';
    return a.status === 'cancelled';
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/users/${user._id}`, profile);
      updateUser(data);
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
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
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-3 ring-2 ring-primary-100">
            <img src={user?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-semibold text-gray-900">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full mt-2 capitalize">{user?.role}</span>
        </div>
        <nav className="space-y-1 flex-1">
          {[
            { to: '/dashboard', label: 'My Appointments', icon: FiCalendar },
            { to: '/book-appointment', label: 'Book New', icon: FiCalendar },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-all">
              <item.icon className="text-lg" /> {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-auto">
          <FiLogOut /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your appointments and profile</p>
            </div>
            <button onClick={() => setEditing(!editing)} className="btn-secondary btn-sm flex items-center gap-2"><FiEdit2 /> Edit Profile</button>
          </div>

          {editing && (
            <div className="card p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Edit Profile</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input-field" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary btn-sm">Save Changes</button>
                  <button type="button" onClick={() => setEditing(false)} className="btn-secondary btn-sm">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.key ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}>
                <t.icon /> {t.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <FiCalendar className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No {tab} appointments</p>
              <Link to="/book-appointment" className="btn-primary inline-flex items-center gap-2 mt-4">Book Now</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((apt) => (
                <div key={apt._id} className="card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary-100 shrink-0">
                        <img src={apt.doctorId?.userId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{apt.doctorId?.userId?.name}</h3>
                        <p className="text-sm text-primary-600 font-medium">{apt.service}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>{apt.timeSlot}</span>
                        </div>
                        {apt.notes && <p className="text-sm text-gray-400 mt-1">Note: {apt.notes}</p>}
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
