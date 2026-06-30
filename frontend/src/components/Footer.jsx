import { Link } from 'react-router-dom'
import { Leaf, MapPin, Phone, Mail } from 'lucide-react'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/><path d="M20 4h-5l-11 16H9"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-eco-950 border-t border-eco-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl p-1.5 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </span>
            <span className="text-white font-bold">EcoStay</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            AI-powered direct booking for Trishul Eco-Homestays, Uttarakhand. No commissions, just authentic stays.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: InstagramIcon, href: 'https://instagram.com/trishulecohomestays', label: 'Instagram', color: 'hover:text-pink-400' },
              { Icon: FacebookIcon, href: 'https://facebook.com/trishulecohomestays', label: 'Facebook', color: 'hover:text-blue-400' },
              { Icon: TwitterIcon, href: 'https://twitter.com/trishuleco', label: 'Twitter', color: 'hover:text-sky-400' },
            ].map(({ Icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className={`text-slate-500 ${color} transition-all duration-200 hover:scale-110`}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2.5">
            {[['/', 'Home'], ['/about', 'About'], ['/rooms', 'Rooms'], ['/login', 'Book a stay'], ['/showcase', 'Components']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-slate-400 hover:text-eco-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Account</h4>
          <ul className="space-y-2.5">
            {[['/login', 'Log in as guest'], ['/login', 'Log in as owner'], ['/login', 'Register']].map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="text-slate-400 hover:text-eco-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-slate-400 text-sm">
              <MapPin size={14} className="text-eco-500 mt-0.5 shrink-0" />
              Trishul Eco-Homestays, Munsiyari Road, Uttarakhand, India
            </li>
            <li className="flex items-center gap-2 text-slate-400 text-sm">
              <Phone size={14} className="text-eco-500 shrink-0" />
              +91 12345 67890
            </li>
            <li className="flex items-center gap-2 text-slate-400 text-sm">
              <Mail size={14} className="text-eco-500 shrink-0" />
              stay@trishuleco.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-eco-800/30 px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-slate-500 text-xs">© 2026 Trishul Eco-Homestays. Built at TBI GEU.</span>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-eco-500 inline-block"></span>AI-Powered</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"></span>Eco-Certified</span>
        </div>
      </div>
    </footer>
  )
}
