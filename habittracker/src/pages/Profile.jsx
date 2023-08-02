import React, { useContext } from "react";
import styled from "styled-components";
import { Image, Box, Flex, Text, HStack } from '@chakra-ui/react';
import { Navigate } from "react-router-dom";
import { LoginContext } from "../App.js";


function Profile(props) {
  const { login } = useContext(LoginContext);

  const username = props.username;
  const email = props.email;
  const phone = props.phone;
  if(!login) {
    return <Navigate to="/" />
  }
  return(
    <ProfileContainer>
      <Flex bg="#edf3f8"
            _dark={{ bg: "#3e3e3e", }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
      >
        <Flex
          shadow="lg"
          rounded="lg"
          bg="#edf3f8"
          _dark={{
            bg: "gray.800",
          }}
          mb={8}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="#edf3f8"
            _dark={{
              bg: "#3e3e3e",
            }}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            height="100%"
            width="100%"
            borderRadius="lg"
            p={8}
            display="flex"
            alignItems="left"
          >
            <Image
              src="https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Profile Picture"
              borderRadius="full"
              boxSize="150px"
              shadow="lg"
              border="5px solid"
              mb={-20}
              borderColor="gray.800"
              _dark={{
                borderColor: "gray.200",
              }}
            />
          </Box>
          <Box
            gridColumn="span 8"
            p={8}
            width="full"
            height="full"
            borderRadius="lg"
            textAlign="left"
            mt={10}
          >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "white",
            }}
          >
            {username}
            </Text>
            <HStack
              spacing={3}
              color="gray.800"
              _dark={{
                color: "gray.200",
              }}
            >
              </HStack>
              <HStack
                spacing={3}
                color="gray.700"
                _dark={{
                  color: "gray.200",
                }}
              >
      </HStack>
      <HStack
        spacing={3}
        color="gray.700"
        _dark={{
          color: "gray.200",
        }}
      >
        <Text fontSize="lg">{email}</Text>
        <Text fontSize="lg">{phone}</Text>
      </HStack>
    </Box>
  </Flex>
</Flex>;
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  height: 95vh;
`


export default Profile
