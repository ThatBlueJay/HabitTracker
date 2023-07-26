import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Habits from './pages/Habits';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { ChakraProvider } from '@chakra-ui/react'
import { useContext, createContext, useState } from "react";

export const LoginContext = createContext();
export const IdContext = createContext();

function AppProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState(null);

  const handleLogin = (userId) => {
    setLogin(true);
    setId(userId);
  };

  return (
    <LoginContext.Provider value={{ login, handleLogin }}>
      <IdContext.Provider value={{ id, setId }}>
        {children}
      </IdContext.Provider>
    </LoginContext.Provider>
  );
}
var data;
function App() {

  // //This is for testing purposes only
  // const allHabits = [
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
  //   }
  // ];

  var data = null;

  if(login) {
    data =  getUserData(id);
  }

  //var username = login ? data.username : "none";
  //var email = login ? data.email : "none";
  //var phone = login ? data.phone : "none";

  //const { login } = useContext(LoginContext);
  //const { id } = useContext(IdContext);
    return (
      <AppProvider>
      <ChakraProvider>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Habits" element={<Habits />} />
              <Route path="/Calendar" element={<Calendar data={getHabitData(id)}/>} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/Profile" element={<Profile username={"username"} email={"email"} phone={"911"}/>} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
      </AppProvider>
    );
  }


/*
function getUserData(id) {
  if(login) {
    fetch("/users/" + id)
      .then(data => data.json())
      .then(success => {console.log(success)})
  }
}
  
async function getHabitData(id) {
  await fetch("/habits/" + id)
    .then(data => data.json())
    .then(success => {console.log(success);})
  }
*/


export default App;