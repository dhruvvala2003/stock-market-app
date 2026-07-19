import React from 'react';

const IndicatorCards = () => {
  return (
    <div className="grid-3" style={{ marginBottom: 'var(--space-5)' }}>
      <div className="metric-card glass-card">
        <div className="metric-label">
          <span></span> RSI (14)
          <button className="edu-trigger">Learn</button>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-orange)' }}>62.4</div>
        <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Neutral-Bullish Zone</div>
        <div className="conviction-meter" style={{ marginTop: 'var(--space-3)' }}>
          <div className="progress-track">
             <div className="progress-fill" style={{ width: '62.4%', background: 'linear-gradient(90deg,var(--accent-green),var(--accent-yellow))' }}></div>
          </div>
        </div>
      </div>

      <div className="metric-card glass-card">
        <div className="metric-label">
          <span></span> MACD
          <button className="edu-trigger">Learn</button>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-green)' }}>+12.5</div>
        <div className="metric-change text-green">Signal: Bullish Crossover</div>
        <div className="conviction-meter" style={{ marginTop: 'var(--space-3)' }}>
           <div className="progress-track">
             <div className="progress-fill" style={{ width: '75%', background: 'linear-gradient(90deg,var(--accent-green),var(--accent-cyan))' }}></div>
           </div>
        </div>
      </div>

      <div className="metric-card glass-card">
        <div className="metric-label">
          <span></span> Bollinger Bands
          <button className="edu-trigger">Learn</button>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>Upper</div>
        <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Price at Upper Band</div>
        <div className="conviction-meter" style={{ marginTop: 'var(--space-3)' }}>
           <div className="progress-track">
             <div className="progress-fill" style={{ width: '85%', background: 'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))' }}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCards;


