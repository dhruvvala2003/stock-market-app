import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const options = { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { labels: { color: 'rgba(255,255,255,.7)' } } }, scales: { x: { ticks: { color: 'rgba(255,255,255,.5)' }, grid: { color: 'rgba(255,255,255,.05)' } }, y: { ticks: { color: 'rgba(255,255,255,.5)' }, grid: { color: 'rgba(255,255,255,.05)' } } } };

export default function MainChart({ candles, label = 'Price' }) {
  if (!candles?.length) return <div style={{ height: 300, display: 'grid', placeItems: 'center', color: 'var(--text-secondary)' }}>Historical data unavailable — no chart is drawn.</div>;
  const data = { labels: candles.map(c => c.date), datasets: [{ label, data: candles.map(c => c.close), borderColor: '#5ac8fa', backgroundColor: 'rgba(90,200,250,.1)', fill: true, tension: .25, pointRadius: 0 }] };
  return <div style={{ height: 300, width: '100%' }}><Line data={data} options={options} /></div>;
}
