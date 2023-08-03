import React, { useState, useEffect, useContext } from "react";
import { LoginContext, IdContext } from "../App.js"; 
import { Navigate } from "react-router-dom";
import styled from "styled-components";

function Habits() {
  const login = true;
  //const { login } = useContext(LoginContext);
  const { id } = useContext(IdContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');
  const [recurring, setRecurring] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  // if the user is not logged in, redirect them to the home page
  if (!login) {
    return; 
  }

  // async function getAllHabits(id) {
  //   var allHabits = [];
  //   await fetch('http://localhost:3000/habits/' + id) 
  //   .then(data => data.json())
  //   .then(success => {
  //     console.log(success);
  //     allHabits = getDataFromPromise(success);
  //   })
  //   return allHabits;
  // }

  //const habits = getAllHabits(id);
  const habits = [
    {
        "habit_id": 1,
        "title": "amogus",
        "description": "play",
        "start_time": "16:00:00",
        "end_time": "18:00:00",
        "category": "alls",
        "recurring": {
            "days": 7
        },
        "start_date": "2023-06-01T04:00:00.000Z",
        "end_date": "2023-07-15T04:00:00.000Z",
        "user_id": 1,
        "class_id": null
    },
    {
        "habit_id": 2,
        "title": "fortnite",
        "description": "john wick",
        "start_time": "16:00:00",
        "end_time": "18:00:00",
        "category": "alls",
        "recurring": {
            "days": 7
        },
        "start_date": "2023-06-01T04:00:00.000Z",
        "end_date": "2023-07-15T04:00:00.000Z",
        "user_id": 1,
        "class_id": null
    },
    {
        "habit_id": 6,
        "title": "fnaf",
        "description": "frazbear",
        "start_time": "16:00:00",
        "end_time": "18:00:00",
        "category": "alls",
        "recurring": {
            "seconds": 7
        },
        "start_date": "2023-07-01T04:00:00.000Z",
        "end_date": "2023-08-12T04:00:00.000Z",
        "user_id": 1,
        "class_id": null
    },
    {
        "habit_id": 7,
        "title": "revengeance",
        "description": "play the game its fun",
        "start_time": "10:00:00",
        "end_time": "12:00:00",
        "category": "alls",
        "recurring": {
            "days": 7
        },
        "start_date": "2023-07-19T04:00:00.000Z",
        "end_date": "2023-08-19T04:00:00.000Z",
        "user_id": 1,
        "class_id": null
      }
  ];

  const renderHabits = habits.map(
    (element) => {
      return (
        <ul>
          <li style={{
              fontWeight: 'bold',
              color: 'red'
          }}
          >
              {element.title}
          </li>
          <li>{element.description}</li>
      </ul>
      )
    }
  )

  const handleSubmit = async (event) => {
    event.preventDefault();

    const habit = {
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      category,
      recurring: {
        days: recurring
      },
      start_date: startDate,
      end_date: endDate,
      user_id: id
    };

    try {
      const response = await fetch('http://localhost:3000/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(habit)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not save the habit.');
      }

      // You can add some code here to handle the response
    } catch (err) {
      console.error(err);
      // Handle the error here
    }
  }

  return(
    <HabitContainer>
      <Header>Add a habit here!</Header>
      <Content>
        <Column>
          <div>
            {renderHabits}
          </div>
        </Column>
        <Column>
        <Subheader>Please enter the days and times you would like to complete this habit</Subheader>
        <InputContainer>
          <Label>Habit Name</Label>
          <StyledInput
            type="text" 
            placeholder="Enter Habit Here"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </InputContainer>

        <h1>Interval</h1>
        <p>
          <input 
            type="text" 
            placeholder="1"
            value={recurring}
            onChange={e => setRecurring(e.target.value)}
          /> 
          every   
          <input 
            type="text" 
            placeholder="hours, days, weeks, years"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </p>
        <p>Start Date</p>
        <input 
          type="date" 
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <p>End Date</p>
        <input 
          type="date" 
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <p>Start Time</p>
        <input 
          type="time" 
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <p>End Time</p>
        <input 
          type="time" 
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
        <p>Description</p>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
        /><br />
        {/* <button type="submit">Save Habit</button> */}
        <button onClick = {handleSubmit}>Save Habit</button><br />
        </Column>
      </Content>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  height: calc( 100vh - 200px );

`;

const Header = styled.h1`
  font-size: 60px;
  margin: 20px;
  font-weight: bolder;
  color: #213a32;
  width: 100%;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Column = styled.div`
  flex: 1;
  width: 50%;
  padding:  50px;
`;

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`;

const InputContainer = styled.div`
  margin-bottom: 15px 20px 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Label = styled.div`
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  width: 60%;
  padding: 10px;
  font-size: 16px;
  margin: 12px 0 12px 0;
  border-radius: 25px;
`
export default Habits;
