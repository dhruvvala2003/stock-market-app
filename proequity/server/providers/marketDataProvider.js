const axios = require('axios');

const AV_BASE_URL = 'https://www.alphavantage.co/query';
let nextRequestAt = 0;

class DataUnavailableError extends Error {
  constructor(message, code = 'DATA_UNAVAILABLE') {
    super(message);
    this.code = code;
  }
}

const approvedAlphaVantage = () =>
  process.env.MARKET_DATA_PROVIDER === 'alphavantage' &&
  process.env.MARKET_DATA_PUBLIC_DISPLAY_APPROVED === 'true' &&
  Boolean(process.env.ALPHA_VANTAGE_KEY);

const provenance = (source, sourceUrl, timestamp, classification = 'FACT') => ({
  source,
  sourceTier: 'LICENSED',
  sourceUrl,
  classification,
  confidence: 'HIGH',
  asOf: timestamp,
  lastVerified: new Date().toISOString(),
  latency: 'DELAYED',
});

class AlphaVantageMarketProvider {
  constructor() {
    this.name = 'Alpha Vantage';
  }

  async request(params) {
    if (!approvedAlphaVantage()) {
      throw new DataUnavailableError('No approved market-data provider is configured. Set MARKET_DATA_PROVIDER, MARKET_DATA_PUBLIC_DISPLAY_APPROVED, and the provider key only after licensing review.', 'PROVIDER_NOT_CONFIGURED');
    }
    // Alpha Vantage free keys permit one request per second. Space requests even
    // when two frontend calls arrive at the same time (for example chart + RSI).
    const waitMs = Math.max(0, nextRequestAt - Date.now());
    nextRequestAt = Math.max(Date.now(), nextRequestAt) + 1_100;
    if (waitMs) await new Promise(resolve => setTimeout(resolve, waitMs));
    const response = await axios.get(AV_BASE_URL, { params: { ...params, apikey: process.env.ALPHA_VANTAGE_KEY }, timeout: 10000 });
    if (response.data?.Note || response.data?.Information || response.data?.['Error Message']) {
      throw new DataUnavailableError(response.data.Note || response.data.Information || response.data['Error Message'], 'PROVIDER_RESPONSE');
    }
    return response.data;
  }

  async getQuote(symbol) {
    const data = await this.request({ function: 'GLOBAL_QUOTE', symbol });
    const quote = data['Global Quote'];
    if (!quote || !quote['05. price']) throw new DataUnavailableError('The provider returned no quote for this instrument.', 'INSTRUMENT_UNAVAILABLE');
    const timestamp = quote['07. latest trading day'];
    return {
      symbol: quote['01. symbol'], name: quote['01. symbol'], price: Number(quote['05. price']),
      open: Number(quote['02. open']), high: Number(quote['03. high']), low: Number(quote['04. low']),
      previousClose: Number(quote['08. previous close']), volume: Number(quote['06. volume']),
      change: Number(quote['09. change']), changePercent: Number(quote['10. change percent'].replace('%', '')) / 100,
      marketDataTimestamp: timestamp, provenance: provenance(this.name, 'https://www.alphavantage.co/documentation/', timestamp),
    };
  }

  async getOHLCV(symbol, outputsize = 'compact') {
    const data = await this.request({ function: 'TIME_SERIES_DAILY', symbol, outputsize });
    const series = data['Time Series (Daily)'];
    if (!series) throw new DataUnavailableError('The provider returned no historical data for this instrument.', 'INSTRUMENT_UNAVAILABLE');
    return Object.entries(series).map(([date, bar]) => ({
      date, open: Number(bar['1. open']), high: Number(bar['2. high']), low: Number(bar['3. low']), close: Number(bar['4. close']), volume: Number(bar['5. volume']),
    })).sort((a, b) => a.date.localeCompare(b.date));
  }
}

const getMarketDataProvider = () => new AlphaVantageMarketProvider();
module.exports = { DataUnavailableError, getMarketDataProvider };
