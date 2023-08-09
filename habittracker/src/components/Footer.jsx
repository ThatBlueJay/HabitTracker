import React from "react";
import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'

// Define a functional component called Footer
function Footer() {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        {/* Left side of the footer */}
        <FooterLeft>
          <CenteredText>A Software Design and Documentation Project</CenteredText>
        </FooterLeft>
        {/* Right side of the footer */}
        <FooterRight>
          <Created>
            <FooterText>Created by Ascension:</FooterText>
            {/* GitHub icon link */}
            <IconButton variant="none" as="a" href="/" aria-label="Github" icon={<FaGithubSquare fontSize="1.5rem" color="#FFFFFF" />} />
          </Created>
        </FooterRight>
      </FooterInnerContainer>
    </FooterContainer>
  );
}

// Styled components for different parts of the footer

// Styling for the main footer container
const FooterContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: white;
  display: block;
  flex-direction: column;
  color: #BC4B51;
  font-family: 'Work Sans', sans-serif;
`;

// Styling for the inner container within the footer
const FooterInnerContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  };
`;

// Styling for the left side of the footer
const FooterLeft = styled.div`
  display: flex;
  flex: 50%;
  align-items: center;
  height: 100%; /* Take full height of the FooterContainer */
  padding-left: 3vw;
`;

// Styling for the right side of the footer
const FooterRight = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3vw;
  position: relative;
`;

// Styling for the footer text
const FooterText = styled.p``;

// Styling for centered text
const CenteredText = styled.p`
  font-weight: bold;
`;

// Styling for the "Created by Ascension" section
const Created = styled.div`
  background-color: #BC4B51;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 1em;
  height: 100%;
  color: white;
`

// Export the Footer component as the default export of this module
export default Footer;