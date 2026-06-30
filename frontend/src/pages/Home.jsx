import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { Loader } from '../components/ui'
import { roomsAPI } from '../services/api'
import { ArrowRight, Shield, Zap, Leaf } from 'lucide-react'

const FALLBACK_ROOMS = [
  { id: '1', title: 'Bamboo Suite', price: 3200, capacity: 2, bedType: 'King bed', status: 'available', rating: 4.8, reviewCount: 18, badge: 'Available', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80' },
  { id: '2', title: 'Forest Loft', price: 4800, capacity: 4, bedType: '2 beds', status: 'available', rating: 4.9, reviewCount: 24, badge: 'Available', image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=80' },
  { id: '3', title: 'Mountain View', price: 2900, capacity: 2, bedType: 'Queen bed', status: 'available', rating: 4.7, reviewCount: 12, badge: 'Available', image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&auto=format&fit=crop&q=80' },
]

const features = [
  { icon: <Leaf size={22} />, title: 'Eco-Certified Stay', desc: 'Solar-powered, zero-plastic, composting kitchen. Stay guilt-free.', color: 'from-eco-400 to-eco-600' },
  { icon: <Zap size={22} />, title: 'AI Review Insights', desc: 'Every review analyzed by AI — faster responses, happier guests.', color: 'from-amber-400 to-orange-500' },
  { icon: <Shield size={22} />, title: 'Commission-Free', desc: 'Book directly. Save up to 18% vs OTA sites. Owners earn more.', color: 'from-sky-400 to-blue-500' },
]

const testimonials = [
  { quote: 'Waking up to mountain views every morning was something I will never forget.', name: 'Priya S.', role: 'Guest from Delhi', stars: 5 },
  { quote: 'The most peaceful place I have ever stayed. Food was incredible.', name: 'Arjun M.', role: 'Guest from Bangalore', stars: 5 },
  { quote: 'No commission, no middlemen — just a direct connection with an amazing place.', name: 'Sneha R.', role: 'Guest from Mumbai', stars: 5 },
]

const gallery = [
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', alt: 'Himalayan peaks', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?w=400&auto=format&fit=crop&q=80', alt: 'Mountain trail' },
  { src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&auto=format&fit=crop&q=80', alt: 'Village' },
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80', alt: 'Valley' },
]

export default function Home() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    roomsAPI.getAll({ status: 'available' })
      .then(res => setRooms(res.data.slice(0, 3)))
      .catch(() => setRooms(FALLBACK_ROOMS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <SearchBar />
      <main className="flex-1">
        <Hero eyebrow="Direct Booking · Authentic Himalayan Stay"
          title="Escape the noise," highlight="embrace the mountains"
          description="Experience the warmth of Trishul Eco-Homestays, surrounded by breathtaking Himalayan landscapes and unforgettable hospitality."
          primaryAction="Check availability" secondaryAction="Learn more"
          rating={{ score: '4.8 / 5', label: '54 verified reviews' }} />

        {/* Available Rooms */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-eco-600 dark:text-eco-400 font-semibold text-xs uppercase tracking-widest mb-1">Live from API</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Available Rooms</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Hand-picked stays for every kind of traveller</p>
            </div>
            <a href="/rooms" className="hidden sm:flex items-center gap-1 text-eco-600 dark:text-eco-400 font-semibold text-sm hover:gap-2 transition-all duration-200 group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <div className="skeleton aspect-[4/3]" />
                  <div className="p-5 space-y-3">
                    <Loader variant="skeleton" lines={3} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, i) => (
                <div key={room.id} className={`animate-fade-in-up animate-delay-${i * 100}`}>
                  <Card
                    badge={room.status === 'available' ? 'Available' : 'Booked'}
                    image={room.images?.[0]}
                    title={room.title}
                    meta={`👥 ${room.capacity} guests · 🛏 ${room.bedType}`}
                    price={room.price}
                    rating={room.rating}
                    reviewCount={room.reviewCount}
                    secondaryAction="Details"
                    primaryAction="Book now"
                    disabled={room.status !== 'available'}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">The Himalayan Experience</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Step outside your room and into nature</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-3 h-[380px] sm:h-[440px]">
            {gallery.map((item, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.span || ''}`}>
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-eco-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-sm font-bold">{item.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-gradient-to-br from-eco-950 to-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-2">Why Stay With Us?</h2>
              <p className="text-slate-400">Everything we do is rooted in nature and honesty</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className={`glass rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 animate-fade-in-up animate-delay-${i * 100}`}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">What Our Guests Say</h2>
            <p className="text-slate-500 dark:text-slate-400">Trusted by travellers from across India</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-eco-500/5 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up animate-delay-${i * 100}`}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden mb-0">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&auto=format&fit=crop&q=80" alt="Mountain" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-eco-950/90 to-eco-900/70" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Ready for your<br /><span className="gradient-text">mountain escape?</span></h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">Book directly with Trishul Eco-Homestays and save up to 18% vs third-party sites.</p>
            <a href="/rooms" className="inline-flex items-center gap-2 bg-gradient-to-r from-eco-500 to-eco-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-eco-400 hover:to-eco-500 hover:scale-105 hover:shadow-2xl hover:shadow-eco-500/40 transition-all duration-200 btn-ripple">
              Browse Rooms <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
