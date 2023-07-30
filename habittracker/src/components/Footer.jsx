import React from "react";
import styled from "styled-components";
import { FaFacebookSquare, FaLinkedin, FaGithubSquare, FaInstagram} from "react-icons/fa";
import { ButtonGroup,  IconButton } from '@chakra-ui/react'

function Footer() {
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FooterLeft>
          <FooterText>A Software Design and Documentation Project</FooterText>
        </FooterLeft>
        <FooterRight>
          <FooterText>Created by Ascension:</FooterText>
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="/" aria-label="Github" icon={<FaGithubSquare fontSize="1.25rem" />} />
          </ButtonGroup>
        </FooterRight>
      </FooterInnerContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #F4D35E;
  display: flex;
  flex-direction: column;
  color: #0D3B66;
  font-family: 'Work Sans', sans-serif;
  position: absolute;
  bottom: 0;
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
  padding-left: 5%;
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
  margin: auto;
  opacity: 0.7;
  font-weight: bold;
`

export default Footer;