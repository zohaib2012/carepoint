import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const timeline = [
  { year: '2010', title: 'Foundation', desc: 'CarePoint was established with a vision to transform healthcare.' },
  { year: '2013', title: 'Expansion', desc: 'Opened our second clinic and introduced specialized departments.' },
  { year: '2017', title: 'Innovation', desc: 'Implemented state-of-the-art medical technology and EHR systems.' },
  { year: '2021', title: 'Recognition', desc: 'Awarded Best Healthcare Provider for excellence in patient care.' },
  { year: '2024', title: 'Growing', desc: 'Serving over 15,000 patients annually with a team of 50+ specialists.' },
];

export default function About() {
  return (
    <>
      <section className="gradient-bg py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">Our Story</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Dedicated to providing exceptional healthcare with compassion, innovation, and excellence.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=500&fit=crop" alt="About" className="rounded-3xl shadow-lg w-full h-[400px] object-cover" />
            </div>
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="section-title mt-3">A Legacy of Healthcare Excellence</h2>
              <p className="text-gray-500 mt-6 leading-relaxed">
                For over a decade, CarePoint has been at the forefront of medical care, combining clinical expertise with genuine compassion. Our team of dedicated professionals works tirelessly to ensure every patient receives personalized, world-class treatment.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { icon: FiTarget, title: 'Our Mission', desc: 'To provide accessible, high-quality healthcare that improves lives.' },
                  { icon: FiEye, title: 'Our Vision', desc: 'A world where everyone has access to exceptional medical care.' },
                ].map((item, i) => (
                  <div key={i} className="card p-5">
                    <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center mb-3">
                      <item.icon className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="section-title mt-3">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🫂', title: 'Compassion', desc: 'We treat every patient with the warmth and respect they deserve, understanding that healthcare is personal.' },
              { icon: '🔬', title: 'Innovation', desc: 'We embrace cutting-edge medical technology and continuously improve our treatment methods.' },
              { icon: '⭐', title: 'Excellence', desc: 'We strive for the highest standards in everything we do, from diagnosis to recovery.' },
            ].map((v, i) => (
              <div key={i} className="card p-8 text-center hover:-translate-y-1">
                <span className="text-5xl block mb-5">{v.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="section-title mt-3">How We Work</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2"></div>
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                    <div className="card p-6 inline-block">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30">
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:hidden">
                    <div className="card p-4">
                      <span className="text-xs text-primary-600 font-bold">{item.year}</span>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
