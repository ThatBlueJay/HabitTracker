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

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Habits" element={<Habits />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;