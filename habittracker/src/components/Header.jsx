import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from '../assets/habittracker.png';
import { FaUser } from "react-icons/fa";
import { ButtonGroup,  IconButton } from '@chakra-ui/react'


function Header() {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLeft>
          <HabittrackerLogo src={Logo} alt="Logo" />
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
            <IconButton as="a" href="/Profile" aria-label="Profile" icon={<FaUser fontSize="1.25rem"/>} />
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
  padding-right: 10px;
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
  font-weight: bold;
  color: #0D3B66;
  font-size: large;
  margin: 20px;
  font-family: 'Arvo', serif;
  &:hover{
    color: white;
    font-weight: bolder;
  }
`;

const HabittrackerLogo = styled.img`
  height: 50%;
  margin: auto;
`

export default Header;