import React, { useContext, useState } from "react";
import styled from "styled-components";
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

  return(
    <HomeContainer>
      <Column>
      <Header>Welcome to Habit Tracker!</Header>
      <Subheader>Please enter your contact details to connect.</Subheader>
      <p>Email</p>
      <input
        type="email"
        placeholder="example@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <p>Password</p>
      <input
        type="password"
        placeholder="********"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={onLogin}>Sign In</button><br />
      <p>Don't have an account? <br /> <button onClick={() => navigate('/Signup')}>Sign Up Here</button></p>
      </Column>
      <Column>
      <img src={homeImage} alt="Habit" />
      </Column>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`

const Header = styled.h1`
  font-size: 40px;
  margin: auto;
`

const Column = styled.div`
  flex: 1;
  padding: 10px;
`

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`

export default Home
