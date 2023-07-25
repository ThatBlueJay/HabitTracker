//import React from "react";
import styled from "styled-components";
//  const {title, description, start_time, end_time, category, recurring, start_date, end_date, user_id} = body
import React, { useContext } from "react";
import { LoginContext } from "../App.js"; // adjust the import path as necessary
import { Navigate } from "react-router-dom";

function Habits() {
  const { login } = useContext(LoginContext);

  // if the user is not logged in, redirect them to the home page
  if (!login) {
    return <Navigate to="/" />
  }

  return(
    <HabitContainer>
      <Column>
      <Header>Add a habit here!</Header>
      <Subheader>Please enter the days and times you would like to complete this habit</Subheader>
      <br /> <br /> <p>Good Luck!</p>
      </Column>
      <Column>
      <h1>Habit Name</h1>
      <input type="text" placeholder="Enter Habit Here" />
      <h1>Interval</h1>
      <p><input type="text" placeholder="1"/> every   <input type="text" placeholder="Wednesday"/></p>
      <p>Start Date</p>
      
      </Column>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`

const Header = styled.h1`
  font-size: 40px;
  margin: auto;
`
const Column = styled.div`
  flex: 1;
  padding: 20px;
`

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`

export default Habits