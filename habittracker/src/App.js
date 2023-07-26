import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Habits from './pages/Habits';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import { ChakraProvider } from '@chakra-ui/react'

/*
Check to see if the user is logged in
*/
var login = true;
var id = -1;

function App() {

  //This is for testing purposes only
  const allHabits = [
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

  var data = null;

  if(login) {
    data =  getUserData(id);
  }

  //var username = login ? data.username : "none";
  //var email = login ? data.email : "none";
  //var phone = login ? data.phone : "none";

    return (
      <ChakraProvider>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Habits" element={login ? <Habits /> : <Home/>} />
              <Route path="/Calendar" element={login ? <Calendar data={allHabits}/> : <Home/>} />
              <Route path="/Analytics" element={login ? <Analytics /> : <Home/>} />
              <Route path="/Profile" element={login ? <Profile username={"username"} email={"email"} phone={"911"}/> : <Home/>} />
            </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    );
  }

/* */

async function getUserData(id) {
  if(login) {
    await fetch("/users/" + id)
      .then(data => data.json())
      .then(success => {console.log(success)})
  }
}

//This returns all of the habits for the specific user
async function getHabitData(id) {
  await fetch("/habits/" + id)
    .then(data => data.json())
    .then(success => {console.log(success)})
  }



export default App;