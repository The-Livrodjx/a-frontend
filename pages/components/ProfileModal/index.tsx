import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ProfileModal() {
  const [inputValue, setInputValue] = useState('');
  const { handleProfileModal, handleProfileImage } = useContext(UserContext);
  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    }
    catch (e) {
      return false;
    };
  };
  const setUrl = () => {

    let valid = isValidUrl(inputValue)

    if (valid) handleProfileImage(inputValue);
    handleProfileModal(false);
  };

  return (
    <>
      <Flex
        position="absolute"
        left="0"
        top="0"
        align="center"
        justify="center"
        zIndex={8}
        w="100%"
        h="100vh"
      >
        <Flex
          position="absolute"
          left="0"
          top="0"
          w="100%"
          h="100vh"
          zIndex={8}
          bgColor="rgba(0,0,0,0.4)"
          onClick={() => handleProfileModal(false)}
        >

        </Flex>
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={5}
          w="40.625rem"
          h={200}
          bg="#1A202C"
          zIndex={9}
        >
          <Box
            display="inline-flex"
            position="absolute"
            w="350px"
          >

            <Input
              type="text"
              w="300px"
              position="absolute"
              color="whitesmoke"
              placeholder="Insert URL image"
              focusBorderColor="#fa5e78"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              borderRight="none"
              borderRightRadius={0}
              onKeyDown={ event => { if (event.key == "Enter") setUrl() } }
              zIndex={9}
            ></Input>
            <IconButton
              ml="85%"
              position="absolute"
              zIndex={9}
              bgColor="#fa5e78"
              _hover={{ background: "#fa5e78" }}
              aria-label="close"
              color="#fff"
              style={{ color: "white" }}
              onClick={() => setUrl()}
              icon={
                <AiOutlineCheck
                  height={41}
                  className="icon-livro"
                />
              }
            />
          </Box>
        </Box>
      </Flex>
    </>
  )
}