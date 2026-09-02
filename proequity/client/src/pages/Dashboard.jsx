import React, { useEffect, useState } from 'react';
import MetricCard from '../components/dashboard/MetricCard';
import GlassCard from '../components/shared/GlassCard';
import MainChart from '../components/dashboard/MainChart';
import { fetchMarketIndices, fetchStockCandles } from '../services/api';

const unavailable = { value: 'Unavailable', change: 'No approved data feed', isPositive: false };
const displayQuote = quote => quote ? { value: Number(quote.price).toLocaleString('en-IN', { maximumFractionDigits: 2 }), change: `${quote.change >= 0 ? '+' : ''}${Number(quote.change).toFixed(2)} (${(Number(quote.changePercent) * 100).toFixed(2)}%)`, isPositive: quote.change >= 0 } : unavailable;

export default function Dashboard() {
  const [indices, setIndices] = useState([]); const [candles, setCandles] = useState([]); const [error, setError] = useState('');
  useEffect(() => { Promise.all([fetchMarketIndices(), fetchStockCandles('NIFTY')]).then(([quotes, chart]) => { setIndices(quotes); setCandles(chart.candles); }).catch(err => setError(err.message)); }, []);
  const nifty = displayQuote(indices.find(q => q.symbol === 'NIFTY')); const bank = displayQuote(indices.find(q => q.symbol === 'NIFTYBANK')); const sensex = displayQuote(indices.find(q => q.symbol === 'SENSEX'));
  return <div className="tab-pane active" id="tab-dashboard">
    {error && <div className="glass-card" style={{ padding: 16, marginBottom: 16, color: 'var(--accent-yellow)' }}>STRICT source mode: {error}</div>}
    <div className="grid-4" style={{ marginBottom: 'var(--space-5)' }}>
      <MetricCard title="NIFTY 50" value={nifty.value} change={nifty.change} isPositive={nifty.isPositive} />
      <MetricCard title="NIFTY BANK" value={bank.value} change={bank.change} isPositive={bank.isPositive} />
      <MetricCard title="SENSEX" value={sensex.value} change={sensex.change} isPositive={sensex.isPositive} />
      <MetricCard title="FII FLOW" value="Unavailable" change="Official validated feed not configured" isPositive={false} />
    </div>
    <GlassCard className="panel"><div className="panel-header"><div className="panel-title">Market overview</div><span className="panel-meta">Source: licensed provider · delayed/EOD as configured</span></div><MainChart candles={candles} label="NIFTY" /></GlassCard>
    <GlassCard className="panel" style={{ marginTop: 'var(--space-5)' }}><div className="panel-title">Research discovery</div><p style={{ color: 'var(--text-secondary)', margin: '12px 0 0' }}>Top movers, sector heatmaps and screen results are withheld until the complete listed universe and approved reference data are connected. This prevents curated watchlists from being presented as market-wide results.</p></GlassCard>
  </div>;
}
