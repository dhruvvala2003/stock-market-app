import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';
import { BacktestChart } from '../components/advanced/AdvancedToolsCharts';

// --- Subcomponents ---

const CorrelationHeatmap = () => {
  const assets = ['RELIANCE', 'HDFCBANK', 'TCS', 'INFY', 'ITC', 'L&T', 'MARUTI', 'SUNPHARMA'];
  
  const data = [
    [1.00, 0.72, 0.58, 0.55, 0.65, 0.78, 0.62, 0.48],
    [0.72, 1.00, 0.68, 0.65, 0.58, 0.70, 0.60, 0.52],
    [0.58, 0.68, 1.00, 0.88, 0.45, 0.55, 0.42, 0.40],
    [0.55, 0.65, 0.88, 1.00, 0.42, 0.52, 0.38, 0.38],
    [0.65, 0.58, 0.45, 0.42, 1.00, 0.55, 0.48, 0.50],
    [0.78, 0.70, 0.55, 0.52, 0.55, 1.00, 0.72, 0.45],
    [0.62, 0.60, 0.42, 0.38, 0.48, 0.72, 1.00, 0.35],
    [0.48, 0.52, 0.40, 0.38, 0.50, 0.45, 0.35, 1.00],
  ];

  const getColor = (val) => {
    if (val === 1) return { bg: 'rgba(255,255,255,0.05)', text: '#ffffff', border: 'rgba(255,255,255,0.1)' };
    if (val >= 0.8) return { bg: 'rgba(52,199,89,0.2)', text: '#5ee397', border: 'rgba(52,199,89,0.4)' };
    if (val >= 0.6) return { bg: 'rgba(52,199,89,0.1)', text: '#a5efbc', border: 'rgba(52,199,89,0.2)' };
    if (val >= 0.4) return { bg: 'rgba(255,255,255,0.02)', text: '#a0a0b0', border: 'transparent' };
    return { bg: 'rgba(255,59,48,0.1)', text: '#ff6b6b', border: 'rgba(255,59,48,0.2)' };
  };

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
      <table className="data-table" style={{ fontSize: '13px', minWidth: '700px', borderSpacing: '4px', borderCollapse: 'separate' }}>
        <thead>
          <tr>
            <th></th>
            {assets.map((a, i) => <motion.th initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={a} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{a}</motion.th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i}>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{assets[i]}</td>
              {row.map((val, j) => {
                const colors = getColor(val);
                return (
                  <td key={j} style={{ padding: 0 }}>
                    <motion.div 
                      whileHover={{ scale: 1.15, zIndex: 10, position: 'relative' }}
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                        padding: '12px 6px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: val >= 0.8 ? 700 : 500,
                        cursor: 'crosshair',
                        transition: 'all 0.2s ease',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
                      }}
                      title={`${assets[i]} vs ${assets[j]}: ${val.toFixed(2)}`}
                    >
                      {val.toFixed(2)}
                    </motion.div>
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SectorRings = () => {
  const sectors = [
    { name: 'Auto', perf: 12, size: 120, color: '#5ee397' },
    { name: 'Realty', perf: 8, size: 105, color: '#a5efbc' },
    { name: 'Metal', perf: 6, size: 95, color: '#c4f5d6' },
    { name: 'Bank', perf: 2, size: 85, color: 'var(--text-secondary)' },
    { name: 'FMCG', perf: 0, size: 80, color: 'var(--text-tertiary)' },
    { name: 'IT', perf: -4, size: 90, color: '#ff8a8a' },
    { name: 'Pharma', perf: -6, size: 100, color: '#ff6b6b' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', padding: 'var(--space-4)' }}>
      {sectors.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1, rotate: s.perf > 0 ? 5 : -5 }}
          style={{
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent), ${s.color}15`,
            border: `1px solid ${s.color}40`,
            boxShadow: `0 8px 32px ${s.color}15, inset 0 2px 0 rgba(255,255,255,0.1)`,
            color: s.color,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>{s.name}</div>
          <div style={{ fontSize: '20px', fontWeight: 800 }}>{s.perf > 0 ? '+' : ''}{s.perf}%</div>
        </motion.div>
      ))}
    </div>
  );
};

const EducationalAccordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout style={{ marginTop: 'var(--space-4)', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
      <motion.button 
        layout
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>💡</span> {title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: 'var(--accent-cyan)' }}>▼</motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: '0 20px 20px 20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Component ---
const AdvancedTools = () => {
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [backtestResult, setBacktestResult] = useState(null);

  const handleRunBacktest = () => {
    setIsBacktesting(true);
    setBacktestResult(null);
    setTimeout(() => {
      setIsBacktesting(false);
      setBacktestResult({
        totalReturn: '+142.5%', cagr: '19.4%', sharpe: '1.45', drawdown: '-18.2%', winRate: '68%', profitFactor: '2.4x'
      });
    }, 2000);
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <motion.div className="tab-pane active" id="tab-tools" variants={containerVariants} initial="hidden" animate="show">
      
      {/* Header section */}
      <div style={{ marginBottom: '30px' }}>
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '28px', fontWeight: 800, background: 'linear-gradient(to right, #fff, #a0a0b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Advanced Analytics
        </motion.h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Pro-grade tools for deep market analysis and strategy building.</p>
      </div>

      {/* Strategy Backtester */}
      <motion.div variants={itemVariants}>
        <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)', border: '1px solid rgba(100,210,255,0.2)' }}>
          <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
            <div className="panel-title" style={{ fontSize: '20px' }}>
              <span className="icon" style={{ background: 'rgba(100,210,255,0.15)', color: '#64d2ff', boxShadow: '0 0 15px rgba(100,210,255,0.2)' }}>🧪</span>
              Strategy Backtester
            </div>
          </div>
          
          <div className="grid-2" style={{ marginTop: '20px', gap: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="dcf-input-row">
                <label>Strategy</label>
                <select className="filter-select" style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>
                  <option>SMA Crossover (Golden Cross)</option>
                  <option>RSI Mean Reversion</option>
                  <option>MACD Momentum</option>
                  <option>Bollinger Band Breakout</option>
                </select>
              </div>
              <div className="dcf-input-row">
                <label>Stock/Index</label>
                <select className="filter-select" style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>
                  <option>NIFTY 50</option><option>BANKNIFTY</option><option>RELIANCE</option><option>HDFCBANK</option>
                </select>
              </div>
              <div className="dcf-input-row">
                <label>Time Period</label>
                <select className="filter-select" defaultValue="5 Years" style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}>
                  <option>1 Year</option><option>3 Years</option><option>5 Years</option><option>10 Years</option>
                </select>
              </div>
              <div className="dcf-input-row">
                <label>Initial Capital (₹)</label>
                <input type="number" defaultValue="1000000" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', outline: 'none' }} />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn" 
                style={{ 
                  width: '100%', marginTop: '24px', padding: '16px', fontSize: '15px', fontWeight: 700,
                  background: isBacktesting ? 'rgba(100,210,255,0.1)' : 'linear-gradient(135deg, #0a84ff, #64d2ff)',
                  color: isBacktesting ? '#64d2ff' : '#fff',
                  border: isBacktesting ? '1px solid rgba(100,210,255,0.3)' : 'none',
                  boxShadow: isBacktesting ? 'none' : '0 10px 20px rgba(10,132,255,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleRunBacktest} disabled={isBacktesting}
              >
                {isBacktesting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '18px', height: '18px', border: '3px solid rgba(100,210,255,0.2)', borderTopColor: '#64d2ff', borderRadius: '50%' }} />
                    Running High-Speed Simulation...
                  </span>
                ) : '▶ Run Deep Backtest'}
              </motion.button>
            </div>
            
            <div style={{ position: 'relative', minHeight: '380px', background: 'rgba(0,0,0,0.15)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)', padding: '24px' }}>
              {!backtestResult && !isBacktesting && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  <span style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📊</span>
                  <div style={{ fontSize: '16px', fontWeight: 500 }}>Awaiting Configuration</div>
                  <div style={{ fontSize: '13px', marginTop: '8px' }}>Configure your strategy and hit Run</div>
                </motion.div>
              )}
              
              <AnimatePresence>
                {backtestResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                    <div className="grid-3" style={{ gap: '16px', marginBottom: '24px' }}>
                      <div className="backtest-stat" style={{ padding: '16px', background: 'rgba(52,199,89,0.05)', border: '1px solid rgba(52,199,89,0.1)' }}>
                        <div className="stat-number" style={{ color: '#5ee397', fontSize: '24px', fontWeight: 800 }}>{backtestResult.cagr}</div>
                        <div className="stat-label">CAGR</div>
                      </div>
                      <div className="backtest-stat" style={{ padding: '16px', background: 'rgba(100,210,255,0.05)', border: '1px solid rgba(100,210,255,0.1)' }}>
                        <div className="stat-number" style={{ color: '#64d2ff', fontSize: '24px', fontWeight: 800 }}>{backtestResult.sharpe}</div>
                        <div className="stat-label">Sharpe Ratio</div>
                      </div>
                      <div className="backtest-stat" style={{ padding: '16px', background: 'rgba(255,59,48,0.05)', border: '1px solid rgba(255,59,48,0.1)' }}>
                        <div className="stat-number" style={{ color: '#ff6b6b', fontSize: '24px', fontWeight: 800 }}>{backtestResult.drawdown}</div>
                        <div className="stat-label">Max Drawdown</div>
                      </div>
                    </div>
                    <div style={{ height: '220px' }}>
                      <BacktestChart />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Correlation Matrix */}
      <motion.div variants={itemVariants}>
        <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div className="panel-title" style={{ fontSize: '20px' }}>
              <span className="icon" style={{ background: 'rgba(175,82,222,0.15)', color: '#bf5af2', boxShadow: '0 0 15px rgba(175,82,222,0.2)' }}>🔗</span>
              Correlation Matrix
            </div>
          </div>
          
          <CorrelationHeatmap />

          <EducationalAccordion 
            title="Mastering Correlation & Diversification"
            content={
              <>
                <p style={{ marginBottom: '10px' }}><strong style={{ color: '#fff' }}>The Goal:</strong> Protect your portfolio from market shocks.</p>
                <p style={{ marginBottom: '10px' }}><strong>+1.0 to +0.8:</strong> Highly correlated. If you own both, you aren't diversified (e.g., TCS & INFY). If the sector crashes, both crash.</p>
                <p style={{ marginBottom: '10px' }}><strong>0.0 to +0.3:</strong> Uncorrelated. Perfect for reducing volatility. They move independently.</p>
                <div style={{ background: 'rgba(52,199,89,0.1)', borderLeft: '4px solid #5ee397', padding: '12px 16px', borderRadius: '0 8px 8px 0', marginTop: '16px' }}>
                  <strong>Pro Tip:</strong> Pair high-growth tech stocks with defensive FMCG/Pharma stocks to smooth out your equity curve.
                </div>
              </>
            }
          />
        </GlassCard>
      </motion.div>

      <div className="grid-2" style={{ gap: '30px' }}>
        {/* Sector Rotation */}
        <motion.div variants={itemVariants}>
          <GlassCard className="panel" style={{ height: '100%' }}>
            <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', marginBottom: '20px' }}>
              <div className="panel-title" style={{ fontSize: '20px' }}>
                <span className="icon" style={{ background: 'rgba(255,149,0,0.15)', color: '#ff9f0a', boxShadow: '0 0 15px rgba(255,149,0,0.2)' }}>🔄</span>
                Sector Rotation Map
              </div>
            </div>
            
            <SectorRings />
            
            <EducationalAccordion 
              title="The Business Cycle Play"
              content={
                <>
                  <p style={{ marginBottom: '10px' }}>Institutions rotate money between sectors based on the economic cycle.</p>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                    <li><strong>Early Recovery:</strong> Auto, Discretionary, Banks</li>
                    <li><strong>Mid Cycle:</strong> Tech, Industrials</li>
                    <li><strong>Late Cycle (Peak):</strong> Energy, Commodities</li>
                    <li><strong>Recession:</strong> Pharma, FMCG, Utilities</li>
                  </ul>
                  <div style={{ background: 'rgba(255,149,0,0.1)', borderLeft: '4px solid #ff9f0a', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                    <strong>Current Trend:</strong> Auto and Realty are showing immense relative strength.
                  </div>
                </>
              }
            />
          </GlassCard>
        </motion.div>
        
        {/* Price Alerts */}
        <motion.div variants={itemVariants}>
          <GlassCard className="panel" style={{ height: '100%' }}>
            <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', marginBottom: '20px' }}>
              <div className="panel-title" style={{ fontSize: '20px' }}>
                <span className="icon" style={{ background: 'rgba(255,59,48,0.15)', color: '#ff6b6b', boxShadow: '0 0 15px rgba(255,59,48,0.2)' }}>🔔</span>
                Actionable Alerts
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px 16px', fontSize: '13px', borderRadius: '8px', color: '#fff' }}>+ Create Alert</motion.button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📈', title: 'RELIANCE — Breakout', desc: 'Price crossed resistance ₹3,000', status: 'Active', color: '#5ee397' },
                { icon: '📊', title: 'TATAMOTORS — Volume Anomaly', desc: '5x average volume traded today', status: 'Triggered', color: '#bf5af2' },
                { icon: '📰', title: 'HDFCBANK — Earnings Alert', desc: 'Quarterly results in 2 days', status: 'Upcoming', color: '#64d2ff' }
              ].map((alert, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.05)' }} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', 
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', 
                    borderLeft: `4px solid ${alert.color}`, borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '24px', background: `${alert.color}15`, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{alert.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>{alert.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{alert.desc}</div>
                  </div>
                  <div style={{ fontSize: '12px', background: `${alert.color}15`, color: alert.color, padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>{alert.status}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AdvancedTools;
