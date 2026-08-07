# EcoStay — AI-Powered Guest Review Analysis & Direct Homestay Booking System

A full-stack MERN homestay booking platform. Guests book eco-friendly stays directly (no OTA commission); homestay owners get an AI assistant (Google Gemini) that analyzes guest reviews — both on-platform and pasted in bulk from Airbnb, Booking.com, or MakeMyTrip — for sentiment, recurring themes, and ready-to-post replies.

---

## 🔗 Live Demo

- **App:** [https://ecostay-sip.vercel.app](https://ecostay-sip.vercel.app)
- **Backend health check:** [https://ecostay-mern-project.onrender.com/api/health](https://ecostay-mern-project.onrender.com/api/health)

> First load after inactivity may take 30–60s — see [Known Limitations]

---

## 📸 Screenshots

<img width="1600" height="960" alt="WhatsApp Image 2026-08-07 at 11 17 06 PM" src="https://github.com/user-attachments/assets/fb4015d3-fc9e-4d24-b53f-b0424f29c4ed" />

<img width="1600" height="968" alt="WhatsApp Image 2026-08-07 at 11 18 55 PM" src="https://github.com/user-attachments/assets/38e799b9-aaad-47b5-bf6d-f0a1d9167212" />

<img width="1600" height="959" alt="WhatsApp Image 2026-08-08 at 1 31 54 AM" src="https://github.com/user-attachments/assets/a3a0f2c4-831e-40a1-b321-0aaba99acc98" />

<img width="1600" height="959" alt="WhatsApp Image 2026-08-08 at 1 32 44 AM" src="https://github.com/user-attachments/assets/1c1db785-ab7b-49c4-a990-349b5e09c346" />

---

## ✨ Features

**Guest** — Register/Login (JWT + Google OAuth) · Browse & search rooms · Book directly · Booking history & cancellation · Leave a review after stay

**Homestay Owner** — Dashboard with analytics · Manage own rooms (CRUD) & photos · Manage own bookings · **AI review analysis** on guest reviews (sentiment, themes, suggested reply) · **OTA Review Analysis Dashboard** — paste bulk reviews from Airbnb/Booking.com/MakeMyTrip, Gemini separates and analyzes each one independently

**Security** — JWT + Google OAuth · Protected routes & APIs · bcrypt hashing · Input validation · Rate limiting (auth + AI endpoints) · Centralized error handling

> Full breakdown of both AI review flows (on-platform + OTA), including endpoint-by-endpoint walkthroughs, is in [`PROMPTS.md`](./PROMPTS.md) and the [API Documentation](#-api-documentation) below.

---

## 🛠 Tech Stack

| Layer          | Technology                                |
| -------------- | ------------------------------------------ |
| Frontend       | React, Vite, Tailwind CSS                  |
| Backend        | Node.js, Express.js                        |
| Database       | MongoDB Atlas, Mongoose                    |
| Authentication | JWT, Passport.js (Google OAuth)            |
| AI / LLM       | Google Gemini API (`gemini-flash-latest`)  |
| Image Storage  | Cloudinary (free tier)                     |
| Deployment     | Vercel (frontend), Render (backend)        |

*MongoDB Atlas: cloud-hosted, secure, free tier, no local DB to manage. Cloudinary: Render's free tier has an ephemeral filesystem, so uploads live in Cloudinary instead of local disk to survive redeploys.*

---

## ⚙️ Setup Instructions

**Prerequisites:** Node.js 18+, MongoDB Atlas account, Git, a free Gemini API key ([aistudio.google.com](https://aistudio.google.com/app/apikey)), a free Cloudinary account.

```bash
git clone https://github.com/shuruti-priyama/EcoStay-An-AI-Powered-Guest-Review-Analysis-and-Direct-Booking-System
cd ecostay

# Backend
cd backend && npm install
cp .env.example .env   # fill in values below
npm run seed             # optional demo accounts
npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

**Backend `.env`:**
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

**Frontend `.env`** (only if pointing at a deployed backend): `VITE_API_URL=https://your-backend.onrender.com`

**MongoDB Atlas:** create a free M0 cluster → Network Access → add your IP (or `0.0.0.0/0`) → Database Access → create a user → copy connection string into `MONGO_URI`.

> Never commit `.env` — only `.env.example` is tracked in git.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api` (local) · `https://ecostay-mern-project.onrender.com/api` (production)

| Method | Endpoint | Access | Description |
| ------ | -------- | ------ | ------------ |
| POST | `/auth/register` | Public | Register |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/auth/me` | Private | Current user |
| GET | `/auth/google` → `/auth/google/callback` | Public | Google OAuth |
| GET | `/rooms` · `/rooms/:id` | Public | List / view rooms |
| POST/PUT/DELETE | `/rooms`, `/rooms/:id` | Owner/Admin | Manage rooms |
| POST | `/rooms/upload-image` | Owner/Admin | Upload room photo (Cloudinary) |
| POST | `/bookings` | Guest | Book a room |
| GET | `/bookings/my` | Guest | My bookings |
| PUT | `/bookings/:id/cancel` | Guest | Cancel booking |
| GET | `/bookings` · PUT `/bookings/:id/status` | Admin | Manage all bookings |
| POST | `/reviews/:bookingId` | Guest | Submit a review |
| GET | `/reviews/my-rooms` · `/reviews/room/:roomId` | Owner | View reviews |
| POST | `/reviews/:bookingId/analyze` | Owner | Gemini-analyze one review |
| POST | `/reviews/:bookingId/reply` | Owner | Reply to a review |
| **POST** | **`/reviews/ota/analyze`** | **Owner** | **Bulk-analyze pasted OTA reviews** |
| GET | `/admin/analytics` | Admin | Platform analytics |

**Example — `POST /reviews/ota/analyze`**

Request: `{ "rawText": "Priya S. - ★★★★★\nLoved our stay! Spotless rooms and stunning lakeside view." }`

Response `200`:
```json
{
  "success": true,
  "count": 1,
  "data": [{
    "reviewerName": "Priya S.", "rating": 5, "sentiment": "Positive",
    "themes": ["cleanliness", "location"],
    "positives": ["Spotless rooms", "Stunning lakeside view"], "negatives": [],
    "suggestedResponse": "Thank you so much, Priya! We're thrilled you loved the lakeside views."
  }]
}
```

---

## 🏗 Architecture / Folder Structure

```
React Frontend → Axios+JWT → Express Backend → Auth Middleware → MongoDB Atlas
                                     │                          ↕ Gemini API
                                     └──────────→ Cloudinary (images)
```

```
ecostay/
├── backend/    config/ controllers/ middleware/ models/ routes/
│               utils/ (Gemini integration)  validators/  tests/  seed/  server.js
├── frontend/   src/components/  src/pages/ (incl. owner/)  src/context/  src/api/
├── PROMPTS.md  # Prompt engineering log
└── README.md
```

Frontend talks to the backend only through `src/api/axios.js` (attaches JWT, points at `VITE_API_URL` in prod). Backend keeps Gemini logic isolated in `utils/geminiReview.js`, separate from route/controller logic.

---

## ⚠️ Known Limitations

- **Cold starts:** Render free tier sleeps after ~15 min idle; first request after that takes 30–60s to wake up.
- **Ephemeral disk:** Render's free-tier filesystem wipes on redeploy — images are stored on Cloudinary, not local disk, because of this.
- **Single-origin CORS:** backend trusts one `CLIENT_URL` at a time — update it if the deployed frontend URL changes.
- **Cross-origin images:** Helmet's `Cross-Origin-Resource-Policy` relaxed to `cross-origin` so backend-hosted images load on the Vercel frontend.
- **SPA routing:** `vercel.json` rewrite rule needed so client-side routes (e.g. `/oauth-callback`) don't 404 on refresh.
- **AI analysis is on-demand, not persisted** — OTA batch results aren't saved to the database yet.
- **Not yet built:** owner notifications, multi-language support, payment gateway.

---

## 🙏 Credits & Acknowledgements

- **AI tools:** [Claude (Anthropic)](https://claude.com) — architecture, implementation, and debugging assistance throughout. [Google Gemini API](https://ai.google.dev) — powers the in-app review analysis feature.
- **Resources referenced:** [React Docs](https://react.dev/learn) · [Express.js Guide](https://expressjs.com/en/starter/installing.html) · [Mongoose Docs](https://mongoosejs.com/docs/guide.html) · [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/getting-started) · [Passport Google OAuth](https://www.passportjs.org/packages/passport-google-oauth20/) · [Vercel Docs](https://vercel.com/docs/deployments/overview) · [Render Docs](https://render.com/docs/deploy-node-express-app) · Web Dev Simplified, Traversy Media & freeCodeCamp tutorials on JWT auth, REST API design, and MERN deployment (full list in the internship curriculum).

---

Made for the TBI SIP AI-Assisted Full Stack Web Development Internship, GEU.
