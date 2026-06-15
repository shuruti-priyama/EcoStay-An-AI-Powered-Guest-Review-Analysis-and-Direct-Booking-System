import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-100/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 text-white font-semibold mb-2">
            <span className="bg-forest-600 rounded-md p-1.5 flex items-center justify-center">
              <Leaf size={14} />
            </span>
            EcoStay
          </div>
          <p className="text-forest-100/60 leading-relaxed">
            AI-powered homestay management for Trishul Eco-Homestays, Uttarakhand. TBI GEU Summer
            Internship 2026.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2 tracking-wide text-xs uppercase">
            Navigate
          </h4>
          <ul className="space-y-1.5 text-forest-100/70">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/rooms" className="hover:text-white">Rooms</Link></li>
            <li><Link to="/login" className="hover:text-white">Book a stay</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2 tracking-wide text-xs uppercase">
            Account
          </h4>
          <ul className="space-y-1.5 text-forest-100/70">
            <li><Link to="/login" className="hover:text-white">Log in as guest</Link></li>
            <li><Link to="/login" className="hover:text-white">Log in as owner</Link></li>
            <li><Link to="/login" className="hover:text-white">Register</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-700/50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-forest-100/50 max-w-6xl mx-auto">
        <span>© 2026 Trishul Eco-Homestays. Built at TBI GEU.</span>
        <span className="flex items-center gap-3">
          <span>AI-Powered</span>
          <span>Eco-Certified</span>
        </span>
      </div>
    </footer>
  )
}
