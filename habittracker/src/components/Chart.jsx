import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Chart = (props) => {

  const data =  props.data;

  return (
    <LineChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0,1]} dataKey="Time" />
      <YAxis type="number" domain={[0,1]} dataKey="Consistency"/>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Consistency"
        stroke="#8884d8"
      />
    </LineChart>
  );
};

export default Chart;