const express = require('express');
const { getMarketDataProvider, DataUnavailableError } = require('../providers/marketDataProvider');
const router = express.Router();

router.get('/status', (req, res) => {
  const configured = process.env.MARKET_DATA_PROVIDER === 'alphavantage' && process.env.MARKET_DATA_PUBLIC_DISPLAY_APPROVED === 'true' && Boolean(process.env.ALPHA_VANTAGE_KEY);
  res.json({ market: 'NSE', status: configured ? 'delayed' : 'unavailable', provider: configured ? 'Alpha Vantage' : null, latency: configured ? 'DELAYED' : null, timestamp: new Date().toISOString(), sourceMode: 'STRICT' });
});

router.get('/indices', (req, res) => res.status(503).json({
  error: 'Indian index coverage is unavailable from the configured Alpha Vantage adapter. NIFTY, NIFTYBANK and SENSEX must not be requested as equity symbols.',
  code: 'INDEX_COVERAGE_UNAVAILABLE',
}));
module.exports = router;
