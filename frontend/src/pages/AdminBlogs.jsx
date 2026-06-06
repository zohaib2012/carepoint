import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', image: '', author: 'Admin' });

  useEffect(() => {
    API.get('/blogs')
      .then(({ data }) => setBlogs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', content: '', image: '', author: 'Admin' });
    setModal(true);
  };

  const openEdit = (blog) => {
    setEditing(blog._id);
    setForm({ title: blog.title, content: blog.content, image: blog.image || '', author: blog.author });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await API.put(`/blogs/${editing}`, form);
        setBlogs((prev) => prev.map((b) => (b._id === editing ? data : b)));
        toast.success('Blog updated');
      } else {
        const { data } = await API.post('/blogs', form);
        setBlogs((prev) => [...prev, data]);
        toast.success('Blog created');
      }
      setModal(false);
    } catch (err) {
      toast.error('Failed');
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success('Blog removed');
    } catch (err) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
        <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add Blog</button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {blog.image && (
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={blog.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{blog.title}</h3>
                <p className="text-xs text-gray-400">By {blog.author} · {new Date(blog.date || blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button onClick={() => openEdit(blog)} className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"><FiEdit2 /></button>
              <button onClick={() => deleteBlog(blog._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><FiTrash2 /></button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <div className="text-center py-12 text-gray-400">No blogs yet</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{editing ? 'Edit Blog' : 'Add Blog'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML supported)</label>
                <textarea rows="10" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="input-field resize-none font-mono text-sm" required />
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
