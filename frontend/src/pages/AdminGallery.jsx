import { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ imageUrl: '', caption: '' });

  useEffect(() => {
    API.get('/gallery')
      .then(({ data }) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/gallery', form);
      setItems((prev) => [data, ...prev]);
      toast.success('Image added');
      setModal(false);
      setForm({ imageUrl: '', caption: '' });
    } catch (err) {
      toast.error('Failed');
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success('Image removed');
    } catch (err) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <button onClick={() => setModal(true)} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add Image</button>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item) => (
          <div key={item._id} className="break-inside-avoid relative group rounded-2xl overflow-hidden">
            <img src={item.imageUrl} alt={item.caption} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center">
              {item.caption && <p className="text-white text-sm font-medium px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>}
              <button onClick={() => deleteItem(item._id)} className="mt-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"><FiTrash2 /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-center py-12 text-gray-400 col-span-full">No gallery images yet</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add Gallery Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><FiLink /> Image URL</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="input-field" placeholder="https://..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="input-field" placeholder="Optional caption" />
              </div>
              {form.imageUrl && (
                <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
                  <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">Add Image</button>
                <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
