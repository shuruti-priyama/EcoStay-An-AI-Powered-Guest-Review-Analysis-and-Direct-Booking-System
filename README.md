# EcoStay — An AI-Powered Guest Review Analysis and Direct Booking System

## Overview

EcoStay is a full-stack MERN application for homestay management. Guests can register, login using JWT or Google OAuth, browse rooms, check availability, book stays, and manage bookings. Homestay owner manage rooms, bookings, users, and analytics. Homestay owners now also get an AI-powered tool to analyze reviews copied from external booking platforms.

---

## Table of Contents

1. Features
2. Tech Stack
3. Architecture
4. Project Structure
5. Prerequisites
6. Installation
7. MongoDB Atlas Setup
8. Environment Variables
9. Database Schema
10. Authentication & Security 
11. AI-Powered Review Analysis 
12. Core Features
13. API Reference
15. Design Notes
16. Future Scope

---

## Features

### Guest

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

### Owner

- Dashboard
- Manage Rooms (CRUD)
- Manage Bookings
- Analytics

### AI Features(For homestay owners) (Week 7)

- OTA Review Analysis Dashboard — paste bulk reviews copied from Airbnb, Booking.com, MakeMyTrip, etc.
- AI-powered sentiment classification (Positive / Neutral / Negative)
- Automatic theme extraction (cleanliness, food, location, service, and more)
- Positives and negatives breakdown per review
- AI-generated suggested response owners can copy and post back on the OTA site
- Aggregate dashboard stats: total reviews analyzed, sentiment breakdown, most-mentioned themes

### Security

- JWT Authentication
- Google OAuth
- Protected Routes
- Protected APIs
- bcrypt Password Hashing
- Input Validation
- Rate Limiting
- Centralized Error Handling

---

## Tech Stack

| Layer          | Technology                              |
| -------------- | ---------------------------------------- |
| Frontend       | React, Vite, Tailwind CSS                |
| Backend        | Node.js, Express.js                      |
| Database       | MongoDB Atlas, Mongoose                  |
| Authentication | JWT, Passport Google OAuth               |
| AI / LLM       | Google Gemini API (`gemini-flash-latest`)|

---

## Architecture

```
React Frontend
      |
Axios + JWT
      |
Express Backend
      |
Authentication Middleware
      |
   MongoDB Atlas   <----->   Gemini API (AI Review Analysis)
```

---

## Project Structure

```
ecostay/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/          # Gemini AI integration (geminiReview.js)
│   ├── validators/
│   ├── uploads/         # Uploaded room images
│   ├── tests/
│   ├── seed/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   │   └── owner/       # Owner Dashboard, incl. OTA Review Analysis
│   ├── context/
│   └── api/
├── PROMPTS.md            # Prompt engineering log (Week 7)
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas
- Git
- A Google Gemini API key (for AI review analysis)

## Installation

### Clone

```
git clone https://github.com/shuruti-priyama/EcoStay-An-AI-Powered-Guest-Review-Analysis-and-Direct-Booking-System
cd ecostay
```

### Backend

```
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## MongoDB Atlas Setup

1. Create a free cluster.
2. Add IP Address.
3. Create Database User.
4. Copy connection string.
5. Update `.env`.

## Environment Variables

```
MONGO_URI=your_connection_string
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
GEMINI_API_KEY=your_gemini_api_key
```

> Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com). Never commit `.env` — only `.env.example` (with placeholder values) should be tracked in git.

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

## Database Schema
<img width="1326" height="647" alt="image" src="https://github.com/user-attachments/assets/59b60de2-04a2-4802-95a5-b2fedc807778" />

---

## Authentication & Security 

- Register working end-to-end
- Login working end-to-end
- Logout working
- JWT Authentication
- Google OAuth Login
- Protected Backend APIs
- Protected React Pages
- Rate Limiting
- Input Validation

### Protected Pages

- Profile
- Booking History
- Admin Dashboard

Unauthenticated users are redirected to `/login`.

### Backend Security

- JWT middleware
- Role middleware
- 401 Unauthorized for missing tokens
- Password hashing using bcrypt

### Rate Limiting

Applied on:

- `/api/auth/login`
- `/api/auth/register`
- `/api/reviews/ota/analyze` (AI endpoint, capped separately to control Gemini API usage)

### Validation

- Email validation
- Password validation
- Required fields
- Invalid requests rejected

---

## AI-Powered Review Analysis (Week 7)

### Two Review Analysis Flows
 
EcoStay has two distinct Gemini-powered review features, covering both reviews left directly on the platform and reviews scattered across external sites:
 
1. **On-Platform Guest Reviews** — a guest who completes a stay leaves a review, which the owner then analyzes with Gemini.
2. **OTA Review Analysis Dashboard** — an owner pastes reviews copied from external sites (Airbnb, Booking.com, MakeMyTrip) for bulk AI analysis.

---
 
### 1. On-Platform Guest Reviews
 
#### Overview
 
Once a guest's booking is marked **completed**, they can leave a review and star rating directly on EcoStay. The owner can then run that review through Gemini for an instant sentiment breakdown, and reply — with Gemini able to draft the reply for them too.
 
#### How It Works
 
1. After checkout, the guest submits a review + star rating (1–5) for their booking via `POST /api/reviews/:bookingId`. The review is stored directly on that **Booking** document (`review`, `rating` fields).
2. The owner opens the **Reviews** tab of their dashboard and sees all reviews across their rooms (`GET /api/reviews/my-rooms`), or reviews for one specific room (`GET /api/reviews/room/:roomId`).
3. The owner clicks **Analyze** on a review, which calls `POST /api/reviews/:bookingId/analyze`. This sends the guest's review text to Gemini and stores the result back on the booking under `aiAnalysis`:
   - `sentiment` — Positive / Neutral / Negative
   - `summary` — one-line summary of the guest's experience
   - `themes` — recurring topics (cleanliness, food, location, service, etc.)
   - `positives` / `negatives` — specific points raised
   - `suggestedResponse` — a Gemini-drafted reply the owner can use as-is or edit
4. The owner posts their reply (using the suggested response or their own words) via `POST /api/reviews/:bookingId/reply`, stored in `ownerReply` on the booking.
#### Key Files
 
| File | Purpose |
| ---- | ------- |
| `backend/models/Booking.js` | `review`, `rating`, `aiAnalysis`, `ownerReply` fields |
| `backend/utils/geminiReview.js` | `analyzeReview()` — single-review Gemini analysis |
| `backend/controllers/reviewController.js` | `submitReview`, `analyzeReviewForOwner`, `replyToReview`, `getRoomReviews`, `getOwnerAllReviews` |
| `frontend/src/components/ReviewForm.jsx` | Guest-facing review submission form |
| `frontend/src/pages/owner/OwnerReviews.jsx` | Owner-facing review + AI analysis + reply dashboard |
 
---
 
### 2. OTA Review Analysis Dashboard
 
#### Overview
 
Homestay owners receive reviews scattered across multiple external platforms (Airbnb, Booking.com, MakeMyTrip) with no easy way to track sentiment or recurring feedback themes. The **OTA Review Analysis Dashboard** solves this: an owner pastes raw text copied from any of these sites — even multiple reviews mixed together — and the Gemini API separates each individual review and analyzes it.
 
### How It Works
 
1. Owner navigates to **Owner Dashboard → OTA Reviews**.
2. Owner pastes one or more reviews copied from an external site into a text box.
3. Frontend sends the raw text to `POST /api/reviews/ota/analyze`.
4. Backend calls the Gemini API with a structured prompt instructing it to:
   - Identify and separate each individual review from the pasted block.
   - Extract the reviewer's name and star rating, if present.
   - Classify sentiment (Positive / Neutral / Negative).
   - Extract recurring themes (cleanliness, food, location, service, etc.).
   - List specific positives and negatives.
   - Generate a suggested public reply the owner can post back on the OTA site.
5. Gemini returns a strict JSON array, validated by the backend before being sent to the frontend.
6. The dashboard renders each review as a card, plus an aggregate summary (total reviews found, sentiment breakdown, most-mentioned themes across the batch).

### Key Files

| File | Purpose |
| ---- | ------- |
| `backend/utils/geminiReview.js` | Gemini prompt construction and response parsing |
| `backend/controllers/reviewController.js` | `analyzeOtaReviews` request handler |
| `backend/routes/reviewRoutes.js` | `POST /api/reviews/ota/analyze` route |
| `backend/validators/reviewValidators.js` | Input validation rules |
| `backend/middleware/rateLimiter.js` | `aiAnalysisLimiter` — caps AI calls per hour |
| `frontend/src/pages/owner/OwnerOtaReviews.jsx` | Owner-facing dashboard UI |


### Additional Enhancement: Room Image Upload

Alongside the AI feature, room photo uploads were upgraded from plain URL text input to real file uploads:

- Owners can upload photos directly from their device (JPG/PNG/WEBP/GIF, up to 5MB each) via **Multer**.
- Uploaded images are served statically from `backend/uploads/rooms/`.
- The "Add Room" form also gained a one-click emoji amenity picker (WiFi, Breakfast, Parking, Bonfire, Mountain View, etc.) alongside free-text custom amenities.

---

## Core Features

### Guests

- Register/Login
- Google OAuth
- Search Rooms
- Book Rooms
- Booking History
- Cancel Booking

### Homestay owner

- CRUD Rooms
- Booking Approval
- Analytics Dashboard
- Manage own rooms and photos
- Manage own bookings
- OTA Review Analysis powered by Gemini AI

---

## API Reference

| Method | Endpoint                     | Access  | Description                          |
| ------ | ----------------------------- | ------- | ------------------------------------- |
| POST   | /api/auth/register             | Public  | Register                              |
| POST   | /api/auth/login                | Public  | Login                                 |
| POST   | /api/auth/logout                | Private | Logout                                |
| GET    | /api/auth/me                    | Private | Current User                          |
| GET    | /api/auth/google                | Public  | Google OAuth                          |
| GET    | /api/auth/google/callback        | Public  | OAuth Callback                        |
| GET    | /api/rooms                      | Public  | Rooms                                 |
| GET    | /api/rooms/:id                  | Public  | Room Details                          |
| POST   | /api/rooms                      | Owner/Admin | Create Room                        |
| PUT    | /api/rooms/:id                  | Owner/Admin | Update Room                        |
| DELETE | /api/rooms/:id                  | Owner/Admin | Delete Room                        |
| POST   | /api/rooms/upload-image          | Owner/Admin | Upload a room photo                |
| POST   | /api/bookings                   | Guest   | Book                                   |
| GET    | /api/bookings/my                 | Guest   | My Bookings                           |
| PUT    | /api/bookings/:id/cancel          | Guest   | Cancel                                |
| GET    | /api/bookings                   | Admin   | All Bookings                          |
| PUT    | /api/bookings/:id/status          | Admin   | Update Status                         |
| GET    | /api/admin/analytics              | Admin   | Analytics                             |
| POST | /api/reviews/ota/analyze  | Owner | AI-powered bulk OTA review analysis |

---

## Screenshots
<img width="1918" height="1198" alt="Screenshot 2026-07-19 170605" src="https://github.com/user-attachments/assets/d58635a2-fc01-4831-ad7c-8d6b77e59d67" />
<img width="1918" height="1198" alt="Screenshot 2026-07-19 170659" src="https://github.com/user-attachments/assets/5e916ab2-608e-48cd-830c-804cc2773212" />

---

## Design Notes

- Responsive UI
- Tailwind CSS
- Reusable Components
- Forest green branding

---

### Completed Deliverables(Week 7)

- AI feature fully functional end-to-end on localhost (input → loading state → AI output)
- Gemini API key stored only in `.env`, never committed
- Loading state shown during the API call
- Error handling shown to the user (validation errors and API failures both surface as toast notifications)
- Rate limiting on the AI endpoint (20 requests/hour) to control API usage
- Input validation (20–12,000 character range per batch)
- Prompt engineering log documented in [`PROMPTS.md`](./PROMPTS.md)


## Future Scope (upcoming weeks)

- Deployment

---

Made for the TBI SIP AI-Assisted Full Stack Web Development Internship, GEU.
