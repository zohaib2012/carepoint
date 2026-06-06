import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const servicesList = [
  { icon: '🩺', name: 'General Checkup', desc: 'Comprehensive health examinations including blood tests, vitals, and physical assessment by experienced physicians.', features: ['Full body checkup', 'Blood tests & screening', 'Health assessment', 'Vaccination services'] },
  { icon: '🦷', name: 'Dental Care', desc: 'Complete dental services from routine cleanings to advanced procedures for a healthy, beautiful smile.', features: ['Teeth cleaning', 'Fillings & crowns', 'Root canal therapy', 'Orthodontics'] },
  { icon: '❤️', name: 'Cardiology', desc: 'Advanced heart care with state-of-the-art diagnostic technology and expert cardiologists.', features: ['ECG & ECHO', 'Stress testing', 'Angiography', 'Heart surgery'] },
  { icon: '👶', name: 'Pediatrics', desc: 'Specialized healthcare for children from newborns to adolescents in a child-friendly environment.', features: ['Well-child visits', 'Immunizations', 'Growth monitoring', 'Developmental screening'] },
  { icon: '🦴', name: 'Orthopedics', desc: 'Expert care for bones, joints, and muscles with personalized treatment plans.', features: ['Joint replacement', 'Sports medicine', 'Spine surgery', 'Physical therapy'] },
  { icon: '🧠', name: 'Neurology', desc: 'Comprehensive neurological care using advanced diagnostic and treatment techniques.', features: ['Brain imaging', 'EEG studies', 'Stroke care', 'Memory disorders'] },
  { icon: '👁️', name: 'Ophthalmology', desc: 'Complete eye care services from routine exams to advanced surgical procedures.', features: ['Eye examinations', 'Cataract surgery', 'Glaucoma care', 'LASIK surgery'] },
  { icon: '🫁', name: 'Pulmonology', desc: 'Expert diagnosis and treatment of respiratory conditions and lung diseases.', features: ['Pulmonary function', 'Asthma care', 'Sleep studies', 'Bronchoscopy'] },
];

export default function Services() {
  return (
    <>
      <section className="gradient-bg py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
            Comprehensive <br/>Medical Care
          </h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            From routine checkups to specialized treatments, we offer a full spectrum of healthcare services.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {servicesList.map((s, i) => (
              <div key={i} className="card-premium p-6 md:p-8 group animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:gradient-bg group-hover:scale-110 transition-all duration-500">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2.5 pt-4 border-t border-gray-100">
                  {s.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-center gap-2.5">
                      <span className="w-5 h-5 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                        <FiCheck className="text-primary-600 text-xs" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Need a Different Service?</h2>
          <p className="section-subtitle mx-auto">
            Contact us and we will help you find the right specialist for your needs.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2 mt-10 shadow-lg shadow-primary-500/20">
            Contact Us <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
