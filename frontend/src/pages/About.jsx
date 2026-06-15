import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const whatWeDo = [
  {
    icon: '🏠',
    title: 'Direct Booking',
    description:
      'Guests can book rooms directly without relying on third-party booking platforms.',
  },
  {
    icon: '📅',
    title: 'Booking Management',
    description:
      'Owners can manage room availability and booking requests through a centralized dashboard.',
  },
  {
    icon: '🤖',
    title: 'AI Review Analysis',
    description:
      'AI helps owners understand guest feedback and identify areas for improvement.',
  },
  {
    icon: '📊',
    title: 'Business Insights',
    description: 'Track booking trends, occupancy rates, and guest satisfaction.',
  },
]

const modules = [
  {
    icon: '👤',
    title: 'Guest Portal',
    items: [
      'Browse available rooms',
      'Check room availability',
      'Submit booking requests',
      'View booking history',
      'Manage profile',
    ],
  },
  {
    icon: '🏡',
    title: 'Owner Dashboard',
    items: [
      'Manage rooms',
      'Update availability',
      'View booking requests',
      'Analyze guest reviews',
      'Track business performance',
    ],
  },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Banner */}
        <section className="bg-forest-800 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3">EcoStay</h1>
            <p className="text-forest-100/80 text-base sm:text-xl max-w-2xl mx-auto mb-2">
              AI-Powered Direct Booking Platform for Homestays
            </p>
            <p className="text-forest-100/60 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Helping homestay owners manage bookings efficiently while providing guests with
              a seamless booking experience.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/rooms')}
                className="bg-white text-forest-800 font-semibold px-5 py-3 rounded-lg hover:bg-forest-50 transition-colors"
              >
                Explore Rooms
              </button>
              <button className="border border-white/30 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-forest-600 font-semibold text-xs tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-900 mb-4 max-w-2xl">
            About EcoStay
          </h2>
          <p className="text-forest-800/70 leading-relaxed max-w-2xl mb-3">
            EcoStay is a modern homestay management platform designed to connect travelers
            with unique accommodation experiences while helping homestay owners manage their
            properties more effectively.
          </p>
          <p className="text-forest-800/70 leading-relaxed max-w-2xl">
            The platform enables direct bookings, reducing dependency on third-party travel
            websites and creating stronger relationships between guests and property owners.
          </p>
        </section>

        {/* What We Do */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-900 mb-6">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatWeDo.map((item) => (
              <div key={item.title} className="bg-white border border-forest-100 rounded-xl p-5">
                <div className="bg-forest-50 w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-forest-900 mb-1">{item.title}</h3>
                <p className="text-forest-800/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white border border-forest-100 rounded-xl p-6">
              <h3 className="font-semibold text-forest-900 text-lg mb-2">Mission</h3>
              <p className="text-forest-800/70 text-sm leading-relaxed">
                To empower homestay owners with innovative digital tools that simplify booking
                management and improve guest experiences.
              </p>
            </div>
            <div className="bg-white border border-forest-100 rounded-xl p-6">
              <h3 className="font-semibold text-forest-900 text-lg mb-2">Vision</h3>
              <p className="text-forest-800/70 text-sm leading-relaxed">
                To become a trusted platform connecting travelers with authentic homestay
                experiences while supporting local hospitality businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Modules */}
        <section className="bg-forest-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-forest-900 mb-6">
              Platform Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {modules.map((m) => (
                <div key={m.title} className="bg-white border border-forest-100 rounded-xl p-6">
                  <div className="bg-forest-100 w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4">
                    {m.icon}
                  </div>
                  <h3 className="font-semibold text-forest-900 text-lg mb-3">{m.title}</h3>
                  <ul className="space-y-2">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-forest-800/70 text-sm">
                        <span className="text-forest-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-forest-800 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Discover Better Homestay Experiences?
            </h2>
            <p className="text-forest-100/70 max-w-xl mx-auto mb-8">
              Join EcoStay today and experience smarter booking management.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/rooms')}
                className="bg-white text-forest-800 font-semibold px-5 py-3 rounded-lg hover:bg-forest-50 transition-colors"
              >
                Explore Rooms
              </button>
              <button className="border border-white/30 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/10 transition-colors">
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
