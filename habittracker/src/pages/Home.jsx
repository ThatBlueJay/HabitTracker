import React from "react";
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

function Home() {
  return(
    <HomeContainer>
      <Column>
      <Header>Welcome to Habit Tracker!</Header>
      <Subheader>Please enter your contact details to connect.</Subheader>
      <p>Email</p>
      <input type="email" placeholder="example@example.com" />
      <p>Password</p>
      <input type="password" placeholder="********" /><br />
      <button>Sign In</button> <button>Forgot password?</button><br />
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