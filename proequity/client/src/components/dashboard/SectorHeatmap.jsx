import React from 'react';

const SectorHeatmap = () => {
  const sectors = [
    { name: 'Banking', change: '+1.2%', color: 'var(--accent-green)', positive: true },
    { name: 'IT', change: '-0.8%', color: 'var(--accent-red)', positive: false },
    { name: 'Energy', change: '+2.1%', color: 'var(--glow-green)', positive: true },
    { name: 'FMCG', change: '-0.3%', color: 'var(--accent-orange)', positive: false },
    { name: 'Auto', change: '+1.5%', color: 'var(--accent-green)', positive: true },
    { name: 'Pharma', change: '+0.4%', color: 'var(--accent-teal)', positive: true },
    { name: 'Metals', change: '+3.2%', color: 'var(--glow-green)', positive: true },
    { name: 'Realty', change: '-1.1%', color: 'var(--accent-red)', positive: false },
    { name: 'Media', change: '-0.5%', color: 'var(--accent-orange)', positive: false },
    { name: 'Infra', change: '+0.9%', color: 'var(--accent-cyan)', positive: true },
    { name: 'Telecom', change: '+1.1%', color: 'var(--accent-green)', positive: true },
    { name: 'PSU', change: '+2.4%', color: 'var(--glow-green)', positive: true },
  ];

  return (
    <>
      {sectors.map((sector, idx) => (
        <div key={idx} className="heat-tile" style={{
          backgroundColor: sector.positive ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 59, 48, 0.15)',
          borderLeft: `3px solid ${sector.positive ? 'var(--accent-green)' : 'var(--accent-red)'}`
        }}>
          <span className="heat-sector">{sector.name}</span>
          <span className={`heat-value ${sector.positive ? 'positive' : 'negative'}`}>{sector.change}</span>
        </div>
      ))}
    </>
  );
};

export default SectorHeatmap;
