import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import API from '../utils/axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then(({ data }) => setBlog(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Article not found.</p>
        <Link to="/blogs" className="text-primary-600 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <FiArrowLeft /> Back to Articles
          </Link>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            {blog.image && (
              <div className="h-64 md:h-80 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><FiUser /> {blog.author}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
              <div className="prose prose-gray max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
