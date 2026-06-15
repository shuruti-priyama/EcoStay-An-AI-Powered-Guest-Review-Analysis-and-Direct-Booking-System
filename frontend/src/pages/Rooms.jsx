import Navbar from '../components/Navbar'
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
]

export default function Rooms() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-3">Our rooms</h1>
        <p className="text-forest-800/70 leading-relaxed max-w-2xl mb-8">
          Placeholder content
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <Card key={room.title} {...room} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
