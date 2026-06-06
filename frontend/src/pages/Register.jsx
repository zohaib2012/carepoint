import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'patient' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const user = await register(form);
      toast.success('Account created successfully!');
      navigate(user.role === 'doctor' ? '/doctor' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center text-white max-w-md relative">
          <div className="w-72 h-72 mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10">
            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=400&fit=crop" alt="Join us" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold">Join CarePoint Today</h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            Create your account and start managing your healthcare journey with us.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-primary-50/30">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-12 justify-center group">
            <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all">
              <HiCalendar className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-900">Care<span className="gradient-text">Point</span></span>
          </Link>
          <div className="card-premium p-6 sm:p-8 md:p-10 animate-slideUp">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Create Account</h2>
            <p className="text-gray-500 text-sm text-center mt-2">Join our healthcare community</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" required value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    className="input-field pl-11" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" required value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    className="input-field pl-11" placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      className="input-field pl-11" placeholder="+1 (555)" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={show ? 'text' : 'password'} required value={form.password} 
                      onChange={(e) => setForm({ ...form, password: e.target.value })} 
                      className="input-field pl-11 pr-12" placeholder="••••••" />
                    <button type="button" onClick={() => setShow(!show)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {show ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'patient', label: 'Patient', icon: '👤' },
                    { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: r.value })}
                      className={`py-3.5 rounded-2xl text-sm font-medium border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        form.role === r.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg shadow-primary-500/10'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{r.icon}</span> {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading} 
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20">
                {loading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> Creating account...</>
                ) : (
                  <>Create Account <FiArrowRight /></>
                )}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
