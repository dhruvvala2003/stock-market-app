import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';

const IPO = ({ setAuthOpen }) => {
  const { user } = useAuth();
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Supabase if logged in, else use dummy data
  useEffect(() => {
    const fetchIpos = async () => {
      setLoading(true);
      if (user && supabase) {
        const { data, error } = await supabase.from('ipos').select('*').order('allotment_date', { ascending: false });
        if (!error && data) {
          setIpos(data);
        }
      } else {
        // Dummy data for guest users
        setIpos([
          { id: '1', ipo_name: 'Tata Technologies', account_name: 'John Doe', allotment_date: '2023-11-30', selling_price: 1314.25, current_price: 1050.00, issue_price: 500 },
          { id: '2', ipo_name: 'IREDA', account_name: 'John Doe', allotment_date: '2023-11-29', selling_price: null, current_price: 168.50, issue_price: 32 },
          { id: '3', ipo_name: 'DOMS Industries', account_name: 'Jane Doe', allotment_date: '2023-12-20', selling_price: 1400.00, current_price: 1450.00, issue_price: 790 },
        ]);
      }
      setLoading(false);
    };
    fetchIpos();
  }, [user]);

  // Calculations
  const processedIpos = ipos.map(ipo => {
    const isSold = ipo.selling_price !== null && ipo.selling_price !== undefined;
    const activePrice = isSold ? ipo.selling_price : ipo.current_price;
    const issuePrice = ipo.issue_price || (activePrice * 0.5); // Fallback for dummy if missing
    
    // Assume 1 lot = around 15000 rs worth for simple calc if lot size not provided
    const estimatedLotSize = Math.floor(15000 / issuePrice); 
    
    const profitPerShare = activePrice - issuePrice;
    const totalProfit = profitPerShare * estimatedLotSize;
    const profitPercent = (profitPerShare / issuePrice) * 100;
    
    return { ...ipo, isSold, activePrice, issuePrice, totalProfit, profitPercent, estimatedLotSize };
  });

  const totalRealizedProfit = processedIpos.filter(i => i.isSold).reduce((sum, i) => sum + i.totalProfit, 0);
  const totalUnrealizedProfit = processedIpos.filter(i => !i.isSold).reduce((sum, i) => sum + i.totalProfit, 0);

  // Animations
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  return (
    <motion.div className="tab-pane active" id="tab-ipo" variants={container} initial="hidden" animate="show">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2>IPO Tracker</h2>
        {!user && (
          <button onClick={() => setAuthOpen(true)} className="btn btn-glow">Login to Add Your IPOs</button>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <motion.div variants={item}>
          <GlassCard className="panel">
            <div className="metric-label"><span>💰</span> Total Realized Profit</div>
            <div className={`metric-value ${totalRealizedProfit >= 0 ? 'text-green' : 'text-red'}`}>
              {totalRealizedProfit >= 0 ? '+' : ''}₹{totalRealizedProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
            <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>From sold allotments</div>
          </GlassCard>
        </motion.div>
        
        <motion.div variants={item}>
          <GlassCard className="panel">
            <div className="metric-label"><span>📈</span> Total Unrealized Profit</div>
            <div className={`metric-value ${totalUnrealizedProfit >= 0 ? 'text-green' : 'text-red'}`}>
              {totalUnrealizedProfit >= 0 ? '+' : ''}₹{totalUnrealizedProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
            <div className="metric-change" style={{ color: 'var(--text-secondary)' }}>Based on current market price</div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <GlassCard className="panel">
          <div className="panel-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(255,149,0,0.15)' }}>🚀</span>
              Your IPO Allotments
            </div>
            {user && <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', fontSize: '12px' }}>+ Add IPO</button>}
          </div>
          
          <div style={{ overflowX: 'auto', paddingTop: 'var(--space-3)' }}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading IPO data...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>IPO Name</th>
                    <th>Account Person</th>
                    <th>Allotment Date</th>
                    <th>Issue Price</th>
                    <th>Selling/Current Price</th>
                    <th>Status</th>
                    <th>Est. P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {processedIpos.map((ipo, i) => (
                    <motion.tr 
                      key={ipo.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                      <td><strong>{ipo.ipo_name}</strong></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{ipo.account_name}</td>
                      <td>{new Date(ipo.allotment_date).toLocaleDateString()}</td>
                      <td>₹{ipo.issuePrice.toFixed(2)}</td>
                      <td style={{ fontWeight: 600 }}>₹{ipo.activePrice?.toFixed(2)}</td>
                      <td>
                        {ipo.isSold ? (
                          <span className="tag tag-hold">Sold</span>
                        ) : (
                          <span className="tag tag-buy">Holding</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: ipo.totalProfit >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                          {ipo.totalProfit >= 0 ? '+' : ''}₹{ipo.totalProfit.toLocaleString(undefined, {minimumFractionDigits: 0})}
                        </div>
                        <div style={{ fontSize: '11px', color: ipo.profitPercent >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                          {ipo.profitPercent >= 0 ? '+' : ''}{ipo.profitPercent.toFixed(1)}%
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {processedIpos.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: 'var(--space-5)', color: 'var(--text-tertiary)' }}>
                        No IPO data found. Click "Login to Add Your IPOs" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default IPO;
