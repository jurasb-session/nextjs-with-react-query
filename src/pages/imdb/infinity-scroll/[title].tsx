import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Nav } from "lib/components/Nav";
import { API_PATHS, options } from "lib/constants/constants";
import { idToPageLink } from "lib/constants/utils";
import type { Movie, Query } from "lib/types/types";
import { URLS } from "lib/types/types";

export const InfinityScroll = () => {
  const router = useRouter();
  const title = router.query.title as string;

  const { ref, inView } = useInView();

  const fetchMovies = async ({ pageParam = "0" }) => {
    const url = new URL(API_PATHS[URLS.FIND_MOVIES]);
    url.searchParams.append("title", title);
    url.searchParams.append("paginationKey", pageParam);
    url.searchParams.append("limit", "9");
    return fetch(url, options).then((response) =>
      response.json()
    ) as Promise<Query>;
  };

  const {
    fetchNextPage,
    status,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
  } = useInfiniteQuery<Query, { message: string }, Query>(
    ["movies"],
    fetchMovies,
    {
      enabled: !!title,
      getPreviousPageParam: (page: Query) => {
        return Math.max(0, Number(page.paginationKey));
      },
      getNextPageParam: (page: Query) => {
        return Math.min(
          Math.ceil(page.totalMatches / 9),
          Number(page.paginationKey)
        );
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    <span>Error: {error.message}</span>;
  }

  const getButtonLavel = () => {
    if (isFetchingNextPage) {
      return "Loading more...";
    }
    if (hasNextPage) {
      return "Load Newer";
    }
    return "Nothing more to load";
  };

  const pageTitle = "Infinity Scroll";

  return (
    <Box>
      <NextSeo title={pageTitle} />
      <Nav title={pageTitle} />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={2} p={8}>
          {data?.pages.map((page) => (
            <Fragment key={page.paginationKey}>
              {page.results?.map((movie: Movie) => (
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
                      src={
                        movie.image?.url || "/movie-picture-placeholder.webp"
                      }
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
            </Fragment>
          ))}
        </Grid>
      </Flex>
      <Button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {getButtonLavel()}
      </Button>
    </Box>
  );
};

export default InfinityScroll;
