import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../services/supabase';

const AddStockModal = ({ isOpen, onClose, user, onAddSuccess, editData }) => {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [avgCost, setAvgCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setSymbol(editData.id || '');
      setName(editData.name || '');
      setQty(editData.qty || '');
      setAvgCost(editData.avgCost || '');
    } else {
      setSymbol('');
      setName('');
      setQty('');
      setAvgCost('');
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a stock.");
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      // Ensure symbol has .NS suffix if it's an Indian stock and user forgot it
      // Simple heuristic: if it doesn't contain a dot, assume it's NSE and append .NS
      let finalSymbol = symbol.toUpperCase();
      if (!finalSymbol.includes('.')) {
        finalSymbol += '.NS';
      }

      const payload = {
        user_id: user.id,
        symbol: finalSymbol,
        name: name || finalSymbol.split('.')[0],
        quantity: Number(qty),
        average_cost: Number(avgCost)
      };

      let response;
      if (editData) {
        response = await supabase
          .from('portfolio_holdings')
          .update(payload)
          .eq('symbol', editData.id)
          .eq('user_id', user.id)
          .select();
      } else {
        response = await supabase
          .from('portfolio_holdings')
          .insert([payload])
          .select();
      }

      if (response.error) throw response.error;

      onAddSuccess(response.data[0], !!editData); // Pass the record and isEdit flag
      
      // Reset form
      setSymbol('');
      setName('');
      setQty('');
      setAvgCost('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '32px',
            width: '100%', maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(0,199,190,0.2)', padding: '6px', borderRadius: '8px', fontSize: '18px' }}>
                {editData ? '✎' : '+'}
              </span>
              {editData ? 'Edit Stock' : 'Add Stock'}
            </h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && <div style={{ color: 'var(--accent-red)', fontSize: '13px', background: 'rgba(255,59,48,0.1)', padding: '8px 12px', borderRadius: '8px' }}>{error}</div>}
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Stock Symbol (e.g. RELIANCE)</label>
              <input 
                type="text" required value={symbol} onChange={e => setSymbol(e.target.value)}
                placeholder="TCS.NS"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Company Name (Optional)</label>
              <input 
                type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Tata Consultancy Services"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Quantity</label>
                <input 
                  type="number" required min="1" step="any" value={qty} onChange={e => setQty(e.target.value)}
                  placeholder="50"
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>Avg Cost (₹)</label>
                <input 
                  type="number" required min="0.01" step="any" value={avgCost} onChange={e => setAvgCost(e.target.value)}
                  placeholder="3500.50"
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }}
                />
              </div>
            </div>
            
            <button type="submit" disabled={isLoading} className="btn btn-glow" style={{ marginTop: '8px', width: '100%', padding: '14px', fontSize: '16px', background: 'var(--accent-cyan)', color: '#000', fontWeight: 700 }}>
              {isLoading ? 'Saving...' : (editData ? 'Save Changes' : 'Add to Portfolio')}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddStockModal;
