# EcoStay — An-AI-Powered-Guest-Review-Analysis-and-Direct-Booking-System

A full-stack, role-based homestay management web app built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS**. Guests can browse rooms, check live availability, and request bookings. Admins get a dashboard to manage rooms, approve/reject bookings, use ai for guest reviews analysis view analytics.

---

## 1. Tech Stack

| Layer      | Tech |
|------------|------|
| Frontend   | React 18 (Vite), React Router v6, Tailwind CSS, Axios, react-hot-toast, lucide-react |
| Backend    | Node.js, Express.js, MongoDB + Mongoose, JWT auth, bcryptjs |
| Auth       | JWT stored in `localStorage`, role-based route guards on both client and server |

## 2. Project Structure

```
ecostay/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # User, Room, Booking (Mongoose schemas)
│   ├── controllers/              # Business logic per resource
│   ├── routes/                   # Express routers
│   ├── middleware/                # JWT auth guard, role guard, error handler
│   ├── seed/seedData.js          # Sample rooms + demo admin/guest accounts
│   ├── tests/                    # Jest + Supertest API tests
│   └── server.js                 # App entrypoint
└── frontend/
    └── src/
         assets/
        └── W5_SchemaDiagram_[TBI-26100924].png
        ├── api/axios.js          # Axios instance with JWT interceptor
        ├── context/AuthContext.jsx
        ├── components/           # Navbar, Footer, HeroSection, RoomCard,
        │                         # CheckAvailabilityBar, ProtectedRoute, etc.
        └── pages/
            ├── Home.jsx, About.jsx, Login.jsx, Register.jsx
            ├── Rooms.jsx, RoomDetails.jsx, BookingHistory.jsx
            └── admin/            # AdminLayout, AdminDashboard, ManageRooms, ManageBookings
```

## 3. Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection (local install or a free MongoDB Atlas cluster)

### Backend setup
```bash
cd backend
npm install
cp .env.example .env       # then fill in MONGO_URI and JWT_SECRET
npm run seed                # creates 4 sample rooms + demo accounts
npm run dev                 # starts API on http://localhost:5000
```

#### Using MongoDB Atlas
1. In Atlas, go to **Network Access** and add your current IP (or `0.0.0.0/0` while developing, then lock it down before going live).
2. In Atlas, go to **Database Access** and confirm the database user has **Read and write to any database** (or scoped to `ecostayproject`).
3. Copy the connection string from **Database → Connect → Drivers → Node.js**, and put it in `backend/.env` as `MONGO_URI` (see `.env.example` for the shape). `DATABASE_URL` works too if that's the name your host expects — `config/db.js` checks both.
4. `.env` is already listed in `.gitignore` — it will never be committed. Never paste a real connection string into a chat, issue tracker, or public repo; if one is ever exposed, rotate the database user's password immediately from **Database Access → Edit User**.

## 4. Database Schema

<img width="1470" height="700" alt="W5-schemadiagram-tbi26100924" src="https://github.com/user-attachments/assets/cf3e765c-1af1-4f28-8120-964721dbaef1" />


---

## Why MongoDB Atlas?

This project uses **MongoDB Atlas** as the cloud-hosted database solution for storing user accounts, room details, booking records, and application analytics.

### Reasons for Choosing MongoDB Atlas

- **Cloud-hosted database** – Eliminates the need to install and manage a local MongoDB server.
- **Easy MERN integration** – Connects seamlessly with **Node.js**, **Express.js**, and **Mongoose**.
- **Scalable architecture** – Supports application growth by allowing database resources to scale as needed.
- **Secure by design** – Provides IP access control, database user authentication, and encrypted connections (TLS/SSL).
- **Reliable and highly available** – Offers automated backups, monitoring, and managed infrastructure.
- **Free development tier** – The free cluster is ideal for development, testing, and academic projects.

### Benefits in EcoStay

MongoDB Atlas enables EcoStay to:
- Store and manage users, rooms, and booking information in a centralized cloud database.
- Perform efficient CRUD operations through the Express.js backend using Mongoose.
- Access the database securely from different development environments.
- Provide a production-ready database foundation for future deployment and scaling.

---

Demo accounts created by the seed script:
- **Admin:** `admin@ecostay.com` / `Admin@123`
- **Guest:** `guest@ecostay.com` / `Guest@123`

### Frontend setup
```bash
cd frontend
npm install
npm run dev                 # starts Vite dev server on http://localhost:5173
```
The Vite dev server proxies `/api/*` calls to `http://localhost:5000`, so no CORS config is needed locally (see `vite.config.js`).

### Running backend tests
```bash
cd backend
npm test
```
Tests spin up an in-memory MongoDB instance (`mongodb-memory-server`), so no real database is touched.

## 4. Core Features

### Guests
- Register / log in (JWT-based session, persisted in `localStorage`)
- Browse all rooms with images, amenities, pricing and live availability
- Search by check-in/check-out date and guest count (home page + rooms page)
- Submit a booking request from a room's detail page
- Track booking status (pending / approved / rejected / cancelled / completed) under **My Bookings**
- Cancel a pending or approved booking

### Admins
- Secure dashboard (`/admin`) restricted by role, both client-side (`ProtectedRoute`) and server-side (`authorize('admin')` middleware)
- Full CRUD on rooms (create, edit, deactivate, delete)
- Approve / reject / complete booking requests, with automatic double-booking protection
- Analytics overview: total rooms, guests, bookings, revenue, and a breakdown by booking status

### Cross-cutting
- Centralized error handling middleware returning consistent JSON error shapes
- Loading states and toasts across all async UI actions
- Responsive design (mobile, tablet, desktop) built with Tailwind
- Reusable components: `Navbar`, `Footer`, `HeroSection`, `RoomCard`, `CheckAvailabilityBar`, `Loader`, `StatusBadge`, `ProtectedRoute`

## 5. API Reference (summary)

| Method | Endpoint                     | Access        | Description |
|--------|-------------------------------|---------------|--------------|
| POST   | /api/auth/register            | Public        | Register a guest account(not working till week 5) |
| POST   | /api/auth/login               | Public        | Log in, returns JWT |
| GET    | /api/auth/me                  | Private       | Current user's profile |
| GET    | /api/rooms                    | Public        | List rooms (supports `?checkIn&checkOut&guests`) |
| GET    | /api/rooms/:id                | Public        | Room details (by id or slug) |
| POST   | /api/rooms                    | Admin         | Create room |
| PUT    | /api/rooms/:id                | Admin         | Update room |
| DELETE | /api/rooms/:id                | Admin         | Delete room |
| POST   | /api/bookings                 | Guest         | Create booking request |
| GET    | /api/bookings/my              | Guest         | List own bookings |
| PUT    | /api/bookings/:id/cancel      | Guest         | Cancel own booking |
| GET    | /api/bookings                 | Admin         | List all bookings (supports `?status`) |
| PUT    | /api/bookings/:id/status      | Admin         | Approve / reject / complete a booking |
| GET    | /api/admin/analytics          | Admin         | Dashboard summary stats |

## 6. Design Notes

The visual identity leans into the "eco-homestay" brief: a forest-green and burnt-clay palette, `Fraunces` for display type (organic, warm serif) paired with `Work Sans` for body copy. The signature UI element is the lantern-style **check-in/check-out availability bar** that straddles the hero image — echoing a familiar travel-booking pattern but restyled in the site's own materials (dark forest background, gold-clay border) rather than a generic blue search bar.

## 7. Next Steps (week 6-9)
- More advanced authentication & security (implement registeration of new users).
- Wire up the AI API for guest review analysis.
- Image upload (Cloudinary/S3) instead of pasted image URLs in the admin room form.
- Deployment of the application
