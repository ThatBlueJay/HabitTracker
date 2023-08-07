import React from "react";
import styled from "styled-components";
import Logo from '../assets/habittracker.png';
import { FaDoorOpen, FaHome, FaGripHorizontal, FaCalendarDay, FaCalculator} from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLeft>
          <HabittrackerLogo src={Logo} alt="Logo" />
        </HeaderLeft>
        <HeaderRight>
          <HeaderNavigationContainer>
            {/* <StyledLink to="/"><FaHome fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
            <StyledLink to="/Habits"><FaGripHorizontal fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
            <StyledLink to="/Calendar"><FaCalendarDay fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
            <StyledLink to="/Analytics"><FaCalculator fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
            <StyledLink to="/"><FaDoorOpen fontSize="1.7rem" color="#FFFFFF"/></StyledLink> */}

            <ButtonGroup>
              <StyledLink to="/"><FaHome fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              <TextA>Home</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <StyledLink to="/Habits"><FaGripHorizontal fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              <TextA>Habits</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <StyledLink to="/Calendar"><FaCalendarDay fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              <TextA>Calendar</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <StyledLink to="/Analytics"><FaCalculator fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              <TextA>Analytics</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <StyledLink to="/"><FaDoorOpen fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              <TextA>Log Out</TextA>
            </ButtonGroup> 

            {/* <ButtonGroup>
              <IconButton variant="none" as="a" href="/" aria-label="Home" icon={<FaHome fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Home</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Habits" aria-label="Habits" icon={<FaGripHorizontal fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Habits</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Calendar" aria-label="Calendar" icon={<FaCalendarDay fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Calendar</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/Analytics" aria-label="Analytics" icon={<FaCalculator fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Analytics</TextA>
            </ButtonGroup>

            <ButtonGroup>
              <IconButton variant="none" as="a" href="/" aria-label="Log Out" icon={<FaDoorOpen fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Log Out</TextA>
            </ButtonGroup> */}

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

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bolder;
  color: #0D3B66;
  font-size: large;
  margin: 5px;
`;



export default Header;