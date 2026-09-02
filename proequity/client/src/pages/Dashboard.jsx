import React from 'react';
import MetricCard from '../components/dashboard/MetricCard';
import GlassCard from '../components/shared/GlassCard';

export default function Dashboard() {
  return <div className="tab-pane active" id="tab-dashboard">
    <div className="glass-card" style={{ padding: 16, marginBottom: 16, color: 'var(--accent-yellow)' }}>Index coverage unavailable: Alpha Vantage supports supported BSE equity symbols such as <strong>RELIANCE.BSE</strong>, but this adapter does not provide NIFTY, NIFTY BANK or SENSEX index data.</div>
    <div className="grid-4" style={{ marginBottom: 'var(--space-5)' }}>
      <MetricCard title="NIFTY 50" value="Unavailable" change="Approved index feed required" isPositive={false} />
      <MetricCard title="NIFTY BANK" value="Unavailable" change="Approved index feed required" isPositive={false} />
      <MetricCard title="SENSEX" value="Unavailable" change="Approved index feed required" isPositive={false} />
      <MetricCard title="FII FLOW" value="Unavailable" change="Official validated feed not configured" isPositive={false} />
    </div>
    <GlassCard className="panel"><div className="panel-title">Market overview</div><p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>An Indian index provider with documented public-display rights is required before this dashboard can show market-wide index data. Use Stock Analysis or Technicals to load an Alpha Vantage-supported BSE equity.</p></GlassCard>
  </div>;
}
