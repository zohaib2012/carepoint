import { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/appointments')
      .then(({ data }) => setAppointments(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/appointments/${id}/status`, { status });
      setAppointments((prev) => prev.map((a) => (a._id === id ? data : a)));
      toast.success(`Appointment ${status}`);
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const deleteApt = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success('Appointment deleted');
    } catch (err) {
      toast.error('Failed to delete');
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

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Appointments Management</h1>
      {appointments.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">No appointments found</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-600">Patient</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Doctor</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Service</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Time</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">{apt.patientId?.name}</td>
                    <td className="p-4 text-gray-600">{apt.doctorId?.userId?.name}</td>
                    <td className="p-4 text-gray-600">{apt.service}</td>
                    <td className="p-4 text-gray-600">{new Date(apt.date).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-600">{apt.timeSlot}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(apt.status)}`}>{apt.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {apt.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(apt._id, 'confirmed')} className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"><FiCheckCircle /></button>
                            <button onClick={() => updateStatus(apt._id, 'cancelled')} className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><FiXCircle /></button>
                          </>
                        )}
                        {apt.status === 'confirmed' && (
                          <button onClick={() => updateStatus(apt._id, 'completed')} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200">Complete</button>
                        )}
                        <button onClick={() => deleteApt(apt._id)} className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
