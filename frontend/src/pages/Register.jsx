import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      const user = await register(payload);
      toast.success(`Welcome to EcoStay, ${user.name.split(' ')[0]}!`);
      // New registrations are always guests, so send them into the guest flow.
      navigate('/rooms');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1 className="mt-4 font-display text-2xl font-semibold text-forest-800 dark:text-sand-50">Create your account</h1>
          <p className="mt-1 font-body text-sm text-ink/60 dark:text-sand-100/60">Join EcoStay to book rooms and track your stays</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-7">
          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Full name</label>
            <div className="relative">
              <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Ananya Rao" className="input-field pl-11" />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Email address</label>
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-11" />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Phone number</label>
            <div className="relative">
              <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="98765 43210" className="input-field pl-11" />
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
                placeholder="At least 6 characters"
                className="input-field pl-11 pr-11"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40 hover:text-ink/70 dark:hover:text-sand-100/70">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm font-medium text-ink/80 dark:text-sand-100/80">Confirm password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-sand-100/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="input-field pl-11"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center font-body text-sm text-ink/60 dark:text-sand-100/60">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-clay-500 hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
