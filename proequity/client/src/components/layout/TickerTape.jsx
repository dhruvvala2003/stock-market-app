import React, { useEffect, useState } from 'react';
import { fetchMarketIndices } from '../../services/api';

export default function TickerTape() {
  const [quotes, setQuotes] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchMarketIndices().then(setQuotes).catch(err => setError(err.message)); }, []);
  return <div className="ticker-tape glass">{quotes.length ? quotes.map(q => <div className="ticker-item" key={q.symbol}><span className="ticker-name">{q.symbol}</span> <span className="ticker-value">{Number(q.price).toLocaleString('en-IN')}</span> <span className={`ticker-change ${q.change >= 0 ? 'ticker-up' : 'ticker-down'}`}>{q.change >= 0 ? '▲' : '▼'} {Number(q.change).toFixed(2)} ({(Number(q.changePercent) * 100).toFixed(2)}%)</span></div>) : <div className="ticker-item"><span className="ticker-name">MARKET DATA</span> <span className="ticker-value">{error ? 'Unavailable' : 'Loading…'}</span></div>}</div>;
}
