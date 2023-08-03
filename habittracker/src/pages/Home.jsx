import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { LoginContext } from "../App.js";
import { useNavigate } from 'react-router-dom';
import { FaMailBulk , FaLock } from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const onLogin = async () => {
    // Implement validation
    if (verify(password)) {
      try {
       const userId = JSON.stringify(await authorize({ email, password }));
        if (userId !== "None") {
          handleLogin(userId);
          alert("Login successful!");
        } else {
          alert("Invalid credentials");
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
      <Header>Welcome to Habit Tracker!</Header>
      <InnerHomeContainer>
        <Subheader>Create Account</Subheader>
        <InputContainer>
        <IconButton variant="none" as="a" href="/" aria-label="Home" icon={<FaMailBulk fontSize="1.75rem" color="#213a32"/>} />

          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <IconButton variant="none" as="a" href="/" aria-label="Home" icon={<FaLock fontSize="1.75rem" color="#213a32"/>} />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputContainer>
        <StyledButton onClick={onLogin}>Sign In</StyledButton>
        <StyledButton onClick={() => navigate('/Signup')}>Sign Up Here</StyledButton>
      </InnerHomeContainer>
    </HomeContainer>
  );
}

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
  width: 40%;
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
  width: 60%;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: #213a32;
`

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

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #cb696e;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 50%;
  margin: 15px 0 15px 0;

  &:hover {
    background-color: #BC4B51;
    transform: scale(1.1);
  }
`

const SignUpText = styled.p`
  font-size: 14px;
  text-align: center;
`

const SignUpLink = styled.button`
  color: #007bff;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5em;
`

const HomeGradient = styled.div`
  height: 50px;
  background-image: linear-gradient(#5B8E7D, #5B8E7D, #FFFFFF);
`

export default Home
