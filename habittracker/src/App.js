import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Habits from './pages/Habits';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Signup from './pages/Signup';
import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useState } from "react";

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

function App() {

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
              <Route path="/Calendar" element={<Calendar/>} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
      </AppProvider>
    );
  }

export default App;