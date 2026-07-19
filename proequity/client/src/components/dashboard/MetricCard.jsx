import React from 'react';

const MetricCard = ({ title, value, change, isPositive, sparklineId, eduId, onEduClick }) => {
  return (
    <div className="metric-card glass-card">
      <div className="metric-label">
        <span></span> {title}
        <button className="edu-trigger" onClick={() => onEduClick(eduId)}>
          Learn
        </button>
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${isPositive ? 'text-green' : 'text-red'}`}>
        {change}
      </div>
      <div className="metric-mini-chart">
        <canvas id={sparklineId} width="200" height="40"></canvas>
      </div>
    </div>
  );
};

export default MetricCard;
