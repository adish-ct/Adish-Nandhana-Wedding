// API Base URL configuration for local development and free cloud hosting (Render / Vercel / Netlify)
export const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin;

// Media (static image) base URL – can point to a separate storage service
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || '';

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = MEDIA_BASE_URL || API_BASE_URL;
  return `${base}${url}`;
};
