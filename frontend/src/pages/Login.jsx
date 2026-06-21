import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input } from '../components/ui'
import { useToast } from '../components/ui'

export default function Login() {
  const [role, setRole] = useState('owner')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!email) nextErrors.email = 'Email is required'
    if (!password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      showToast(`Logged in as ${role === 'owner' ? 'owner' : 'guest'} (demo only)`, {
        type: 'success',
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-forest-950">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-forest-600 dark:text-forest-300 font-semibold text-xs tracking-widest uppercase mb-3">
            Welcome Back
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 dark:text-forest-50 mb-4">
            Two roles, one platform
          </h1>
          <p className="text-forest-800/70 dark:text-forest-100/70 leading-relaxed max-w-md mb-6">
            Whether you're planning your mountain escape or managing your property, EcoStay
            gives you the right tools.
          </p>

          <div className="space-y-3 max-w-md">
            <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-4 flex items-start gap-3">
              <span className="bg-forest-50 dark:bg-forest-900 w-9 h-9 rounded-lg flex items-center justify-center">
                👤
              </span>
              <div>
                <h3 className="font-semibold text-forest-900 dark:text-forest-50 text-sm">Guest</h3>
                <p className="text-forest-800/60 dark:text-forest-100/60 text-sm">
                  Browse rooms, book stays, leave reviews
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-forest-800 border border-forest-300 dark:border-forest-500 ring-1 ring-forest-300 dark:ring-forest-500 rounded-xl p-4 flex items-start gap-3">
              <span className="bg-forest-50 dark:bg-forest-900 w-9 h-9 rounded-lg flex items-center justify-center">
                🏡
              </span>
              <div>
                <h3 className="font-semibold text-forest-900 dark:text-forest-50 text-sm">Homestay owner</h3>
                <p className="text-forest-800/60 dark:text-forest-100/60 text-sm">
                  Manage bookings, analyze reviews with AI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 sm:p-8 w-full">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-1">Log in to EcoStay</h2>
          <p className="text-forest-800/60 dark:text-forest-100/60 text-sm mb-5">Select your role and continue</p>

          <div className="grid grid-cols-2 gap-2 bg-forest-50 dark:bg-forest-900 rounded-lg p-1 mb-5">
            <button
              type="button"
              onClick={() => setRole('guest')}
              className={`text-sm font-medium py-2 rounded-md transition-colors ${
                role === 'guest'
                  ? 'bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 shadow-sm'
                  : 'text-forest-800/60 dark:text-forest-100/60'
              }`}
            >
              Guest
            </button>
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`text-sm font-medium py-2 rounded-md transition-colors ${
                role === 'owner'
                  ? 'bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 shadow-sm'
                  : 'text-forest-800/60 dark:text-forest-100/60'
              }`}
            >
              Owner / Admin
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="sunita@trishul.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <Button type="submit" className="w-full" size="lg">
              Log in as {role === 'owner' ? 'owner' : 'guest'}
            </Button>
          </form>

          <p className="text-center text-forest-800/60 dark:text-forest-100/60 text-sm mt-4">
            New here?{' '}
            <a href="#" className="text-forest-600 dark:text-forest-300 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}