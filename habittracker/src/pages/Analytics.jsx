import React, {useContext} from "react";
import styled from "styled-components";

import { LoginContext } from "../App.js"; 
import { Navigate } from "react-router-dom";


function Analytics() {
  //const login = true;
  const { login } = useContext(LoginContext);

  // if the user is not logged in, redirect them to the home page
  if (!login) {
    return <Navigate to="/" />
  }
  return(
    <AnalyticsContainer>
      <Header>Analytics Page</Header>
    </AnalyticsContainer>
  );
}

const AnalyticsContainer = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  min-height: calc( 100vh - 200px );
  background-color: #F4E285;
`;

const Header = styled.h1`
  font-size: 50px;
  margin: 20px;
  font-weight: bolder;
  color: #213a32;
  width: 100%;
  text-align: center;
`;

const Subheader = styled.h2`
  font-size: 15px;
  width: 60%;
  margin: auto;
  font-weight: normal;
`

export default Analytics