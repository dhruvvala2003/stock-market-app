import React from 'react';

const TickerTape = () => {
  return (
    <div className="ticker-tape glass">
      <div className="ticker-item"><span className="ticker-name">NIFTY 50</span> <span className="ticker-value">24,502.15</span> <span className="ticker-change ticker-up">▲ +178.30 (+0.73%)</span></div>
      <div className="ticker-item"><span className="ticker-name">SENSEX</span> <span className="ticker-value">80,436.80</span> <span className="ticker-change ticker-up">▲ +542.10 (+0.68%)</span></div>
      <div className="ticker-item"><span className="ticker-name">NIFTY BANK</span> <span className="ticker-value">52,180.45</span> <span className="ticker-change ticker-up">▲ +312.50 (+0.60%)</span></div>
      <div className="ticker-item"><span className="ticker-name">NIFTY IT</span> <span className="ticker-value">38,920.30</span> <span className="ticker-change ticker-down">▼ -145.20 (-0.37%)</span></div>
      <div className="ticker-item"><span className="ticker-name">USD/INR</span> <span className="ticker-value">83.52</span> <span className="ticker-change ticker-down">▼ -0.08</span></div>
      <div className="ticker-item"><span className="ticker-name">GOLD</span> <span className="ticker-value">₹72,850</span> <span className="ticker-change ticker-up">▲ +420</span></div>
      <div className="ticker-item"><span className="ticker-name">CRUDE</span> <span className="ticker-value">$82.45</span> <span className="ticker-change ticker-up">▲ +1.20</span></div>
      <div className="ticker-item"><span className="ticker-name">BTC/USD</span> <span className="ticker-value">$67,420</span> <span className="ticker-change ticker-up">▲ +1,240</span></div>
    </div>
  );
};

export default TickerTape;
