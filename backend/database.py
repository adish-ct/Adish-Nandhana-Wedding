import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "wedding.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # RSVPs Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rsvp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guest_name TEXT NOT NULL,
            email TEXT,
            attending TEXT NOT NULL,
            guest_count INTEGER DEFAULT 1,
            dietary_preference TEXT,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Guest Wishes Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS wishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_name TEXT NOT NULL,
            relationship TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Photo Gallery Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT NOT NULL,
            uploaded_by TEXT DEFAULT 'Adish & Nandhana',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    
    # Seed initial photos if empty
    cursor.execute('SELECT COUNT(*) FROM photos')
    if cursor.fetchone()[0] == 0:
        initial_photos = [
            ("The Proposal Moment", "proposal", "/uploads/proposal.jpg", "Adish"),
            ("Royal Engagement Ring Ceremony", "engagement", "/uploads/engagement.jpg", "Adish & Nandhana"),
            ("Golden Hour Sunset Romance", "prewedding", "/uploads/hero_banner.jpg", "Adish & Nandhana"),
            ("Lakeside Elegance Shoot", "prewedding", "/uploads/prewedding_1.jpg", "Nandhana"),
        ]
        cursor.executemany(
            'INSERT INTO photos (title, category, image_url, uploaded_by) VALUES (?, ?, ?, ?)',
            initial_photos
        )
        conn.commit()
        
    # Seed initial sample wishes if empty
    cursor.execute('SELECT COUNT(*) FROM wishes')
    if cursor.fetchone()[0] == 0:
        initial_wishes = [
            ("Priya & Rahul", "College Friends", "Wishing Adish & Nandhana a lifetime of happiness, laughter, and endless love! Can't wait for Nov 1, 2026! 🎉✨"),
            ("Anoop (Brother)", "Family", "From April 20, 2020 to forever! So thrilled for both of you as you embark on this magical journey."),
            ("Sneha M.", "Best Friend", "You two are truly made for each other. Counting down the days to celebrate your big day!")
        ]
        cursor.executemany(
            'INSERT INTO wishes (sender_name, relationship, message) VALUES (?, ?, ?)',
            initial_wishes
        )
        conn.commit()

    conn.close()
