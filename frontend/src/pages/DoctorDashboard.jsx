import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiLogOut, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { HiCalendar } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    API.get('/appointments/doctor').then(({ data }) => setAppointments(data)).catch(() => {});
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      loadAppointments();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const getStatusStyle = (s) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return styles[s] || 'bg-gray-100 text-gray-700';
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
          <h3 className="font-semibold text-gray-900">Dr. {user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full mt-2">Doctor</span>
        </div>
        <nav className="space-y-1 flex-1">
          <Link to="/doctor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary-50 text-primary-600">
            <FiCalendar /> Appointments
          </Link>
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-auto">
          <FiLogOut /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-500 mb-8">Manage your appointments and patient requests</p>

          {appointments.length === 0 ? (
            <div className="card p-12 text-center">
              <FiCalendar className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No appointments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt._id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary-100 shrink-0">
                        <img src={apt.patientId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{apt.patientId?.name}</h3>
                        <p className="text-sm text-primary-600 font-medium">{apt.service}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>{apt.timeSlot}</span>
                        </div>
                        {apt.notes && <p className="text-sm text-gray-400 mt-1">Notes: {apt.notes}</p>}
                        <p className="text-xs text-gray-400 mt-1">{apt.patientId?.email} · {apt.patientId?.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(apt.status)}`}>{apt.status}</span>
                      <div className="flex gap-2">
                        {apt.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(apt._id, 'confirmed')} className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all"><FiCheckCircle /></button>
                            <button onClick={() => updateStatus(apt._id, 'cancelled')} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"><FiXCircle /></button>
                          </>
                        )}
                        {apt.status === 'confirmed' && (
                          <button onClick={() => updateStatus(apt._id, 'completed')} className="btn-sm btn-primary">Mark Complete</button>
                        )}
                      </div>
                    </div>
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
