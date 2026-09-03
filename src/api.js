import i18n from './i18n';

export const API_BASE_URL = 'https://truth1.onrender.com';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || `HTTP ${response.status}`);
  }

  return data;
}

export const analyzeProduct = (query) =>
  request('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({
      query,
      language: i18n.language,
    }),
  });

export const getWishlist = () =>
  request('/api/wishlist');

export const addToWishlist = (product) =>
  request('/api/wishlist', {
    method: 'POST',
    body: JSON.stringify(product),
  });

export const removeFromWishlist = (id) =>
  request(`/api/wishlist/${id}`, {
    method: 'DELETE',
  });

export const getHistory = () =>
  request('/api/history');

export const deleteHistoryItem = (id) =>
  request(`/api/history/${id}`, {
    method: 'DELETE',
  });

export const sendChatMessage = (analysisId, question) =>
  request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      analysisId,
      question,
      language: i18n.language,
    }),
  });