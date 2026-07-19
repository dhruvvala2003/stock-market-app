import React from 'react';
import GlassCard from '../components/shared/GlassCard';

const Screener = () => {
  return (
    <div className="tab-pane active" id="tab-screener">
      <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="panel-header">
          <div className="panel-title">
            <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>🔍</span>
            Advanced Stock Screener
          </div>
          <span className="panel-meta">Filter 4,200+ stocks</span>
        </div>
        
        <div className="screener-filters">
          <div className="filter-group">
            <label>Market Cap</label>
            <select className="filter-select">
              <option>All</option>
              <option>Large Cap (&gt;₹20,000 Cr)</option>
              <option>Mid Cap (₹5,000-20,000 Cr)</option>
              <option>Small Cap (&lt;₹5,000 Cr)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>P/E Ratio</label>
            <select className="filter-select">
              <option>All</option>
              <option>&lt; 15 (Value)</option>
              <option>15-25 (Fair)</option>
              <option>25-40 (Growth)</option>
              <option>&gt; 40 (Expensive)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>ROE</label>
            <select className="filter-select">
              <option>All</option>
              <option>&gt; 20% (Excellent)</option>
              <option>15-20% (Good)</option>
              <option>10-15% (Average)</option>
              <option>&lt; 10% (Poor)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Debt/Equity</label>
            <select className="filter-select">
              <option>All</option>
              <option>&lt; 0.5 (Low)</option>
              <option>0.5-1.0 (Moderate)</option>
              <option>&gt; 1.0 (High)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Dividend Yield</label>
            <select className="filter-select">
              <option>All</option>
              <option>&gt; 3% (High Income)</option>
              <option>1-3% (Balanced)</option>
              <option>&lt; 1% (Growth)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>RSI</label>
            <select className="filter-select">
              <option>All</option>
              <option>&lt; 30 (Oversold)</option>
              <option>30-50 (Weak)</option>
              <option>50-70 (Strong)</option>
              <option>&gt; 70 (Overbought)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sector</label>
            <select className="filter-select">
              <option>All Sectors</option>
              <option>Banking</option>
              <option>IT</option>
              <option>Auto</option>
              <option>Pharma</option>
              <option>FMCG</option>
              <option>Energy</option>
              <option>Realty</option>
              <option>Metal</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>52W Performance</label>
            <select className="filter-select">
              <option>All</option>
              <option>&gt; +50% (Top Performer)</option>
              <option>+20% to +50%</option>
              <option>-20% to +20%</option>
              <option>&lt; -20% (Laggard)</option>
            </select>
          </div>
          
          <button className="btn btn-glow">🔍 Run Screen</button>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>💾 Save Filter</button>
        </div>
      </GlassCard>

      {/* Screener Results */}
      <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="panel-header">
          <div className="panel-title">
            <span className="icon" style={{ background: 'rgba(52,199,89,0.15)' }}>📋</span>
            Screener Results — Value + Quality
          </div>
          <span className="panel-meta">42 stocks match your criteria</span>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>Change</th>
                <th>Market Cap</th>
                <th>PE</th>
                <th>PB</th>
                <th>ROE</th>
                <th>D/E</th>
                <th>Div Yield</th>
                <th>RSI</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Coal India</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>COALINDIA</span></td>
                <td style={{ fontWeight: 700 }}>₹485.20</td>
                <td className="text-green" style={{ fontWeight: 600 }}>▲ +2.4%</td>
                <td>₹2.98L Cr</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>8.5x</td>
                <td>2.8x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>52.4%</td>
                <td>0.05x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>5.8%</td>
                <td>58.2</td>
                <td><span className="tag tag-buy">Buy</span></td>
              </tr>
              <tr>
                <td><strong>ONGC</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>ONGC</span></td>
                <td style={{ fontWeight: 700 }}>₹278.40</td>
                <td className="text-green" style={{ fontWeight: 600 }}>▲ +1.8%</td>
                <td>₹3.50L Cr</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>7.2x</td>
                <td>1.2x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>18.5%</td>
                <td>0.25x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>4.2%</td>
                <td>45.8</td>
                <td><span className="tag tag-buy">Buy</span></td>
              </tr>
              <tr>
                <td><strong>ITC</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>ITC</span></td>
                <td style={{ fontWeight: 700 }}>₹438.20</td>
                <td className="text-green" style={{ fontWeight: 600 }}>▲ +0.9%</td>
                <td>₹5.48L Cr</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>26.5x</td>
                <td>6.8x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>28.4%</td>
                <td>0.02x</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>3.2%</td>
                <td>62.4</td>
                <td><span className="tag tag-strong-buy">Strong Buy</span></td>
              </tr>
              <tr>
                <td><strong>HDFC Bank</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>HDFCBANK</span></td>
                <td style={{ fontWeight: 700 }}>₹1,624.80</td>
                <td className="text-red" style={{ fontWeight: 600 }}>▼ -1.1%</td>
                <td>₹12.45L Cr</td>
                <td>18.2x</td>
                <td>3.2x</td>
                <td>16.8%</td>
                <td>—</td>
                <td>1.2%</td>
                <td>48.5</td>
                <td><span className="tag tag-buy">Buy</span></td>
              </tr>
              <tr>
                <td><strong>L&amp;T</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>LT</span></td>
                <td style={{ fontWeight: 700 }}>₹3,842.50</td>
                <td className="text-green" style={{ fontWeight: 600 }}>▲ +1.5%</td>
                <td>₹5.38L Cr</td>
                <td>32.5x</td>
                <td>5.8x</td>
                <td>18.2%</td>
                <td>0.85x</td>
                <td>0.8%</td>
                <td>65.2</td>
                <td><span className="tag tag-hold">Hold</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Pre-built Screens */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(52,199,89,0.15)' }}>🎯</div>
          <h3>Warren Buffett Style</h3>
          <p>ROE &gt; 15%, Low Debt, Consistent Growth, Fair Price. Find companies with durable moats.</p>
        </div>
        
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(100,210,255,0.15)' }}>🚀</div>
          <h3>Peter Lynch GARP</h3>
          <p>PEG &lt; 1, High Growth, Mid/Small Cap. Growth at reasonable price strategy.</p>
        </div>
        
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(255,204,0,0.15)' }}>💎</div>
          <h3>Ben Graham Deep Value</h3>
          <p>PE &lt; 10, PB &lt; 1.5, Low Debt. Classic margin of safety approach.</p>
        </div>
        
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(0,199,190,0.15)' }}>💰</div>
          <h3>Dividend Aristocrats</h3>
          <p>High Yield + Growing Dividends + Low Payout. Income-focused strategy.</p>
        </div>
        
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(255,149,0,0.15)' }}>⚡</div>
          <h3>Momentum + Quality</h3>
          <p>Strong Price Action + Fundamentals. Ride the trend in quality stocks.</p>
        </div>
        
        <div className="learn-card glass-card">
          <div className="learn-icon" style={{ background: 'rgba(175,82,222,0.15)' }}>🔄</div>
          <h3>Turnaround Stories</h3>
          <p>Beaten Down + Improving Metrics. High risk, high reward contrarian plays.</p>
        </div>
      </div>
    </div>
  );
};

export default Screener;
