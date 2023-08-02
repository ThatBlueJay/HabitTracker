import React from "react";
import styled, {keyframes }from "styled-components";
import Logo from '../assets/habittracker.png';
import { FaUser, FaHome, FaGripHorizontal, FaCalendarDay, FaCalculator} from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'


function Header() {

  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLeft>
          <HabittrackerLogo src={Logo} alt="Logo" />
        </HeaderLeft>
        <HeaderCenter>
          {/* <HeaderNavigationContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/Habits">Habits</StyledLink>
            <StyledLink to="/Calendar">Calendar</StyledLink>
            <StyledLink to="/Analytics">Analytics</StyledLink>
          </HeaderNavigationContainer> */}
        </HeaderCenter>
        <HeaderRight>
          <HeaderNavigationContainer>
            <ButtonGroup>
              <IconButton variant="none" as="a" href="/" aria-label="Home" icon={<FaHome fontSize="1.75rem" color="#FFFFFF"/>} />
              <TextA>Home</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Habits" aria-label="Habits" icon={<FaGripHorizontal fontSize="1.75rem" color="#FFFFFF"/>} />
              <TextA>Habits</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Calendar" aria-label="Calendar" icon={<FaCalendarDay fontSize="1.75rem" color="#FFFFFF"/>} />
              <TextA>Calendar</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Analytics" aria-label="Analytics" icon={<FaCalculator fontSize="1.75rem" color="#FFFFFF"/>} />
              <TextA>Analytics</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Profile" aria-label="Profile" icon={<FaUser fontSize="1.75rem" color="#FFFFFF"/>} />
              <TextA>Profile</TextA>
            </ButtonGroup>

          </HeaderNavigationContainer>
        </HeaderRight>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.nav`
  width: 100%;
  background-color: #5B8E7D;
  display: flex;
  flex-direction: column;
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-left: 10px;
`;

const HeaderCenter = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
`;

const HeaderInnerContainer = styled.div`
  width: auto;
  height: 120px;
  display: flex;
`;

const HeaderNavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const TextA = styled.h1`
`;

const HabittrackerLogo = styled.img`
  margin: auto;
  margin-left: 5vw;
  padding: 10px;
  &:hover {
    background-color: #BC4B51;
    border-radius: 25px;
    transform: scale(1.2);
  }
`

const ButtonGroup = styled.div`
  padding: 6px 15px 6px 5px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  color: #FFFFFF00;
  font-family: 'Arvo', serif;
  opacity: 1!important;
  &:hover {
    background-color: #BC4B51; 
    border-radius: 25px;
    color: #FFFFFF;
    opacity: 1;
    transform: scale(1.2);
    margin: 10px;
  }

`

export default Header;