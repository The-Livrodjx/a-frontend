import { Badge, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { api } from './api/api';
import Pagination from './components/Pagination';
import { useMedias } from '../services/hooks/useMedias';
import Link from 'next/link';

export interface ITags {
  id: number;
  name: string;
};

interface IMedia {
  id: string;
  title: string | null;
  file_name: string;
  file_path: string;
  file_length: number;
  file_type: string;
  tags: ITags[] | null
};

export interface HomeProps {
  medias: Array<IMedia>;
  totalCount: number;
}

export default function Home({ medias, totalCount }: HomeProps) {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    error
  } = useMedias(page);
  
  return (
    <>
      {isLoading ? (
        <Flex justify="center" mt="20">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center" mt="20">
          <Text> Failed to receive data.</Text>
        </Flex>
      ) : (
        <Flex
          w="100%"
          h="auto"
          flexDirection="column"
          align="center"
          justify="center"
          mb={20}
        >

          <Flex
            w="100%"
            h="auto"
            align="center"
            justify="center"
            flexWrap="wrap"
          >
            <Head>
              <title>A-Project</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <>
              {
                data?.mediaList.map((media: IMedia) => (
                  <Box
                    maxW="300px"
                    minH="400px"
                    maxH="500px"
                    borderWidth='1px'
                    borderRadius='lg'
                    overflow='hidden'
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    m={10}
                    key={media.id}
                  >
                    <HoverVideoPlayer
                      style={{
                        cursor: 'pointer',
                        minHeight: "280px",
                        maxHeight: "300px"
                      }}
                      videoSrc={`http://localhost:6969/medias/${media.file_name}`}>
                    </HoverVideoPlayer>
                    <Box p='6' minH={100}>
                      <Box display='flex' alignItems='baseline' flexWrap="wrap">
                        {media.tags?.map(tag => (
                          <Badge
                            borderRadius='full'
                            px='2'
                            bg='#ff4261'
                            color="#fff"
                            m="2"
                            key={tag.id}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </Box>
                      <Box
                        mt='1'
                        fontWeight='bold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                      >
                        {media.title}
                      </Box>
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
                      >
                        <Link href={`/watch/${media.id}`}>Watch Video</Link>
                      </Button>
                    </Box>
                  </Box>
                ))}
            </>
          </Flex>
          <Pagination
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </Flex>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("/medias/pagination?page=1");
  const data = response.data;
  const pagination = data.meta;
  const medias: IMedia[] = data.items;

  return {
    props: {
      pagination,
      medias
    },
    revalidate: 60
  }
}
