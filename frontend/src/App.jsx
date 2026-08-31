import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroCountdown from './components/HeroCountdown';
import LoveStory from './components/LoveStory';
import GalleryAlbum from './components/GalleryAlbum';
import EventLocation from './components/EventLocation';
import RSVPSection from './components/RSVPSection';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import SectionDetailModal from './components/SectionDetailModal';
import { API_BASE_URL } from './config';

export default function App() {
  const [weddingInfo, setWeddingInfo] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null); // 'proposal' | 'engagement' | 'prewedding' | 'wedding' | null
  const [refreshPhotosTrigger, setRefreshPhotosTrigger] = useState(0);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/wedding-info`)
      .then((res) => res.json())
      .then((data) => setWeddingInfo(data))
      .catch((err) => console.error('Error loading wedding info:', err));
  }, []);

  const handleOpenSection = (sectionId) => {
    setActiveSectionId(sectionId);
  };

  const handleCloseSection = () => {
    setActiveSectionId(null);
    setRefreshPhotosTrigger((prev) => prev + 1);
  };

  // Romantic Ambient Synth sound generator using Web Audio API
  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingMusic(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25, 659.25];
        let step = 0;

        const playChime = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const freq = notes[step % notes.length];
          step++;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.6);
        };

        playChime();
        timerRef.current = setInterval(playChime, 800);
        setIsPlayingMusic(true);
      } catch (e) {
        console.error('Audio playback error:', e);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--blush-pink)' }}>
      <Navbar isPlayingMusic={isPlayingMusic} toggleMusic={toggleMusic} />
      <main>
        <HeroCountdown weddingInfo={weddingInfo} />
        <LoveStory onOpenSection={handleOpenSection} />
        <GalleryAlbum onOpenSection={handleOpenSection} refreshTrigger={refreshPhotosTrigger} />
        <EventLocation weddingInfo={weddingInfo} />
        <RSVPSection />
        <Guestbook />
      </main>
      <Footer />

      {/* Section Detail View Modal */}
      {activeSectionId && (
        <SectionDetailModal
          sectionId={activeSectionId}
          onClose={handleCloseSection}
          onRefreshPhotos={() => setRefreshPhotosTrigger((prev) => prev + 1)}
        />
      )}
    </div>
  );
}
