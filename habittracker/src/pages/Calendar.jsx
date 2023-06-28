import React from "react";
import styled from "styled-components";

function Calendar() {
  return(
    <CalendarContainer>
      <Header>Calendar Page</Header>
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
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

export default Calendar