import React, {useContext} from "react";
import styled from "styled-components";

import { LoginContext } from "../App.js"; 
import { Navigate } from "react-router-dom";


function Analytics() {
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

export default Analytics