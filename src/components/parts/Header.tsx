import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

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
      <Box>
        <Heading fontSize="md">StudyApp</Heading>
      </Box>
    </Flex>
  );
};

export default Header;
