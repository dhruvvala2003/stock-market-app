const express = require('express');
const { getMarketDataProvider, DataUnavailableError } = require('../providers/marketDataProvider');
const { calculateIndicators } = require('../lib/technicals');

const router = express.Router();
const cache = new Map();
const CACHE_TTL = 60_000;
const supportedSymbol = symbol => /^[A-Z0-9.^_-]{1,32}$/i.test(symbol);

const sendError = (res, error) => {
  const status = error instanceof DataUnavailableError ? 503 : 502;
  res.status(status).json({ error: error.message || 'Market data request failed.', code: error.code || 'MARKET_DATA_ERROR' });
};

async function cached(key, loader) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.createdAt < CACHE_TTL) return hit.value;
  const value = await loader(); cache.set(key, { createdAt: Date.now(), value }); return value;
}

router.get('/quote/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    if (!supportedSymbol(symbol)) return res.status(400).json({ error: 'Invalid instrument symbol.' });
    res.json(await cached(`quote:${symbol}`, () => getMarketDataProvider().getQuote(symbol)));
  } catch (error) { sendError(res, error); }
});

router.get('/candles/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    if (!supportedSymbol(symbol)) return res.status(400).json({ error: 'Invalid instrument symbol.' });
    const candles = await cached(`candles:${symbol}`, () => getMarketDataProvider().getOHLCV(symbol));
    res.json({ candles, provenance: { source: 'Alpha Vantage', sourceTier: 'LICENSED', classification: 'FACT', sourceUrl: 'https://www.alphavantage.co/documentation/', lastVerified: new Date().toISOString(), adjusted: false } });
  } catch (error) { sendError(res, error); }
});

router.get('/indicators/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const candles = await cached(`candles:${symbol}`, () => getMarketDataProvider().getOHLCV(symbol));
    const indicators = calculateIndicators(candles);
    res.json({ symbol, indicators, provenance: { source: 'Calculated from licensed OHLCV', sourceTier: 'DERIVED', classification: 'FACT', methodology: 'Wilder RSI(14), EMA MACD(12,26,9), SMA and ATR from provider candles', sourceUrl: 'https://www.alphavantage.co/documentation/', lastVerified: new Date().toISOString() } });
  } catch (error) { sendError(res, error); }
});

router.get('/search/:query', (req, res) => res.status(503).json({ error: 'Security search requires an approved reference-data provider and is not configured.', code: 'PROVIDER_NOT_CONFIGURED' }));
router.get('/profile/:symbol', (req, res) => res.status(503).json({ error: 'Company profile data is unavailable until a validated filing/reference-data connector is configured.', code: 'PROVIDER_NOT_CONFIGURED' }));
router.get('/recommendation/:symbol', (req, res) => res.status(503).json({ error: 'Consensus data unavailable: no licensed consensus provider is configured.', code: 'CONSENSUS_UNAVAILABLE' }));

module.exports = router;
