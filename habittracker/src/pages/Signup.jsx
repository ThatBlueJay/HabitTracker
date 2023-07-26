import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../App.js";
import { Navigate } from "react-router-dom";


function verify(password, confirmPassword){
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

async function createUser({ username, password, email, phone }) {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      phone: phone,
    })
  });

  if(response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`Server error: ${response.status}`);
    return null;
  }
}



function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSignUp = async () => {
    if(password === confirmPassword) {
      if(verify(password)) {
        try {
          // change createUser according to your needs
          const response = await createUser({ username, password, email, phone }); 
          if(response === "Success") {
            alert("Account created successfully!");
            return <Navigate to="/Profile"/>;
          }
          else {
            alert("Failed to create account");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Password should be at least 8 characters long, contains at least one uppercase letter and at least one number");
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return(
    <SignUpContainer>
      <Column>
      <Header>Welcome to Habit Tracker!</Header>
      <Subheader>Please enter your details to sign up.</Subheader>
      <p>Username</p>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
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
        placeholder="Enter Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>Confirm Password</p>
      <input
        type="password"
        placeholder="Re-enter Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <p>Phone</p>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <br />
      <button onClick={onSignUp}>Sign Up</button><br />
      </Column>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
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

export default SignUp
