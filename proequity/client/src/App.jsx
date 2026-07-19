import React, { useState } from 'react';
import Header from './components/layout/Header';
import TickerTape from './components/layout/TickerTape';
import NavBar from './components/layout/NavBar';
import Dashboard from './pages/Dashboard';
import StockAnalysis from './pages/StockAnalysis';
import Technicals from './pages/Technicals';
import Fundamentals from './pages/Fundamentals';
import Screener from './pages/Screener';
import NewsSentiment from './pages/NewsSentiment';
import Portfolio from './pages/Portfolio';
import LearningHub from './pages/LearningHub';
import AdvancedTools from './pages/AdvancedTools';
import IPO from './pages/IPO';
import AuthModal from './components/shared/AuthModal';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchInput, setSearchInput] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE.NS');
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'stock': return <StockAnalysis symbol={selectedSymbol} />;
      case 'technical': return <Technicals />;
      case 'fundamental': return <Fundamentals />;
      case 'screener': return <Screener />;
      case 'news': return <NewsSentiment />;

      case 'portfolio': return <Portfolio setAuthOpen={setAuthOpen} />;
      case 'ipo': return <IPO setAuthOpen={setAuthOpen} />;
      case 'learning': return <LearningHub />;
      case 'tools': return <AdvancedTools />;
      default: return <div className="tab-pane active glass-card" style={{padding: '20px'}}>Work in progress...</div>;
    }
  };

  return (
    <div className="app-container">
      <Header 
        searchInput={searchInput} 
        setSearchInput={setSearchInput} 
        marketStatus="NSE Open" 
        setSelectedSymbol={setSelectedSymbol}
        setActiveTab={setActiveTab}
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={logout}
      />
      <TickerTape />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {renderContent()}
      </main>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default App;
