import React from 'react';
import GlassCard from '../shared/GlassCard';

const DuPontAnalysis = () => {
  return (
    <GlassCard className="dupont-container">
      <div className="panel-header">
        <div className="panel-title">DuPont Analysis (ROE Breakdown)</div>
      </div>
      <div className="dupont-equation">
        <div className="formula-part">
          <span className="formula-value">12.4%</span>
          <span className="formula-label">Net Margin</span>
        </div>
        <span className="math-operator">×</span>
        <div className="formula-part">
          <span className="formula-value">0.72x</span>
          <span className="formula-label">Asset Turnover</span>
        </div>
        <span className="math-operator">×</span>
        <div className="formula-part">
          <span className="formula-value">2.68x</span>
          <span className="formula-label">Equity Multiplier</span>
        </div>
        <span className="math-operator">=</span>
        <div className="formula-part final">
          <span className="formula-value">23.9%</span>
          <span className="formula-label">Return on Equity</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default DuPontAnalysis;


