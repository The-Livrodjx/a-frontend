import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Router from "next/router";
import { BsPlusSquareDotted } from "react-icons/bs"
import ImageUploading from 'react-images-uploading';
import ProfileModal from "../components/ProfileModal";

export default function Profile() {
  
  const {
    isAuthenticated,
    username,
    profileImage,
    profileModalOpen,
    handleProfileModal
  } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/')
    }
  }, [])
  return (
    <>
      {profileModalOpen && <ProfileModal />}
      <Flex
        w="100vw"
        overflowX="hidden"
        h="auto"
        align="center"
        justify="center"
        style={{
          overflowX: "hidden"
        }}
      >
        <Flex
          mt={3}
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
            cursor="pointer"
            onClick={() => handleProfileModal(true)}
          />
          <Box
            mt='1'
            mb='3'
            fontWeight='semibold'
            as='h1'
            fontSize={21}
            lineHeight='tight'
            noOfLines={1}
            textAlign="center"
          >
            {username}
          </Box>
          <Text
            w={250}
            textAlign="center"
            mb={10}
          >
            The user does not set an description yet, keep going.
          </Text>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={10}
          >
            <Box mx={15}>
              <Box
                mt='1'
                mb='3'
                fontWeight='semibold'
                as='h4'
                fontSize={11}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                Videos Uploaded
              </Box>
              <Box
                mt='1'
                mb='3'
                fontWeight='bold'
                as='h4'
                fontSize={23}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                24 videos
              </Box>
            </Box>
            <Box mx={15}>
              <Box
                mt='1'
                mb='3'
                fontWeight='semibold'
                as='h4'
                fontSize={11}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                Mangás Uploaded
              </Box>
              <Box
                mt='1'
                mb='3'
                fontWeight='bold'
                as='h4'
                fontSize={23}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                0 Mangás
              </Box>
            </Box>
            <Box mx={15}>
              <Box
                mt='1'
                mb='3'
                fontWeight='semibold'
                as='h4'
                fontSize={11}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                Commented Posts
              </Box>
              <Box
                mt='1'
                mb='3'
                fontWeight='bold'
                as='h4'
                fontSize={23}
                lineHeight='tight'
                noOfLines={1}
                textAlign="center"
              >
                1 Posts
              </Box>
            </Box>

          </Flex>

          <Button
            p={7}
          ><BsPlusSquareDotted
              fontSize={20}
              style={{ marginRight: 10 }}
            /><span>Add Video</span></Button>

        </Flex>

      </Flex>
    </>
  );
}