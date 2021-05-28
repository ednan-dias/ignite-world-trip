import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { useRouter } from "next/router";

SwiperCore.use([Navigation, Pagination, Autoplay]);
import "swiper/swiper-bundle.css";

import { Header } from "../components/Header";
import { GetServerSideProps } from "next";
import { api } from "../services/api";

interface HomeProps {
  continentes: [
    {
      id: number;
      nome: string;
      texto: string;
      imagem: string;
    }
  ];
}

export default function Home({ continentes }: HomeProps): JSX.Element {
  const router = useRouter();

  const items = [
    { image: "/cocktail.svg", text: "vida noturna" },
    { image: "/surf.svg", text: "praia" },
    { image: "/building.svg", text: "moderno" },
    { image: "/museum.svg", text: "clássico" },
    { image: "/earth.svg", text: "e mais..." },
  ];

  const handleChangeContinent = (id: number) => {
    router.push(`/continente/${id}`);
  };

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      overflow="hidden"
    >
      <Header />
      <Box
        w="100%"
        h="335px"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        padding="25px"
        backgroundImage="url(/background.png)"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="flex-start"
          margin="0 auto"
        >
          <Heading fontWeight="normal" fontSize="36px" color="white">
            5 Continentes, <br /> infinitas possibilidades.
          </Heading>
          <Text as="p" mt="32px" color="white">
            Chegou a hora de tirar do papel a viagem que você <br /> sempre
            sonhou.
          </Text>
        </Box>

        <Box position="relative">
          {isWideScreen && (
            <Image
              src="/airplane.svg"
              position="absolute"
              ml="125px"
              top="75px"
              w="417.15px"
              h="270.74px"
            />
          )}
        </Box>
      </Box>

      {isSmallScreen && (
        <Box
          w="275px"
          h="120px"
          mt="45px"
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {items.map((item) => (
            <Box
              w="136px"
              h="21px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gridGap="10px"
            >
              <Image src="/point.png" />
              <Text fontSize="18px" color="#47585B" fontWeight="500">
                {item.text}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {isWideScreen && (
        <HStack w="100%" maxW="1160px" height="145px" mt="100px" spacing="auto">
          {items.map((item, index) => (
            <Box
              key={index}
              w="158px"
              h="145px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image w="85px" h="85px" src={item.image} />
              <Text
                as="p"
                color="#47585B"
                fontSize="16px"
                mt="10px"
                fontWeight="600"
              >
                {item.text}
              </Text>
            </Box>
          ))}
        </HStack>
      )}

      <Divider
        m={["50px 0",  "100px 0"]}
        borderColor="#47585B"
        borderWidth="2px"
        borderStyle="solid"
        w="90px"
      />

      <Flex
        w="100%"
        h="auto"
        p="35px 0"
        flexDirection="column"
        align="center"
        justify="center"
      >
        <Heading textAlign="center" fontWeight="normal" color="#47585B">
          Vamos nessa? <br /> Então escolha seu continente
        </Heading>
      </Flex>

      <Flex w="100%" h="450px" mb="35px" maxW={1240}>
        <Swiper
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          autoplay
          navigation
        >
          {continentes?.map((continente) => (
            <SwiperSlide
              style={{ display: "flex", flex: 1 }}
              key={continente.nome}
              onClick={() => handleChangeContinent(continente.id)}
            >
              <Box
                w="1240px"
                h="450px"
                p="0 30px"
                backgroundImage={`url(${continente.imagem})`}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Heading
                  fontSize="48px"
                  color="#F5F8FA"
                  textShadow="1px 1px 1px black"
                >
                  {continente.nome}
                </Heading>

                <Text
                  fontSize="24px"
                  color="#F5F8FA"
                  fontWeight="bold"
                  textShadow="1px 1px 1px black"
                >
                  {continente.texto}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("/continentes");

  return {
    props: {
      continentes: response.data,
    },
  };
};
