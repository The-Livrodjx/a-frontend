import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from './contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  )
}

export default MyApp
