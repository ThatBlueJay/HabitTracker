import React from "react";
import styled from "styled-components";
import Logo from '../assets/habittracker.png';
import { FaDoorOpen, FaHome, FaGripHorizontal, FaCalendarDay, FaCalculator } from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'
import { Link } from "react-router-dom";

// Define a functional component called Header
function Header() {
  return (
    // Main container for the header
    <HeaderContainer>
      <HeaderInnerContainer>
        {/* Left side of the header */}
        <HeaderLeft>
          {/* Logo */}
          <HabittrackerLogo src={Logo} alt="Logo" />
        </HeaderLeft>
        {/* Right side of the header */}
        <HeaderRight>
          {/* Container for navigation and logout */}
          <HeaderNavigationContainer>
            
            {/* Navigation buttons */}
            {/* Each ButtonGroup includes an icon and text */}
            <ButtonGroup>
              {/* StyledLink component is used for navigation */}
              <StyledLink to="/"><FaHome fontSize="1.7rem" color="#FFFFFF"/></StyledLink>
              {/* TextA component for button text */}
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
            
            {/* Logout button */}
            <ButtonGroup>
              {/* IconButton for logout */}
              <IconButton variant="none" as="a" href="/" aria-label="Log Out" icon={<FaDoorOpen fontSize="1.7rem" color="#FFFFFF"/>} />
              <TextA>Log Out</TextA>
            </ButtonGroup>
            
          </HeaderNavigationContainer>
        </HeaderRight>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
}

// Styled components for different parts of the header

// Styling for the main header container
const HeaderContainer = styled.nav`
  width: 100%;
  background-color: #5B8E7D;
  display: flex;
  flex-direction: column;
`;

// Styling for the left side of the header
const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-left: 10px;
`;

// Styling for the right side of the header
const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
`;

// Styling for the inner container within the header
const HeaderInnerContainer = styled.div`
  width: auto;
  height: 120px;
  display: flex;
`;

// Styling for the container of navigation items
const HeaderNavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

// Styling for button text
const TextA = styled.h1`
  /* Add styling for text if needed */
`;

// Styling for the HabittrackerLogo
const HabittrackerLogo = styled.img`
  margin: auto;
  margin-left: 5vw;
  padding: 10px;
  /* Add hover effect styling */
`;

// Styling for each button group
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
  /* Add hover effect styling */
  &:hover {
    background-color: #BC4B51; 
    border-radius: 25px;
    color: #FFFFFF;
    opacity: 1;
    transform: scale(1.2);
    margin: 10px;
  }
`;

// Styling for StyledLink component
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bolder;
  color: #0D3B66;
  font-size: large;
  margin: 5px;
`;

// Export the Header component as the default export of this module
export default Header;
