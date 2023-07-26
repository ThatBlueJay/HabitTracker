import React from "react";
import styled from "styled-components";

function Habits() {
  return(
    <HabitContainer>
      <Header>Add a habit here!</Header>
      <Subheader>Please enter the days and times you would like to complete this habit</Subheader>
      <br /> <br /> <p>Good Luck!</p>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`

const Header = styled.h1`
  font-size: 40px;
  margin: auto;
`

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`

export default Habits