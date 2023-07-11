import React from "react";
import styled from "styled-components";

function Profile(props) {
  const username = props.username;
  const email = props.email;
  const phone = props.phone;

  return(
    <ProfileContainer>
      <Header>Profile</Header>
      <Subheader>Username: {username}</Subheader>
      <Subheader>Email: {email}</Subheader>
      <Subheader>Phone: {phone}</Subheader>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  height: 80vh;
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