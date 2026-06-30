import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Zap, Leaf, Shield, Users } from 'lucide-react'

const whatWeDo = [
  { icon: <Users size={20} />, title: 'Direct Booking', desc: 'Guests book rooms directly without relying on third-party platforms.', color: 'from-eco-400 to-eco-600' },
  { icon: <Zap size={20} />, title: 'AI Review Analysis', desc: 'AI classifies sentiment, tags themes, and suggests professional responses.', color: 'from-amber-400 to-orange-500' },
  { icon: <Shield size={20} />, title: 'Role-Based Access', desc: 'Guests browse and book. Owners manage and analyze. Clear boundaries.', color: 'from-sky-400 to-blue-500' },
  { icon: <Leaf size={20} />, title: 'Eco by Design', desc: 'Solar-powered, plastic-free, locally sourced. Technology mirrors our values.', color: 'from-purple-400 to-purple-600' },
]
const modules = [
  { icon: '👤', title: 'Guest Portal', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80', items: ['Browse available rooms', 'Check room availability', 'Submit booking requests', 'View booking history', 'Manage profile'] },
  { icon: '🏡', title: 'Owner Dashboard', image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&auto=format&fit=crop&q=80', items: ['Manage rooms via API', 'Update availability live', 'View all bookings', 'Analyze reviews with AI', 'Track business metrics'] },
]

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&auto=format&fit=crop&q=80" alt="Forest cabin" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-eco-950/90 via-eco-950/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
            <span className="text-eco-300 font-semibold text-xs uppercase tracking-widest">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 max-w-2xl leading-tight">
            A forest retreat,<br /><span className="gradient-text">powered by technology</span>
          </h1>
          <p className="text-white/70 max-w-xl leading-relaxed mb-8">
            Helping homestay owners manage bookings efficiently while providing guests with a seamless, commission-free booking experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/rooms')} className="bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold px-6 py-3 rounded-2xl hover:from-eco-400 hover:to-eco-500 hover:scale-105 hover:shadow-xl hover:shadow-eco-500/40 transition-all duration-200 btn-ripple">
              Explore Rooms
            </button>
            <button className="glass text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-200 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
      </section>

      <main className="flex-1">
        {/* Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">About EcoStay</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                EcoStay is a modern homestay management platform designed to connect travelers with unique accommodation experiences while helping homestay owners manage their properties more effectively.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The platform enables direct bookings, reducing dependency on third-party travel websites and creating stronger relationships between guests and property owners.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-72 group animate-fade-in">
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80" alt="Forest path" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-950/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-gradient-to-br from-eco-950 to-slate-900 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-2">What We Do</h2>
              <p className="text-slate-400">Four pillars of the EcoStay platform</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whatWeDo.map((item, i) => (
                <div key={item.title} className={`glass rounded-2xl p-5 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-fade-in-up animate-delay-${i * 100}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'Mission', text: 'To empower homestay owners with innovative digital tools that simplify booking management and improve guest experiences.', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80', from: 'from-eco-800', to: 'to-eco-950' },
              { title: 'Vision', text: 'To become a trusted platform connecting travelers with authentic homestay experiences while supporting local hospitality businesses.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', from: 'from-sky-900', to: 'to-eco-950' },
            ].map(m => (
              <div key={m.title} className={`relative overflow-hidden bg-gradient-to-br ${m.from} ${m.to} rounded-3xl p-8 group hover:-translate-y-1 transition-all duration-300`}>
                <img src={m.img} alt={m.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500" />
                <div className="relative z-10">
                  <h3 className="font-black text-white text-xl mb-3">{m.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Modules */}
        <section className="bg-slate-100 dark:bg-slate-800/50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Platform Modules</h2>
              <p className="text-slate-500 dark:text-slate-400">Built for two roles, on one platform</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {modules.map((m, i) => (
                <div key={m.title} className={`bg-white dark:bg-slate-800 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-eco-500/10 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animate-delay-${i * 100}`}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-eco-950/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="glass rounded-xl px-3 py-1.5 text-white font-bold text-sm">{m.icon} {m.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {m.items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <span className="w-5 h-5 rounded-full bg-eco-50 dark:bg-eco-950 flex items-center justify-center text-eco-500 text-xs font-bold shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&auto=format&fit=crop&q=80" alt="Mountains" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-eco-950/80" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Ready to Discover<br /><span className="gradient-text">Better Homestay Experiences?</span></h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">Join EcoStay today and experience smarter booking management.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate('/rooms')} className="bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold px-6 py-3.5 rounded-2xl hover:from-eco-400 hover:to-eco-500 hover:scale-105 hover:shadow-xl hover:shadow-eco-500/40 transition-all duration-200 btn-ripple">
                Explore Rooms
              </button>
              <button className="glass text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-white/20 transition-all duration-200 hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
