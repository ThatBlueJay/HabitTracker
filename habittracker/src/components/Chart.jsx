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

// Define a functional component named Chart, which takes props as an argument
const Chart = (props) => {

  // Extract the 'data' prop from the passed props
  const data =  props.data;
  // Return the JSX for rendering the LineChart component
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
      <CartesianGrid strokeDasharray="3 3" /> {/* Display a grid with dashed lines */}
      <XAxis type="number" domain={[0,1]} dataKey="Time" />  {/* X-axis configuration */}
      <YAxis type="number" domain={[0,1]} dataKey="Consistency"/>  {/* Y-axis configuration */}
      <Tooltip /> {/* Display tooltips when hovering over data points */}
      <Legend /> {/* Display a legend to label data lines */}
      // Use monotone interpolation for the line
      // Define the data key to use for the Y values
      <Line
        type="monotone"
        dataKey="Consistency"
        stroke="#8884d8"
      />
    </LineChart>
  );
};

export default Chart;