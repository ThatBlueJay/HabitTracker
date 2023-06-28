import React from "react";
import styled from "styled-components";

function Profile() {
  return(
    <ProfileContainer>
      <Header>Welcome to Habit Tracker!</Header>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
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

export default Profile