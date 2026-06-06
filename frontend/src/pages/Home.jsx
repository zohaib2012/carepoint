import { Link } from 'react-router-dom';
import { HiCalendar, HiChevronRight } from 'react-icons/hi';
import { FiClock, FiShield, FiHeart, FiUserCheck, FiArrowRight, FiStar, FiCheck } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const stats = [
  { icon: FiHeart, value: '15K+', label: 'Happy Patients', desc: 'Trusted by thousands' },
  { icon: FiClock, value: '10+', label: 'Years Experience', desc: 'Of excellence' },
  { icon: FiShield, value: '50+', label: 'Expert Doctors', desc: 'Top specialists' },
  { icon: FiUserCheck, value: '98%', label: 'Satisfaction', desc: 'Patient approved' },
];

const services = [
  { icon: '🩺', name: 'General Checkup', desc: 'Comprehensive health examinations by experienced physicians.' },
  { icon: '🦷', name: 'Dental Care', desc: 'Complete dental services for a healthy, beautiful smile.' },
  { icon: '❤️', name: 'Cardiology', desc: 'Advanced heart care with state-of-the-art technology.' },
  { icon: '👶', name: 'Pediatrics', desc: 'Specialized care for children from infancy through adolescence.' },
  { icon: '🦴', name: 'Orthopedics', desc: 'Expert bone and joint care with personalized treatment.' },
  { icon: '🧠', name: 'Neurology', desc: 'Comprehensive neurological care and diagnosis.' },
];

const team = [
  { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face' },
  { name: 'Dr. Michael Chen', specialty: 'Neurologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedic', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face' },
];

const blogs = [
  {
    title: '5 Tips for a Healthy Heart',
    excerpt: 'Discover essential lifestyle changes that can significantly improve your cardiovascular health.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    date: 'Mar 15, 2024', category: 'Cardiology',
  },
  {
    title: 'Understanding Mental Health',
    excerpt: 'Breaking the stigma and learning about the importance of mental well-being in modern life.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
    date: 'Feb 28, 2024', category: 'Wellness',
  },
  {
    title: 'Guide to Pediatric Care',
    excerpt: 'Everything parents need to know about keeping their children healthy and happy.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
    date: 'Feb 10, 2024', category: 'Pediatrics',
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50/80 via-white to-primary-50/40">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-100/30 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 relative w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideUp">
              <div className="inline-flex items-center gap-2 bg-primary-100/80 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary-200/50">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft"></span>
                Your Health Matters to Us
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Your Health,{' '}
                <span className="gradient-text">Our Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed max-w-xl">
                Experience world-class healthcare with our team of expert professionals. 
                We are committed to providing compassionate, personalized care for you and your family.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link to="/book-appointment" className="btn-primary text-base flex items-center gap-2 shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/40">
                  <HiCalendar className="text-xl" />
                  Book Appointment
                  <HiChevronRight />
                </Link>
                <Link to="/services" className="btn-secondary text-base">
                  Our Services
                </Link>
              </div>
              <div className="flex items-center gap-5 mt-10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300">
                      <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    +2K
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500"><strong className="text-gray-900">4.9</strong> from 2,000+ reviews</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block animate-slideUp stagger-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=700&fit=crop"
                  alt="Healthcare"
                  className="rounded-3xl shadow-2xl w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary-900/20 to-transparent"></div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 animate-float">
                  <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <FiHeart className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">15K+</p>
                    <p className="text-sm text-gray-500">Happy Patients</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <FiStar className="text-amber-500 text-xl fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">4.9</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="card-premium p-6 md:p-8 text-center group">
                <div className="icon-box gradient-bg mx-auto mb-5 shadow-lg shadow-primary-500/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                  <stat.icon className="text-white text-2xl" />
                </div>
                <p className="stat-value gradient-text">{stat.value}</p>
                <p className="font-semibold text-gray-900 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 gradient-bg-subtle"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="badge-primary">What We Offer</span>
            <h2 className="section-title mt-4">Our Medical Services</h2>
            <p className="section-subtitle mx-auto">
              Comprehensive healthcare services tailored to meet your every need with compassion and expertise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <div key={i} className="card-premium p-8 group animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 gradient-bg-subtle rounded-2xl flex items-center justify-center mb-5 group-hover:gradient-bg group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <FiArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 md:py-28 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">Committed to Your <br/>Well-being</h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">
            We combine medical expertise with genuine compassion to provide you with the best healthcare experience possible.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-14 text-left">
            {[
              { num: '01', title: 'Expert Doctors', desc: 'Highly qualified specialists with years of experience in their fields.' },
              { num: '02', title: 'Modern Technology', desc: 'State-of-the-art equipment and advanced treatment methods.' },
              { num: '03', title: 'Patient First', desc: 'Personalized care plans designed around your unique needs.' },
            ].map((item, i) => (
              <div key={i} className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 hover:-translate-y-1 border border-white/5">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-white/20 transition-all text-white text-xl font-bold tracking-wider">
                  {item.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-primary">Our Team</span>
            <h2 className="section-title mt-4">Meet Our Specialists</h2>
            <p className="section-subtitle mx-auto">
              Dedicated professionals committed to providing you with the highest quality healthcare.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((doc, i) => (
              <div key={i} className="card-premium p-6 md:p-8 text-center group animate-slideUp" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative mx-auto mb-6 w-28 h-28">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="w-28 h-28 rounded-3xl overflow-hidden ring-2 ring-primary-100 group-hover:ring-4 group-hover:ring-primary-200 transition-all duration-500 relative">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{doc.name}</h3>
                <p className="text-sm text-primary-600 font-medium bg-primary-50 inline-block px-3 py-1 rounded-full mt-2">{doc.specialty}</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <FiStar key={s} className="text-yellow-400 fill-yellow-400 text-xs" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/doctors" className="btn-secondary inline-flex items-center gap-2">
              View All Doctors <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(43,191,191,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(13,148,136,0.08) 0%, transparent 50%)' }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaQuoteLeft className="text-2xl text-primary-500" />
          </div>
          <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed italic">
            "CarePoint transformed my healthcare experience. The doctors are incredibly knowledgeable 
            and the staff truly cares about patient well-being. I have never felt more supported in my health journey."
          </p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-primary-100 shadow-xl">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-lg">Sarah Mitchell</p>
              <p className="text-sm text-gray-500">Patient</p>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <FiStar key={s} className="text-yellow-400 fill-yellow-400 text-xs" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-primary">Health Blog</span>
            <h2 className="section-title mt-4">Latest Articles</h2>
            <p className="section-subtitle mx-auto">
              Stay informed with the latest health tips, medical insights, and wellness advice from our experts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <div key={i} className="card-premium overflow-hidden group animate-slideUp" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="h-56 overflow-hidden relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-600 shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">{blog.date}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">{blog.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{blog.excerpt}</p>
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <span className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <FiArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blogs" className="btn-secondary inline-flex items-center gap-2">
              View All Articles <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-bg rounded-3xl md:rounded-4xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            </div>
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90">
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-5 leading-tight">
                Ready to Book Your <br/>Appointment?
              </h2>
              <p className="text-white/70 mt-4 text-lg max-w-xl mx-auto">
                Take the first step towards better health. Schedule a visit with our expert doctors today.
              </p>
              <Link to="/book-appointment" 
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold py-4 px-10 rounded-2xl mt-10 
                  hover:bg-primary-50 transition-all shadow-2xl shadow-black/10 hover:shadow-black/20 text-lg group">
                <HiCalendar className="text-xl" />
                Book Now
                <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
