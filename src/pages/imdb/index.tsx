import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Link,
  Image,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRef } from "react";

import { Nav } from "lib/components/Nav";
import { API_PATHS, options } from "lib/constants/constants";
import { idToPageLink } from "lib/constants/utils";
import type { Movie, Query } from "lib/types/types";
import { URLS } from "lib/types/types";

const Imdb = () => {
  const searchRef = useRef<string>("");

  const { data, mutate } = useMutation<Query, unknown, string, unknown>(
    (search: string) => {
      const url = new URL(API_PATHS[URLS.FIND_MOVIES]);
      url.searchParams.append("title", search);
      url.searchParams.append("limit", "20");
      return fetch(url, options).then((response) =>
        response.json()
      ) as Promise<Query>;
    },
    {
      cacheTime: Infinity,
    }
  );

  const title = "Search";

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title={title} />
      <Nav title={title} />
      <Box>
        <Flex>
          <Input
            onChange={(e) => {
              searchRef.current = encodeURI(e.currentTarget.value);
            }}
          />
          <Button
            ml={4}
            onClick={() => {
              mutate(searchRef.current);
            }}
          >
            Search
          </Button>
        </Flex>

        <Grid templateColumns="repeat(3, 1fr)" gap={2} p={8}>
          {data?.results?.map((movie: Movie) => (
            <GridItem
              key={movie.id}
              opacity={0.6}
              cursor="pointer"
              p={1}
              _hover={{
                outline: "2px solid",
                opacity: 1,
              }}
            >
              <Link href={idToPageLink(movie.id)}>
                <Image
                  src={movie.image?.url || "/movie-picture-placeholder.webp"}
                  alt={movie.title}
                />
                <Text as="h3" fontWeight="bold">
                  {movie.title}
                </Text>
                <Text fontSize="2xs">{movie.titleType}</Text>
                <Text fontSize="xs">{movie.year}</Text>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Imdb;
