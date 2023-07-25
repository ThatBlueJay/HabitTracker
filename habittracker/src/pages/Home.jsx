import React, { useState } from "react";
import styled from "styled-components";
import homeImage from "../assets/homepage_image.jpg";

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

function Home({ onLogin}) {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Implement validation
    if (verify(password)) {
      try {
        const userId = await authorize({ email, password });
        if (userId !== "None") {
          onLogin(userId);
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
  const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habittracker',
  password: 'db',
  port: 5432,
})
  const authorize = (body) => {
    return new Promise(function(resolve, reject) {
      const {email, password} = body
      pool.query('SELECT user_id FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
          reject(error)
        }
        else if(results.rowCount < 1) {
          resolve("None")
        }
        else resolve(`${results.rows[0].user_id}`)
      })
    })
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
      <button onClick={handleLogin}>Sign In</button>
      <button>Forgot password?</button><br />
      <button>Sign In With Google</button><br />
      <p>Don't have an account? <button>Sign Up Here</button></p>
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