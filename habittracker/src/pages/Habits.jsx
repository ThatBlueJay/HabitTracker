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
  const [habits, setHabits] = useState([]);

  // if the user is not logged in, redirect them to the home page
  
  useEffect(() => {
    if (!login) {
      return; // Early return if the user is not logged in
    }

    async function fetchData() {
      try {
        const allHabits = await getAllHabits(id);
        setHabits(allHabits);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    }

    fetchData();
  }, [login, id]);

  function getDataFromPromise(json) {
    return json;
  }

  async function getAllHabits(id) {
    var allHabits = [];
    await fetch('http://localhost:3000/habits/' + id) 
    .then(data => data.json())
    .then(success => {
      console.log(success);
      allHabits = getDataFromPromise(success);
    })
    return allHabits;
  }

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
      <Column>
        <div>
          {habits.map((item, index) => <li key={index}>{item}</li>)}
        </div>
      </Column>
      <Column>
      <Subheader>Please enter the days and times you would like to complete this habit</Subheader>
      <h1>Habit Name</h1>
      <input 
        type="text" 
        placeholder="Enter Habit Here"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
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
    </HabitContainer>
  );
}
const HabitContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 95vh;
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