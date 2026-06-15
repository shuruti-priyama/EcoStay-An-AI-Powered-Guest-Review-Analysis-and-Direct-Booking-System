import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {
  const [role, setRole] = useState('owner')

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-forest-600 font-semibold text-xs tracking-widest uppercase mb-3">
            Welcome Back
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
            Two roles, one platform
          </h1>
          <p className="text-forest-800/70 leading-relaxed max-w-md mb-6">
            Whether you're planning your mountain escape or managing your property, EcoStay
            gives you the right tools.
          </p>

          <div className="space-y-3 max-w-md">
            <div className="bg-white border border-forest-100 rounded-xl p-4 flex items-start gap-3">
              <span className="bg-forest-50 w-9 h-9 rounded-lg flex items-center justify-center">
                👤
              </span>
              <div>
                <h3 className="font-semibold text-forest-900 text-sm">Guest</h3>
                <p className="text-forest-800/60 text-sm">
                  Browse rooms, book stays, leave reviews
                </p>
              </div>
            </div>

            <div className="bg-white border border-forest-300 ring-1 ring-forest-300 rounded-xl p-4 flex items-start gap-3">
              <span className="bg-forest-50 w-9 h-9 rounded-lg flex items-center justify-center">
                🏡
              </span>
              <div>
                <h3 className="font-semibold text-forest-900 text-sm">Homestay owner</h3>
                <p className="text-forest-800/60 text-sm">
                  Manage bookings, analyze reviews with AI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-forest-100 rounded-xl p-6 sm:p-8 w-full">
          <h2 className="text-xl font-semibold text-forest-900 mb-1">Log in to EcoStay</h2>
          <p className="text-forest-800/60 text-sm mb-5">Select your role and continue</p>

          <div className="grid grid-cols-2 gap-2 bg-forest-50 rounded-lg p-1 mb-5">
            <button
              onClick={() => setRole('guest')}
              className={`text-sm font-medium py-2 rounded-md transition-colors ${
                role === 'guest'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-forest-800/60'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => setRole('owner')}
              className={`text-sm font-medium py-2 rounded-md transition-colors ${
                role === 'owner'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-forest-800/60'
              }`}
            >
              Owner / Admin
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-forest-900 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="sunita@trishul.in"
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm placeholder-forest-800/30 focus:outline-none focus:ring-2 focus:ring-forest-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-900 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-forest-200 rounded-lg px-3 py-2 text-sm placeholder-forest-800/30 focus:outline-none focus:ring-2 focus:ring-forest-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-forest-700 text-white font-semibold py-2.5 rounded-lg hover:bg-forest-800 transition-colors"
            >
              Log in as {role === 'owner' ? 'owner' : 'guest'}
            </button>
          </form>

          <p className="text-center text-forest-800/60 text-sm mt-4">
            New here?{' '}
            <a href="#" className="text-forest-600 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
