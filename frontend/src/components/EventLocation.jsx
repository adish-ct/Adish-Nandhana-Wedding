import React from 'react';
import { MapPin, Calendar, Clock, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function EventLocation({ weddingInfo }) {
  const events = [
    {
      title: 'Mehendi & Sangeet',
      date: 'October 31, 2026',
      time: '05:00 PM onwards',
      venue: 'Royal Garden Lawn, Grand Palace Resort',
      description: 'An evening of henna, music, dance performances, and cheerful celebrations.',
    },
    {
      title: 'Haldi Ceremony',
      date: 'November 1, 2026',
      time: '08:00 AM - 09:30 AM',
      venue: 'Courtyard Poolside',
      description: 'Bright yellow laughter and sacred auspicious turmeric blessings for Adish & Nandhana.',
    },
    {
      title: 'Sacred Wedding Ceremony (Muhurtham)',
      date: 'November 1, 2026',
      time: '10:30 AM - 12:15 PM',
      venue: 'Grand Palace Convention Hall',
      description: 'The auspicious moment where Adish & Nandhana exchange vows and begin their married life.',
    },
    {
      title: 'Grand Wedding Reception',
      date: 'November 1, 2026',
      time: '06:30 PM onwards',
      venue: 'The Grand Ballroom',
      description: 'Join us for a royal dinner, toasts, music, and unforgettable evening festivities.',
    },
  ];

  const mapEmbedUrl = weddingInfo?.venue?.embed_map || 'https://maps.app.goo.gl/JkPp3guNpNYmx9AZ9';
  const mapDirectionsUrl = weddingInfo?.venue?.google_maps_url || 'https://maps.app.goo.gl/JkPp3guNpNYmx9AZ9';

  return (
    <section id="venue" style={{ padding: '100px 20px', background: '#fffbf7' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Join Our Celebrations</span>
          <h2 className="section-title">Schedule & Location</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem' }}>
            We cannot wait to celebrate each sacred milestone with you on November 1st, 2026.
          </p>
        </div>

        {/* Grid Layout: Events List & Google Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Events Schedule Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {events.map((evt, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderLeft: '5px solid #d4af37',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-emerald)' }}>{evt.title}</h3>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: '#b38b29',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: 600,
                    }}
                  >
                    {evt.date}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={16} color="#d4af37" />
                    <span>{evt.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={16} color="#d4af37" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{evt.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Google Map Column */}
          <div className="glass-card" style={{ padding: '24px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ color: 'var(--primary-emerald)', fontSize: '1.35rem' }}>Venue Location</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {weddingInfo?.venue?.name || 'Grand Palace Hall & Resort'}, {weddingInfo?.venue?.city || 'Kochi, Kerala'}
                </p>
              </div>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>

            {/* Embedded Map Frame */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                height: '380px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                position: 'relative',
              }}
            >
              <iframe
                title="Wedding Venue Map Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div style={{ marginTop: '14px', background: 'rgba(212, 175, 55, 0.1)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={20} color="#b38b29" />
              <span style={{ fontSize: '0.85rem', color: '#b38b29', fontWeight: 500 }}>
                Google Map address ready to update! Send your exact venue URL anytime to update the map embed.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
