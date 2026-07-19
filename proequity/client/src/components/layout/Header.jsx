import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';

const Header = ({ searchInput, setSearchInput, marketStatus, setSelectedSymbol, setActiveTab, user, onLoginClick, onLogout }) => {
  const { results, loading } = useSearch(searchInput);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol) => {
    setSelectedSymbol(symbol);
    setActiveTab('stock');
    setShowDropdown(false);
    setSearchInput(''); // clear the search input
  };

  return (
    <header className="app-header glass-strong">
      <div className="brand">
        <div className="brand-icon">📊</div>
        <div className="brand-text">
          <h1>ProEquity</h1>
          <p>Advanced Research & Learning Terminal</p>
        </div>
      </div>
      
      <div className="header-right" ref={searchRef} style={{ position: 'relative', width: '400px', maxWidth: '50vw' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '8px 16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease',
        }}
        onFocus={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(100, 210, 255, 0.2)'; }}
        onBlur={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'; }}
        >
          <span className="search-icon" style={{ opacity: 0.7, marginRight: '10px' }}>🔍</span>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Search stocks (e.g., Adani)..." 
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              width: '100%',
              fontSize: '15px',
              fontWeight: 500
            }}
          />
          {loading && <div style={{width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', animation: 'spin 1s linear infinite', marginRight: '8px'}} />}
          {!loading && <div className="search-shortcut" style={{background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.6)'}}>/</div>}
        </div>

        {showDropdown && searchInput.length >= 2 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: 0,
            right: 0,
            background: 'rgba(15, 20, 30, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {results.length > 0 ? (
              <div style={{ padding: '8px 0' }}>
                <div style={{ padding: '8px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Suggestions</div>
                {results.map(res => (
                  <div 
                    key={res.symbol}
                    onClick={() => handleSelect(res.symbol)}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{res.name}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{res.symbol} • {res.exchange}</div>
                    </div>
                    <span style={{ fontSize: '12px', background: 'rgba(100, 210, 255, 0.1)', color: 'var(--accent-cyan)', padding: '4px 8px', borderRadius: '4px' }}>
                      {res.typeDisp || 'EQUITY'}
                    </span>
                  </div>
                ))}
              </div>
            ) : !loading ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                No results found for "{searchInput}"
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      <div className="market-status" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span id="marketStatusText">{marketStatus}</span>
        </div>
        <div className="time-display" id="currentTime">
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{user.email}</span>
            <button onClick={onLogout} style={{ background: 'rgba(255,59,48,0.1)', color: 'var(--accent-red)', border: '1px solid rgba(255,59,48,0.2)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Logout</button>
          </div>
        ) : (
          <button onClick={onLoginClick} style={{ background: 'var(--accent-cyan)', color: '#000', border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, boxShadow: '0 0 10px rgba(100,210,255,0.3)' }}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
