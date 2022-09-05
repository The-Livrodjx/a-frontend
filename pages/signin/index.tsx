import Router from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Input } from "@chakra-ui/react";

export default function Sigin() {
  const { isAuthenticated, createUser } = useContext(UserContext);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors }: any = formState;

  const onSubmit = (data: any) => {
    console.log(data);
    let response = new Promise(resolve => resolve(createUser(data)))
    response.then((result: any) => {

      if (result.error) {
        setHasError(true);
        console.log(result.error)
        setError(result.error);
        // reset();
      };
    })
    setHasError(false);
    return false;
  }

  if (isAuthenticated) {
    Router.push('/')
  }
  return (
    <>
      <Flex
        w="100%"
        align="center"
        justify="center"
        flexDirection="column"
      >
        <Box
          mt='1'
          mb='8'
          fontWeight='semibold'
          as='h1'
          fontSize={31}
          lineHeight='tight'
          noOfLines={1}
          textAlign="center"
        >
          Create your account
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {(Object.entries(errors).length > 0 || hasError) && (
            <>
              {Object.entries(errors).map((error: any, index: number) => (
                <>
                  <Alert status='error' key={index}>
                    <AlertIcon />
                    <AlertDescription>{error[1].message}</AlertDescription>
                  </Alert>
                </>
              ))}
            </>
          )}

          {error !== "" && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            my={8}
            type="text"
            w={400}
            placeholder='Username'
            focusBorderColor="#fa5e78"
            defaultValue=""
            {...register('name')}
            onChange={() => { }}
          />
          <Input
            mb={8}
            w={400}
            type="email"
            placeholder='E-mail'
            focusBorderColor="#fa5e78"
            defaultValue=""
            {...register('email')}
            onChange={() => { }}
          />
          <Input
            mb={8}
            type="password"
            w={400}
            placeholder='Password'
            focusBorderColor="#fa5e78"
            defaultValue=""
            {...register('password')}
            onChange={() => { }}
          />

          <Button
            bg="#fa5e78"
            color="#ffffff"
            p={6}
            type="submit"
          >Create Account</Button>
        </form>
      </Flex>
    </>
  )
}
