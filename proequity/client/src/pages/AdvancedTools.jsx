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

  // Continuous color scale based on value
  const getColor = (val) => {
    if (val === 1) return { bg: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', border: 'rgba(255,255,255,0.2)' };
    const hue = val > 0.5 ? 140 : 0; 
    const saturation = 70;
    const lightness = val > 0.5 ? 50 - (val - 0.5) * 40 : 50 - (0.5 - val) * 40; 
    const alpha = val > 0.5 ? val * 0.4 : (1 - val) * 0.4;
    
    return {
      bg: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
      text: val > 0.7 ? '#5ee397' : val < 0.4 ? '#ff6b6b' : '#a0a0b0',
      border: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha + 0.2})`
    };
  };

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
      <table style={{ minWidth: '100%', borderSpacing: '8px', borderCollapse: 'separate' }}>
        <thead>
          <tr>
            <th></th>
            {assets.map((a, i) => (
              <motion.th 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} 
                key={a} 
                style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '0.5px', paddingBottom: '8px' }}
              >
                {a.substring(0, 4)}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i}>
              <td style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '12px', paddingRight: '12px' }}>{assets[i]}</td>
              {row.map((val, j) => {
                const colors = getColor(val);
                return (
                  <td key={j} style={{ padding: 0 }}>
                    <motion.div 
                      whileHover={{ scale: 1.15, zIndex: 10, position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                        padding: '12px 6px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: val >= 0.8 ? 700 : 500,
                        cursor: 'crosshair',
                        backdropFilter: 'blur(8px)',
                        transition: 'background 0.3s ease, border 0.3s ease'
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
    { name: 'Auto', perf: 12, size: 130, color: '#5ee397', icon: '🚗' },
    { name: 'Realty', perf: 8, size: 110, color: '#a5efbc', icon: '🏢' },
    { name: 'Metal', perf: 6, size: 100, color: '#c4f5d6', icon: '⚙️' },
    { name: 'Bank', perf: 2, size: 90, color: '#a0a0b0', icon: '🏦' },
    { name: 'FMCG', perf: 0, size: 85, color: '#8e8e9e', icon: '🛒' },
    { name: 'IT', perf: -4, size: 95, color: '#ff8a8a', icon: '💻' },
    { name: 'Pharma', perf: -6, size: 105, color: '#ff6b6b', icon: '💊' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '24px 0', perspective: '1000px' }}>
      {sectors.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ scale: 0, opacity: 0, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 150, damping: 15 }}
          whileHover={{ scale: 1.15, rotateZ: s.perf > 0 ? 5 : -5, zIndex: 10, y: -10 }}
          style={{
            width: s.size,
            height: s.size,
            background: `linear-gradient(135deg, ${s.color}15, rgba(255,255,255,0.05))`,
            border: `1px solid ${s.color}40`,
            boxShadow: `0 10px 30px ${s.color}20, inset 0 2px 20px ${s.color}10`,
            color: s.color,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: `radial-gradient(circle, ${s.color}20 0%, transparent 60%)`, opacity: 0.5 }} />
          <div style={{ fontSize: '24px', marginBottom: '4px', zIndex: 2 }}>{s.icon}</div>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', zIndex: 2 }}>{s.name}</div>
          <div style={{ fontSize: '18px', fontWeight: 800, zIndex: 2 }}>{s.perf > 0 ? '+' : ''}{s.perf}%</div>
        </motion.div>
      ))}
    </div>
  );
};

const EducationalAccordion = ({ title, content, icon = '💡' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
      <motion.button 
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
        style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px' }}>{icon}</span> 
          {title}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 200 }} style={{ color: 'var(--accent-cyan)' }}>▼</motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: '0 20px 24px 20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
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
    <motion.div className="tab-pane active" id="tab-tools" variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '40px' }}>
      
      {/* Header section */}
      <div style={{ marginBottom: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(100,210,255,0.15) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: -1 }} />
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '36px', fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 0%, #a0a0b0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
          Advanced Analytics
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '16px', maxWidth: '600px', lineHeight: 1.5 }}>
          Pro-grade tools for deep market analysis, strategy backtesting, and predictive sector rotation models.
        </motion.p>
      </div>

      {/* Strategy Backtester */}
      <motion.div variants={itemVariants}>
        <GlassCard className="panel" style={{ marginBottom: '32px', border: '1px solid rgba(100,210,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
            <div className="panel-title" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(100,210,255,0.2), rgba(10,132,255,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(100,210,255,0.2)' }}>
                <span style={{ fontSize: '24px' }}>🧪</span>
              </div>
              <span style={{ fontWeight: 700 }}>Strategy Backtester</span>
            </div>
          </div>
          
          <div className="grid-2" style={{ marginTop: '24px', gap: '32px' }}>
            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trading Strategy</label>
                  <select className="filter-select" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '15px', color: '#fff', outline: 'none', transition: 'border 0.2s ease' }}>
                    <option>SMA Crossover (Golden Cross)</option>
                    <option>RSI Mean Reversion</option>
                    <option>MACD Momentum</option>
                    <option>Bollinger Band Breakout</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Asset Selection</label>
                  <select className="filter-select" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '15px', color: '#fff', outline: 'none' }}>
                    <option>NIFTY 50</option><option>BANKNIFTY</option><option>RELIANCE</option><option>HDFCBANK</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time Horizon</label>
                    <select className="filter-select" defaultValue="5 Years" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '15px', color: '#fff', outline: 'none' }}>
                      <option>1 Year</option><option>3 Years</option><option>5 Years</option><option>10 Years</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capital (₹)</label>
                    <input type="number" defaultValue="1000000" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '15px', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }} />
                  </div>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(10,132,255,0.4)' }} whileTap={{ scale: 0.98 }}
                style={{ 
                  width: '100%', marginTop: '32px', padding: '18px', fontSize: '16px', fontWeight: 700, borderRadius: '14px',
                  background: isBacktesting ? 'rgba(100,210,255,0.1)' : 'linear-gradient(135deg, #0a84ff, #64d2ff)',
                  color: isBacktesting ? '#64d2ff' : '#fff',
                  border: isBacktesting ? '1px solid rgba(100,210,255,0.3)' : 'none',
                  boxShadow: isBacktesting ? 'none' : '0 10px 20px rgba(10,132,255,0.3)',
                  transition: 'all 0.3s ease', cursor: isBacktesting ? 'default' : 'pointer'
                }}
                onClick={handleRunBacktest} disabled={isBacktesting}
              >
                {isBacktesting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', justifyContent: 'center', width: '100%' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '20px', height: '20px', border: '3px solid rgba(100,210,255,0.2)', borderTopColor: '#64d2ff', borderRadius: '50%' }} />
                    Simulating 5 Years of Data...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    ▶ Run Deep Backtest
                  </span>
                )}
              </motion.button>
            </div>
            
            <div style={{ position: 'relative', minHeight: '400px', background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 100%)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              {!backtestResult && !isBacktesting && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ fontSize: '64px', opacity: 0.3, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>📊</motion.div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '24px' }}>Ready for Analysis</div>
                  <div style={{ fontSize: '14px', marginTop: '8px', maxWidth: '250px', textAlign: 'center', lineHeight: 1.5 }}>Configure your strategy parameters and hit run to see historical performance.</div>
                </motion.div>
              )}
              
              <AnimatePresence>
                {backtestResult && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="grid-3" style={{ gap: '16px', marginBottom: '32px' }}>
                      <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(52,199,89,0.1), rgba(52,199,89,0.02))', border: '1px solid rgba(52,199,89,0.2)', borderRadius: '16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(52,199,89,0.2) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                        <div style={{ color: '#5ee397', fontSize: '28px', fontWeight: 800, letterSpacing: '-1px' }}>{backtestResult.cagr}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>CAGR</div>
                      </div>
                      <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(100,210,255,0.1), rgba(100,210,255,0.02))', border: '1px solid rgba(100,210,255,0.2)', borderRadius: '16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(100,210,255,0.2) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                        <div style={{ color: '#64d2ff', fontSize: '28px', fontWeight: 800, letterSpacing: '-1px' }}>{backtestResult.sharpe}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Sharpe Ratio</div>
                      </div>
                      <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(255,59,48,0.1), rgba(255,59,48,0.02))', border: '1px solid rgba(255,59,48,0.2)', borderRadius: '16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(255,59,48,0.2) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                        <div style={{ color: '#ff6b6b', fontSize: '28px', fontWeight: 800, letterSpacing: '-1px' }}>{backtestResult.drawdown}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Max Drawdown</div>
                      </div>
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
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
        <GlassCard className="panel" style={{ marginBottom: '32px' }}>
          <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '32px' }}>
            <div className="panel-title" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(175,82,222,0.2), rgba(175,82,222,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(175,82,222,0.2)' }}>
                <span style={{ fontSize: '24px' }}>🔗</span>
              </div>
              <span style={{ fontWeight: 700 }}>Correlation Heatmap</span>
            </div>
          </div>
          
          <CorrelationHeatmap />

          <EducationalAccordion 
            icon="🧠"
            title="Mastering Correlation & Diversification"
            content={
              <>
                <p style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>The Goal:</strong> Protect your portfolio from market shocks by ensuring assets don't all move in the same direction.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0' }}>
                  <div style={{ background: 'rgba(255,59,48,0.1)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #ff6b6b' }}>
                    <strong style={{ color: '#ff6b6b', display: 'block', marginBottom: '8px' }}>+1.0 to +0.8 (Highly Correlated)</strong>
                    Assets move together. If you own both, you aren't diversified. If the sector crashes, both crash.
                  </div>
                  <div style={{ background: 'rgba(52,199,89,0.1)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #5ee397' }}>
                    <strong style={{ color: '#5ee397', display: 'block', marginBottom: '8px' }}>0.0 to +0.3 (Uncorrelated)</strong>
                    Perfect for reducing volatility. They move independently, smoothing your equity curve.
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(90deg, rgba(100,210,255,0.15), rgba(100,210,255,0.05))', borderLeft: '4px solid #64d2ff', padding: '16px', borderRadius: '0 12px 12px 0' }}>
                  <strong style={{ color: '#64d2ff' }}>Pro Tip:</strong> Pair high-beta growth stocks with defensive FMCG/Pharma stocks to optimize your Sharpe ratio.
                </div>
              </>
            }
          />
        </GlassCard>
      </motion.div>

      <div className="grid-2" style={{ gap: '32px' }}>
        {/* Sector Rotation */}
        <motion.div variants={itemVariants}>
          <GlassCard className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '24px' }}>
              <div className="panel-title" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,149,0,0.2), rgba(255,149,0,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,149,0,0.2)' }}>
                  <span style={{ fontSize: '24px' }}>🔄</span>
                </div>
                <span style={{ fontWeight: 700 }}>Sector Rotation Map</span>
              </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <SectorRings />
              
              <EducationalAccordion 
                icon="📊"
                title="The Business Cycle Play"
                content={
                  <>
                    <p style={{ marginBottom: '16px' }}>Institutions rotate capital between sectors based on the economic cycle. Aligning your portfolio with the cycle generates significant alpha.</p>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                      <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><strong style={{ color: '#5ee397' }}>Early Recovery:</strong> Auto, Discretionary, Banks</li>
                        <li><strong style={{ color: '#64d2ff' }}>Mid Cycle:</strong> Tech, Industrials</li>
                        <li><strong style={{ color: '#ff9f0a' }}>Late Cycle (Peak):</strong> Energy, Commodities</li>
                        <li><strong style={{ color: '#ff6b6b' }}>Recession:</strong> Pharma, FMCG, Utilities</li>
                      </ul>
                    </div>
                    <div style={{ background: 'linear-gradient(90deg, rgba(255,149,0,0.15), rgba(255,149,0,0.05))', borderLeft: '4px solid #ff9f0a', padding: '16px', borderRadius: '0 12px 12px 0' }}>
                      <strong style={{ color: '#ff9f0a' }}>Current Trend:</strong> Auto and Realty are showing immense relative strength, indicating early/mid recovery phase.
                    </div>
                  </>
                }
              />
            </div>
          </GlassCard>
        </motion.div>
        
        {/* Actionable Alerts */}
        <motion.div variants={itemVariants}>
          <GlassCard className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '24px' }}>
              <div className="panel-title" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(255,59,48,0.2), rgba(255,59,48,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,59,48,0.2)' }}>
                  <span style={{ fontSize: '24px' }}>🔔</span>
                </div>
                <span style={{ fontWeight: 700 }}>Smart Alerts</span>
              </div>
              <motion.button whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }} whileTap={{ scale: 0.95 }} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '10px', color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                + Create Alert
              </motion.button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {[
                { icon: '📈', title: 'RELIANCE — Breakout', desc: 'Price crossed resistance ₹3,000', status: 'Active', color: '#5ee397', bg: 'rgba(52,199,89,0.1)' },
                { icon: '📊', title: 'TATAMOTORS — Volume Anomaly', desc: '5x average volume traded today', status: 'Triggered', color: '#bf5af2', bg: 'rgba(175,82,222,0.1)' },
                { icon: '📰', title: 'HDFCBANK — Earnings Alert', desc: 'Quarterly results in 2 days', status: 'Upcoming', color: '#64d2ff', bg: 'rgba(100,210,255,0.1)' },
                { icon: '⚠️', title: 'INFY — RSI Divergence', desc: 'Bearish divergence detected on Daily', status: 'Warning', color: '#ff9f0a', bg: 'rgba(255,149,0,0.1)' }
              ].map((alert, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', 
                    background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '16px', position: 'relative', overflow: 'hidden',
                    transition: 'all 0.3s ease', cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: alert.color, boxShadow: `0 0 10px ${alert.color}` }} />
                  
                  <div style={{ fontSize: '24px', background: alert.bg, width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px', border: `1px solid ${alert.color}40` }}>
                    {alert.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '16px', letterSpacing: '0.2px' }}>{alert.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>{alert.desc}</div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: alert.bg, color: alert.color, padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px', border: `1px solid ${alert.color}40` }}>
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: alert.color, boxShadow: `0 0 8px ${alert.color}` }} />
                    {alert.status}
                  </div>
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
