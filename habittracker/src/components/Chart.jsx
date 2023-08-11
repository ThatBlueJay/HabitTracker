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
      // Set the width and height of the chart
      width={700}
      height={400}
      // Provide the data to be displayed in the chart
      data={data}
      // Define the margins around the chart
      margin={{
        top: 5,        // Margin from the top
        right: 30,     // Margin from the right
        left: 20,      // Margin from the left
        bottom: 5      // Margin from the bottom
      }}
    >
      {/* Display a grid with dashed lines */}
      <CartesianGrid strokeDasharray="3 3" />

      {/* Configure the X-axis */}
      {/* Set the X-axis type as "number" and specify the dataKey to use */}
      {/* Define the range of values to be displayed on the X-axis using the domain prop */}
      <XAxis type="number" domain={[0, 1]} dataKey="Time" />

      {/* Configure the Y-axis */}
      {/* Set the Y-axis type as "number" and specify the dataKey to use */}
      {/* Define the range of values to be displayed on the Y-axis using the domain prop */}
      <YAxis type="number" domain={[0, 1]} dataKey="Consistency" />

      {/* Display tooltips when hovering over data points */}
      <Tooltip />

      {/* Display a legend to label the data line */}
      <Legend />

      {/* Define the line to be displayed on the chart */}
      {/* Use monotone interpolation for the line */}
      {/* Set the dataKey to "Consistency" to use the data for Y values */}
      {/* Specify the stroke color for the line */}
      <Line
        type="monotone"
        dataKey="Consistency"
        stroke="#8884d8"
      />
    </LineChart>
  );
};

export default Chart;
