import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Bar.css"

const data = [
  { name: 'Aug', uv: 4000 },
  { name: 'Sep', uv: 1200 },
  { name: 'Oct', uv: 2400 },
  { name: 'Nov', uv: 3200 },
  { name: 'Dec', uv: 1600 },
  { name: 'Jan', uv: 800 }
];



const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="60%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip />
        <Legend />
        <Bar dataKey= "uv" fill="#FF8C38"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
