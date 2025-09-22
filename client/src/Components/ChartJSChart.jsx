
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import styles from './Styles/Chart.module.css';

// Registra le scale e i componenti necessari per Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const startingData = [
  { name: 'Gennaio', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Febbraio', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Aprile', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Maggio', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Giugno', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Luglio', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Agosto', uv: 3200, pv: 4100, amt: 2300 },
  { name: 'Settembre', uv: 3100, pv: 4200, amt: 2400 },
  { name: 'Ottobre', uv: 3300, pv: 4000, amt: 2200 },
  { name: 'Novembre', uv: 2900, pv: 3900, amt: 2100 },
  { name: 'Dicembre', uv: 3700, pv: 4500, amt: 2500 },
];

export const ChartJSChart = ({ precision }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const addData = (mainContainer, setMainContainer, refreshContainer) => {
      const nextIndex = mainContainer.length;
      if (refreshContainer[nextIndex] !== undefined) {
        setMainContainer(prev => [...prev, refreshContainer[prev.length]]);
      }
    };
    const refreshData = setInterval(() => {
      addData(data, setData, startingData);
    }, 250);
    return () => clearInterval(refreshData);
  }, [data]);

  const labels = data.map(d => d.name);
  const datasets = precision
    ? [
        {
          label: 'pv',
          data: data.map(d => d.pv),
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#1976d2',
          pointBorderWidth: 3,
        },
        {
          label: 'uv',
          data: data.map(d => d.uv),
          borderColor: '#43a047',
          backgroundColor: 'rgba(67, 160, 71, 0.2)',
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#43a047',
          pointBorderWidth: 3,
        },
        {
          label: 'amt',
          data: data.map(d => d.amt),
          borderColor: '#ffa000',
          backgroundColor: 'rgba(255, 160, 0, 0.2)',
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#ffa000',
          pointBorderWidth: 3,
        },
      ]
    : [
        {
          label: 'uv',
          data: data.map(d => d.uv),
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'pv',
          data: data.map(d => d.pv),
          borderColor: '#43a047',
          backgroundColor: 'rgba(67, 160, 71, 0.2)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'amt',
          data: data.map(d => d.amt),
          borderColor: '#ffa000',
          backgroundColor: 'rgba(255, 160, 0, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ];

  const options = {
    responsive: true,
    animation: { duration: 300 },
    plugins: {
      legend: {
        labels: {
          color: '#222',
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderRadius: 8,
        borderWidth: 0,
        titleFont: { size: 16 },
        bodyFont: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#222', font: { size: 14, weight: 'bold' } },
        grid: { color: '#e0e0e0', borderColor: '#b0b0b0', borderWidth: 2 },
      },
      y: {
        ticks: { color: '#222', font: { size: 14, weight: 'bold' } },
        grid: { color: '#e0e0e0', borderColor: '#b0b0b0', borderWidth: 2 },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={{ labels, datasets }} options={options} />
    </div>
  );
};
