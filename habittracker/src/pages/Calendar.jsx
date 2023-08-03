import React, { useContext, useState, useRef, useEffect } from 'react';
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { IdContext, LoginContext } from "../App.js";


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

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

function getDataFromPromise(json) {
  return json;
}

  
function formatData(title, start, end, data) {

  var colorCounter = ["#780116", "#F7B538", "#DB7C26", "#D8572A", "#C32F27"];
  let toAdd = [];
  for(let i = 0; i < data.length; i++) {
    let num = Math.floor(Math.random() * 5);
    toAdd = toAdd.concat({
      id: data[i].record_id, 
      text: title,
      start: data[i].due_date.substring(0,11) + start,
      end: data[i].due_date.substring(0,11) + end,
      backColor: colorCounter[num],
    });
  }
  return toAdd;
}

async function getHabits(id) {
  const today = new Date();
  
  const start = getMonthName(today.getMonth()+1) + " " + 1 + ", " + today.getFullYear();
  const end = getMonthName(today.getMonth()+3) + " " + 1 + ", " + today.getFullYear();
  var allHabitsToPutOnCalendar = [];

  var allHabits = [];
  await fetch('http://localhost:3000/habits/' + id) 
  .then(data => data.json())
  .then(success => {
    console.log(success);
    allHabits = getDataFromPromise(success);
  })

  if (allHabits != null) {
    for(let i = allHabits.length-1; i >= 0; i--) {
      const habitID = allHabits[i].habit_id;
      // let data = [];
      // allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(allHabits[i].title, allHabits[i].start_time, allHabits[i].end_time, data));

      await fetch("http://localhost:3000/habits/?id=" + habitID + "&begin=" + start + "&end=" + end) 
        .then(response => response.json())
        .then(data => {
          allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(allHabits[i].title, allHabits[i].start_time, allHabits[i].end_time, data));
      })
    }
  }
  //console.log(allHabitsToPutOnCalendar);
  return allHabitsToPutOnCalendar;
}

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
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert("Confirmed! Good job!");
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const Calendar = () => {

  const { login } = useContext(LoginContext);
  const { id } = useContext(IdContext);

    const [config, setConfig] = useState({
      viewType: "Week",
      durationBarVisible: false
    });
    
    const calendarRef = useRef();

    const handleTimeRangeSelected = args => {
      calendarRef.current.control.update({
        startDate: args.day
      });
    }

    const handleEventClick = (args) => {
      console.log(args.e.data.id);
      updateHabit(args.e.data.id);
    }

    useEffect(() => {
      async function updateCalendar() {
        const events = await getHabits(id);
        console.log(events);
        const startDate = new Date();
        calendarRef.current?.control.update({startDate, events});
      }
      updateCalendar();
    }, []);

    if (!login) {
      return <Navigate to="/" />
    }


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

export default Calendar;

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