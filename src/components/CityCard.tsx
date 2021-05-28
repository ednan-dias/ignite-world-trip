import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

interface CityCardProps {
  foto: string;
  cidade: string;
  pais: string;
  bandeira: string;
}

const CityCard = ({
  foto,
  cidade,
  pais,
  bandeira,
}: CityCardProps): JSX.Element => {
  return (
    <Box
      w="256px"
          h="279px"
          mb="45px"
      display="flex"
      flexDirection="column"
      border="1px solid #FFBA08"
      borderRadius="5px"
    >
      <Image w="256px" h="173px" src={foto} border="0" />
      <Box
        display="flex"
        p="0 20px"
              h="100%"
              bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text as="p" fontSize="20px" fontWeight="600"  maxW="124px">
            {cidade}
          </Text>
          <Text as="p" fontSize="16px" color="#999999">
            {pais}
          </Text>
        </Box>
        <Image src={bandeira} w="100%" maxW="30px" maxH="30px" h="100%" borderRadius="50%" />
      </Box>
    </Box>
  );
};

export default CityCard;
