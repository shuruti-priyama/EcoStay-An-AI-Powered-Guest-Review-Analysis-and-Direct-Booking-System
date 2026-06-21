import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Input, Modal, Loader, useToast } from '../components/ui'

export default function Showcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { showToast } = useToast()

  const triggerSkeleton = () => {
    setShowSkeleton(true)
    setTimeout(() => setShowSkeleton(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-forest-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        <p className="text-forest-600 dark:text-forest-300 font-semibold text-xs tracking-widest uppercase mb-3">
          Component Library
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 dark:text-forest-50 mb-3">
          UI Components Showcase
        </h1>
        <p className="text-forest-800/70 dark:text-forest-100/70 leading-relaxed max-w-2xl mb-10">
          A live demo of the reusable components in <code>src/components/ui</code>: Button, Input,
          Modal, Toast, and Loader.
        </p>

        {/* Button */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-4">Button</h2>
          <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* Input */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-4">Input</h2>
          <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full name"
              placeholder="Sunita Rawat"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value=""
              onChange={() => {}}
              error="Please enter a valid email"
            />
          </div>
        </section>

        {/* Modal */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-4">Modal</h2>
          <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6">
            <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Confirm booking"
            >
              <p className="mb-4">
                This is a demo modal. It traps focus, closes on the Escape key, and closes when
                you click the backdrop.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </Modal>
          </div>
        </section>

        {/* Toast */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-4">Toast</h2>
          <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => showToast('Booking confirmed!', { type: 'success' })}
            >
              Show success toast
            </Button>
            <Button
              variant="outline"
              onClick={() => showToast('Something went wrong.', { type: 'error' })}
            >
              Show error toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => showToast('Your changes were saved.', { type: 'info' })}
            >
              Show info toast
            </Button>
          </div>
        </section>

        {/* Loader */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-forest-900 dark:text-forest-50 mb-4">Loader</h2>
          <div className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-6">
              <Loader size="sm" />
              <Loader size="md" />
              <Loader size="lg" />
            </div>

            <div>
              <Button variant="outline" onClick={triggerSkeleton} className="mb-4">
                Simulate loading (skeleton)
              </Button>
              {showSkeleton ? <Loader variant="skeleton" lines={3} /> : (
                <p className="text-sm text-forest-800/60 dark:text-forest-100/60">
                  Click the button to preview the skeleton loader.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
