import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Button, Stack, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { EmailIcon, LockIcon, StarIcon, PhoneIcon } from '@chakra-ui/icons'

// Function to verify password strength
function verify(password, confirmPassword) {
  if (password.length < 8) {
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

// Function to create a new user
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

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`Server error: ${response.status}`);
    return null;
  }
}

function SignUp() {
  // State variables for user registration fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Function to handle sign-up button click
  const onSignUp = async () => {
    // Check if passwords match
    if (password === confirmPassword) {
      // Validate password
      if (verify(password)) {
        try {
          // Call createUser function to create a new user
          const response = await createUser({ username, password, email, phone });
          if (response === "Success") {
            alert("Account created successfully!");
            return <Navigate to="/Profile" />; // Redirect to profile page
          } else {
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

  return (
    <SignUpContainer>
      <Header>Welcome to Habit Tracker!</Header>
      <InnerSignupContainer>
        <Subheader>Sign Up</Subheader>
        <Stack spacing={8}>
          {/* Input field for username */}
          <InputGroup>
            <InputLeftElement>
              <StarIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </InputGroup>

          {/* Input field for email */}
          <InputGroup>
            <InputLeftElement>
              <EmailIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </InputGroup>

          {/* Input field for password */}
          <InputGroup>
            <InputLeftElement>
              <LockIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </InputGroup>

          {/* Input field to confirm password */}
          <InputGroup>
            <InputLeftElement>
              <LockIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="password"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} />
          </InputGroup>

          {/* Input field for phone number */}
          <InputGroup>
            <InputLeftElement>
              <PhoneIcon color='#cb696e'/>
            </InputLeftElement>
            <Input 
              variant='filled'
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)} />
          </InputGroup>

          {/* Button to initiate sign-up */}
          <Button onClick={onSignUp} backgroundColor='#cb696e'>Sign Up</Button>
        </Stack>
      </InnerSignupContainer>
    </SignUpContainer>
  );
}

// Styled components for styling
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc( 100vh - 200px );
  background-color: #5B8E7D;
  text-align: center;
  padding: 30px;
`

const InnerSignupContainer = styled.div`
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

export default SignUp;
