EcoStay – AI Powered Guest Review Analysis & Direct Booking System

TBI Summer Internship Program (SIP) 2026 Project
Domain: AI-Assisted Full Stack Web Development

EcoStay is an AI-powered homestay management platform developed for Trishul Eco-Homestays. The platform combines a direct booking system with AI-powered guest review analysis to help homestay owners manage bookings efficiently, improve guest satisfaction, and reduce dependency on Online Travel Agencies (OTAs).

🚀 Key Features

🏡 Guest Dashboard

Guests can:
1. Register and Login securely
2. Browse available homestays and rooms
3. View room details, pricing, and amenities
4. Check room availability
5. Submit booking requests
6. View booking history and status
7. Submit reviews and ratings after stay

🏨 Owner Dashboard
Homestay Owners can:
1. Manage room listings
2. Add, update, or remove rooms
3. View and manage booking requests
4. Approve or reject bookings
5. Monitor occupancy and reservations
6. Analyze guest reviews sentiments using AI
7. Generate AI-powered response suggestions

🤖 AI Review Analysis

Sentiment Classification
1. Positive
2. Neutral
3. Negative

Theme Extraction
- Food ,Cleanliness ,Location ,Value ,Experience

AI-generated response suggestions
Batch review analysis

🛠️ Tech Stack
1. Frontend
    -React.js + Vite
    -Tailwind CSS
    -React Router DOM

2. Backend
    -Node.js
    -Express.js

3. Database
    -MongoDB Atlas

4. Authentication & Security
    -JWT Authentication
    -Password Hashing (bcrypt)
    -Role-Based Access Control (RBAC)

5. AI Integration
    I will decide which ai api to use when i will build ai review sentiment analysis module in later weeks of my internship.

6. Deployment
    -Frontend: Vercel
    -Backend: Render
    -Database: MongoDB Atlas Cloud

📂 Project Structure(Till Week 2)

ecostay/
│
├── backend/
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   
│   │   │
│   │   ├── components/
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Rooms.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── vite.config.js
│
│
├── .gitignore
└── README.md


🏗️ System Architecture(For eg:- Guest dashboard)

                    ┌─────────────────┐
                    │     Guest       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React + Vite UI │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Node.js Backend │
                    │   Express API   │
                    └───────┬─────────┘
                            │
           ┌────────────────┼────────────────┐
           ▼                ▼                ▼
    ┌───────────┐   ┌─────────────┐   ┌────────────┐
    │ MongoDB   │   │ AI API      │   │ JWT Auth   │
    │ Atlas     │   │ AI Analysis │   │ & RBAC     │
    └───────────┘   └─────────────┘   └────────────┘

🤖 AI Review Analysis Example
- Guest Review

"The room was very clean and the host was welcoming. The food quality was average."

AI Output
{
  "sentiment": "Neutral",
  "themes": [
    "Cleanliness",
    "Host",
    "Food"
  ],
  "response": "Thank you for your valuable feedback. We are glad you appreciated our cleanliness and hospitality. We will work on improving our food services to provide a better experience."
}

🎯 Project Objectives
1. Develop a direct booking platform that reduces OTA dependency on third-party booking platforms and improves booking management efficiency for homestay owners.

2. Leverage AI-driven guest review analysis to provide business insights, enhance guest satisfaction, and support data-driven decision-making.


👩‍💻 Developed As Part Of
- TBI Summer Internship Program (SIP) 2026
- Domain: AI-Assisted Full Stack Web Development