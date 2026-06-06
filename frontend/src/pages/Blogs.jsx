import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import API from '../utils/axios';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/blogs')
      .then(({ data }) => setBlogs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="gradient-bg py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">Health & Wellness Articles</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Stay informed with expert health advice, medical insights, and wellness tips.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog._id} to={`/blogs/${blog._id}`} className="card overflow-hidden group hover:-translate-y-1">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={blog.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <FiCalendar /> {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                    <div className="text-sm text-gray-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 150) + '...' }} />
                    <div className="flex items-center gap-1 text-sm text-primary-600 font-medium mt-4 group-hover:gap-2 transition-all">
                      Read More <FiArrowRight />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
