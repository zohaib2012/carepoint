import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', icon: '', description: '' });

  useEffect(() => {
    API.get('/services')
      .then(({ data }) => setServices(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setEditing(null); setForm({ name: '', icon: '', description: '' }); setModal(true); };
  const openEdit = (svc) => { setEditing(svc._id); setForm({ name: svc.name, icon: svc.icon, description: svc.description }); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await API.put(`/services/${editing}`, form);
        setServices((prev) => prev.map((s) => (s._id === editing ? data : s)));
        toast.success('Service updated');
      } else {
        const { data } = await API.post('/services', form);
        setServices((prev) => [...prev, data]);
        toast.success('Service created');
      }
      setModal(false);
    } catch (err) {
      toast.error('Failed');
    }
  };

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await API.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success('Service removed');
    } catch (err) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add Service</button>
      </div>

      <div className="grid gap-4">
        {services.map((svc) => (
          <div key={svc._id} className="card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{svc.icon || '🩺'}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{svc.name}</h3>
                <p className="text-sm text-gray-500">{svc.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(svc)} className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"><FiEdit2 /></button>
              <button onClick={() => deleteService(svc._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 /></button>
            </div>
          </div>
        ))}
        {services.length === 0 && <div className="text-center py-12 text-gray-400">No services yet</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{editing ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field" placeholder="🩺" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
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
