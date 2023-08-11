import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../App.js";
import { Navigate, useNavigate, useRevalidator } from 'react-router-dom';
import { Button, Stack, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

// Function to verify password strength
function verify(password){
  if(password.length < 8){
    return false;
  }
  var hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) {
    return false;
  }
  var hasNumeral = /\d/.test(password);
  if (!hasNumeral) {
    return false;
  }
  return true;
}

// Function to authorize user
async function authorize({ email, password }) {
  const response = await fetch(`http://localhost:3000/auth?email=${email}&password=${password}`, {
    method: 'GET',
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`Server error: ${response.status}`);
    return null;
  }
}

function Home() {
  // State variables for email, password, and login status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  // If already logged in, redirect to Calendar page
  if (login) {
    return <Navigate to="/Calendar" />
  }

  console.log("Home page: ", login);

  // Function to handle login button click
  const onLogin = async () => {
    // Implement password validation
    if (verify(password)) {
      try {
        const userId = JSON.stringify(await authorize({ email, password }));
        console.log(userId);
        if (userId !== "None" && userId != -1) {
          handleLogin(userId); // Update login context
          alert("Login successful!"); // Show success message
          console.log(login);
        } else {
          alert("Invalid credentials"); // Show error message
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Password should be at least 8 characters long, contains at least one uppercase letter and at least one number");
    }
  };

  return (
    <HomeContainer>
      {/* Header */}
      <Header>Welcome to Habit Tracker!</Header>
      <InnerHomeContainer>
        <Subheader>Sign In</Subheader>
        
        {/* Input fields for email and password */}
        <Stack spacing={8}>
          <InputGroup>
            {/* Email icon in input left */}
            <InputLeftElement>
              <EmailIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}/>
          </InputGroup>

          <InputGroup>
            {/* Lock icon in input left */}
            <InputLeftElement>
              <LockIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}/>
          </InputGroup>

          {/* Button to initiate login */}
          <Button onClick={onLogin} backgroundColor='#cb696e'>Sign In</Button>
          
          {/* Button to navigate to Signup page */}
          <Button onClick={() => navigate('/Signup')} backgroundColor='#cb696e'>Sign Up Here</Button>
        </Stack>
      </InnerHomeContainer>
    </HomeContainer>
  );
}

// Styled components for styling
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc( 100vh - 200px );
  background-color: #5B8E7D;
  text-align: center;
  padding: 30px;
`

const InnerHomeContainer = styled.div`
  width: 30%;
  background-color: #F4E285;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.h1`
  font-size: 50px;
  font-weight: bolder;
  color: #FFFFFF;
`

const Subheader = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`

export default Home;
