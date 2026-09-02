const express = require('express');
const { getMarketDataProvider, DataUnavailableError } = require('../providers/marketDataProvider');
const router = express.Router();

router.get('/status', (req, res) => {
  const configured = process.env.MARKET_DATA_PROVIDER === 'alphavantage' && process.env.MARKET_DATA_PUBLIC_DISPLAY_APPROVED === 'true' && Boolean(process.env.ALPHA_VANTAGE_KEY);
  res.json({ market: 'NSE', status: configured ? 'delayed' : 'unavailable', provider: configured ? 'Alpha Vantage' : null, latency: configured ? 'DELAYED' : null, timestamp: new Date().toISOString(), sourceMode: 'STRICT' });
});

router.get('/indices', async (req, res) => {
  try {
    const provider = getMarketDataProvider();
    const symbols = ['NIFTY', 'NIFTYBANK', 'SENSEX'];
    res.json(await Promise.all(symbols.map(symbol => provider.getQuote(symbol))));
  } catch (error) {
    res.status(error instanceof DataUnavailableError ? 503 : 502).json({ error: error.message, code: error.code || 'MARKET_DATA_ERROR' });
  }
});
module.exports = router;
