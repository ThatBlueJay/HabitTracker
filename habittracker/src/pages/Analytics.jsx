import React, {useContext, useState} from "react";
import styled from "styled-components";
import { LoginContext, IdContext } from "../App.js"; 
import { Navigate } from "react-router-dom";
import Chart from "../components/Chart.jsx";
import { Checkbox, Button, HStack } from '@chakra-ui/react'

function Analytics() {
  const { login} = useContext(LoginContext);
  const { id } = useContext(IdContext);
  // const login = true;
  // const id = 6;
  // DON'T DELETE
  const [habits, setHabits] = useState([]); 
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // if the user is not logged in, redirect them to the home page
  if (!login) {
    return <Navigate to="/" />
  }

  //Get all the habits to put in checkboxes DONT DELETE
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

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      // Item is already checked, remove it from the list
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
    } else {
      // Item is not checked, add it to the list
      setCheckedItems([...checkedItems, item]);
    }
  };


  return(
    <AnalyticsContainer>
      <Header>Analytics Page</Header>
      <ChartContainer>
        <Subheader>Select habits to view your consistency over time</Subheader>
        <HStack>
          <CheckBoxesHabits>
            <Button onClick={fetchHabits} isLoading={loading} loadingText="Loading...">Show Habits</Button>
              {habits && <Subsubheader>All Habits</Subsubheader>}
              {habits.map((item) => (
                <Checkbox
                  key={item.habit_id}
                  isChecked={checkedItems.includes(item.habit_id)}
                  onChange={() => handleCheckboxChange(item.habit_id)}
                >{item.title}</Checkbox>
              ))}
          </CheckBoxesHabits>
          <Chart data={habits}/>
        </HStack>
      </ChartContainer>
    </AnalyticsContainer>
  );
} 


const AnalyticsContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  min-height: calc( 100vh - 200px );
  background-color: #F4E285;
  justify-content: center;
  align-items: center;
`;

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

const Header = styled.h1`
  font-size: 50px;
  margin: 20px;
  font-weight: bolder;
  color: #213a32;
  width: 100%;
  text-align: center;
`;

const Subheader = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`

const Subsubheader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`

const CheckBoxesHabits = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`

export default Analytics