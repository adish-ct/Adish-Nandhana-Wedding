import React, { useState, useEffect } from 'react';
import { X, Sparkles, Upload, Image as ImageIcon, Heart, Calendar, PlusCircle, Quote } from 'lucide-react';
import { API_BASE_URL } from '../config';

// Section Metadata, Romantic Quotes, and Descriptions
export const SECTION_DATA = {
  proposal: {
    id: 'proposal',
    title: 'The Proposal & Relationship Start',
    subtitle: 'April 20, 2020 — Where Our Eternal Story Began',
    quote: '"From the moment our eyes met on April 20, 2020, I knew my heart had found its forever home. With a simple question and tears of joy, our journey of a lifetime began."',
    author: '— Adish & Nandhana',
    description: 'Under warm fairy lights and unforgettable ambient magic, Adish popped the question on April 20th, 2020. That golden evening marked the start of an unbreakable bond that grows stronger every day.',
    heroImage: '/uploads/proposal.jpg',
    categoryKey: 'proposal',
  },
  engagement: {
    id: 'engagement',
    title: 'The Official Engagement Ceremony',
    subtitle: 'Exchanging Rings & Sacred Promises',
    quote: '"Two rings, one sacred promise, and two hearts locked in everlasting love. Our engagement marks the day two families truly became one."',
    author: '— Sacred Vows & Blessings',
    description: 'Draped in traditional festive elegance and surrounded by royal floral decorations, Adish & Nandhana exchanged engagement rings amidst traditional melodies and family blessings.',
    heroImage: '/uploads/engagement.jpg',
    categoryKey: 'engagement',
  },
  bride_to_be: {
    id: 'bride-to-be',
    title: 'The Bride To Be',
    subtitle: "Celebrating Nandhana's Journey",
    quote: '"Every love story has a heroine, and today we celebrate ours."',
    author: '— Nandhana',
    description: "A beautiful glimpse into the bride-to-be's preparations, dreams, and moments leading up to the big day.",
    heroImage: '/uploads/bride_to_be.jpg',
    categoryKey: 'bride_to_be',
  },
  prewedding: {
    id: 'prewedding',
    title: 'The Pre-Wedding Shoot Highlights',
    subtitle: 'Capturing Laughter, Dreams & Togetherness',
    quote: '"In your arms is my favorite place in the world. Every smile shared during sunset reminds me that forever with you is not enough."',
    author: '— Love in Bloom',
    description: 'From scenic lake views to golden hour gardens, our pre-wedding photoshoot captured the raw joy, candid smiles, and sweet moments before our grand wedding day.',
    heroImage: '/uploads/prewedding_1.jpg',
    categoryKey: 'prewedding',
  },
  wedding: {
    id: 'wedding',
    title: 'The Grand Wedding Day',
    subtitle: 'November 1, 2026 — Two Souls, One Destiny',
    quote: '"To have and to hold from this day forward, for better, for worse, in sickness and in health, to love and to cherish till eternity."',
    author: '— Sacred Wedding Vows',
    description: 'On November 1st, 2026, surrounded by parents, relatives, and beloved friends, Adish & Nandhana tie the sacred wedding knot and step into a lifetime of bliss.',
    heroImage: '/uploads/hero_banner.jpg',
    categoryKey: 'wedding',
  },
};

export default function SectionDetailModal({ sectionId, onClose, onRefreshPhotos }) {
  const [sectionPhotos, setSectionPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Upload Form State inside section
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  const section = SECTION_DATA[sectionId] || SECTION_DATA.proposal;

  const fetchSectionPhotos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/photos`);
      const data = await res.json();
      const allPhotos = data.data || [];
      // Filter for this section's category
      const matched = allPhotos.filter((p) => p.category === section.categoryKey);
      setSectionPhotos(matched);
    } catch (err) {
      console.error('Error fetching section photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionPhotos();
  }, [sectionId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMsg('Please select an image file to upload.');
      return;
    }

    try {
      setUploading(true);
      setMsg('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', photoTitle || `${section.title} Photo`);
      formData.append('category', section.categoryKey);
      formData.append('uploaded_by', uploaderName || 'Guest');

      const res = await fetch(`${API_BASE_URL}/api/photos/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setMsg('✨ Photo uploaded successfully to this section!');
        setPhotoTitle('');
        setFile(null);
        fetchSectionPhotos();
        if (onRefreshPhotos) onRefreshPhotos();
        setTimeout(() => {
          setShowUploadForm(false);
          setMsg('');
        }, 1600);
      } else {
        setMsg(result.detail || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setMsg('Could not upload photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(6, 21, 17, 0.94)',
        backdropFilter: 'blur(16px)',
        overflowY: 'auto',
        padding: '30px 15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1000px',
          background: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          margin: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(13, 40, 33, 0.75)',
            border: '1px solid #d4af37',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}
        >
          <X size={24} />
        </button>

        {/* Hero Header Banner */}
        <div
          style={{
            position: 'relative',
            height: '340px',
            backgroundImage: `linear-gradient(to bottom, rgba(13, 40, 33, 0.3), rgba(13, 40, 33, 0.85)), url("https://adish-nandhana-wedding.onrender.com${section.heroImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '40px 30px',
            color: '#ffffff',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212, 175, 55, 0.25)',
                border: '1px solid #d4af37',
                padding: '4px 14px',
                borderRadius: '20px',
                color: '#d4af37',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '10px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Sparkles size={16} /> Section Highlight View
            </div>

            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', lineHeight: 1.1 }}>
              {section.title}
            </h2>

            <p style={{ color: '#d4af37', fontSize: '1.05rem', marginTop: '6px', fontWeight: 500 }}>
              {section.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '36px 30px 40px' }}>
          {/* Romantic Quote Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(253, 246, 247, 1) 0%, rgba(255, 251, 247, 1) 100%)',
              borderLeft: '5px solid #d4af37',
              borderRadius: '16px',
              padding: '28px 30px',
              marginBottom: '35px',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.1)',
              position: 'relative',
            }}
          >
            <Quote size={32} color="#d4af37" style={{ position: 'absolute', top: '15px', right: '20px', opacity: 0.2 }} />
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: 'var(--primary-emerald)',
                lineHeight: 1.6,
                marginBottom: '10px',
              }}
            >
              {section.quote}
            </p>
            <div style={{ color: '#b38b29', fontWeight: 600, fontSize: '0.95rem' }}>
              {section.author}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '14px', lineHeight: 1.6 }}>
              {section.description}
            </p>
          </div>

          {/* Section Gallery Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '15px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-emerald)' }}>
                {section.title} Photos ({sectionPhotos.length})
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Browse photos or upload new photos specifically to this section.
              </p>
            </div>

            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="btn-gold"
              style={{ fontSize: '0.9rem', padding: '10px 20px' }}
            >
              <PlusCircle size={18} /> Upload Photo to {section.title.split(' ')[0]}
            </button>
          </div>

          {/* Upload Form for Section */}
          {showUploadForm && (
            <div
              className="glass-card"
              style={{
                padding: '24px',
                marginBottom: '30px',
                background: '#fffbf7',
                border: '1px solid #d4af37',
              }}
            >
              <h4 style={{ color: 'var(--primary-emerald)', fontSize: '1.2rem', marginBottom: '6px' }}>
                Upload Photo to {section.title}
              </h4>

              {msg && (
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '6px',
                    background: msg.includes('✨') ? 'rgba(212, 175, 55, 0.15)' : 'rgba(220, 53, 69, 0.1)',
                    color: msg.includes('✨') ? '#b38b29' : '#dc3545',
                    fontSize: '0.9rem',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}
                >
                  {msg}
                </div>
              )}

              <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '4px' }}>
                    Photo Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring Exchange Moment"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d4af37' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '4px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adish / Nandhana / Friend"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d4af37' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '4px' }}>
                    Select Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px dashed #d4af37', background: '#fff' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-gold"
                  style={{ gridColumn: '1 / -1', justifyContent: 'center' }}
                >
                  {uploading ? 'Uploading...' : `Upload to ${section.title}`}
                </button>
              </form>
            </div>
          )}

          {/* Photos Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Loading photos...
            </div>
          ) : sectionPhotos.length === 0 ? (
            <div
              className="glass-card"
              style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}
            >
              <ImageIcon size={36} color="#d4af37" style={{ marginBottom: '10px' }} />
              <h4>No photos uploaded for this section yet</h4>
              <p style={{ marginTop: '4px' }}>Click the upload button above to add photos to {section.title}!</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {sectionPhotos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  className="glass-card"
                  onClick={() => setSelectedPhoto(photo)}
                  style={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={`${API_BASE_URL}${photo.image_url}`}
                      alt={photo.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h5 style={{ color: 'var(--primary-emerald)', fontSize: '1rem' }}>{photo.title}</h5>
                    <span style={{ fontSize: '0.8rem', color: '#b38b29' }}>By {photo.uploaded_by}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section Lightbox Overlay */}
        {selectedPhoto && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 4000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
            <div style={{ textAlign: 'center', maxWidth: '800px' }}>
              <img
                src={`${API_BASE_URL}${selectedPhoto.image_url}`}
                alt={selectedPhoto.title}
                style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '12px' }}
              />
              <h3 style={{ color: '#d4af37', marginTop: '12px', fontSize: '1.3rem' }}>{selectedPhoto.title}</h3>
              <p style={{ color: '#ccc', fontSize: '0.85rem' }}>Uploaded by {selectedPhoto.uploaded_by}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
