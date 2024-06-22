import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DataFilter from './components/DataFilter';
import DateRangeSelector from './components/DateRangeSelector';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    if (fromDate && toDate) {
      fetchData(fromDate, toDate);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    applyFilter();
  }, [filter, data]);
  

  const fetchData = async (fromDate, toDate) => {
    const API_KEY = '72771d6f62664021957c4142f7d61d1a';
    let url = `https://newsapi.org/v2/everything?q=news&apiKey=${API_KEY}`;

    if (fromDate && toDate) {
      url += `&from=${fromDate}&to=${toDate}`;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      const articles = result.articles.map(article => ({
        date: article.publishedAt,
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url
      }));
      setData(articles);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const applyFilter = useCallback(() => {
    let filteredArticles = [];
    const now = new Date();

    if (filter === 'all') {
      filteredArticles = data;
    } else if (filter === 'last_week') {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filteredArticles = data.filter(article => new Date(article.date) >= oneWeekAgo && new Date(article.date) <= now);
    } else if (filter === 'last_month') {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filteredArticles = data.filter(article => new Date(article.date) >= oneMonthAgo && new Date(article.date) <= now);
    }

    setFilteredData(filteredArticles);
  }, [filter, data]);

  return (
    <div className="App">
      <Header />
      <div className="dashboard-container">
        <DateRangeSelector setFromDate={setFromDate} setToDate={setToDate} fetchData={fetchData} />
        <DataFilter filter={filter} setFilter={setFilter} />
        {filteredData.length > 0 ? (
          <>
            <LineChart data={filteredData} />
            <PieChart data={filteredData.reduce((acc, curr) => {
              acc[curr.source] = (acc[curr.source] || 0) + 1;
              return acc;
            }, {})} />
          </>
        ) : (
          <p>No articles available for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default App;


