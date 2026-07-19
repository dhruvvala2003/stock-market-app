import React from 'react';

const NavBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: '📈', label: 'Dashboard' },
    { id: 'stock', icon: '🏢', label: 'Stock Analysis' },
    { id: 'technical', icon: '📉', label: 'Technicals' },
    { id: 'fundamental', icon: '📊', label: 'Fundamentals' },
    { id: 'screener', icon: '🔍', label: 'Screener' },
    { id: 'news', icon: '📰', label: 'News & Sentiment' },
    { id: 'portfolio', icon: '💼', label: 'Portfolio' },
    { id: 'ipo', icon: '🚀', label: 'IPO Tracker' },
    { id: 'learning', icon: '🎓', label: 'Learning Hub' },
    { id: 'tools', icon: '🛠️', label: 'Advanced Tools' }
  ];

  return (
    <nav className="nav-bar glass">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
