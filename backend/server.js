// server.js — EcoStay Backend API
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Request logger (dev only) ─────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
  })
}

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'EcoStay API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/rooms', require('./routes/roomRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))

// ─── Error handling ────────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 EcoStay API running on http://localhost:${PORT}`)
  console.log(`📋 Health: http://localhost:${PORT}/api/health`)
  console.log(`🏠 Rooms:  http://localhost:${PORT}/api/rooms`)
  console.log(`📅 Bookings: http://localhost:${PORT}/api/bookings`)
  console.log(`⭐ Reviews: http://localhost:${PORT}/api/reviews\n`)
})
