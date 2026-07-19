const express = require('express');
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();
const router = express.Router();

const CACHE_TTL = 30000; // 30 seconds
const cache = new Map();

// Helper to ensure Indian symbols end in .NS
const formatSymbol = (sym) => {
  if (!sym.includes('.')) {
    return `${sym}.NS`;
  }
  return sym;
};

router.get('/status', async (req, res) => {
  try {
    const cacheKey = 'market_status';
    if (cache.has(cacheKey) && (Date.now() - cache.get(cacheKey).time < CACHE_TTL)) {
      return res.json(cache.get(cacheKey).data);
    }
    
    // Yahoo doesn't have a direct "is market open" boolean for NSE, so we check NIFTY 50 volume or timestamp
    const nifty = await yahooFinance.quote('^NSEI');
    
    const isMarketOpen = nifty.marketState === 'REGULAR';
    
    const statusData = {
      market: 'NSE',
      status: isMarketOpen ? 'open' : 'closed',
      timestamp: new Date().toISOString()
    };
    
    cache.set(cacheKey, { time: Date.now(), data: statusData });
    res.json(statusData);
  } catch (error) {
    console.error('Market status error:', error.message);
    res.status(500).json({ error: 'Failed to fetch market status' });
  }
});

router.get('/indices', async (req, res) => {
  try {
    const cacheKey = 'market_indices';
    if (cache.has(cacheKey) && (Date.now() - cache.get(cacheKey).time < CACHE_TTL)) {
      return res.json(cache.get(cacheKey).data);
    }

    const [nifty, bankNifty, sensex] = await Promise.all([
      yahooFinance.quote('^NSEI'),
      yahooFinance.quote('^NSEBANK'),
      yahooFinance.quote('^BSESN')
    ]);

    const formatData = (quote) => ({
      name: quote.shortName || quote.symbol,
      symbol: quote.symbol,
      close: quote.regularMarketPrice,
      open: quote.regularMarketOpen,
      high: quote.regularMarketDayHigh,
      low: quote.regularMarketDayLow,
      previousClose: quote.regularMarketPreviousClose,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent
    });

    const data = [formatData(nifty), formatData(bankNifty), formatData(sensex)];
    
    cache.set(cacheKey, { time: Date.now(), data });
    res.json(data);
  } catch (error) {
    console.error('Market indices error:', error.message);
    res.status(500).json({ error: 'Failed to fetch market indices' });
  }
});

module.exports = router;
