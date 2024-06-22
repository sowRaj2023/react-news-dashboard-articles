// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className='pie-chart-container'>
      <h1 className='pie-chart-title'>Pie Chart: Number of Articles by Source</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;


