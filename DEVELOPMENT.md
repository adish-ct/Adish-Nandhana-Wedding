# 🛠️ Development & Architectural Guide

This document provides a comprehensive technical guide for developers working on or extending **Adish & Nandhana's Wedding Web Application**.

---

## 📁 Repository Architecture & Directory Structure

```
Adish-Nandhana-Wedding/
├── backend/
│   ├── database.py       # SQLite connection, schema migrations, and initial seed data
│   ├── main.py           # FastAPI application routes, CORS middleware & upload handler
│   ├── schemas.py        # Pydantic data validation schemas
│   ├── test_api.py       # Automated integration test suite
│   ├── requirements.txt  # Python backend dependencies
│   ├── Procfile          # Production runner for Uvicorn
│   ├── render.yaml       # Render.com free deployment specification
│   └── uploads/          # Uploaded image assets directory
├── frontend/
│   ├── index.html        # HTML entry point with Google Fonts (Playfair Display & Outfit)
│   ├── package.json      # Node dependencies (Vite, React, Lucide Icons, Canvas Confetti)
│   ├── vite.config.js    # Vite build & local proxy settings
│   ├── vercel.json       # Vercel SPA route rewrite rules
│   ├── netlify.toml      # Netlify deployment configuration
│   └── src/
│       ├── main.jsx      # React DOM root entry point
│       ├── App.jsx       # Main App component with Web Audio synth music player
│       ├── config.js     # Central API Base URL helper (`VITE_API_URL`)
│       ├── index.css     # CSS Design System (Glassmorphism, CSS variables, animations)
│       └── components/
│           ├── Navbar.jsx             # Sticky blur header with mobile menu & audio toggle
│           ├── HeroCountdown.jsx      # Hero section with live ticking countdown
│           ├── LoveStory.jsx          # Interactive milestone timeline
│           ├── SectionDetailModal.jsx # Dedicated section modal with romantic quotes & photo uploader
│           ├── GalleryAlbum.jsx       # Category photo grid with lightbox modal
│           ├── EventLocation.jsx      # Event schedule & Google Maps embed
│           ├── RSVPSection.jsx        # RSVP submission form connected to FastAPI
│           ├── Guestbook.jsx          # Live wishes wall connected to FastAPI
│           └── Footer.jsx             # Footer with back-to-top button
├── README.md             # Project overview & quick start guide
├── DEVELOPMENT.md        # Technical developer manual
└── .gitignore            # Version control exclusions
```

---

## 🗄️ Database Schemas (SQLite)

The backend uses SQLite (`wedding.db`) managed via `database.py`:

### 1. `rsvp` Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Auto increment ID |
| `guest_name` | TEXT NOT NULL | Guest full name |
| `email` | TEXT | Guest email or phone |
| `attending` | TEXT NOT NULL | 'Yes' or 'No' |
| `guest_count` | INTEGER | Number of guests attending |
| `dietary_preference` | TEXT | Dietary preference (e.g. Vegetarian) |
| `message` | TEXT | Special note for couple |
| `created_at` | TIMESTAMP | Record creation timestamp |

### 2. `wishes` Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Auto increment ID |
| `sender_name` | TEXT NOT NULL | Sender name |
| `relationship` | TEXT | Relationship (e.g. Family, Friend) |
| `message` | TEXT NOT NULL | Wish message text |
| `created_at` | TIMESTAMP | Timestamp |

### 3. `photos` Table
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Auto increment ID |
| `title` | TEXT NOT NULL | Photo title |
| `category` | TEXT NOT NULL | `proposal`, `engagement`, `prewedding`, `wedding` |
| `image_url` | TEXT NOT NULL | URL path (`/uploads/filename.jpg`) |
| `uploaded_by` | TEXT | Name of uploader |
| `created_at` | TIMESTAMP | Upload timestamp |

---

## 🔌 API Reference

### 1. Health & Information
- **`GET /api/health`**: Returns `{"status": "ok"}`.
- **`GET /api/wedding-info`**: Returns groom, bride, date, venue details, and default map embed link.

### 2. RSVPs
- **`POST /api/rsvp`**: Submit a new RSVP. Accepts `RSVPCreate` payload.
- **`GET /api/rsvp`**: Fetch list of all guest RSVPs.

### 3. Guestbook Wishes
- **`GET /api/wishes`**: Fetch all guest blessing notes sorted by newest first.
- **`POST /api/wishes`**: Submit a new blessing note. Accepts `WishCreate` payload.

### 4. Photo Gallery & Uploads
- **`GET /api/photos`**: List all uploaded photos.
- **`POST /api/photos/upload`**: Multipart form data (`file`, `title`, `category`, `uploaded_by`). Saves image to `backend/uploads/` and inserts record into `photos` table.

---

## 🎨 Customization How-To Guide

### 1. Updating Couple Names or Wedding Date
Modify `backend/main.py`:
```python
@app.get("/api/wedding-info")
def get_wedding_info():
    return {
        "groom": "Adish",
        "bride": "Nandhana",
        "relationship_start": "2020-04-20",
        "wedding_date": "2026-11-01T10:30:00+05:30",
        "venue": {
            "name": "Your Venue Name",
            "city": "Kochi, Kerala",
            "google_maps_url": "YOUR_GOOGLE_MAPS_URL",
            "embed_map": "YOUR_GOOGLE_MAPS_EMBED_IFRAME_SRC"
        }
    }
```
And in `frontend/src/components/HeroCountdown.jsx`, update `targetDate`.

### 2. Adding a New Section or Milestone
1. Open `frontend/src/components/SectionDetailModal.jsx`.
2. Add your section metadata to `SECTION_DATA`:
```javascript
mysection: {
  id: 'mysection',
  title: 'My Custom Milestone',
  subtitle: 'Subtitle text',
  quote: '"Romantic quote for this milestone..."',
  author: '— Author',
  description: 'Full description...',
  heroImage: '/uploads/myimage.jpg',
  categoryKey: 'mysection',
}
```
3. Add the milestone entry to `LoveStory.jsx` and `GalleryAlbum.jsx`.

---

## 🧪 Testing

Run backend tests using:
```bash
cd backend
python test_api.py
```

Run frontend build check:
```bash
cd frontend
npm run build
```
