import React, { useState, useEffect } from 'react';
import GlassCard from '../components/shared/GlassCard';
import PeerComparison from '../components/stock/PeerComparison';
import { fetchStockQuote, fetchRecommendations, fetchCompanyProfile } from '../services/api';

const StockAnalysis = ({ symbol = 'RELIANCE.NS' }) => {
  const [quote, setQuote] = useState(null);
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [quoteData, profileData, recData] = await Promise.allSettled([
          fetchStockQuote(symbol),
          fetchCompanyProfile(symbol),
          fetchRecommendations(symbol),
        ]);
        if (quoteData.status === 'fulfilled' && quoteData.value) setQuote(quoteData.value);
        if (profileData.status === 'fulfilled' && profileData.value) setProfile(profileData.value);
        if (recData.status === 'fulfilled' && recData.value) setRecommendations(recData.value);
      } catch (err) {
        console.warn('Failed to load stock data:', err);
      }
      setLoading(false);
    };
    loadData();
  }, [symbol]);

  // Compute display values from live data or fallback
  const currentPrice = quote?.price || 2958.40;
  const prevClose = quote?.previousClose || 2915.60;
  const change = quote?.change || (currentPrice - prevClose);
  const changePercent = quote?.changePercent ? (quote.changePercent * 100) : ((change / prevClose) * 100);
  const isPositive = change >= 0;
  const highPrice = quote?.high || 2972.50;
  const lowPrice = quote?.low || 2940.10;

  const companyName = quote?.name || 'Reliance Industries Ltd';
  const industry = profile?.industry || 'Energy • Telecom • Retail';
  const marketCap = quote?.marketCap
    ? `₹${(quote.marketCap / 10000000).toFixed(2)}Cr`
    : '₹20.45L Cr';

  // Analyst recommendations
  const latestRec = recommendations && recommendations.length > 0 ? recommendations[0] : null;
  const strongBuy = latestRec?.strongBuy || 6;
  const buy = latestRec?.buy || 3;
  const hold = latestRec?.hold || 2;
  const sell = latestRec?.sell || 1;
  const strongSell = latestRec?.strongSell || 0;
  const totalAnalysts = strongBuy + buy + hold + sell + strongSell;
  const buyPercent = totalAnalysts > 0 ? ((strongBuy + buy) / totalAnalysts * 100) : 75;

  let consensusLabel = 'BUY';
  if (buyPercent >= 70) consensusLabel = 'BUY';
  else if (buyPercent >= 50) consensusLabel = 'HOLD';
  else consensusLabel = 'SELL';

  return (
    <div className="tab-pane active" id="tab-stock">

      {/* ===== Stock Header ===== */}
      <div className="panel glass-card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="stock-detail-header">
          <div className="stock-detail-left">
            <h2>{companyName}</h2>
            <div className="stock-detail-tags">
              <span className="tag tag-buy">{consensusLabel}</span>
              <span className="tag tag-info">Large Cap</span>
              <span className="tag tag-info">{industry}</span>
              <span className="tag tag-info">NSE: {symbol.replace('.BSE', '')}</span>
            </div>
            <div className="stock-detail-meta">
              <span><strong>Mkt Cap:</strong> {marketCap}</span>
              <span><strong>PE:</strong> {quote?.pe?.toFixed(1) || '24.8'}x</span>
              <span><strong>EPS:</strong> {quote?.eps?.toFixed(1) || '59.6'}</span>
              <span><strong>Div Yield:</strong> {profile?.dividendYield ? (profile.dividendYield * 100).toFixed(2) : '0.42'}%</span>
              <span><strong>52W Range:</strong> ₹{quote?.fiftyTwoWeekLow?.toFixed(0) || '2,220'} - ₹{quote?.fiftyTwoWeekHigh?.toFixed(0) || '3,024'}</span>
            </div>
          </div>
          <div className="stock-detail-right">
            <div className="big-price">₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className={`price-change ${isPositive ? 'text-green' : 'text-red'}`}>
              {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </div>
            <div className="price-source">
              {loading ? 'Loading...' : `Last updated: ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST | NSE`}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Price Chart + Analyst Consensus ===== */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="panel glass-card">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>📈</span>
                Price Chart
              </div>
              <div className="panel-subtitle">Candlestick with Bollinger Bands & Volume</div>
            </div>
            <div className="timeframe-bar">
              <button className="timeframe-btn">1D</button>
              <button className="timeframe-btn">1W</button>
              <button className="timeframe-btn active">1M</button>
              <button className="timeframe-btn">3M</button>
              <button className="timeframe-btn">6M</button>
              <button className="timeframe-btn">1Y</button>
              <button className="timeframe-btn">5Y</button>
            </div>
          </div>
          <div className="chart-container large" style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas id="stockChart"></canvas>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="tag tag-info">SMA 20: ₹{(currentPrice * 0.977).toFixed(0)}</span>
            <span className="tag tag-info">SMA 50: ₹{(currentPrice * 0.94).toFixed(0)}</span>
            <span className="tag tag-info">SMA 200: ₹{(currentPrice * 0.895).toFixed(0)}</span>
            <span className="tag tag-info">RSI(14): 62.4</span>
            <span className="tag tag-info">MACD: +12.5</span>
            <span className="tag tag-info">ATR: ₹45.2</span>
          </div>
        </div>

        {/* Analyst Consensus Panel */}
        <div className="panel glass-card">
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(52,199,89,0.15)' }}>🎯</span>
              Analyst Consensus
            </div>
            <span className="panel-meta">{totalAnalysts} Analysts</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: buyPercent >= 50 ? 'var(--accent-green)' : 'var(--accent-red)', letterSpacing: '-0.03em' }}>{consensusLabel}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Strong Conviction</div>
            </div>
            <div style={{ flex: 1 }}>
              {[
                { label: 'Strong Buy', count: strongBuy, color: 'var(--accent-green)' },
                { label: 'Buy', count: buy, color: 'var(--accent-cyan)' },
                { label: 'Hold', count: hold, color: 'var(--accent-yellow)' },
                { label: 'Sell', count: sell, color: 'var(--accent-red)' },
                { label: 'Strong Sell', count: strongSell, color: 'var(--accent-pink)' },
              ].map((r) => (
                <div key={r.label} className="analyst-rating-row">
                  <span>{r.label}</span>
                  <div className="progress-track" style={{ flex: 1, height: '10px' }}>
                    <div className="progress-fill" style={{ width: `${totalAnalysts > 0 ? (r.count / totalAnalysts * 100) : 0}%`, background: r.color }}></div>
                  </div>
                  <span>{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="target-stats">
            <div className="target-stat">
              <div className="target-stat-value" style={{ color: 'var(--accent-cyan)' }}>₹3,250</div>
              <div className="target-stat-label">Target Price</div>
            </div>
            <div className="target-stat">
              <div className="target-stat-value" style={{ color: 'var(--accent-green)' }}>+{((3250 - currentPrice) / currentPrice * 100).toFixed(1)}%</div>
              <div className="target-stat-label">Upside</div>
            </div>
            <div className="target-stat">
              <div className="target-stat-value" style={{ color: 'var(--accent-yellow)' }}>Medium</div>
              <div className="target-stat-label">Risk</div>
            </div>
          </div>

          <div className="progress-track" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${buyPercent}%`, background: 'linear-gradient(90deg,var(--accent-green),var(--accent-cyan))' }}></div>
          </div>
          <div className="conviction-labels">
            <span>Low Conviction</span>
            <span>Conviction Score: {Math.round(buyPercent)}/100</span>
            <span>High Conviction</span>
          </div>
        </div>
      </div>

      {/* ===== DuPont Analysis ===== */}
      <div className="panel glass-card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="panel-header">
          <div className="panel-title">
            <span className="icon" style={{ background: 'rgba(175,82,222,0.15)' }}>🔬</span>
            DuPont Analysis — ROE Decomposition
          </div>
          <span className="panel-meta">FY24</span>
        </div>
        <div className="formula-display">
          <div className="formula-part" title="Net Margin">Net Margin<br /><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>12.4%</span></div>
          <span className="formula-operator">×</span>
          <div className="formula-part" title="Asset Turnover">Asset Turnover<br /><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>0.72x</span></div>
          <span className="formula-operator">×</span>
          <div className="formula-part" title="Equity Multiplier">Equity Multiplier<br /><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>2.68x</span></div>
          <span className="formula-equals">=</span>
          <div className="formula-part" style={{ background: 'rgba(52,199,89,0.15)', borderColor: 'rgba(52,199,89,0.3)', color: 'var(--accent-green)' }} title="ROE">ROE<br /><span style={{ fontSize: '11px' }}>23.9%</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div className="score-pill glass">
            <div className="pill-label">Net Margin</div>
            <div className="pill-value" style={{ color: 'var(--accent-cyan)' }}>12.4%</div>
            <div className="pill-detail">Industry Avg: 10.2%</div>
          </div>
          <div className="score-pill glass">
            <div className="pill-label">Asset Turnover</div>
            <div className="pill-value" style={{ color: 'var(--accent-cyan)' }}>0.72x</div>
            <div className="pill-detail">Industry Avg: 0.65x</div>
          </div>
          <div className="score-pill glass">
            <div className="pill-label">Equity Multiplier</div>
            <div className="pill-value" style={{ color: 'var(--accent-orange)' }}>2.68x</div>
            <div className="pill-detail">Industry Avg: 2.10x</div>
          </div>
          <div className="score-pill glass">
            <div className="pill-label">ROE</div>
            <div className="pill-value" style={{ color: 'var(--accent-green)' }}>23.9%</div>
            <div className="pill-detail">Industry Avg: 14.8%</div>
          </div>
        </div>
      </div>

      {/* ===== Peer Comparison ===== */}
      <PeerComparison />
    </div>
  );
};

export default StockAnalysis;
