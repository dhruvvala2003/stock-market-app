import React from 'react';
import GlassCard from '../shared/GlassCard';

const PatternRecognition = () => {
  return (
    <GlassCard className="panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="icon" style={{ background: 'rgba(191,90,242,0.15)' }}>🧠</span>
          Pattern Recognition (AI)
        </div>
        <span className="panel-meta">Real-time</span>
      </div>
      <div className="grid-1" style={{ gap: 'var(--space-3)' }}>
        
        <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <div style={{ fontWeight: 600 }}>Ascending Triangle</div>
            <span className="tag tag-buy">Bullish</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>Breakout above ₹2950 resistance. Target: ₹3120.</p>
        </div>

        <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <div style={{ fontWeight: 600 }}>Golden Cross</div>
            <span className="tag tag-buy">Bullish</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>50 DMA crossed above 200 DMA (3 days ago).</p>
        </div>

        <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <div style={{ fontWeight: 600 }}>Bull Flag</div>
            <span className="tag tag-buy">Bullish</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>Consolidation after steep run-up.</p>
        </div>

        <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <div style={{ fontWeight: 600 }}>Volume Climax</div>
            <span className="tag tag-info">Watch</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>Extremely high volume on up day.</p>
        </div>

      </div>
    </GlassCard>
  );
};

export default PatternRecognition;
