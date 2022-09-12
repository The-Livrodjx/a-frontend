import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query'
import UserContextProvider from './contexts/UserContext';
import Header from './components/Header';
import { QueryClient } from "@tanstack/react-query";
import FileContextProvider from './contexts/FileContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FileContextProvider>
        <UserContextProvider>
          <ChakraProvider>
            <Header />
            <Component {...pageProps} />
          </ChakraProvider>
        </UserContextProvider>
      </FileContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
