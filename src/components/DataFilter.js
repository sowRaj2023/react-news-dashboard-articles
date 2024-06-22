// src/components/DataFilter.js
import React from 'react';
import './DataFilter.css';

const DataFilter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filter-container">
      <select value={filter} onChange={handleChange} className="filter-select">
        <option value="all">All Time</option>
        <option value="last_week">Last Week</option>
        <option value="last_month">Last Month</option>
      </select>
    </div>
  );
};

export default DataFilter;
