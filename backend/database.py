import sqlite3
import os

DATABASE_URL = os.environ.get("DATABASE_URL") or ""

def is_postgres():
    return bool(DATABASE_URL)

def get_db_connection():
    if is_postgres():
        import psycopg2
        from psycopg2.extras import RealDictCursor
        url = DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        conn = psycopg2.connect(url, cursor_factory=RealDictCursor)
        return conn
    else:
        DB_PATH = os.path.join(os.path.dirname(__file__), "wedding.db")
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

def db_fetch_all(query: str, params: tuple = ()):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        if is_postgres():
            query = query.replace("?", "%s")
        cursor.execute(query, params)
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

def db_execute_insert(query: str, params: tuple = ()):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        if is_postgres():
            query_pg = query.replace("?", "%s") + " RETURNING id"
            cursor.execute(query_pg, params)
            result = cursor.fetchone()
            inserted_id = result['id'] if result else None
        else:
            cursor.execute(query, params)
            inserted_id = cursor.lastrowid
        conn.commit()
        return inserted_id
    finally:
        conn.close()

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    id_type = "SERIAL PRIMARY KEY" if is_postgres() else "INTEGER PRIMARY KEY AUTOINCREMENT"
    
    # RSVPs Table
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS rsvp (
            id {id_type},
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
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS wishes (
            id {id_type},
            sender_name TEXT NOT NULL,
            relationship TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Photo Gallery Table
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS photos (
            id {id_type},
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
    row = cursor.fetchone()
    count = list(row.values())[0] if is_postgres() else row[0]
    
    if count == 0:
        initial_photos = [
            ("The Proposal Moment", "proposal", "/uploads/proposal.jpg", "Adish"),
            ("Royal Engagement Ring Ceremony", "engagement", "/uploads/engagement.jpg", "Adish & Nandhana"),
            ("Golden Hour Sunset Romance", "prewedding", "/uploads/hero_banner.jpg", "Adish & Nandhana"),
            ("Lakeside Elegance Shoot", "prewedding", "/uploads/prewedding_1.jpg", "Nandhana"),
        ]
        if is_postgres():
            for p in initial_photos:
                cursor.execute('INSERT INTO photos (title, category, image_url, uploaded_by) VALUES (%s, %s, %s, %s)', p)
        else:
            cursor.executemany(
                'INSERT INTO photos (title, category, image_url, uploaded_by) VALUES (?, ?, ?, ?)',
                initial_photos
            )
        conn.commit()
        
    # Seed initial sample wishes if empty
    cursor.execute('SELECT COUNT(*) FROM wishes')
    row = cursor.fetchone()
    count = list(row.values())[0] if is_postgres() else row[0]
    
    if count == 0:
        initial_wishes = [
            ("Priya & Rahul", "College Friends", "Wishing Adish & Nandhana a lifetime of happiness, laughter, and endless love! Can't wait for Nov 1, 2026! 🎉✨"),
            ("Anoop (Brother)", "Family", "From April 20, 2020 to forever! So thrilled for both of you as you embark on this magical journey."),
            ("Sneha M.", "Best Friend", "You two are truly made for each other. Counting down the days to celebrate your big day!")
        ]
        if is_postgres():
            for w in initial_wishes:
                cursor.execute('INSERT INTO wishes (sender_name, relationship, message) VALUES (%s, %s, %s)', w)
        else:
            cursor.executemany(
                'INSERT INTO wishes (sender_name, relationship, message) VALUES (?, ?, ?)',
                initial_wishes
            )
        conn.commit()

    conn.close()
