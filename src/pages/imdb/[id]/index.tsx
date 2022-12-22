import { Box, Flex, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { options } from "lib/constants/constants";
import { getMovieDetailsUrl } from "lib/constants/utils";
import type { MovieDetails } from "lib/types/types";

export default function PostPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: movie } = useQuery<MovieDetails>([id], () =>
    fetch(getMovieDetailsUrl(id), options).then((response) => response.json())
  );

  if (!movie) {
    return <Box>Movie not found</Box>;
  }

  return (
    <Box>
      <Link href="/imdb">Movies</Link>
      <Flex justify="space-between">
        <Flex align="center">
          <Text as="h1" fontSize="3xl">
            {movie.title.title}
          </Text>
        </Flex>
        <HStack>
          {movie.genres.map((genre) => (
            <Text
              bg="chakra-border-color"
              fontSize="xs"
              borderRadius={16}
              px={2}
            >
              {genre}
            </Text>
          ))}
        </HStack>
      </Flex>
      <Flex py={4}>
        <VStack pr={4}>
          <Image src={movie.title.image.url} alt={movie.title.title} />
        </VStack>
        <VStack>
          <Flex justify="space-between" width="100%">
            <Flex align="flex-end" alignSelf="flex-start">
              <Text fontSize="lg">{movie.ratings.rating}</Text>{" "}
              <Text fontSize="sm">({movie.ratings.ratingCount})</Text>
            </Flex>
            <Text>{movie.releaseDate}</Text>
          </Flex>

          <Text>{movie.plotSummary?.text}</Text>
          <Text>{movie.plotOutline?.text}</Text>
        </VStack>
      </Flex>
    </Box>
  );
}
