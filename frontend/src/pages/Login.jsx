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

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);

      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'owner') {
        navigate('/owner', { replace: true });
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

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-ink/10 dark:bg-sand-100/10" />
            <span className="font-body text-xs uppercase tracking-wide text-ink/40 dark:text-sand-100/40">or</span>
            <div className="h-px flex-1 bg-ink/10 dark:bg-sand-100/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-ink/15 bg-white px-4 py-2.5 font-body text-sm font-medium text-ink shadow-sm transition hover:bg-sand-50 dark:border-sand-100/15 dark:bg-forest-900 dark:text-sand-50 dark:hover:bg-forest-800"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.86 2.7-6.62z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
            </svg>
            Continue with Google
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
          <br />
          Demo owner: owner@ecostay.com / Owner@123
        </p>
      </div>
    </div>
  );
};

export default Login;