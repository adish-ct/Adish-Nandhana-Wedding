import React, { useState, useEffect } from 'react';
import { Image, Upload, X, ChevronLeft, ChevronRight, Filter, Sparkles, PlusCircle } from 'lucide-react';
import { API_BASE_URL, getImageUrl } from '../config';

export default function GalleryAlbum({ onOpenSection, refreshTrigger }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('prewedding');
  const [uploadName, setUploadName] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Fetch photos from FastAPI backend
  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/photos`);
      const data = await res.json();
      setPhotos(data.data || []);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setPhotos([
        { id: 1, title: 'Golden Hour Romance', category: 'prewedding', image_url: '/uploads/hero_banner.jpg', uploaded_by: 'Adish & Nandhana' },
        { id: 2, title: 'The April 20 Proposal', category: 'proposal', image_url: '/uploads/proposal.jpg', uploaded_by: 'Adish' },
        { id: 3, title: 'Royal Engagement Ring Ceremony', category: 'engagement', image_url: '/uploads/engagement.jpg', uploaded_by: 'Adish & Nandhana' },
        { id: 4, title: 'Lakeside Shoot', category: 'prewedding', image_url: '/uploads/prewedding_1.jpg', uploaded_by: 'Nandhana' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadMessage('Please select an image file to upload.');
      return;
    }

    try {
      setUploading(true);
      setUploadMessage('');
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('title', uploadTitle || 'Wedding Memory');
      formData.append('category', uploadCategory);
      formData.append('uploaded_by', uploadName || 'Guest');

      const res = await fetch(`${API_BASE_URL}/api/photos/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setUploadMessage('✨ Photo uploaded successfully to the album!');
        setUploadTitle('');
        setUploadFile(null);
        fetchPhotos();
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadMessage('');
        }, 1800);
      } else {
        setUploadMessage(result.detail || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setUploadMessage('Failed to connect to backend server');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="gallery" style={{ padding: '100px 20px', background: '#fdf6f7' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Cherished Memories</span>
          <h2 className="section-title">Photo Albums & Highlights</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem' }}>
            Explore photos from our Proposal, Engagement, Pre-Wedding Shoot, and Wedding Day!
          </p>
        </div>

        {/* Action Controls: Categories & Upload Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '35px',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'proposal', label: 'Proposal (Apr 20)' },
              { id: 'engagement', label: 'Engagement Ceremony' },
              { id: 'prewedding', label: 'Pre-Wedding Shoot' },
              { id: 'wedding', label: 'Wedding Day' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  border: '1px solid #d4af37',
                  background: activeCategory === cat.id ? 'var(--primary-emerald)' : 'transparent',
                  color: activeCategory === cat.id ? '#d4af37' : 'var(--primary-emerald)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Upload Button */}
          <button onClick={() => setShowUploadModal(true)} className="btn-gold">
            <PlusCircle size={18} /> Upload Photo to Album
          </button>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Loading gallery album...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div
            className="glass-card"
            style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}
          >
            <Image size={40} color="#d4af37" style={{ marginBottom: '10px' }} />
            <h3>No photos in this category yet</h3>
            <p style={{ marginTop: '6px' }}>Be the first to upload a photo to this album!</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                className="glass-card"
                onClick={() => setSelectedPhotoIndex(idx)}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={`${API_BASE_URL}${photo.image_url}`}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(13, 40, 33, 0.75)',
                      color: '#d4af37',
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {photo.category}
                  </div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary-emerald)', fontSize: '1.1rem', marginBottom: '2px' }}>
                      {photo.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      By: <span style={{ color: '#b38b29', fontWeight: 600 }}>{photo.uploaded_by}</span>
                    </p>
                  </div>
                  {onOpenSection && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSection(photo.category);
                      }}
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid #d4af37',
                        color: '#b38b29',
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Open Section
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedPhotoIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            style={{
              position: 'absolute',
              top: '25px',
              right: '25px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={26} />
          </button>

          <button
            onClick={() =>
              setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1))
            }
            style={{
              position: 'absolute',
              left: '20px',
              background: 'rgba(212, 175, 55, 0.3)',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={30} />
          </button>

          <div style={{ maxWidth: '85vw', maxHeight: '80vh', textAlign: 'center' }}>
            <img
              src={`${API_BASE_URL}${filteredPhotos[selectedPhotoIndex].image_url}`}
              alt={filteredPhotos[selectedPhotoIndex].title}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
              }}
            />
            <div style={{ color: '#ffffff', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#d4af37' }}>
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '4px' }}>
                Uploaded by {filteredPhotos[selectedPhotoIndex].uploaded_by} ({selectedPhotoIndex + 1} of{' '}
                {filteredPhotos.length})
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setSelectedPhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0))
            }
            style={{
              position: 'absolute',
              right: '20px',
              background: 'rgba(212, 175, 55, 0.3)',
              border: '1px solid #d4af37',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}

      {/* --- PHOTO UPLOAD MODAL --- */}
      {showUploadModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(13, 40, 33, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#ffffff',
              padding: '30px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dark)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <h3 style={{ color: 'var(--primary-emerald)', fontSize: '1.6rem', marginBottom: '6px' }}>
              Add a Photo to Album
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Select a section/category to upload your pre-wedding, engagement, or wedding photos.
            </p>

            {uploadMessage && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: uploadMessage.includes('✨') ? 'rgba(212, 175, 55, 0.15)' : 'rgba(220, 53, 69, 0.1)',
                  color: uploadMessage.includes('✨') ? '#b38b29' : '#dc3545',
                  marginBottom: '15px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {uploadMessage}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '6px' }}>
                  Photo Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring Ceremony Smiles"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
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
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '6px' }}>
                  Section / Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d4af37',
                    outline: 'none',
                    background: '#fff',
                  }}
                >
                  <option value="proposal">Proposal (April 20, 2020)</option>
                  <option value="engagement">Engagement Ceremony</option>
                  <option value="prewedding">Pre-Wedding Shoot</option>
                  <option value="wedding">Wedding Day Memories</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adish / Nandhana / Guest Name"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
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
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-emerald)', display: 'block', marginBottom: '6px' }}>
                  Choose Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px dashed #d4af37',
                    background: '#fffbf7',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn-gold"
                style={{ justifyContent: 'center', marginTop: '10px' }}
              >
                {uploading ? 'Uploading Image...' : 'Submit Photo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
