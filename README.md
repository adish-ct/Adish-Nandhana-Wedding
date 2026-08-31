# 💍 Adish & Nandhana — Wedding Web Application

A full-stack wedding web application built for **Adish & Nandhana**, celebrating their journey starting from **April 20, 2020** to their wedding day on **November 1, 2026**.

The application combines a modern **React (Vite)** frontend with glassmorphism design, mobile responsiveness, live ticking countdown timer, interactive love story timeline, section-specific photo lightbox galleries, and a **FastAPI (Python)** backend for RSVP management, photo uploads, and guest wishes.

---

## 🌟 Key Features

- ⏳ **Live Countdown Timer**: Real-time ticker counting down Days, Hours, Minutes, and Seconds to **November 1, 2026**.
- 📖 **Interactive Love Story**: Timeline spanning key milestones:
  - **April 20, 2020**: Relationship start & Proposal moment.
  - **Engagement Ceremony**: Ring exchange & floral celebrations.
  - **Pre-Wedding Shoot**: Golden hour & lakeside memories.
  - **November 1, 2026**: Wedding Day & sacred vows.
- 🖼️ **Section Detail Views & Lightbox**: Click any section card to open a full-screen view with curated romantic quotes, dedicated photo albums, and section-specific photo uploaders.
- 📍 **Venue & Google Maps Integration**: Event schedule (*Mehendi, Haldi, Muhurtham, Reception*) with embedded interactive Google Maps container.
- 💌 **FastAPI-Powered RSVP**: Interactive form with guest count, dietary preferences, and celebratory confetti animation upon sending.
- 📜 **Wishes & Guestbook Wall**: Live wall of blessing notes stored persistently in SQLite.
- 🎵 **Ambient Music Player**: Romantic Web Audio synthesized chime arpeggios toggle in navbar.
- 📱 **100% Mobile Responsive**: Glassmorphism aesthetic tailored for mobile screens, tablets, and desktop browsers.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, Lucide Icons, Framer Motion, Canvas Confetti, Vanilla CSS variables & Glassmorphism design.
- **Backend**: Python 3.12, FastAPI, Uvicorn, SQLite, Pydantic, Python-Multipart.
- **Deployment Ready**: Configured for free hosting on **Render.com**, **Vercel**, and **Netlify**.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### 1. Backend Setup (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The API server will run at `http://127.0.0.1:8000`. You can test health at `http://127.0.0.1:8000/api/health`.

### 2. Frontend Setup (React Vite)
```bash
# Navigate to frontend directory
cd frontend

# Install node packages
npm install

# Run the development server
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## ☁️ Free Cloud Deployment

### Backend (Render.com)
1. Create a free account at [Render.com](https://render.com/).
2. Create a **New Web Service** pointing to the `backend` folder.
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel / Render / Netlify)
1. Import the `frontend` folder to [Vercel](https://vercel.com/) or [Render](https://render.com/).
2. Set Environment Variable: `VITE_API_URL` = `https://your-backend-api.onrender.com`
3. Build command: `npm run build` | Publish directory: `dist`

---

## 📄 License
Created with ❤️ for Adish & Nandhana's Wedding.
