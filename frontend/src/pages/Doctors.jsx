import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiFilter } from 'react-icons/fi';
import API from '../utils/axios';

const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dental', 'General', 'Ophthalmology', 'Pulmonology'];

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/doctors${filter !== 'All' ? `?specialty=${filter}` : ''}`)
      .then(({ data }) => setDoctors(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <>
      <section className="gradient-bg py-20 sm:py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90">
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
            Meet Our <span className="text-primary-200">Doctors</span>
          </h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Highly qualified specialists dedicated to providing you with the best possible care.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  filter === s
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="card-premium p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-200"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded-lg w-1/3"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded-lg"></div>
                    <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <FiFilter className="text-gray-400 text-3xl" />
              </div>
              <p className="text-gray-400 text-lg font-medium">No doctors found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different specialty filter</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {doctors.map((doc, i) => (
                <Link key={doc._id} to={`/doctors/${doc._id}`} 
                  className="card-premium p-6 group animate-slideUp" 
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary-100 group-hover:ring-4 group-hover:ring-primary-200 transition-all duration-500">
                        <img
                          src={doc.userId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`}
                          alt={doc.userId?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 truncate text-lg group-hover:text-primary-600 transition-colors">{doc.userId?.name}</h3>
                      <p className="text-sm text-primary-600 font-medium">{doc.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <FiStar key={s} className="text-yellow-400 fill-yellow-400 text-xs" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({doc.rating || '4.5'})</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 line-clamp-2 leading-relaxed">{doc.bio}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400">Consultation Fee</span>
                      <p className="text-lg font-bold text-primary-600">${doc.fee || '150'}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      View Profile <FiArrowRight />
                    </span>
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
