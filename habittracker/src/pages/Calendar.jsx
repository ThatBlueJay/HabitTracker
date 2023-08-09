import React, { useContext, useState, useRef, useEffect } from 'react';
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { IdContext, LoginContext } from "../App.js";

// Define the styles for the calendar layout
const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

// Helper function to get the name of a month based on its number
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

// Helper function to extract data from a promise
function getDataFromPromise(json) {
  return json;
}

// Format habit data for display on the calendar
function formatData(title, start, end, data) {
  // Array of colors to assign to habits
  var colorCounter = ["#D8D174", "#F7B538", "#FFE45E", "#F4FDAF", "#EFDD8D"];
  let toAdd = [];
  for(let i = 0; i < data.length; i++) {
    let num = Math.floor(Math.random() * 5);
    toAdd = toAdd.concat({
      id: data[i].record_id, 
      text: title,
      start: data[i].due_date.substring(0, 11) + start,
      end: data[i].due_date.substring(0, 11) + end,
      backColor: colorCounter[num],
    });
  }
  return toAdd;
}

// Get habits data for the specified time range
async function getHabits(id) {
  const today = new Date();
  const start = "January 1, 2023";
  const end = "December 31, 2023";
  //const start = getMonthName(today.getMonth()-8) + " " + 1 + ", " + today.getFullYear();
  //const end = getMonthName(today.getMonth()+) + " " + 1 + ", " + today.getFullYear();
  console.log(start, end);
  var allHabitsToPutOnCalendar = [];
  var allHabits = [];

  // Fetch all habits for the user
  await fetch('http://localhost:3000/habits/' + id) 
    .then(data => data.json())
    .then(success => {
      allHabits = getDataFromPromise(success);
    });
  console.log(allHabits);

  // Fetch and format data for each habit
  if (allHabits.length !== 0) {
    for(let i = allHabits.length-1; i >= 0; i--) {
      const habitID = allHabits[i].habit_id;
      console.log(habitID);
      await fetch("http://localhost:3000/habits/?id=" + habitID + "&begin=" + start + "&end=" + end) 
        .then(response => response.json())
        .then(data => {
          allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(allHabits[i].title, allHabits[i].start_time, allHabits[i].end_time, data));
        });
    }
  }
  console.log(allHabitsToPutOnCalendar);
  return allHabitsToPutOnCalendar;
}

// Update habit completion status
async function updateHabit(id) {
  const url = "http://localhost:3000/habits/" + id;
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        alert("Good job! You have completed the habit!");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Define the Calendar component
const Calendar = () => {
  // Get the login and id state from the context
  const { login } = useContext(LoginContext);
  const { id } = useContext(IdContext);

  console.log("calendar page: ", login, id);

  // State for the DayPilotCalendar configuration
  const [config, setConfig] = useState({
    viewType: "Week",
    durationBarVisible: false
  });
  
  // Ref for the DayPilotCalendar
  const calendarRef = useRef();

  // Handle the time range selected in the DayPilotNavigator
  const handleTimeRangeSelected = args => {
    calendarRef.current.control.update({
      startDate: args.day
    });
  }

  // Handle event click (habit completion confirmation)
  const handleEventClick = (args) => {
    updateHabit(args.e.data.id);
  }

  // Fetch and update habit data on component mount
  useEffect(() => {
    async function updateCalendar() {
      const events = await getHabits(id);
      const startDate = new Date();
      calendarRef.current?.control.update({startDate, events});
    }
    updateCalendar();
  }, []);

  // If not logged in, redirect to the home page
  if (!login) {
    return <Navigate to="/" />
  }

  // Render the Calendar component
  return (
    <CalendarContainer>
      <Header>Calendar</Header>
      <Subheader>Click on a habit to confirm completion</Subheader>
      <div style={styles.wrap}>
          <div style={styles.left}>
              <DayPilotNavigator
                  selectMode={"Week"}
                  showMonths={2}
                  skipMonths={3}
                  onTimeRangeSelected={handleTimeRangeSelected}
              />
          </div>
          <div style={styles.main}>
              <DayPilotCalendar {...config} ref={calendarRef} onEventClick={handleEventClick}/>
          </div>
      </div>
    </CalendarContainer>
  );
}

// Styled components for different parts of the Calendar page
const CalendarContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  min-height: calc( 100vh - 200px );
  background-color: #F4E285;
  padding: 3em;
`

const Header = styled.h1`
  font-size: 50px;
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
  text-align: center;
`

// Export the Calendar component as the default export of this module
export default Calendar;
