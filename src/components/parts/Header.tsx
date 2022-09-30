import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { signInWithGoogle } from "../../service/firebase";
import { auth } from "../../service/firebase";

const Header: React.FC = () => {
  return (
    <Flex
      px={4}
      w="100%"
      h="60px"
      backgroundColor="gray.300"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading fontSize="md">StudyApp</Heading>
      <Box>
        <Button onClick={signInWithGoogle}>Login</Button>
        <Button onClick={() => auth.signOut()}>Logout</Button>
      </Box>
    </Flex>
  );
};

export default Header;
