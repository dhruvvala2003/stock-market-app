import React from 'react';
import GlassCard from '../shared/GlassCard';

const PeerComparison = () => {
  const peers = [
    { name: 'Reliance', ticker: 'RELIANCE', price: '₹2,958', mcap: '₹20.45L Cr', pe: '24.8x', pb: '2.4x', roe: '23.9%', roce: '18.2%', de: '0.42x', yield: '0.42%', rating: 'Buy', highlight: true },
    { name: 'TCS', ticker: 'TCS', price: '₹4,215', mcap: '₹15.25L Cr', pe: '32.4x', pb: '14.8x', roe: '45.6%', roce: '52.1%', de: '0.05x', yield: '1.25%', rating: 'Hold', highlight: false },
    { name: 'HDFC Bank', ticker: 'HDFCBANK', price: '₹1,624', mcap: '₹12.42L Cr', pe: '16.5x', pb: '2.8x', roe: '15.8%', roce: '12.4%', de: '6.8x', yield: '0.95%', rating: 'Buy', highlight: false },
    { name: 'Bharti Airtel', ticker: 'BHARTIARTL', price: '₹1,342', mcap: '₹8.14L Cr', pe: '54.2x', pb: '6.5x', roe: '12.1%', roce: '14.2%', de: '1.15x', yield: '0.24%', rating: 'Hold', highlight: false },
    { name: 'ICICI Bank', ticker: 'ICICIBANK', price: '₹1,185', mcap: '₹8.32L Cr', pe: '18.2x', pb: '3.1x', roe: '17.2%', roce: '14.5%', de: '5.9x', yield: '0.85%', rating: 'Buy', highlight: false },
  ];

  return (
    <div className="panel glass-card" style={{ marginBottom: 'var(--space-5)' }}>
      <div className="panel-header">
        <div className="panel-title">
          <span className="icon" style={{ background: 'rgba(0,199,190,0.15)' }}>⚖️</span>
          Peer Comparison
        </div>
        <span className="panel-meta">Large Cap Conglomerates</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table peer-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>PE</th>
              <th>PB</th>
              <th>ROE</th>
              <th>ROCE</th>
              <th>Debt/Eq</th>
              <th>Div Yield</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {peers.map((p, idx) => (
              <tr key={idx} className={p.highlight ? 'peer-highlight' : ''}>
                <td>
                  <strong>{p.name}</strong><br />
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{p.ticker}</span>
                </td>
                <td style={{ fontWeight: 700 }}>{p.price}</td>
                <td>{p.mcap}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{p.pe}</td>
                <td>{p.pb}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{p.roe}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{p.roce}</td>
                <td>{p.de}</td>
                <td>{p.yield}</td>
                <td><span className={`tag tag-${p.rating.toLowerCase() === 'buy' ? 'buy' : 'info'}`}>{p.rating}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeerComparison;
