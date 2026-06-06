import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'doctor') navigate('/doctor');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-primary-50/30">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-12 justify-center group">
            <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all">
              <HiCalendar className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-900">Care<span className="gradient-text">Point</span></span>
          </Link>
          <div className="card-premium p-6 sm:p-8 md:p-10 animate-slideUp">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
            <p className="text-gray-500 text-sm text-center mt-2">Sign in to your account to continue</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" required value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    className="input-field pl-11" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={show ? 'text' : 'password'} required value={form.password} 
                    onChange={(e) => setForm({ ...form, password: e.target.value })} 
                    className="input-field pl-11 pr-12" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShow(!show)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {show ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} 
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20">
                {loading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> Signing in...</>
                ) : (
                  <>Sign In <FiArrowRight /></>
                )}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center text-white max-w-md relative">
          <div className="w-72 h-72 mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop" alt="Healthcare" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold">Your Health Matters</h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            Access your appointments, medical records, and more with your CarePoint account.
          </p>
        </div>
      </div>
    </div>
  );
}
