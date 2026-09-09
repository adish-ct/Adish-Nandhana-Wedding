import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { getImageUrl } from '../config';

export default function HeroCountdown({ weddingInfo }) {
  // Target date: Nov 1, 2026 10:30:00 AM IST
  const targetDate = new Date('2026-11-01T10:30:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(13, 40, 33, 0.65), rgba(13, 40, 33, 0.75)), url("https://adish-nandhana-wedding.onrender.com/uploads/hero_banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#ffffff',
        textAlign: 'center',
        padding: '120px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', zIndex: 2 }}>
        {/* Subtitle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <Sparkles color="#d4af37" size={20} />
          <span
            style={{
              fontSize: '1.1rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d4af37',
              fontWeight: 600,
            }}
          >
            We Are Getting Married
          </span>
          <Sparkles color="#d4af37" size={20} />
        </div>

        {/* Main Couple Name */}
        <h1
          className="font-script"
          style={{
            fontSize: 'clamp(3.8rem, 9vw, 7rem)',
            color: '#ffffff',
            lineHeight: 1.1,
            margin: '10px 0 20px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          Adish <span style={{ color: '#d4af37', fontSize: '0.8em' }}>&</span> Nandhana
        </h1>

        {/* Date & Location Pill */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px 30px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            padding: '12px 30px',
            borderRadius: '50px',
            margin: '0 0 45px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fcf4f5' }}>
            <Calendar size={18} color="#d4af37" />
            <span style={{ fontWeight: 500 }}>November 1, 2026</span>
          </div>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.3)' }} className="mobile-hide" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fcf4f5' }}>
            <MapPin size={18} color="#d4af37" />
            <span style={{ fontWeight: 500 }}>Kochi, Kerala, India</span>
          </div>
        </div>

        {/* Live Countdown Timer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            maxWidth: '650px',
            margin: '0 auto 45px',
          }}
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-dark glow-animation"
              style={{
                padding: '20px 10px',
                textAlign: 'center',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                  fontWeight: 700,
                  color: '#d4af37',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '2px',
                  marginTop: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <a href="#story" className="btn-gold" style={{ textDecoration: 'none' }}>
            <Heart size={18} /> Our Love Story
          </a>
          <a
            href="#rsvp"
            className="btn-outline"
            style={{ textDecoration: 'none', color: '#ffffff', borderColor: '#ffffff' }}
          >
            RSVP Now
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 550px) {
          .mobile-hide {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
