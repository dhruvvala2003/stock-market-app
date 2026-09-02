# ProEquity data-provider setup

ProEquity runs in **STRICT** source mode. It never replaces a failed or unapproved feed with mock prices, indicators, consensus, news, or financials.

## Market data

The current adapter supports Alpha Vantage behind a provider abstraction. It is disabled by default. Before enabling it, document that the selected plan permits this application's intended commercial/public display, caching, and redistribution.

Add the following only to the server environment (never to `client/.env.local`):

```env
MARKET_DATA_PROVIDER=alphavantage
MARKET_DATA_PUBLIC_DISPLAY_APPROVED=true
ALPHA_VANTAGE_KEY=your_server_only_key
```

Without all three values, the API returns `503 PROVIDER_NOT_CONFIGURED` and the frontend displays **Unavailable**.

## Required provider-register record before launch

For each connected provider, record: API/product name, plan, price, commercial/public-display and redistribution rights, caching/derived-data rights, attribution, rate limits, geographic restrictions, expiry, and verification date.

## Current coverage

- Quotes and OHLCV: provider adapter, provenance, freshness and deterministic RSI/MACD/SMA/ATR calculation.
- Company financials, filings, reference data, consensus, corporate actions and news: deliberately unavailable until primary/licensed connectors are added.
- Screeners, backtests, peer tables, sentiment, valuation and market-wide movers: deliberately unavailable rather than populated from unverified or invented values.
