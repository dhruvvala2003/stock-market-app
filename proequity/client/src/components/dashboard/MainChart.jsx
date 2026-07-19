import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MainChart = ({ data, options }) => {
  const defaultData = {
    labels: Array.from({length: 30}, (_, i) => `Day ${i+1}`),
    datasets: [
      {
        label: 'NIFTY 50',
        data: Array.from({length: 30}, () => Math.floor(Math.random() * (25000 - 24000) + 24000)),
        borderColor: '#5ac8fa',
        backgroundColor: 'rgba(90, 200, 250, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: 'SMA 20',
        data: Array.from({length: 30}, () => Math.floor(Math.random() * (24800 - 24200) + 24200)),
        borderColor: '#ff9500',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      tooltip: {
        backgroundColor: 'rgba(28, 28, 40, 0.9)',
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data || defaultData} options={options || defaultOptions} />
    </div>
  );
};

export default MainChart;
