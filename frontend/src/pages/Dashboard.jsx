import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-3">
          Owner dashboard
        </h1>
        <p className="text-forest-800/70 leading-relaxed max-w-2xl">
          Placeholder content — booking management, occupancy stats, and AI-powered review
          insights will be built here in a future deliverable.
        </p>
      </main>

      <Footer />
    </div>
  )
}
