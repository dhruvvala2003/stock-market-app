import React, { useRef, useEffect, useState } from 'react';
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

export const BacktestChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.canvas.getContext('2d');
    
    // Gradient for the strategy equity curve
    const strategyGradient = ctx.createLinearGradient(0, 0, 0, 300);
    strategyGradient.addColorStop(0, 'rgba(100,210,255,0.4)');
    strategyGradient.addColorStop(1, 'rgba(100,210,255,0.0)');

    setChartData({
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Strategy Equity',
          data: [1000000, 1150000, 1650000, 1500000, 1950000, 2425000],
          borderColor: '#64d2ff',
          backgroundColor: strategyGradient,
          borderWidth: 3,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: '#1e1e2d',
          pointBorderColor: '#64d2ff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Benchmark (Buy & Hold)',
          data: [1000000, 1050000, 1350000, 1400000, 1600000, 1850000],
          borderColor: 'rgba(255,255,255,0.3)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255,255,255,0.6)',
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 11, family: "'Inter', sans-serif" }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 45, 0.95)',
        titleColor: '#fff',
        bodyColor: '#a0a0b0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: {
          color: 'rgba(255,255,255,0.4)',
          font: { size: 11 },
          callback: function(value) { 
            return '₹' + (value / 100000).toFixed(0) + 'L'; 
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};
