import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input } from '../components/ui'
import { useToast } from '../components/ui'
import { authAPI } from '../services/api'
import { Leaf, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [role, setRole] = useState('owner')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!email) errs.email = 'Email is required'
    if (!password) errs.password = 'Password is required'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      const res = await authAPI.login({ email, password })
      localStorage.setItem('ecostay-token', res.data.token)
      localStorage.setItem('ecostay-user', JSON.stringify(res.data))
      showToast(`Welcome back, ${res.data.name}!`, { type: 'success' })
      navigate(res.data.role === 'owner' ? '/dashboard/owner' : '/dashboard/guest')
    } catch (err) {
      showToast(err.message || 'Login failed', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Photo side */}
        <div className="hidden lg:block relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop&q=80"
            alt="Himalayan valley" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-eco-950/90 via-eco-950/50 to-eco-950/20" />
          <div className="absolute bottom-12 left-10 right-10 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl p-2"><Leaf size={20} className="text-white" /></span>
              <span className="text-white font-black text-xl">EcoStay</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Two roles,<br /><span className="gradient-text">one platform</span></h2>
            <p className="text-white/70 leading-relaxed mb-6">Whether you're planning your mountain escape or managing your property, EcoStay gives you the right tools.</p>
            <div className="space-y-3">
              {[
                { icon: '👤', title: 'Guest', sub: 'Browse rooms, book stays, leave reviews' },
                { icon: '🏡', title: 'Homestay Owner', sub: 'Manage bookings, analyze reviews with AI' },
              ].map(item => (
                <div key={item.title} className="glass rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-white/60 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 glass rounded-2xl">
              <p className="text-eco-300 text-xs font-bold mb-1">🔑 Demo credentials</p>
              <p className="text-white/70 text-xs">Owner: sunita@trishul.in / owner123</p>
              <p className="text-white/70 text-xs">Guest: guest@example.com / guest123</p>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="flex items-center justify-center px-4 sm:px-8 py-12">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <span className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl p-1.5"><Leaf size={16} className="text-white" /></span>
              <span className="text-slate-900 dark:text-white font-black">EcoStay</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Welcome back 👋</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Sign in to your EcoStay account</p>

            {/* Role toggle */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 mb-6">
              {['guest', 'owner'].map(r => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200 ${
                    role === r ? 'bg-gradient-to-r from-eco-500 to-eco-600 text-white shadow-lg shadow-eco-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  }`}>{r === 'owner' ? 'Owner / Admin' : 'Guest'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Input label="Email address" type="email" placeholder={role === 'owner' ? 'sunita@trishul.in' : 'guest@example.com'}
                value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
              <div className="relative">
                <Input label="Password" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
                Log in as {role === 'owner' ? 'owner' : 'guest'}
              </Button>
            </form>

            <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-5">
              New here?{' '}
              <a href="#" className="text-eco-600 dark:text-eco-400 font-bold hover:underline">Create an account</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
