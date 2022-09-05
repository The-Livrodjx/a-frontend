import { Alert, AlertDescription, AlertIcon, Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormControl, IconButton, Input, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BsFillCloudSunFill, BsFillMoonFill, BsSearch, BsArrowBarLeft } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../../contexts/UserContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from "next/link";
import Router from "next/router";

export default function Header() {
  const {
    isAuthenticated,
    profileImage,
    login,
    logout,
    username
  } = useContext(UserContext);
  const [hasError, setHasError] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data: any) {
    const { email, password } = data;
    let response = new Promise((resolve) => resolve(login(email, password)));
    response.then((result) => {
      if (!result) setHasError(true); reset();
    })
    setHasError(false);
    return false;
  };

  return (
    <>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <DrawerCloseButton />
          {isAuthenticated ? (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Avatar
                  name={username}
                  src={profileImage}
                  w={120}
                  h={120}
                  my={3}

                />
                <Box
                  mt='5'
                  mb='8'
                  fontWeight='semibold'
                  as='h1'
                  fontSize={21}
                  lineHeight='tight'
                  noOfLines={3}
                  textAlign="center"
                >
                  {username}
                </Box>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  width='100%'
                  py={2}
                  mb={2}
                >
                  <Button
                    bg="#fa5e78"
                    color="#ffffff"
                    onClick={() => { onClose(); Router.push('/profile') }}
                  >Edit Profile</Button>
                </Box>
              </Box>
              <Button
                mb={5}
                bg="transparent"
                onClick={() => {
                  logout(); 
                  Router.push('/'); 
                  onClose()
                }}
              >
                <BsArrowBarLeft />
                <span style={{ marginLeft: 5 }}>Log out</span>
              </Button>
            </>
          ) : (
            <>
              <DrawerHeader mt={20}>Log in your account</DrawerHeader>

              <DrawerBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  {(Object.entries(errors).length > 0 || hasError) && (
                    <Alert status='error'>
                      <AlertIcon />
                      <AlertDescription>Invalid credentials</AlertDescription>
                    </Alert>
                  )}
                  <Input
                    my={8}
                    type="text"
                    placeholder='E-mail'
                    focusBorderColor="#fa5e78"
                    defaultValue=""
                    {...register('email')}
                    onChange={() => { }}
                  />
                  <Input
                    mb={8}
                    type="password"
                    placeholder='***'
                    focusBorderColor="#fa5e78"
                    defaultValue=""
                    {...register('password')}
                    onChange={() => { }}
                  />
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    width='100%'
                    py={2}
                    mb={2}
                  >
                    <Button type="submit">
                      Log in
                    </Button>
                  </Box>
                </form>
                <Text mb={10} onClick={() => onClose()}>
                  <Link href="/signin">
                    Create your account here
                  </Link>
                </Text>
              </DrawerBody>
            </>
          )}


        </DrawerContent>
      </Drawer>

      <Flex
        w="100%"
        align="center"
        justify="space-between"
        minH="75px"
        py={4}
        px={10}
      >
        <Image
          src="/imgs/logo.png"
          alt="Profile image"
          width="125px"
          height="125px"
          objectFit="contain"
          style={{
            cursor: "pointer"
          }}
          onClick={() => { Router.push('/') }}
        ></Image>

        <Box
          display="inline-flex"
          alignItems="center"
        >
          <Input
            w={500}
            focusBorderColor="#fa5e78"
            type='email'
            borderRight="none"
            borderRightRadius={0}
            value=""
            onChange={() => { }}
          />

          <IconButton
            height={41}
            aria-label='Search database'
            borderLeftRadius={0}
            icon={<BsSearch />}
            ml="-1px"
          />
        </Box>

        <Box
          display="inline-flex"
          alignItems="center"
        >

          <Button
            m={2}
            onClick={() => { toggleColorMode() }}
          >{colorMode === "dark"
            ? <BsFillCloudSunFill fontSize={25} />
            : <BsFillMoonFill fontSize={25} />
            }
          </Button>
          <Button
            onClick={onOpen}
          >
            <GiHamburgerMenu />
          </Button>
        </Box>

      </Flex>
    </>
  )
}