import React, { useState } from 'react';
import GlassCard from '../components/shared/GlassCard';

const Fundamentals = () => {
  // DCF Calculator State
  const [dcfParams, setDcfParams] = useState({
    fcf: 125000,
    growth1: 12,
    growth2: 8,
    wacc: 10,
    terminal: 3,
    shares: 676.2,
    debt: 45000
  });

  const handleDcfChange = (e) => {
    const { name, value } = e.target;
    setDcfParams(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const calculateDCF = () => {
    const { fcf, growth1, growth2, wacc, terminal, shares, debt } = dcfParams;
    let pvFCF = 0;
    let currentFcf = fcf;
    const discountRate = wacc / 100;

    // Years 1-5
    for (let i = 1; i <= 5; i++) {
      currentFcf *= (1 + growth1 / 100);
      pvFCF += currentFcf / Math.pow(1 + discountRate, i);
    }

    // Years 6-10
    for (let i = 6; i <= 10; i++) {
      currentFcf *= (1 + growth2 / 100);
      pvFCF += currentFcf / Math.pow(1 + discountRate, i);
    }

    // Terminal Value
    const terminalValue = (currentFcf * (1 + terminal / 100)) / (discountRate - terminal / 100);
    const pvTerminal = terminalValue / Math.pow(1 + discountRate, 10);

    const enterpriseValue = pvFCF + pvTerminal;
    const equityValue = enterpriseValue - debt;
    const fairValue = equityValue / shares;

    return {
      fairValue: Math.max(0, fairValue),
      enterpriseValue: Math.max(0, enterpriseValue / 100000), // In Lakh Crores
    };
  };

  const results = calculateDCF();
  const currentPrice = 2958;
  const upside = ((results.fairValue - currentPrice) / currentPrice) * 100;

  const resetDCF = () => {
    setDcfParams({
      fcf: 125000,
      growth1: 12,
      growth2: 8,
      wacc: 10,
      terminal: 3,
      shares: 676.2,
      debt: 45000
    });
  };

  return (
    <div className="tab-pane active" id="tab-fundamental">

      {/* Valuation Metrics */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="metric-card glass-card">
          <div className="metric-label">
            <span>💰</span> P/E Ratio
            <button className="edu-trigger">Learn</button>
          </div>
          <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>24.8x</div>
          <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Industry Avg: 28.5x</div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-label">
            <span>📊</span> P/B Ratio
            <button className="edu-trigger">Learn</button>
          </div>
          <div className="metric-value" style={{ color: 'var(--accent-green)' }}>2.4x</div>
          <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Industry Avg: 3.2x</div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-label">
            <span>📈</span> EV/EBITDA
            <button className="edu-trigger">Learn</button>
          </div>
          <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>12.5x</div>
          <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Industry Avg: 14.8x</div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-label">
            <span>🎯</span> DCF Fair Value
            <button className="edu-trigger">Learn</button>
          </div>
          <div className="metric-value" style={{ color: 'var(--accent-green)' }}>₹3,420</div>
          <div className="metric-change text-green">▲ +15.6% Upside</div>
        </div>
      </div>

      {/* DCF Calculator */}
      <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="panel-header">
          <div className="panel-title">
            <span className="icon" style={{ background: 'rgba(175,82,222,0.15)' }}>🧮</span>
            Interactive DCF Valuation Calculator
          </div>
          <span className="panel-meta">Build Your Own Valuation</span>
        </div>
        <div className="grid-2">
          <div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Current FCF (₹ Cr)</label>
              <input type="number" name="fcf" value={dcfParams.fcf} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>FCF Growth Yr 1-5 (%)</label>
              <input type="number" name="growth1" value={dcfParams.growth1} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>FCF Growth Yr 6-10 (%)</label>
              <input type="number" name="growth2" value={dcfParams.growth2} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>WACC (%)</label>
              <input type="number" name="wacc" value={dcfParams.wacc} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Terminal Growth (%)</label>
              <input type="number" name="terminal" value={dcfParams.terminal} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Shares Outstanding (Cr)</label>
              <input type="number" name="shares" value={dcfParams.shares} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
            <div className="dcf-input-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Net Debt (₹ Cr)</label>
              <input type="number" name="debt" value={dcfParams.debt} onChange={handleDcfChange} className="filter-input" style={{ width: '120px', padding: '6px' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>Fair Value per Share</div>
              <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '-0.03em' }}>₹{Math.round(results.fairValue).toLocaleString('en-IN')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>Upside Potential</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: upside >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>Enterprise Value</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>₹{results.enterpriseValue.toFixed(2)}L Cr</div>
            </div>
            <button className="btn" onClick={resetDCF}>Reset to Default</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Fundamentals;
