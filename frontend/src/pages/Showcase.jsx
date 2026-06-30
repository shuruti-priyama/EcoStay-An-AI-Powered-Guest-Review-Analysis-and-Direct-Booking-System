import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input, Modal, Loader, useToast } from '../components/ui'
import { Palette, Zap, Layout } from 'lucide-react'

export default function Showcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { showToast } = useToast()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-eco-50 dark:bg-eco-950 border border-eco-200 dark:border-eco-800 rounded-full px-4 py-1.5 mb-4">
            <Palette size={14} className="text-eco-500" />
            <span className="text-eco-600 dark:text-eco-400 font-semibold text-xs uppercase tracking-widest">Week 3 Deliverable 2</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">UI Component Library</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Live demo of all 5 reusable components from <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-eco-600 dark:text-eco-400 text-sm">src/components/ui</code>
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-10 animate-fade-in-up">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Palette size={18} className="text-eco-500" /> Color Palette</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Emerald Green', color: 'bg-eco-500', text: '#22C55E' },
                { name: 'Forest Green', color: 'bg-eco-800', text: '#166534' },
                { name: 'Sky Blue', color: 'bg-sky-400', text: '#38BDF8' },
                { name: 'Amber', color: 'bg-amber-400', text: '#FBBF24' },
                { name: 'Orange', color: 'bg-orange-400', text: '#FB923C' },
                { name: 'Purple', color: 'bg-purple-400', text: '#A78BFA' },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl ${c.color} shadow-md`} />
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Button */}
        <section className="mb-10 animate-fade-in-up animate-delay-100">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Zap size={18} className="text-eco-500" /> Button</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* Input */}
        <section className="mb-10 animate-fade-in-up animate-delay-200">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Layout size={18} className="text-eco-500" /> Input</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full name" placeholder="Sunita Rawat" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <Input label="Email" type="email" placeholder="you@example.com" value="" onChange={() => {}} error="Please enter a valid email" />
          </div>
        </section>

        {/* Modal */}
        <section className="mb-10 animate-fade-in-up animate-delay-300">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Modal</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Booking">
              <p className="mb-4 text-slate-600 dark:text-slate-300">This modal traps focus, closes on Escape key, and on backdrop click. Used for confirmations in the app.</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => { setIsModalOpen(false); showToast('Booking confirmed!', { type: 'success' }) }}>Confirm</Button>
              </div>
            </Modal>
          </div>
        </section>

        {/* Toast */}
        <section className="mb-10 animate-fade-in-up animate-delay-400">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Toast</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => showToast('Booking confirmed!', { type: 'success' })}>Success Toast</Button>
            <Button variant="danger" onClick={() => showToast('Something went wrong.', { type: 'error' })}>Error Toast</Button>
            <Button variant="secondary" onClick={() => showToast('Changes saved.', { type: 'info' })}>Info Toast</Button>
          </div>
        </section>

        {/* Loader */}
        <section className="mb-10 animate-fade-in-up animate-delay-400">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Loader</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 space-y-6">
            <div className="flex items-center gap-6">
              <Loader size="sm" /><Loader size="md" /><Loader size="lg" />
              <Loader variant="dots" />
            </div>
            <div>
              <Button variant="outline" onClick={() => { setShowSkeleton(true); setTimeout(() => setShowSkeleton(false), 2500) }} className="mb-4">
                Simulate skeleton load
              </Button>
              {showSkeleton ? <Loader variant="skeleton" lines={3} /> : (
                <p className="text-slate-400 text-sm">Click button to preview skeleton loader.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
