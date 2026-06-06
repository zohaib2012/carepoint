import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 1000);
  };

  const info = [
    { icon: FiMapPin, label: 'Address', value: '123 Health Street, Medical District, New York, NY 10001', color: 'from-primary-500 to-primary-600' },
    { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', color: 'from-blue-500 to-blue-600' },
    { icon: FiMail, label: 'Email', value: 'info@carepoint.com', color: 'from-purple-500 to-purple-600' },
    { icon: FiClock, label: 'Working Hours', value: 'Mon - Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 5:00 PM', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <>
      <section className="gradient-bg py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
            Contact <span className="text-primary-200">Us</span>
          </h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="card-premium p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                      <input type="text" placeholder="John Doe" required value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Email</label>
                      <input type="email" placeholder="john@example.com" required value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input type="text" placeholder="How can we help you?" value={form.subject} 
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea rows="6" placeholder="Tell us more about your inquiry..." required value={form.message} 
                      onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={sending} 
                    className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/20">
                    {sending ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> Sending...</>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-5">
              {info.map((item, i) => (
                <div key={i} className="card-premium p-6 flex items-start gap-4 group hover:-translate-y-0.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="card-premium p-6 gradient-bg text-white">
                <div className="flex items-center gap-3 mb-3">
                  <FiClock className="text-2xl text-white/80" />
                  <h3 className="font-bold">Quick Response</h3>
                </div>
                <p className="text-white/80 text-sm">We typically respond within 24 hours on business days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-96 bg-gray-200 overflow-hidden relative">
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.914770145!2d-74.119763!3d40.697403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none border-t border-gray-200"></div>
      </section>
    </>
  );
}
