import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import homeImage from "../assets/homepage_image.jpg";
import { LoginContext } from "../App.js";
import { useNavigate } from 'react-router-dom';

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
      <Column>
        <Header>Welcome to Habit Tracker!</Header>
        <Subheader>Please enter your contact details to connect.</Subheader>
        <InputContainer>
          <Label>Email</Label>
          <StyledInput
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <StyledInput
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputContainer>
        <StyledButton onClick={onLogin}>Sign In</StyledButton>
        <SignUpText>
          Don't have an account? <SignUpLink onClick={() => navigate('/Signup')}>Sign Up Here</SignUpLink>
        </SignUpText>
      </Column>
      <Column>
        <Image src={homeImage} alt="Habit" />
      </Column>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 50px 20px 50px;
  height: 100%;
`

const Header = styled.h1`
  font-size: 40px;
  margin: auto;
  font-weight: bolder;
`

const Column = styled.div`
  flex: 1;
  padding: 30px;
`

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: 1em 0 1em 0;
  font-weight: normal;
`

const InputContainer = styled.div`
  margin-bottom: 15px;
`

const Label = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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

export default Home
