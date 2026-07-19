import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';
import { AllocationChart, PerformanceChart } from '../components/portfolio/PortfolioCharts';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';

const Portfolio = ({ setAuthOpen }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  
  // Historical data states
  const [historyPeriod, setHistoryPeriod] = useState('1M'); // '1D', '1M', '6M', '1Y'
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      let initialHoldings = [];
      
      if (user && supabase) {
        const { data, error } = await supabase.from('portfolio_holdings').select('*');
        if (!error && data) {
          initialHoldings = data.map(h => ({
            id: h.symbol, name: h.name, qty: h.quantity, avgCost: h.average_cost, tag: 'Hold'
          }));
        }
      } 
      
      if (initialHoldings.length === 0) {
        // Fallback or demo data if not logged in or empty
        initialHoldings = [
          { id: 'HDFCBANK.NS', name: 'HDFC Bank', qty: 50, avgCost: 1520, tag: 'Buy' },
          { id: 'RELIANCE.NS', name: 'Reliance', qty: 20, avgCost: 2780, tag: 'Buy' },
          { id: 'ITC.NS', name: 'ITC', qty: 100, avgCost: 385, tag: 'Strong Buy' },
        ];
      }

      try {
        const { fetchStockQuote, fetchStockCandles } = require('../services/api');
        
        // Fetch live quotes
        const updatedHoldings = await Promise.all(
          initialHoldings.map(async (h) => {
            try {
              const quote = await fetchStockQuote(h.id);
              // Also fetch historical 1M, 6M to compute previous values if needed, skipped for brevity here unless requested
              return quote && quote.price ? { ...h, ltp: quote.price, prevClose: quote.previousClose } : { ...h, ltp: h.avgCost, prevClose: h.avgCost };
            } catch {
              return { ...h, ltp: h.avgCost, prevClose: h.avgCost };
            }
          })
        );
        setHoldings(updatedHoldings);
      } catch (err) {
        console.warn('Failed to load portfolio live prices:', err);
        setHoldings(initialHoldings.map(h => ({ ...h, ltp: h.avgCost, prevClose: h.avgCost })));
      }
      setLoading(false);
    };
    fetchPortfolioData();
  }, [user]);

  // Handle Remove Stock
  const handleRemove = async (symbol) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const { error } = await supabase.from('portfolio_holdings').delete().eq('symbol', symbol).eq('user_id', user.id);
    if (!error) {
      setHoldings(prev => prev.filter(h => h.id !== symbol));
    } else {
      alert("Error removing stock: " + error.message);
    }
  };

  const processedHoldings = holdings.map(h => {
    const value = h.qty * h.ltp;
    const cost = h.qty * h.avgCost;
    const pnl = value - cost;
    const ret = (pnl / cost) * 100;
    return { ...h, pnl, ret, value };
  });

  const totalValue = processedHoldings.reduce((sum, h) => sum + h.value, 0);
  const totalCost = processedHoldings.reduce((sum, h) => sum + (h.qty * h.avgCost), 0);
  const totalPnl = totalValue - totalCost;
  const totalReturn = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;
  
  const dayPnl = processedHoldings.reduce((sum, h) => sum + (h.qty * (h.ltp - (h.prevClose || h.ltp))), 0);
  const dayReturn = totalValue - dayPnl > 0 ? (dayPnl / (totalValue - dayPnl)) * 100 : 0;

  // Add allocation calculation dynamically
  const colors = ['#0a84ff', '#ff9500', '#34c759', '#af52de', '#ff2d55', '#5ac8fa', '#ffcc00'];
  processedHoldings.sort((a, b) => b.value - a.value);
  processedHoldings.forEach((h, idx) => {
    h.alloc = totalValue > 0 ? ((h.value / totalValue) * 100).toFixed(1) : 0;
    h.allocColor = colors[idx % colors.length];
  });

  const filteredHoldings = processedHoldings.filter(h => {
    if (filter === 'gainers') return h.ret > 0;
    if (filter === 'losers') return h.ret < 0;
    return true;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const hoverCard = {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 210, 255, 0.1) inset",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <motion.div className="tab-pane active" id="tab-portfolio" variants={container} initial="hidden" animate="show">
      
      {/* Portfolio Overview */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-5)' }}>
        <motion.div variants={item} whileHover={hoverCard}>
          <div className="metric-card glass-card">
            <div className="metric-label"><span>💼</span> Portfolio Value</div>
            <div className="metric-value">{loading ? 'Loading...' : `₹${(totalValue / 100000).toFixed(2)}L`}</div>
            <div className={`metric-change ${totalPnl >= 0 ? 'text-green' : 'text-red'}`}>
              {totalPnl >= 0 ? '▲ +' : '▼ '}₹{(Math.abs(totalPnl) / 100000).toFixed(2)}L ({totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%)
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} whileHover={hoverCard}>
          <div className="metric-card glass-card">
            <div className="metric-label"><span>📈</span> Day P&L</div>
            <div className={`metric-value ${dayPnl >= 0 ? 'text-green' : 'text-red'}`}>
              {dayPnl >= 0 ? '+' : ''}₹{dayPnl.toFixed(2)}
            </div>
            <div className={`metric-change ${dayReturn >= 0 ? 'text-green' : 'text-red'}`}>
              {dayReturn >= 0 ? '▲ +' : '▼ '}{dayReturn.toFixed(2)}%
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} whileHover={hoverCard}>
          <div className="metric-card glass-card">
            <div className="metric-label"><span>🎯</span> Total Return</div>
            <div className={`metric-value ${totalReturn >= 0 ? 'text-green' : 'text-red'}`}>
              {loading ? '...' : `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`}
            </div>
            <div className="metric-change text-green">▲ vs NIFTY +1.2%</div>
          </div>
        </motion.div>
        
        <motion.div variants={item} whileHover={hoverCard}>
          <div className="metric-card glass-card">
            <div className="metric-label"><span>⚡</span> Beta</div>
            <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>1.12</div>
            <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Slightly Aggressive</div>
          </div>
        </motion.div>
      </div>

      {/* Allocation & Performance */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <motion.div variants={item}>
          <GlassCard className="panel" style={{ height: '100%' }}>
            <div className="panel-header">
              <div className="panel-title">
                <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>🥧</span>
                Portfolio Allocation
              </div>
            </div>
            <AllocationChart />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-4)', justifyContent: 'center' }}>
              {[
                { name: 'Banking', color: '#0a84ff', pct: 28 },
                { name: 'IT', color: '#34c759', pct: 22 },
                { name: 'Energy', color: '#ff9500', pct: 18 },
                { name: 'FMCG', color: '#af52de', pct: 15 },
                { name: 'Auto', color: '#ff2d55', pct: 10 },
                { name: 'Cash', color: '#64748b', pct: 7 },
              ].map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: '12px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: s.color, marginRight: '6px' }}></span>
                  {s.name} {s.pct}%
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={item}>
          <GlassCard className="panel" style={{ height: '100%' }}>
            <div className="panel-header">
              <div className="panel-title">
                <span className="icon" style={{ background: 'rgba(52,199,89,0.15)' }}>📊</span>
                Performance vs Benchmark
              </div>
            </div>
            <PerformanceChart />
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-green)' }}>+18.5%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Your Portfolio</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-cyan)' }}>+12.3%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>NIFTY 50</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-green)' }}>+6.2%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Alpha</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Holdings Table */}
      <motion.div variants={item}>
        <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="panel-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
            <div className="panel-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <span className="icon" style={{ background: 'rgba(0,199,190,0.15)' }}>📋</span>
                Holdings Overview
              </div>
              <button 
                className="btn btn-glow" 
                onClick={() => user ? alert("Add Stock Flow here") : setAuthOpen(true)}
                style={{ fontSize: '13px', padding: '6px 14px' }}
              >
                + Add Stock
              </button>
            </div>
            
            {/* Interactive Filters */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px' }}>
              <button 
                onClick={() => setFilter('all')}
                style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', fontWeight: 600, border: 'none', cursor: 'pointer', background: filter === 'all' ? 'rgba(255,255,255,0.1)' : 'transparent', color: filter === 'all' ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
              >All ({processedHoldings.length})</button>
              <button 
                onClick={() => setFilter('gainers')}
                style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', fontWeight: 600, border: 'none', cursor: 'pointer', background: filter === 'gainers' ? 'rgba(52,199,89,0.15)' : 'transparent', color: filter === 'gainers' ? 'var(--accent-green)' : 'var(--text-tertiary)' }}
              >Gainers</button>
              <button 
                onClick={() => setFilter('losers')}
                style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', fontWeight: 600, border: 'none', cursor: 'pointer', background: filter === 'losers' ? 'rgba(255,59,48,0.15)' : 'transparent', color: filter === 'losers' ? 'var(--accent-red)' : 'var(--text-tertiary)' }}
              >Laggards</button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', paddingTop: 'var(--space-3)' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th>Avg Cost</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Return</th>
                  <th style={{ width: '150px' }}>Allocation</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredHoldings.map((h, i) => (
                  <motion.tr 
                    key={h.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <td><strong>{h.name}</strong><br/><span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{h.id}</span></td>
                    <td>{h.qty}</td>
                    <td>₹{h.avgCost.toLocaleString()}</td>
                    <td style={{ fontWeight: 700 }}>₹{h.ltp.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td style={{ fontWeight: 700, color: h.pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {h.pnl >= 0 ? '+' : ''}₹{Math.abs(h.pnl).toLocaleString()}
                    </td>
                    <td style={{ fontWeight: 700, color: h.ret >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {h.ret >= 0 ? '+' : ''}{h.ret.toFixed(1)}%
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{h.alloc}%</span>
                        <div className="progress-track" style={{ flex: 1, height: '6px' }}>
                          <motion.div 
                            className="progress-fill" 
                            initial={{ width: 0 }}
                            animate={{ width: `${h.alloc}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            style={{ background: h.allocColor }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`tag tag-${h.tag.toLowerCase().replace(' ', '-')}`}>{h.tag}</span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleRemove(h.id)} 
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '18px' }}
                        title="Remove Stock"
                      >
                        ×
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {!user && (
              <div style={{ textAlign: 'center', padding: 'var(--space-3)', color: 'var(--accent-orange)' }}>
                You are viewing sample data. <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setAuthOpen(true)}>Login</span> to see your own portfolio.
              </div>
            )}
            {user && filteredHoldings.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-5)', color: 'var(--text-tertiary)' }}>
                No holdings match this filter.
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>

    </motion.div>
  );
};

export default Portfolio;
