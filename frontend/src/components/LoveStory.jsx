import React from 'react';
import { Heart, Calendar, Sparkles, Compass, ArrowRight } from 'lucide-react';

export default function LoveStory({ onOpenSection }) {
  const milestones = [
    {
      id: 'proposal',
      date: 'April 20, 2020',
      title: 'Our Relationship Began & The Proposal',
      subtitle: 'The spark that changed our lives forever',
      description:
        'On April 20th, 2020, our story officially began. Under magical fairy lights, Adish proposed to Nandhana. Click to view dedicated quotes and proposal photos!',
      image: '/uploads/proposal.jpg',
      badge: 'April 20, 2020',
    },
    {
      id: 'engagement',
      date: 'Engagement Day',
      title: 'The Engagement Ceremony',
      subtitle: 'Exchanging rings & sacred promises',
      description:
        'Draped in traditional festive grandeur, Adish & Nandhana exchanged rings amidst traditional floral decorations and family blessings. Click to view engagement photos!',
      image: '/uploads/engagement.jpg',
      badge: 'Ring Ceremony',
    },
    {
      id: 'prewedding',
      date: 'Pre-Wedding Shoot',
      title: 'The Pre-Wedding Photoshoot',
      subtitle: 'Capturing our love before the grand vow',
      description:
        'Surrounded by warm golden hour lights and scenic waterside views, we captured memories that reflect our joy. Click to view pre-wedding shoot photos!',
      image: '/uploads/prewedding_1.jpg',
      badge: 'Pre-Wedding Shoot',
    },
    {
      id: 'wedding',
      date: 'November 1, 2026',
      title: 'The Wedding Day: Forever Begins',
      subtitle: 'Two souls, one lifetime of bliss',
      description:
        'On November 1st, 2026, surrounded by our beloved family and friends, Adish & Nandhana tie the sacred wedding knot. Click to view wedding highlights!',
      image: '/uploads/hero_banner.jpg',
      badge: 'The Big Day',
    },
  ];

  return (
    <section id="story" style={{ padding: '100px 20px', background: '#fffbf7', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">How It Started</span>
          <h2 className="section-title">Our Romantic Love Story</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem', maxWidth: '650px', margin: '12px auto 0' }}>
            From our proposal on <strong style={{ color: 'var(--primary-emerald)' }}>April 20, 2020</strong> to our Engagement and Marriage on <strong style={{ color: 'var(--primary-emerald)' }}>November 1, 2026</strong>. Click any section to open its dedicated view & photo album!
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
          {/* Center Vertical Line */}
          <div
            className="timeline-line"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '3px',
              background: 'linear-gradient(to bottom, #d4af37 0%, rgba(212, 175, 55, 0.25) 100%)',
              transform: 'translateX(-50%)',
            }}
          />

          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="timeline-item"
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginBottom: '70px',
                  position: 'relative',
                }}
              >
                {/* Timeline Content Card */}
                <div
                  style={{
                    width: '45%',
                  }}
                  className="timeline-card-wrapper"
                >
                  <div
                    className="glass-card"
                    onClick={() => onOpenSection && onOpenSection(item.id)}
                    style={{
                      padding: '28px',
                      boxShadow: '0 12px 30px rgba(13, 40, 33, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      cursor: 'pointer',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = '#d4af37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: '#b38b29',
                          padding: '4px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {item.badge}
                      </span>
                      <Sparkles size={16} color="#d4af37" />
                    </div>

                    <h3 style={{ fontSize: '1.45rem', color: 'var(--primary-emerald)', marginBottom: '4px' }}>
                      {item.title}
                    </h3>

                    <div style={{ color: '#d4af37', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '14px' }}>
                      {item.subtitle}
                    </div>

                    {/* Image Preview inside card */}
                    <div
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                        height: '220px',
                      }}
                    >
                      <img
                        src={`https://adish-nandhana-wedding.onrender.com${item.image}`}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {item.description}
                    </p>

                    <button
                      className="btn-outline"
                      style={{
                        padding: '8px 18px',
                        fontSize: '0.85rem',
                        width: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      View Section & Photos <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Timeline Center Badge/Icon */}
                <div
                  onClick={() => onOpenSection && onOpenSection(item.id)}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--primary-emerald)',
                    border: '3px solid #d4af37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d4af37',
                    zIndex: 5,
                    cursor: 'pointer',
                    boxShadow: '0 0 18px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  <Heart size={20} fill="#d4af37" />
                </div>

                {/* Empty space for opposite side */}
                <div style={{ width: '45%' }} className="timeline-empty" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-left: 50px;
            margin-bottom: 50px !important;
          }
          .timeline-card-wrapper {
            width: 100% !important;
          }
          .timeline-empty {
            display: none !important;
          }
          .timeline-item > div:nth-child(2) {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
