import React, { useState } from 'react';
import { Send, CheckCircle2, UserCheck, Utensils, Users, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../config';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    attending: 'Yes',
    guest_count: 1,
    dietary_preference: 'No special preference',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guest_name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const res = await fetch(`${API_BASE_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        // Trigger celebratory confetti animation!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#e2b97c', '#0d2821'],
        });
      } else {
        const data = await res.json();
        setErrorMsg(data.detail || 'Failed to submit RSVP');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error connecting to wedding backend server');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" style={{ padding: '100px 20px', background: '#fdf6f7', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Are You Attending?</span>
          <h2 className="section-title">RSVP to Our Wedding</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem' }}>
            Please let us know if you can join us for Adish & Nandhana's special day by September 30, 2026.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '36px', background: '#ffffff' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={60} color="#d4af37" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-emerald)', marginBottom: '8px' }}>
                RSVP Received with Thanks!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 24px' }}>
                We are thrilled to receive your response for Adish & Nandhana's wedding celebration on November 1, 2026!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-gold"
                style={{ margin: '0 auto' }}
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {errorMsg && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(220, 53, 69, 0.1)',
                    color: '#dc3545',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="guest_name"
                    value={formData.guest_name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '10px',
                      border: '1px solid #d4af37',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <UserCheck size={18} color="#d4af37" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Email / Phone */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Email Address / Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com or phone"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '10px',
                      border: '1px solid #d4af37',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Mail size={18} color="#d4af37" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Attendance & Guest Count Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                    Will You Attend?
                  </label>
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #d4af37',
                      outline: 'none',
                      background: '#fff',
                      fontSize: '0.95rem',
                    }}
                  >
                    <option value="Yes">Joyfully Accept 🎉</option>
                    <option value="No">Regretfully Decline 💌</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                    Number of Guests
                  </label>
                  <select
                    name="guest_count"
                    value={formData.guest_count}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #d4af37',
                      outline: 'none',
                      background: '#fff',
                      fontSize: '0.95rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Dietary Preferences
                </label>
                <input
                  type="text"
                  name="dietary_preference"
                  value={formData.dietary_preference}
                  onChange={handleChange}
                  placeholder="e.g. Vegetarian, Jain Food, No Seafood, N/A"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              {/* Warm Message / Note */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: 'var(--primary-emerald)', marginBottom: '6px' }}>
                  Special Note for the Couple
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your wishes or song request..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold"
                style={{ justifyContent: 'center', padding: '14px 28px', fontSize: '1.05rem', marginTop: '10px' }}
              >
                {submitting ? 'Submitting RSVP...' : 'Send RSVP Confirmation'} <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
