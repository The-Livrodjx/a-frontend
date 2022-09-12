import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileContext } from "../../contexts/FileContext";
import { MdFileUpload } from 'react-icons/md';
import { CgCloseO } from "react-icons/cg";

export default function DropFile() {
  const { handleFile, setHasPreview, hasPreview } = useContext(FileContext);
  const [videoSrc, setVideoSrc] = useState('');
  const [dropColor, setDropColor] = useState('transparent');

  const onDrop = useCallback((file: Object | any) => {
    if (!file.length) return false;
    const src = URL.createObjectURL(new Blob([file[0]], { type: 'video/mp4' }));
    setVideoSrc(src)
    setHasPreview(true);
    handleFile(file);
  }, []);

  const clearVideo = () => {
    setVideoSrc('');
    setHasPreview(false);
    handleFile(undefined);
  }

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4']
    }
  });
  useEffect(() => {
    isDragAccept
      ? setDropColor('teal.500')
      : setDropColor('transparent');
  }, [isDragAccept]);
  useEffect(() => {
    isDragReject
      ? setDropColor('red.300')
      : setDropColor('transparent');
  }, [isDragReject]);
  return (
    <>
      <Flex
        w={300}
        flexDirection="column"
        align="center"
      >
        {!hasPreview ? (
          <Box
            {...getRootProps()}
            display="flex"
            flexDirection="column"
            alignItems="center"
            w={275}
            my={10}
            border="2px dashed #bbbbbb"
            borderRadius=".5rem"
            p="1rem"
            cursor="pointer"
            backgroundColor={dropColor}
          >
            <IconButton
              aria-label="Upload Video"
              p={6}
              m={2}
              my={6}
              icon={<MdFileUpload fontSize={32} />}
            />

            <input {...getInputProps()} />
          </Box>
        ) : (
          <Box
            w={275}
            my={10}
            position="relative"
          >
            <IconButton 
              aria-label="close" 
              bg="transparent"
              position="absolute"
              right="2%"
              top="2%"
              zIndex={999}
              icon={<CgCloseO fontSize={21}/>}
              onClick={() => clearVideo()}
            />
            <video id="video-sumary" controls src={videoSrc} />
          </Box>
        )}

      </Flex>
    </>
  );
}