import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from "react-router-dom";
import styles from "./Coindata.module.css";

const Graph = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [timePeriod, setTimePeriod] = useState('1y');
  const fetchData = async () => {
    try {
      const response = await fetch(`https://openapiv1.coinstats.app/coins/${id}/charts?period=${timePeriod}`, {
        headers: {
          'X-API-KEY': '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s=' // Corrected API key
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const chartData = data?.map(arr => {
        const date = new Date(arr[0] * 1000);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  
        return {
          timestamp: monthYear,
          price: arr[1]
        };
      });
  
      if (chartData) {
        const uniqueMonths = [...new Set(chartData.map(item => item.timestamp))];
  
        const twelveMonthsData = uniqueMonths.length === 12 ? chartData : uniqueMonths.map(month => {
          const existingData = chartData.find(item => item.timestamp === month);
          return existingData || { timestamp: month, price: null };
        });
  
        const maxPrice = Math.max(...twelveMonthsData.filter(item => item.price !== null).map(item => item.price));
        setMaxPrice(maxPrice);
  
        setChartData(twelveMonthsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, timePeriod]);

  const changeTimePeriod = (newPeriod) => {
    setTimePeriod(newPeriod);
  };

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: '#222' }}
          />
          <YAxis
            domain={[0, maxPrice / 2]}
            tick={{ fontSize: 12, fill: '#222' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="black"
            strokeWidth={2}
            dot={{ fill: '#007bff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.buttonContainer}>
        <button onClick={() => changeTimePeriod('1y')}>1 Year</button>
        <button onClick={() => changeTimePeriod('6m')}>6 Months</button>
        <button onClick={() => changeTimePeriod('3m')}>3 Months</button>
      </div>
    </div>
  );
};

export default Graph;
