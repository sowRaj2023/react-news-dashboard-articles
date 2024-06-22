// src/components/DateRangeSelector.js
import React from 'react';

const DateRangeSelector = ({ setFromDate, setToDate, fetchData }) => {
  const handleLastWeek = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    setFromDate(fromDate.toISOString().split('T')[0]);
    setToDate(toDate.toISOString().split('T')[0]);

    fetchData(fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]);
  };

  const handleLastMonth = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(toDate.getMonth() - 1);

    setFromDate(fromDate.toISOString().split('T')[0]);
    setToDate(toDate.toISOString().split('T')[0]);

    fetchData(fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]);
  };

  return (
    <div className="date-range-selector">
      <button onClick={handleLastWeek}>Last Week</button>
      <button onClick={handleLastMonth}>Last Month</button>
    </div>
  );
};

export default DateRangeSelector;

