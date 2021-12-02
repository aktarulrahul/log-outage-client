import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function Chart({ isLoading, graphData }) {
  const chartData = [];

  for (let onlyHourAndMin of graphData) {
    const newTime =
      (parseInt(onlyHourAndMin.totalTime.slice(0, 2)) * 60 +
        parseInt(onlyHourAndMin.totalTime.slice(3, 5))) /
      60;
    // console.log(newTime);
    chartData.push({
      'Application Name': onlyHourAndMin.applicationName,
      'Total Hour': newTime,
    });
  }
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="mx-auto">
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Application Name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total Hour" fill="#4472C4" />
      </BarChart>
    </div>
  );
}
