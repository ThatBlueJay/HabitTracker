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
var login = false;
var id = -1;

function App() {

  var data = null;

  if(login) {
    data =  getUserData(id);
  }

  var username = login ? data.username : "none";
  var email = login ? data.email : "none";
  var phone = login ? data.phone : "none";

    return (
      <ChakraProvider>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Habits" element={login ? <Habits /> : <Home/>} />
              <Route path="/Calendar" element={login ? <Calendar data={getHabitData(id)}/> : <Home/>} />
              <Route path="/Analytics" element={login ? <Analytics /> : <Home/>} />
              <Route path="/Profile" element={login ? <Profile username={username} email={email} phone={phone}/> : <Home/>} />
            </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    );
  }



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



export default App;