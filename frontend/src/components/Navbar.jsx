import React, { useState, useEffect } from 'react';
import { Heart, Music, VolumeX, Menu, X, Calendar, MapPin, Image, MessageSquare, Send } from 'lucide-react';

export default function Navbar({ isPlayingMusic, toggleMusic }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story', icon: Heart },
    { name: 'Photo Gallery', href: '#gallery', icon: Image },
    { name: 'Event & Venue', href: '#venue', icon: MapPin },
    { name: 'RSVP', href: '#rsvp', icon: Send },
    { name: 'Wishes Wall', href: '#wishes', icon: MessageSquare },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(13, 40, 33, 0.92)'
          : 'linear-gradient(to bottom, rgba(13, 40, 33, 0.8), rgba(13, 40, 33, 0))',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.3)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          <span
            className="font-script"
            style={{
              fontSize: '2.4rem',
              color: '#d4af37',
              textShadow: '0 2px 10px rgba(212, 175, 55, 0.4)',
            }}
          >
            Adish & Nandhana
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#d4af37')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.9)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Music Toggle & Mobile Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Mute romantic melody' : 'Play romantic melody'}
            style={{
              background: isPlayingMusic ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.15)',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {isPlayingMusic ? <Music size={20} className="glow-animation" /> : <VolumeX size={20} />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: 'rgba(13, 40, 33, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 999,
          }}
        >
          {navLinks.map((link) => {
            const IconComp = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <IconComp size={20} color="#d4af37" />
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 851px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
