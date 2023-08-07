import React, { useState, useContext } from "react";
import { LoginContext, IdContext } from "../App.js"; 
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Stack, InputLeftAddon, Input, InputGroup, Heading, Text, VStack, HStack} from '@chakra-ui/react'
import { Card, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'

function Habits() {

  const { login, handleLogin } = useContext(LoginContext);
  const { id, setId } = useContext(IdContext);
  // const login = true;
  // const id = 6;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');
  const [recurring, setRecurring] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //This diplays the habit on the screen
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // if the user is not logged in, redirect them to the home page
  // if (!login) {
  //   return <Navigate to="/" />
  // }

  async function deleteHabit(id) {
    console.log(id);
    const url = "http://localhost:3000/habits/" + id;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchHabits();
        return response.json();
      })
      .then(data => {
        //console.log(data);
        alert(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/habits/' + id);
      const data = await response.json();
      setData(data);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const habit = {
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      category,
      recurring: {
        days: recurring + category
      },
      start_date: startDate,
      end_date: endDate,
      user_id: id
    };
    console.log(habit);
    try {
      const response = await fetch('http://localhost:3000/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(habit)
      });
      await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not save the habit.');
      } else {
        alert("Your habit has been added!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log("habits page: ", login, id);


  return(
    <HabitContainer>
      <Header>Add a habit here!</Header>
      <Content>
        <Column>
          <HabitsDisplay>
            <HabitsDisplayText>All Habits</HabitsDisplayText>
            <Button onClick={fetchHabits} isLoading={loading} loadingText="Loading...">Show Habits</Button>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
              {data.length > 0 && data.map((item) => (
                <Card variant='elevated'>
                  <Stack>
                    <CardBody>
                      <Heading size='md'>{item.title}</Heading>
                      <Text py='2'>
                        {item.description}
                      </Text>
                  </CardBody>
                  <CardFooter>
                    <Button variant='solid' colorScheme='blue' onClick={() => deleteHabit(item.habit_id)}>
                      Delete habit
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
              ))}
            </SimpleGrid>
          </HabitsDisplay>
        </Column>
        <Column>
        <InputDisplay>
        <HabitsDisplayText>Enter a new habit</HabitsDisplayText>
        <VStack spacing='5'>
          <InputGroup>
            <Input 
              variant='filled'
              type="text"
              placeholder="Habit Name"
              value={title}
              onChange={e => setTitle(e.target.value)}/>
          </InputGroup>

          <HStack spacing='3'>
            <NumberInput 
              size='sm' 
              maxW={20} 
              defaultValue={7} 
              min={1} 
              max={365}
              variant='filled'
              value={recurring}
              onChange={(value) => setRecurring(value)}
              >
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <InputSubText>every</InputSubText>
            <Select variant='filled' onChange={e => setCategory(e.target.value)} value={category}>
              <option>hours</option>
              <option>days</option>
              <option>weeks</option>
              <option>years</option>
            </Select>
          </HStack>

          <InputGroup>
            <InputLeftAddon children='Start Date:' />
            <Input 
              variant='filled'
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}/>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children='End Date:' />
            <Input 
              variant='filled'
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}/>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children='Start Time' />
            <Input 
              variant='filled'
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}/>
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children='End Time' />
            <Input 
              variant='filled'
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}/>
          </InputGroup>

          <Textarea 
            variant='filled'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Description' />
            <Button onClick={handleSubmit}>Save Habit</Button>
        </VStack>

        </InputDisplay>
        </Column>
      </Content>
    </HabitContainer>
  );
}

const HabitContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  min-height: calc( 100vh - 200px );
  background-color: #F4E285;
`;

const Header = styled.h1`
  font-size: 50px;
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

const HabitsDisplayText = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #FFFFFF;
  text-align: center;
`

const HabitsDisplay = styled.div`
  background-color: #5B8E7D;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border-radius: 12px;
`

const InputDisplay = styled.div`
  background-color: #BC4B51;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border-radius: 12px;
`

const InputSubText = styled.p`
  font-size: 15px;
  color: #ffffff;
`

export default Habits;

  // const habits = [
  //   {
  //       "habit_id": 1,
  //       "title": "amogus",
  //       "description": "play",
  //       "start_time": "16:00:00",
  //       "end_time": "18:00:00",
  //       "category": "alls",
  //       "recurring": {
  //           "days": 7
  //       },
  //       "start_date": "2023-06-01T04:00:00.000Z",
  //       "end_date": "2023-07-15T04:00:00.000Z",
  //       "user_id": 1,
  //       "class_id": null
  //   },
  //   {
  //       "habit_id": 2,
  //       "title": "fortnite",
  //       "description": "john wick",
  //       "start_time": "16:00:00",
  //       "end_time": "18:00:00",
  //       "category": "alls",
  //       "recurring": {
  //           "days": 7
  //       },
  //       "start_date": "2023-06-01T04:00:00.000Z",
  //       "end_date": "2023-07-15T04:00:00.000Z",
  //       "user_id": 1,
  //       "class_id": null
  //   },
  //   {
  //       "habit_id": 6,
  //       "title": "fnaf",
  //       "description": "frazbear",
  //       "start_time": "16:00:00",
  //       "end_time": "18:00:00",
  //       "category": "alls",
  //       "recurring": {
  //           "seconds": 7
  //       },
  //       "start_date": "2023-07-01T04:00:00.000Z",
  //       "end_date": "2023-08-12T04:00:00.000Z",
  //       "user_id": 1,
  //       "class_id": null
  //   },
  //   {
  //       "habit_id": 7,
  //       "title": "revengeance",
  //       "description": "play the game its fun",
  //       "start_time": "10:00:00",
  //       "end_time": "12:00:00",
  //       "category": "alls",
  //       "recurring": {
  //           "days": 7
  //       },
  //       "start_date": "2023-07-19T04:00:00.000Z",
  //       "end_date": "2023-08-19T04:00:00.000Z",
  //       "user_id": 1,
  //       "class_id": null
  //     }
  // ];
