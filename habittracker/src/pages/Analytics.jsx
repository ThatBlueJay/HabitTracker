import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from '../assets/habittracker.png';
import { LoginContext, IdContext } from "../App.js";
import { Navigate } from "react-router-dom";
import Chart from "../components/Chart.jsx";
import { Checkbox, Button, HStack } from '@chakra-ui/react'

// Define a functional component called Analytics
function Analytics() {
  // Get the login and id state from the context
  const { login } = useContext(LoginContext);
  const { id } = useContext(IdContext);

  // Initialize state variables
  const [habits, setHabits] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if the user is logged in; if not, redirect to the home page
  if (!login) {
    return <Navigate to="/" />
  }

  // Fetch user habits from the server
  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/habits/' + id);
      const data = await response.json();
      setHabits(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Handle checkbox change event
  const handleCheckboxChange = (item) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = prevCheckedItems.includes(item)
        ? prevCheckedItems.filter((checkedItem) => checkedItem !== item)
        : [...prevCheckedItems, item];

      console.log(newCheckedItems);
      updateGraph(newCheckedItems); // Call updateGraph with the updated state

      return newCheckedItems; // Return the new state value
    });
  };

  // Update chart data based on selected habits
  const updateGraph = async (checkedItems) => {
    try {
      console.log("checked", checkedItems);
      var allIds = "";
      if (checkedItems.length === 0) {
        allIds = "-1";
      } else {
        for (let i = 0; i < checkedItems.length; i++) {
          allIds += checkedItems[i];
          if (i < checkedItems.length - 1) {
            allIds += ",";
          }
        }
      }
      console.log("allIds", allIds);
      const response = await fetch('http://localhost:3000/analysis?ids=' + allIds);
      const data = await response.json();
      setChartData(data.list);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Return JSX for the Analytics page
  return (
    <AnalyticsContainer>
      {/* Header */}
      <Header>Analytics Page</Header>
      <ChartContainer>
        {/* Subheader */}
        <Subheader>Select habits to view your consistency over time</Subheader>
        <HStack spacing={5}>
          <CheckBoxesHabits>
            {/* Button to fetch habits */}
            <Button onClick={fetchHabits} colorScheme="yellow" isLoading={loading} loadingText="Loading...">Show Habits</Button>
            {habits && <Subsubheader>All Habits</Subsubheader>}
            {/* Display checkboxes for habits */}
            {habits.length > 0 && habits.map((item) => (
              <Checkbox
                key={item.habit_id}
                onChange={() => handleCheckboxChange(item.habit_id)}
              >{item.title}</Checkbox>
            ))}
          </CheckBoxesHabits>
          {/* Display the Chart component */}
          <Chart data={chartData}/>
        </HStack>
      </ChartContainer>
    </AnalyticsContainer>
  );
} 

// Styled components for different parts of the Analytics page

// Styling for the main Analytics container
const AnalyticsContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  min-height: calc( 100vh - 200px );
  background-color: #F4E285;
`;

// Styling for the chart container
const ChartContainer = styled.div`
  width: 70%;
  background-color: #FFFFFF;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 50px;
`;

// Styling for the header
const Header = styled.h1`
  font-size: 50px;
  margin: 20px;
  font-weight: bolder;
  color: #213a32;
  width: 100%;
  text-align: center;
`;

// Styling for the subheader
const Subheader = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`;

// Styling for the sub-subheader
const Subsubheader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`;

// Styling for the checkboxes and habits container
const CheckBoxesHabits = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  width: 200px;
`;

// Export the Analytics component as the default export of this module
export default Analytics;
