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
  // const data = [
  //   {
  //       "record_id": 385484,
  //       "datet_complete": null,
  //       "due_date": "2023-07-19T16:00:00.000Z",
  //       "complete": false,
  //       "complete_on_time": null,
  //       "hours_spent": 0,
  //       "habit_id": 7
  //   },
  //   {
  //       "record_id": 385485,
  //       "datet_complete": "2023-07-20T01:09:07.702Z",
  //       "due_date": "2023-07-26T16:00:00.000Z",
  //       "complete": true,
  //       "complete_on_time": true,
  //       "hours_spent": 159,
  //       "habit_id": 7
  //   }
  // ];

  var colorCounter = ["#780116", "#F7B538", "#DB7C26", "#D8572A", "#C32F27"];
  let toAdd = [];
  for(let i = 0; i < data.length; i++) {
    let num = Math.floor(Math.random() * 5);
    toAdd = toAdd.concat({
      text: title,
      start: data[i].due_date.substring(0,11) + start,
      end: data[i].due_date.substring(0,11) + end,
      backColor: colorCounter[num]
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

  console.log(allHabits.length);

  if (allHabits != null) {
    for(let i = allHabits.length-1; i >= 0; i--) {
      console.log(i);
      const habitID = allHabits[i].habit_id;
      //let data = [];
      //allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(props.data[i].title, props.data[i].start_time, props.data[i].end_time, data));

      await fetch("http://localhost:3000/habits/?id=" + habitID + "&begin=" + start + "&end=" + end) 
        .then(response => response.json())
        .then(data => {
          allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(allHabits[i].title, allHabits[i].start_time, allHabits[i].end_time, data));
      })
    }
  }
  console.log(allHabitsToPutOnCalendar);
  return allHabitsToPutOnCalendar;
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

    useEffect(() => {
      async function updateCalendar() {
        const events = await getHabits(id);
        console.log(events);
        const startDate = new Date();
        calendarRef.current.control.update({startDate, events});
      }
      updateCalendar();
    }, []);

    if (!login) {
      return <Navigate to="/" />
    }

    return (
      <CalendarContainer>
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
                <DayPilotCalendar {...config} ref={calendarRef} />
            </div>
        </div>
      </CalendarContainer>
    );
}

export default Calendar;

const CalendarContainer = styled.div`
  padding: 2em;
`