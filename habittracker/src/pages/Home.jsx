import React from "react";
import styled from "styled-components";

function Home() {
  return(
    <HomeContainer>
      <Header>Welcome to Habit Tracker!</Header>
      <Subheader>Please enter your contact details to connect.</Subheader>
      <p>Email</p>
      <input type="email" placeholder="example@example.com" />
      <p>Password</p>
      <input type="password" placeholder="********" /><br />
      <button>Sign In</button> <button>Forgot password?</button><br />
      <button>Sign In With Google</button><br />
      <p>Don't have an account? <button>Sign Up Here</button></p>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`

const Header = styled.h1`
  font-size: 40px;
  margin: auto;
`

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`

export default Home