import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'

const rooms = [
  {
    badge: 'Available',
    icon: '🏠',
    title: 'Bamboo Suite',
    meta: '👥 2 guests · 🛏 King bed',
    price: '₹3,200 / night',
    secondaryAction: 'Details',
    primaryAction: 'Book now',
  },
  {
    badge: 'Available',
    icon: '🌲',
    title: 'Forest Loft',
    meta: '👥 4 guests · 🛏 2 beds',
    price: '₹4,800 / night',
    secondaryAction: 'Details',
    primaryAction: 'Book now',
  },
  {
    badge: 'Available',
    icon: '⛰️',
    title: 'Mountain View',
    meta: '👥 2 guests · 🛏 Queen bed',
    price: '₹2,900 / night',
    secondaryAction: 'Details',
    primaryAction: 'Book now',
  },
]

const features = [
  {
    icon: '🌿',
    title: 'Eco-friendly stay',
    description:
      'Experience sustainable living with nature-inspired accommodations designed to minimize environmental impact.',
  },
  {
    icon: '✨',
    title: 'AI review insights',
    description:
      'Our AI API reads every review so owners respond faster and guests feel heard.',
  },
  {
    icon: '🔒',
    title: 'Commission-Free Reservations',
    description:
      'Connect directly with travelers, manage reservations seamlessly, and maximize earnings without third-party commissions.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-forest-950">
      <Navbar />
      <SearchBar />

      <main className="flex-1">
        <Hero
          eyebrow="Direct Booking · Authentic Himalayan Stay"
          title="Escape the noise,"
          highlight="embrace the mountains"
          description="Experience the warmth of Trishul Eco-Homestays, surrounded by breathtaking Himalayan landscapes, fresh mountain air, and unforgettable hospitality."
          primaryAction="Check availability"
          secondaryAction="Learn more"
        />

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50">Available rooms</h2>
            <a href="#" className="text-forest-600 dark:text-forest-300 text-sm font-medium hover:underline">
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <Card key={room.title} {...room} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-5"
              >
                <div className="bg-forest-50 dark:bg-forest-900 w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-forest-900 dark:text-forest-50 mb-1">{f.title}</h3>
                <p className="text-forest-800/60 dark:text-forest-100/60 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
