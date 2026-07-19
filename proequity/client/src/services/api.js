const API_BASE = 'http://localhost:3001/api';

export async function fetchStockQuote(symbol) {
  try {
    const response = await fetch(`${API_BASE}/stocks/quote/${encodeURIComponent(symbol)}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchStockQuote error:', error.message);
    throw error;
  }
}

export async function fetchStockCandles(symbol, resolution = 'D', from, to) {
  try {
    const params = new URLSearchParams({ resolution, from, to });
    const response = await fetch(`${API_BASE}/stocks/candles/${encodeURIComponent(symbol)}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchStockCandles error:', error.message);
    throw error;
  }
}

export async function fetchTechnicalIndicator(type, symbol) {
  try {
    const response = await fetch(`${API_BASE}/stocks/indicators/${encodeURIComponent(type)}/${encodeURIComponent(symbol)}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchTechnicalIndicator error:', error.message);
    throw error;
  }
}

export async function searchStocks(query) {
  try {
    const response = await fetch(`${API_BASE}/stocks/search/${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('searchStocks error:', error.message);
    throw error;
  }
}

export async function fetchRecommendations(symbol) {
  try {
    const response = await fetch(`${API_BASE}/stocks/recommendation/${encodeURIComponent(symbol)}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchRecommendations error:', error.message);
    throw error;
  }
}

export async function fetchCompanyProfile(symbol) {
  try {
    const response = await fetch(`${API_BASE}/stocks/profile/${encodeURIComponent(symbol)}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchCompanyProfile error:', error.message);
    throw error;
  }
}

export async function fetchMarketStatus() {
  try {
    const response = await fetch(`${API_BASE}/market/status`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchMarketStatus error:', error.message);
    throw error;
  }
}

export async function fetchMarketIndices() {
  try {
    const response = await fetch(`${API_BASE}/market/indices`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchMarketIndices error:', error.message);
    throw error;
  }
}

export async function fetchNews(query = 'Indian stock market') {
  try {
    const params = new URLSearchParams({ query });
    const response = await fetch(`${API_BASE}/news/headlines?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchNews error:', error.message);
    throw error;
  }
}

export async function fetchSentiment(query = 'India stock market') {
  try {
    const params = new URLSearchParams({ query });
    const response = await fetch(`${API_BASE}/news/sentiment?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchSentiment error:', error.message);
    throw error;
  }
}
