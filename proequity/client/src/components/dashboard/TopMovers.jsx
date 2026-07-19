import React, { useState, useEffect } from 'react';
import GlassCard from '../shared/GlassCard';
import { fetchStockQuote } from '../../services/api';

const tickerMap = {
  Largecap: {
    gainers: [{ name: 'Tata Motors', ticker: 'TATAMOTORS' }, { name: 'Adani Ports', ticker: 'ADANIPORTS' }, { name: 'DLF Ltd', ticker: 'DLF' }],
    losers: [{ name: 'Infosys', ticker: 'INFY' }, { name: 'HDFC Bank', ticker: 'HDFCBANK' }, { name: 'TCS', ticker: 'TCS' }]
  },
  Midcap: {
    gainers: [{ name: 'Trent Ltd', ticker: 'TRENT' }, { name: 'TVS Motor', ticker: 'TVSMOTOR' }, { name: 'Cummins India', ticker: 'CUMMINSIND' }],
    losers: [{ name: 'Ashok Leyland', ticker: 'ASHOKLEY' }, { name: 'Voltas', ticker: 'VOLTAS' }, { name: 'Aurobindo', ticker: 'AUROPHARMA' }]
  },
  Smallcap: {
    gainers: [{ name: 'Suzlon Energy', ticker: 'SUZLON' }, { name: 'IRFC', ticker: 'IRFC' }, { name: 'RVNL', ticker: 'RVNL' }],
    losers: [{ name: 'Vodafone Idea', ticker: 'IDEA' }, { name: 'Yes Bank', ticker: 'YESBANK' }, { name: 'JP Power', ticker: 'JPPOWER' }]
  }
};

const TopMovers = () => {
  const [gainerCap, setGainerCap] = useState('Largecap');
  const [loserCap, setLoserCap] = useState('Largecap');
  
  const [gainersData, setGainersData] = useState([]);
  const [losersData, setLosersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovers = async () => {
      setLoading(true);
      try {
        const gainersToFetch = tickerMap[gainerCap].gainers;
        const losersToFetch = tickerMap[loserCap].losers;

        const formatQuote = (q, fallback) => {
          if (!q || !q.price) return { ...fallback, price: '—', changeAbs: '—', change: '—', volume: '—', rsi: '—' };
          const changeSign = q.change >= 0 ? '+' : '';
          return {
            ...fallback,
            price: `₹${q.price.toFixed(2)}`,
            changeAbs: `${changeSign}${q.change.toFixed(2)}`,
            change: `${changeSign}${(q.changePercent * 100).toFixed(2)}%`,
            volume: q.volume ? `${(q.volume / 1000000).toFixed(1)}M` : '—',
            rsi: (45 + Math.random() * 30).toFixed(1), // Simulated RSI
            isPositive: q.change >= 0
          };
        };

        const gainersResults = await Promise.all(gainersToFetch.map(g => fetchStockQuote(g.ticker).catch(() => null)));
        const losersResults = await Promise.all(losersToFetch.map(l => fetchStockQuote(l.ticker).catch(() => null)));

        setGainersData(gainersResults.map((res, idx) => formatQuote(res, gainersToFetch[idx])));
        setLosersData(losersResults.map((res, idx) => formatQuote(res, losersToFetch[idx])));
      } catch (err) {
        console.error('Failed to load top movers:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovers();
  }, [gainerCap, loserCap]);

  return (
    <div className="grid-2">
      <GlassCard className="panel">
        <div className="panel-header" style={{ flexWrap: 'nowrap' }}>
          <div className="panel-title" style={{ whiteSpace: 'nowrap' }}>
            <span className="icon" style={{ background: 'rgba(52,199,89,0.15)' }}>🟢</span>
            Top Gainers
          </div>
          <div className="timeframe-bar" style={{ marginLeft: 'auto' }}>
            {['Largecap', 'Midcap', 'Smallcap'].map(cap => (
              <button 
                key={cap}
                className={`timeframe-btn ${gainerCap === cap ? 'active' : ''}`}
                onClick={() => setGainerCap(cap)}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>
        <div id="topGainersList" className="grid-1">
          <div className="stock-row stock-row-header">
            <div>Stock</div><div>LTP</div><div>Change</div><div>%</div><div>Volume</div><div>RSI</div><div></div>
          </div>
          {loading ? <div style={{padding:'20px', textAlign:'center', color:'var(--text-secondary)'}}>Loading live data...</div> : gainersData.map((g, idx) => (
            <div key={idx} className="stock-row">
              <div><div className="stock-name">{g.name}</div><div className="stock-ticker">{g.ticker}</div></div>
              <div style={{fontWeight:600}}>{g.price}</div>
              <div className={g.isPositive ? "text-green" : "text-red"} style={{fontWeight:600}}>{g.isPositive ? '▲' : '▼'} {g.changeAbs}</div>
              <div className={g.isPositive ? "text-green" : "text-red"} style={{fontWeight:700}}>{g.change}</div>
              <div style={{color:'var(--text-secondary)'}}>{g.volume}</div>
              <div style={{color:'var(--accent-orange)', fontWeight:700}}>{g.rsi}</div>
              <button className="edu-trigger">?</button>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="panel">
        <div className="panel-header" style={{ flexWrap: 'nowrap' }}>
          <div className="panel-title" style={{ whiteSpace: 'nowrap' }}>
            <span className="icon" style={{ background: 'rgba(255,59,48,0.15)' }}>🔴</span>
            Top Losers
          </div>
          <div className="timeframe-bar" style={{ marginLeft: 'auto' }}>
            {['Largecap', 'Midcap', 'Smallcap'].map(cap => (
              <button 
                key={cap}
                className={`timeframe-btn ${loserCap === cap ? 'active' : ''}`}
                onClick={() => setLoserCap(cap)}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>
        <div id="topLosersList" className="grid-1">
          <div className="stock-row stock-row-header">
            <div>Stock</div><div>LTP</div><div>Change</div><div>%</div><div>Volume</div><div>RSI</div><div></div>
          </div>
          {loading ? <div style={{padding:'20px', textAlign:'center', color:'var(--text-secondary)'}}>Loading live data...</div> : losersData.map((l, idx) => (
            <div key={idx} className="stock-row">
              <div><div className="stock-name">{l.name}</div><div className="stock-ticker">{l.ticker}</div></div>
              <div style={{fontWeight:600}}>{l.price}</div>
              <div className={l.isPositive ? "text-green" : "text-red"} style={{fontWeight:600}}>{l.isPositive ? '▲' : '▼'} {l.changeAbs}</div>
              <div className={l.isPositive ? "text-green" : "text-red"} style={{fontWeight:700}}>{l.change}</div>
              <div style={{color:'var(--text-secondary)'}}>{l.volume}</div>
              <div style={{color:'var(--accent-red)', fontWeight:700}}>{l.rsi}</div>
              <button className="edu-trigger">?</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default TopMovers;
