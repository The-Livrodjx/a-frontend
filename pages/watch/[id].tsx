import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ITags } from "..";
import { api, api_path } from "../api/api";


export default function Watch() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [tags, setTags] = useState<ITags[]>();

  useEffect(() => {
    const { id } = router.query;

    if(id === undefined) return;
    
    api.get(`/medias/getById/${id}`)
      .then(response => {
        const data = response.data;
        setVideoSrc(`${api_path}/medias/${data.file_name}`);
        setTags(data.tags);
        setVideoTitle(data.title);
        setIsLoading(false);
        setError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, [router.isReady]);
  
  return (
    <>
      <Flex
        w="100%"
        h="100vh"
      >
        {isLoading ? (
          <Flex
            justify="center"
            mt="20"
            w="100%"
            h="100vh"
          >
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex
            w="100%"
            h="100vh"
            justify="center"
            mt="20"
          >
            <Text>The specified media does not exist.</Text>
          </Flex>
        ) : (
          <Flex
            w="100%"
            h="100vh"
            flexDirection="column"
          >
            <Text
              m='2rem'
              fontSize={24}
              fontWeight='bold'
              as='h1'

            >
              {videoTitle}
            </Text>
            <Box
              display='flex'
              alignItems='baseline'
              flexWrap="wrap"
              m='2rem'
            >
              {tags?.map(tag => (
                <Badge
                  borderRadius='full'
                  px='2'
                  bg='#ff4261'
                  color="#fff"
                  mr="2"
                  mb={2}
                  key={tag.id}
                >
                  {tag.name}
                </Badge>
              ))}
            </Box>
            <Box
              w="75%"
              m='2rem'
            >
              <video src={videoSrc} controls></video>
            </Box>

          </Flex>
        )}
      </Flex>
    </>
  );
}