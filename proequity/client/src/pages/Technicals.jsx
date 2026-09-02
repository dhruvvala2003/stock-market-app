import React, { useEffect, useState } from 'react';
import GlassCard from '../components/shared/GlassCard';
import MainChart from '../components/dashboard/MainChart';
import { fetchStockCandles, fetchTechnicalIndicators } from '../services/api';

export default function Technicals() {
  const [candles, setCandles] = useState([]); const [data, setData] = useState(null); const [error, setError] = useState('');
  useEffect(() => { Promise.all([fetchStockCandles('RELIANCE'), fetchTechnicalIndicators('RELIANCE')]).then(([c, i]) => { setCandles(c.candles); setData(i); }).catch(err => setError(err.message)); }, []);
  const i = data?.indicators;
  return <div className="tab-pane active" id="tab-technical"><div className="grid-3" style={{ marginBottom: 'var(--space-5)' }}>{[['RSI (14)', i?.rsi], ['MACD', i?.macd], ['ATR (14)', i?.atr14]].map(([label, value]) => <GlassCard className="metric-card" key={label}><div className="metric-label">{label}</div><div className="metric-value">{Number.isFinite(value) ? value.toFixed(2) : 'Unavailable'}</div><div className="metric-change">Derived from actual daily OHLCV</div></GlassCard>)}</div><GlassCard className="panel"><div className="panel-header"><div className="panel-title">RELIANCE technical history</div><span className="panel-meta">{data?.provenance?.methodology || 'No calculation data'}</span></div><MainChart candles={candles} label="RELIANCE" />{error && <p style={{ color: 'var(--accent-yellow)' }}>{error}</p>}</GlassCard><GlassCard className="panel" style={{ marginTop: 'var(--space-5)' }}><div className="panel-title">Pattern recognition</div><p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>Unavailable. Pattern claims require a validated, documented methodology and actual OHLCV; this screen does not present decorative signals as research.</p></GlassCard></div>;
}
