import React, { useState, useRef, useEffect } from 'react';
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import styled from "styled-components";

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

function formatData(title, start, end, test) {
  const data = [
    {
        "record_id": 385484,
        "datet_complete": null,
        "due_date": "2023-07-19T16:00:00.000Z",
        "complete": false,
        "complete_on_time": null,
        "hours_spent": 0,
        "habit_id": 7
    },
    {
        "record_id": 385485,
        "datet_complete": "2023-07-20T01:09:07.702Z",
        "due_date": "2023-07-26T16:00:00.000Z",
        "complete": true,
        "complete_on_time": true,
        "hours_spent": 159,
        "habit_id": 7
    }
  ];
  let toAdd = [];
  for(let i = 0; i < data.length; i++) {
    toAdd.append({
      text: title,
      start: data[i].due_date.substring(0,11) + start + "0Z",
      end: data[i].due_date
    });
  }
  return toAdd;
}

async function getHabits(props) {
  const today = new Date();

  const start = getMonthName(today.getMonth()+1) + " " + 1 + ", " + today.getFullYear();
  const end = getMonthName(today.getMonth()+3) + " " + 1 + ", " + today.getFullYear();

  let allHabitsToPutOnCalendar = [];

  for(let i = 0; i < props.data.length; i++) {
    const habitID = props.data[i].habit_id;
    const body = {
      "id": habitID,
      "begin": start,
      "end": end
    };

    let data = [];
    allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(props.data[i].title, props.data[i].start_time, props.data[i].end_time, data));

    /*
    await fetch("/habits", {
      method: 'GET',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      allHabitsToPutOnCalendar = allHabitsToPutOnCalendar.concat(formatData(props.data[i].title, props.data[i].start_time, props.data[i].end_time, data));
      console.log(data);
    })
    */
  }
  return allHabitsToPutOnCalendar;
}

const Calendar = (props) => {
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
  
    //const { habits } = getHabits(props);
    getHabits(props);

    useEffect(() => {
      const events = [
        {
          text: "Event 1",
          start: "2023-10-02T10:30:00",
          end: "2023-10-02T13:00:00"
        },
        {
          text: "Event 2",
          start: "2023-10-03T09:30:00",
          end: "2023-10-03T11:30:00",
          backColor: "#6aa84f"
        },
        {
          text: "Event 3",
          start: "2023-10-03T12:00:00",
          end: "2023-10-03T15:00:00",
          backColor: "#f1c232"
        },
        {
          text: "Event 4",
          start: "2023-10-01T11:30:00",
          end: "2023-10-01T14:30:00",
          backColor: "#cc4125"
        },
      ];
  
      const startDate = "2023-10-02";
  
      calendarRef.current.control.update({startDate, events});
    }, []);

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