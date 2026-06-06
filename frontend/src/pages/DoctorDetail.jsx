import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiCalendar, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import API from '../utils/axios';

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/doctors/${id}`)
      .then(({ data }) => setDoctor(data))
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

  if (!doctor) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Doctor not found.</p>
        <Link to="/doctors" className="text-primary-600 mt-4 inline-block">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <>
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <FiArrowLeft /> Back to Doctors
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-primary-100 shrink-0 mx-auto md:mx-0">
                <img
                  src={doctor.userId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`}
                  alt={doctor.userId?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{doctor.userId?.name}</h1>
                <p className="text-lg text-primary-600 font-medium mt-1">{doctor.specialty}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> {doctor.rating || '4.5'} Rating</span>
                  <span>{doctor.experience} years experience</span>
                </div>
                <p className="text-gray-500 mt-6 leading-relaxed">{doctor.bio}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                  <div className="flex items-center gap-2 text-lg font-bold text-primary-600">
                    <FiDollarSign className="text-2xl" /> ${doctor.fee || '150'}
                  </div>
                  <Link to="/book-appointment" className="btn-primary flex items-center gap-2">
                    <FiCalendar /> Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {doctor.availability?.length > 0 && (
            <div className="card p-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Availability</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctor.availability.map((avail, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-900 text-sm">{avail.day}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {avail.slots?.map((slot, j) => (
                        <span key={j} className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-600 border border-gray-200">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
