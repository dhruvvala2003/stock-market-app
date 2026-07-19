import React, { useEffect, useState } from 'react';
import MetricCard from '../components/dashboard/MetricCard';
import GlassCard from '../components/shared/GlassCard';
import MainChart from '../components/dashboard/MainChart';
import TopMovers from '../components/dashboard/TopMovers';
import SectorHeatmap from '../components/dashboard/SectorHeatmap';
import { fetchStockQuote, fetchMarketIndices } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    nifty: '—', niftyChange: 'Loading...',
    vix: '—', vixChange: 'Loading...',
    mcap: '—', mcapChange: 'Loading...',
    fii: '—', fiiChange: 'Loading...',
    niftyPositive: true, vixPositive: false, mcapPositive: true, fiiPositive: true,
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const indices = await fetchMarketIndices().catch(() => null);
        const vixQuote = await fetchStockQuote('^INDIAVIX').catch(() => null);

        let nifty = { close: 24502.15, change: 178.30, changePercent: 0.73 };
        let banknifty = { close: 52000.00, change: 100.00, changePercent: 0.20 };
        
        if (indices && indices.length > 0) {
          const n = indices.find(i => i.symbol === '^NSEI');
          const bn = indices.find(i => i.symbol === '^NSEBANK');
          if (n) nifty = n;
          if (bn) banknifty = bn;
        }

        setMetrics(prev => ({
          ...prev,
          nifty: nifty.close.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          niftyChange: `${nifty.change >= 0 ? '+' : ''}${nifty.change.toFixed(2)} (${nifty.changePercent >= 0 ? '+' : ''}${(nifty.changePercent * 100).toFixed(2)}%)`,
          niftyPositive: nifty.change >= 0,
          vix: vixQuote?.price ? vixQuote.price.toFixed(2) : '14.82',
          vixChange: vixQuote?.change
            ? `${vixQuote.change >= 0 ? '+' : ''}${vixQuote.change.toFixed(2)} (${vixQuote.changePercent >= 0 ? '+' : ''}${(vixQuote.changePercent * 100).toFixed(2)}%)`
            : '-0.24 (-1.5%)',
          vixPositive: vixQuote?.change >= 0 ?? false,
          mcap: banknifty.close.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          mcapChange: `${banknifty.change >= 0 ? '+' : ''}${banknifty.change.toFixed(2)} (${banknifty.changePercent >= 0 ? '+' : ''}${(banknifty.changePercent * 100).toFixed(2)}%)`,
          mcapPositive: banknifty.change >= 0,
          fii: '+₹2,840',
          fiiChange: 'Net Buy (Cr)',
          fiiPositive: true,
        }));
      } catch (err) {
        console.warn('Failed to load dashboard metrics:', err);
      }
    };
    loadMetrics();
    // Auto-refresh every 2 minutes
    const interval = setInterval(loadMetrics, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tab-pane active" id="tab-dashboard">
      <div className="grid-4" style={{ marginBottom: 'var(--space-5)' }}>
        <MetricCard 
          title="NIFTY 50" value={metrics.nifty} change={metrics.niftyChange} 
          isPositive={metrics.niftyPositive} sparklineId="niftySpark" 
          eduId="edu-nifty" onEduClick={() => {}} 
        />
        <MetricCard 
          title="INDIA VIX" value={metrics.vix} change={metrics.vixChange} 
          isPositive={metrics.vixPositive} sparklineId="vixSpark" 
          eduId="edu-vix" onEduClick={() => {}} 
        />
        <MetricCard 
          title="MARKET CAP" value={metrics.mcap} change={metrics.mcapChange} 
          isPositive={metrics.mcapPositive} sparklineId="mcapSpark" 
          eduId="edu-mcap" onEduClick={() => {}} 
        />
        <MetricCard 
          title="FII FLOW" value={metrics.fii} change={metrics.fiiChange} 
          isPositive={metrics.fiiPositive} sparklineId="fiiSpark" 
          eduId="edu-fii" onEduClick={() => {}} 
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <GlassCard className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>📈</span>
              Market Overview (NIFTY 50)
            </div>
            <div className="timeframe-bar">
              <button className="timeframe-btn active">1D</button>
              <button className="timeframe-btn">1W</button>
              <button className="timeframe-btn">1M</button>
              <button className="timeframe-btn">1Y</button>
            </div>
          </div>
          <div className="chart-container large">
             <MainChart />
          </div>
        </GlassCard>

        <GlassCard className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(255,149,0,0.15)' }}>🗺️</span>
              Sector Heatmap
            </div>
          </div>
          <div className="heatmap-grid" id="sectorHeatmap">
             <SectorHeatmap />
          </div>
        </GlassCard>
      </div>

      <TopMovers />
    </div>
  );
};

export default Dashboard;
