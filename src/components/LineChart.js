// src/components/LineChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './LineChart.css';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Articles',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (data.length > 0) {
      const dateCounts = calculateDateCounts(data);

      setChartData({
        labels: Object.keys(dateCounts),
        datasets: [{
          label: 'Number of Articles',
          data: Object.values(dateCounts),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }],
      });
    }
  }, [data]);

  const calculateDateCounts = (articles) => {
    const dateCounts = {};

    articles.forEach(article => {
      const date = new Date(article.date).toLocaleDateString();
      if (dateCounts[date]) {
        dateCounts[date]++;
      } else {
        dateCounts[date] = 1;
      }
    });

    return dateCounts;
  };

  return (
    <div className="line-chart-container">
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;



