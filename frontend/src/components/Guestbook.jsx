import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Sparkles, User } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Guestbook() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [message, setMessage] = useState('');
  const [posting, setPosting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchWishes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/wishes`);
      const data = await res.json();
      setWishes(data.data || []);
    } catch (err) {
      console.error(err);
      setWishes([
        { id: 1, sender_name: 'Priya & Rahul', relationship: 'College Friends', message: "Wishing Adish & Nandhana a lifetime of happiness, laughter, and endless love! Can't wait for Nov 1, 2026! 🎉✨" },
        { id: 2, sender_name: 'Anoop (Brother)', relationship: 'Family', message: 'From April 20, 2020 to forever! So thrilled for both of you as you embark on this magical journey.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handlePostWish = async (e) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setStatusMsg('Please fill in your name and message');
      return;
    }

    try {
      setPosting(true);
      setStatusMsg('');
      const res = await fetch(`${API_BASE_URL}/api/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: senderName,
          relationship: relationship,
          message: message,
        }),
      });

      if (res.ok) {
        setStatusMsg('✨ Your wish has been posted to the wall!');
        setSenderName('');
        setMessage('');
        fetchWishes();
        setTimeout(() => setStatusMsg(''), 3000);
      } else {
        const errData = await res.json();
        setStatusMsg(errData.detail || 'Failed to post wish');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Could not connect to backend server');
    } finally {
      setPosting(false);
    }
  };

  return (
    <section id="wishes" style={{ padding: '100px 20px', background: '#fffbf7' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Shower Us With Blessings</span>
          <h2 className="section-title">Wishes & Guestbook Wall</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem' }}>
            Leave your warmest blessings, stories, and love notes for Adish & Nandhana.
          </p>
        </div>

        {/* 2-Column Grid: Post Wish Form & Live Wishes Wall */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Post Wish Form */}
          <div className="glass-card" style={{ padding: '30px', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)', marginBottom: '6px' }}>
              Write a Blessing Note
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Your wish will appear instantly on the live guestbook wall below.
            </p>

            {statusMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: statusMsg.includes('✨') ? 'rgba(212, 175, 55, 0.15)' : 'rgba(220, 53, 69, 0.1)',
                  color: statusMsg.includes('✨') ? '#b38b29' : '#dc3545',
                  marginBottom: '16px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {statusMsg}
              </div>
            )}

            <form onSubmit={handlePostWish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Relationship to Couple
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                    background: '#fff',
                  }}
                >
                  <option value="Friend">Friend / Well-wisher</option>
                  <option value="Family">Family / Relative</option>
                  <option value="Colleague">Work Colleague</option>
                  <option value="Best Friend">Best Friend</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Your Wish / Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="May your journey from April 20, 2020 continue with endless love and laughter! Best wishes on your wedding..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={posting}
                className="btn-gold"
                style={{ justifyContent: 'center', marginTop: '6px' }}
              >
                {posting ? 'Posting Wish...' : 'Post Your Wish'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Live Wishes Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'var(--primary-emerald)', fontSize: '1.35rem' }}>
                Blessings ({wishes.length})
              </h3>
              <Sparkles color="#d4af37" size={20} />
            </div>

            {loading ? (
              <div style={{ color: 'var(--text-muted)' }}>Loading blessings...</div>
            ) : wishes.length === 0 ? (
              <div className="glass-card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No wishes posted yet. Be the first to leave a message!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '520px', overflowY: 'auto', paddingRight: '6px' }}>
                {wishes.map((w, idx) => (
                  <div
                    key={w.id || idx}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      borderLeft: '4px solid #d4af37',
                      background: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--primary-emerald)',
                            color: '#d4af37',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                          }}
                        >
                          {w.sender_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--primary-emerald)', fontSize: '1.05rem', display: 'block' }}>
                            {w.sender_name}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: '#b38b29', fontWeight: 600 }}>
                            {w.relationship}
                          </span>
                        </div>
                      </div>
                      <Heart size={18} color="#d4af37" fill="#d4af37" />
                    </div>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{w.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
