import React from 'react';
import GlassCard from '../components/shared/GlassCard';
import { useAuth } from '../hooks/useAuth';
export default function IPO({ setAuthOpen }) { const { user } = useAuth(); return <div className="tab-pane active"><GlassCard className="panel"><div className="panel-title">IPO tracker</div><p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>{user ? 'Your saved IPO records can be displayed here once prices and lot quantities are sourced from validated records.' : 'Log in to add your own IPO records. No example allotments are presented as user data.'}</p>{!user && <button className="btn btn-glow" onClick={() => setAuthOpen(true)}>Login</button>}</GlassCard></div>; }
