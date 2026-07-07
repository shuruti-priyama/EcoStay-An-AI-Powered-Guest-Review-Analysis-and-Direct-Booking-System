import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);

      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-350px)] items-center justify-center bg-sand-50 dark:bg-forest-950 px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-700 text-sand-50">
            <Leaf size={22} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">Welcome back</h1>
          <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">Log in to manage your bookings at EcoStay</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-7">
          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Email address</label>
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field pl-11"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40 hover:text-ink/70 dark:hover:text-sand-100/70"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <p className="text-center font-body text-sm text-ink/60 dark:text-sand-100/60">
            New to EcoStay?{' '}
            <Link to="/register" className="font-semibold text-clay-500 hover:underline">
              Create an account
            </Link>
          </p>
        </form>

        <p className="mt-6 rounded-xl bg-forest-50 dark:bg-forest-900 p-3 text-center font-body text-xs text-forest-700 dark:text-sand-200">
          Demo admin: admin@ecostay.com / Admin@123 &nbsp;•&nbsp; Demo guest: guest@ecostay.com / Guest@123
        </p>
      </div>
    </div>
  );
};

export default Login;
