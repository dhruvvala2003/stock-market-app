import React from 'react';
import GlassCard from '../components/shared/GlassCard';
export default function AdvancedTools() { return <div className="tab-pane active"><GlassCard className="panel"><div className="panel-title">Research tools</div><p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>Backtests, correlations, sector rotation, and alerts require real point-in-time datasets. They are disabled until data coverage, corporate-action handling, transaction costs, and methodology are documented.</p></GlassCard></div>; }
