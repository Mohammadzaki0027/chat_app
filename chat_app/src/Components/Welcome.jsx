import { Box, Img, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Welcome = () => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"whiteAlpha.200"}
    >
      <VStack justifyContent={"space-evenly"} width={"80%"} height={"500px"}>
        <Text
          color={"skyblue"}
          textTransform={"uppercase"}
          fontWeight={"extrabold"}
        >
          WelCome to ChatBox
        </Text>
        <Img
          src="https://media.tenor.com/cvwoUZBC3sYAAAAC/whiskey-ei-suoi-amici-coccole-sonore.gif"
          width={"200px"}
          height={"200px"}
          borderRadius={"50px"}
        />
      </VStack>
    </Box>
  );
};

export default Welcome;
