
# EcoStay — An AI-Powered Guest Review Analysis and Direct Booking System

> **Week 2–6 Deliverable README**

## Overview
EcoStay is a full-stack MERN application for homestay management. Guests can register, login using JWT or Google OAuth, browse rooms, check availability, book stays, and manage bookings. Admins manage rooms, bookings, users, and analytics.

---

# Table of Contents
1. Features
2. Tech Stack
3. Architecture
4. Project Structure
5. Prerequisites
6. Installation
7. MongoDB Atlas Setup
8. Environment Variables
9. Database Schema
10. Authentication & Security (Week 6)
11. Core Features
12. API Reference
13. Screenshots
14. Design Notes
15. Future Scope

---

# Features

## Guest
- Register
- Login
- Logout
- Google OAuth
- Browse Rooms
- Room Details
- Search Availability
- Booking
- Booking History
- Cancel Booking

## Admin
- Dashboard
- Manage Rooms (CRUD)
- Manage Bookings
- Analytics

## Security
- JWT Authentication
- Google OAuth
- Protected Routes
- Protected APIs
- bcrypt Password Hashing
- Input Validation
- Rate Limiting
- Centralized Error Handling

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, Passport Google OAuth |

---

# Architecture

```text
React Frontend
      |
Axios + JWT
      |
Express Backend
      |
Authentication Middleware
      |
MongoDB Atlas
```

---

# Project Structure

```text
ecostay/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── seed/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── api/
└── README.md
```

# Prerequisites
- Node.js 18+
- MongoDB Atlas
- Git

# Installation

## Clone

```bash
git clone https://github.com/shuruti-priyama/EcoStay-An-AI-Powered-Guest-Review-Analysis-and-Direct-Booking-System 
cd ecostay
```

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

# MongoDB Atlas Setup

1. Create a free cluster.
2. Add IP Address.
3. Create Database User.
4. Copy connection string.
5. Update `.env`.

Example:

```env
MONGO_URI=your_connection_string
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
```

# Database Schema

> Replace this placeholder with your Week 5 schema image.

```md

```

# Authentication & Security (Week 6)

## Completed Deliverables

- ✅ Register working end-to-end
- ✅ Login working end-to-end
- ✅ Logout working
- ✅ JWT Authentication
- ✅ Google OAuth Login
- ✅ Protected Backend APIs
- ✅ Protected React Pages
- ✅ Rate Limiting
- ✅ Input Validation

## Protected Pages

- Profile
- Booking History
- Admin Dashboard

Unauthenticated users are redirected to `/login`.

## Backend Security

- JWT middleware
- Role middleware
- 401 Unauthorized for missing tokens
- Password hashing using bcrypt

## Rate Limiting

Applied on:

- `/api/auth/login`
- `/api/auth/register`

## Validation

- Email validation
- Password validation
- Required fields
- Invalid requests rejected

# Core Features

### Guests

- Register/Login
- Google OAuth
- Search Rooms
- Book Rooms
- Booking History
- Cancel Booking

### Admin

- CRUD Rooms
- Booking Approval
- Analytics Dashboard

# API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register |
| POST | /api/auth/login | Public | Login |
| POST | /api/auth/logout | Private | Logout |
| GET | /api/auth/me | Private | Current User |
| GET | /api/auth/google | Public | Google OAuth |
| GET | /api/auth/google/callback | Public | OAuth Callback |
| GET | /api/rooms | Public | Rooms |
| GET | /api/rooms/:id | Public | Room Details |
| POST | /api/rooms | Admin | Create Room |
| PUT | /api/rooms/:id | Admin | Update Room |
| DELETE | /api/rooms/:id | Admin | Delete Room |
| POST | /api/bookings | Guest | Book |
| GET | /api/bookings/my | Guest | My Bookings |
| PUT | /api/bookings/:id/cancel | Guest | Cancel |
| GET | /api/bookings | Admin | All Bookings |
| PUT | /api/bookings/:id/status | Admin | Update Status |
| GET | /api/admin/analytics | Admin | Analytics |


# Design Notes

- Responsive UI
- Tailwind CSS
- Reusable Components
- Forest green branding

# Future Scope (upcoming weeks)

- AI Review Analysis
- Deployment

---
Made for the TBI SIP AI-Assisted Full Stack Web Development Internship, GEU.
