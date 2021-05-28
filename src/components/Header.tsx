import React from "react";
import { Flex, Image, Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  const router = useRouter();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1440px"
      h="100px"
      bg="white"
      alignItems="center"
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
      position="relative"
    >
      {router.asPath !== "/" && (
        <Box
          as="button"
          w={16}
          h={16}
          background="none"
          ml={{lg: "140px", sm: "30px"}}
          border="0"
          position="absolute"
          left="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            background: "none",
            border: 0,
          }}
          onClick={() => router.back()}
        >
          <Image src="/back.svg" w="auto" h="auto" mr={{lg: 0, sm: 70}} />
        </Box>
      )}
      <Image src="/logo.svg" alt="world trip" />
    </Flex>
  );
};

export { Header };
