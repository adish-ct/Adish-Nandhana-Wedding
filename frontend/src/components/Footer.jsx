import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--primary-emerald)',
        color: '#ffffff',
        padding: '60px 20px 30px',
        borderTop: '2px solid rgba(212, 175, 55, 0.4)',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          title="Back to top"
          style={{
            position: 'absolute',
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#d4af37',
            color: 'var(--primary-emerald)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'translateX(-50%) scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'translateX(-50%) scale(1)')}
        >
          <ArrowUp size={24} />
        </button>

        <h2
          className="font-script"
          style={{ fontSize: '3.2rem', color: '#d4af37', marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Adish & Nandhana
        </h2>

        <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', color: '#e2b97c', fontWeight: 600, marginBottom: '20px' }}>
          From April 20, 2020 • To Forever Begins November 1, 2026
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '30px' }}>
          <span>Created with love for our wedding celebration</span>
          <Heart size={16} color="#d4af37" fill="#d4af37" />
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          © 2026 Adish & Nandhana Wedding. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
