import React from "react";
import { Header } from "../../components/Header";
import {
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { api } from "../../services/api";
import CityCard from "../../components/CityCard";

interface ContinenteProps {
  continente: {
    id: number;
    nome: string;
    texto: string;
    imagem: string;
    info: {
      banner: string;
      conteudo: string;
      paises: number;
      linguas: number;
      cidades: number;
      curiosidade: string;
    };
    cidades: [
      {
        nome: string;
        foto: string;
        pais: {
          nome: string;
          bandeira: string;
        };
      }
    ];
  };
}

const Continente = ({ continente }: ContinenteProps): JSX.Element => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false,
  });

  return (
    <Flex
      as="main"
      w="100%"
      h="auto"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      overflowX="hidden"
    >
      <Header />
      <Flex
        w="100%"
        maxW="1440px"
        h={["500px", "400px"]}
        position="relative"
        align="center"
        justify="center"
        textAlign="center"
        backgroundImage={`url(${continente.info.banner})`}
      >
        <Heading
          color="white"
          fontStyle="normal"
          fontSize="48px"
          position={{ lg: "absolute", sm: "static" }}
          bottom="0"
          left="0"
          ml={{ lg: "140px", sm: "" }}
          mb={{ lg: "72px", sm: "" }}
          textAlign="center"
          textShadow="1px 1px 1px black"
        >
          {continente.nome}
        </Heading>
      </Flex>

      <Flex
        textAlign={{ lg: "justify", sm: "center" }}
        w="100%"
        h="auto"
        p="25px"
        direction={["column", "row"]}
        align="center"
        justify="center"
      >
        <Text fontSize="24px" maxW="600px" color="#47585B">
          {continente.info.conteudo}
        </Text>

        <Box
          w="499px"
          h="auto"
          display="grid"
          gridTemplateColumns="repeat(3,1fr)"
          textAlign="center"
          ml={["0", "50px"]}
          justifyContent="center"
          p={["65px 200px", "0"]}
          gridGap={["35px", "0"]}
        >
          <Box textAlign="center">
            <Text fontSize="48px" fontWeight="600" color="#FFBA08">
              {continente.info.paises}
            </Text>
            <Text fontWeight="600">países</Text>
          </Box>

          <Box textAlign="center">
            <Text fontSize="48px" fontWeight="600" color="#FFBA08">
              {continente.info.linguas}
            </Text>
            <Text fontWeight="600">línguas</Text>
          </Box>

          <Box textAlign="center">
            <Text fontSize="48px" fontWeight="600" color="#FFBA08">
              {continente.info.cidades}
            </Text>

            <Text
              fontWeight="600"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              cidades
              <Tooltip label={continente.info.curiosidade}>
                <Image src="/info.png" w="16px" h="16px" ml="5px" />
              </Tooltip>
            </Text>
          </Box>
        </Box>
      </Flex>

      <Flex
        w="100%"
        h="100%"
        mt={{ lg: 50, sm: 15 }}
        direction="column"
        justify="center"
        align="center"
      >
        <Flex w="100%" maxW="1160px" direction="column" p="15px">
          <Heading fontSize="36px" fontWeight="500" mb={[30, 0]}>
            Cidades
          </Heading>

          {isSmallScreen && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              {continente.cidades?.map((cidade, i) => (
                <CityCard
                  key={i}
                  foto={cidade.foto}
                  cidade={cidade.nome}
                  pais={cidade.pais.nome}
                  bandeira={cidade.pais.bandeira}
                />
              ))}
            </Box>
          )}

          {!isSmallScreen && (
            <Box mt="35px" display="grid" gridTemplateColumns="repeat(4, 1fr)">
              {continente.cidades?.map((cidade, i) => (
                <CityCard
                  key={i}
                  foto={cidade.foto}
                  cidade={cidade.nome}
                  pais={cidade.pais.nome}
                  bandeira={cidade.pais.bandeira}
                />
              ))}
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Continente;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const response = await api.get(`/continentes/${id}`);

  return {
    props: {
      continente: response.data,
    },
  };
};
