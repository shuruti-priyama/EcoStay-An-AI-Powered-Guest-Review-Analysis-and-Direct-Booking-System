// controllers/authController.js
const { users } = require('../data/store')
const { v4: uuidv4 } = require('uuid')

// POST /api/auth/login
const login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const { password: _, ...userWithoutPassword } = user

  // In Week 5 this will be a real JWT — for now a simple session token
  res.status(200).json({
    success: true,
    data: {
      ...userWithoutPassword,
      token: `demo-token-${user.id}`,
    },
  })
}

// POST /api/auth/register
const register = (req, res) => {
  const { name, email, password, role = 'guest' } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email, and password are required')
  }

  if (users.find((u) => u.email === email)) {
    res.status(400)
    throw new Error('User with this email already exists')
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    role: ['guest', 'owner'].includes(role) ? role : 'guest',
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  const { password: _, ...userWithoutPassword } = newUser

  res.status(201).json({
    success: true,
    data: {
      ...userWithoutPassword,
      token: `demo-token-${newUser.id}`,
    },
  })
}

// GET /api/auth/me — get current user (demo: pass token in header)
const getMe = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401)
    throw new Error('No token provided')
  }

  const userId = token.replace('demo-token-', '')
  const user = users.find((u) => u.id === userId)
  if (!user) {
    res.status(401)
    throw new Error('Invalid token')
  }

  const { password: _, ...userWithoutPassword } = user
  res.status(200).json({ success: true, data: userWithoutPassword })
}

module.exports = { login, register, getMe }
