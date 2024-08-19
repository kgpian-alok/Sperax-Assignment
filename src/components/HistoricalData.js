// src/components/HistoricalData.js

import React, { useState } from "react";
import Chart from "chart.js/auto";

const HistoricalData = ({ tokenAddress }) => {
  const [historicalData, setHistoricalData] = useState([]);

  const fetchHistoricalData = async () => {
    // Simulated dummy data for local testing
    const data = [
      { date: "2024-01-01", balance: 100 },
      { date: "2024-02-01", balance: 150 },
      // More data points...
    ];
    setHistoricalData(data);

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: "Balance",
            data: data.map((d) => d.balance),
          },
        ],
      },
    });
  };

  return (
    <div>
      <button onClick={fetchHistoricalData}>Fetch Historical Data</button>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default HistoricalData;
