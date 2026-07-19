import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AllocationChart = () => {
  const data = {
    labels: ['Banking', 'IT', 'Energy', 'FMCG', 'Auto', 'Cash'],
    datasets: [
      {
        data: [28, 22, 18, 15, 10, 7],
        backgroundColor: [
          '#0a84ff',
          '#34c759',
          '#ff9500',
          '#af52de',
          '#ff2d55',
          '#64748b',
        ],
        borderColor: 'rgba(20,20,30,0.8)',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false, // We'll build custom HTML legend
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 45, 0.95)',
        titleColor: '#fff',
        bodyColor: '#a0a0b0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return ` ${context.label}: ${context.parsed}%`;
          }
        }
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div style={{ position: 'relative', height: '280px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Doughnut data={data} options={options} />
      {/* Center text for Doughnut */}
      <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL VALUE</div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>₹24.85L</div>
      </div>
    </div>
  );
};

export const PerformanceChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Create a beautiful gradient for the Portfolio line
    const ctx = chart.canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(52,199,89,0.3)');
    gradient.addColorStop(1, 'rgba(52,199,89,0.0)');

    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Your Portfolio',
          data: [0, 2.5, 4.8, 4.2, 9.5, 14.2, 18.5],
          borderColor: '#34c759',
          backgroundColor: gradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1e1e2d',
          pointBorderColor: '#34c759',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'NIFTY 50',
          data: [0, 1.2, 3.5, 2.1, 5.8, 8.4, 12.3],
          borderColor: 'rgba(100,210,255,0.6)',
          borderWidth: 2,
          tension: 0.4,
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
        display: false, // We use custom HTML legend in the parent
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
            return ` ${context.dataset.label}: +${context.parsed.y}%`;
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
          callback: function(value) { return '+' + value + '%'; }
        }
      }
    }
  };

  return (
    <div style={{ height: '280px', width: '100%' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};
