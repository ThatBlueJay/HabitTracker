import React from "react";
import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";
import { IconButton } from '@chakra-ui/react'

function Footer() {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FooterLeft>
          <CenteredText>A Software Design and Documentation Project</CenteredText>
        </FooterLeft>
        <FooterRight>
          <Created>
            <FooterText>Created by Ascension:</FooterText>
            <IconButton variant="none" as="a" href="/" aria-label="Github" icon={<FaGithubSquare fontSize="1.5rem" color="#FFFFFF" />} />
          </Created>
        </FooterRight>
      </FooterInnerContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: white;
  display: block;
  flex-direction: column;
  color: #BC4B51;
  font-family: 'Work Sans', sans-serif;
`;

const FooterInnerContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  } ;
`;

const FooterLeft = styled.div`
  display: flex;
  flex: 50%;
  align-items: center;
  height: 100%; /* Take full height of the FooterContainer */
  padding-left: 3vw;
`;

const FooterRight = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3vw;
  position: relative;
`;

const FooterText = styled.p`
`;

const CenteredText = styled.p`
  font-weight: bold;
`;

const Created = styled.div`
  background-color: #BC4B51;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 1em;
  height: 100%;
  color: white;
`

export default Footer;