// API Base URL configuration for local development and free cloud hosting (Render / Vercel / Netlify)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE_URL}${url}`;
};
