import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Router from "next/router";
import Image from "next/image";

export default function Profile() {
  const {
    isAuthenticated,
    username,
    profileImage
  } = useContext(UserContext);

  useEffect(() => {

    if (!isAuthenticated) {
      Router.push('/')
    }
  }, [])
  return (
    <>
      <Flex
        w="100vw"
        align="center"
        justify="center"
      >
        <Flex
          mt={8}
          flex={1}
          flexDirection="column"
          align="center"
          justify="center"
        >
          <Avatar
            name={username}
            src={profileImage}
            w={120}
            h={120}
            my={3}
          />
          <Box
            mt='1'
            mb='8'
            fontWeight='semibold'
            as='h1'
            fontSize={21}
            lineHeight='tight'
            noOfLines={1}
            textAlign="center"
          >
            {username}
          </Box>
        </Flex>
        
      </Flex>
    </>
  );
}