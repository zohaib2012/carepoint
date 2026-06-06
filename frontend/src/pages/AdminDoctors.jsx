import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dental', 'General', 'Ophthalmology', 'Pulmonology'];

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ userId: '', specialty: '', experience: '', bio: '', fee: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [docRes, userRes] = await Promise.all([API.get('/doctors'), API.get('/users')]);
      setDoctors(docRes.data);
      setUsers(userRes.data.filter((u) => u.role === 'doctor' || u.role === 'patient'));
    } catch (err) {}
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ userId: '', specialty: '', experience: '', bio: '', fee: '' });
    setModal(true);
  };

  const openEdit = (doc) => {
    setEditing(doc._id);
    setForm({
      userId: doc.userId?._id || '',
      specialty: doc.specialty,
      experience: doc.experience,
      bio: doc.bio || '',
      fee: doc.fee || '',
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await API.put(`/doctors/${editing}`, form);
        setDoctors((prev) => prev.map((d) => (d._id === editing ? data : d)));
        toast.success('Doctor updated');
      } else {
        const { data } = await API.post('/doctors', form);
        setDoctors((prev) => [...prev, data]);
        toast.success('Doctor created');
      }
      setModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const deleteDoctor = async (id) => {
    if (!confirm('Delete this doctor?')) return;
    try {
      await API.delete(`/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
      toast.success('Doctor removed');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctors Management</h1>
        <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add Doctor</button>
      </div>

      <div className="grid gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary-100">
                <img src={doc.userId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doc.userId?.name}</h3>
                <p className="text-sm text-primary-600">{doc.specialty}</p>
                <p className="text-xs text-gray-400">{doc.experience} years · ${doc.fee || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(doc)} className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"><FiEdit2 /></button>
              <button onClick={() => deleteDoctor(doc._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 /></button>
            </div>
          </div>
        ))}
        {doctors.length === 0 && <div className="text-center py-12 text-gray-400">No doctors yet</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{editing ? 'Edit Doctor' : 'Add Doctor'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                <select value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} className="input-field" required>
                  <option value="">Select user</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="input-field" required>
                  <option value="">Select</option>
                  {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee ($)</label>
                  <input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea rows="3" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="input-field resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
