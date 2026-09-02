const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class DataUnavailableError extends Error {
  constructor(message, code) { super(message); this.name = 'DataUnavailableError'; this.code = code; }
}

async function get(path) {
  const response = await fetch(`${API_BASE}${path}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new DataUnavailableError(payload.error || `Request failed (${response.status})`, payload.code);
  return payload;
}

export const fetchStockQuote = symbol => get(`/stocks/quote/${encodeURIComponent(symbol)}`);
export const fetchStockCandles = symbol => get(`/stocks/candles/${encodeURIComponent(symbol)}`);
export const fetchTechnicalIndicators = symbol => get(`/stocks/indicators/${encodeURIComponent(symbol)}`);
export const searchStocks = query => get(`/stocks/search/${encodeURIComponent(query)}`);
export const fetchCompanyProfile = symbol => get(`/stocks/profile/${encodeURIComponent(symbol)}`);
export const fetchRecommendations = symbol => get(`/stocks/recommendation/${encodeURIComponent(symbol)}`);
export const fetchMarketStatus = () => get('/market/status');
export const fetchMarketIndices = () => get('/market/indices');
export const fetchNews = query => get(`/news/headlines?query=${encodeURIComponent(query)}`);
