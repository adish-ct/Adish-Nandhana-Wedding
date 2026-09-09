// API Base URL configuration for production backend (Render)
export const API_BASE_URL = "https://adish-nandhana-wedding.onrender.com";

// Media (static image) base URL – same as API base for this deployment
export const MEDIA_BASE_URL = "https://adish-nandhana-wedding.onrender.com";

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = MEDIA_BASE_URL || API_BASE_URL;
  return `${base}${url}`;
};
