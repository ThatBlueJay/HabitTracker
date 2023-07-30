import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLeft>
          Logo goes here
        </HeaderLeft>
        <HeaderCenter>
          <HeaderNavigationContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/Habits">Habits</StyledLink>
            <StyledLink to="/Calendar">Calendar</StyledLink>
            <StyledLink to="/Analytics">Analytics</StyledLink>
          </HeaderNavigationContainer>
        </HeaderCenter>
        <HeaderRight>
          <HeaderNavigationContainer>
            <StyledLink to="/Profile">Profile</StyledLink>
          </HeaderNavigationContainer>
        </HeaderRight>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.nav`
  width: 100%;
  background-color: #F4D35E;
  display: flex;
  flex-direction: column;
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
`;

const HeaderInnerContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
`;

const HeaderNavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bolder;
  color: #0D3B66;
  font-size: large;
  margin: 20px;
  font-family: 'Work Sans', sans-serif;
  &:hover{
    color: white;
    border-bottom: white solid 3px;
  }
`;

const Logo = styled.img`
  margin: 10px;
  height: auto;
  max-width: 180px;
`;

export default Header;