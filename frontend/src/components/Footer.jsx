import { Link } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all">
                <HiCalendar className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">
                Care<span className="text-primary-400">Point</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your health is our top priority. We provide world-class healthcare services with compassion and excellence.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: FaFacebook, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} 
                  className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center 
                    hover:bg-primary-500 transition-all duration-300 text-gray-400 hover:text-white
                    hover:shadow-lg hover:shadow-primary-500/20">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/doctors', label: 'Doctors' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3.5">
              {['General Checkup', 'Dental Care', 'Cardiology', 'Pediatrics', 'Orthopedics'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin className="text-primary-400 text-sm" />
                </div>
                <span className="text-sm text-gray-400">123 Health Street, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                  <FiPhone className="text-primary-400 text-sm" />
                </div>
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                  <FiMail className="text-primary-400 text-sm" />
                </div>
                <span className="text-sm text-gray-400">info@carepoint.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CarePoint. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
