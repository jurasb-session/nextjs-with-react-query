import { Flex, Link } from "@chakra-ui/react";

const routes = [
  {
    path: "/imdb",
    title: "Search",
  },
  {
    path: "/imdb/infinity-scroll/avatar",
    title: "Infinity Scroll",
  },
];

export const Nav = ({ title }: { title: string }) => {
  const filteredRoutes = routes.filter((route) => route.title !== title);

  return (
    <Flex>
      {filteredRoutes.map((route) => (
        <Link key={route.path} href={route.path}>
          {route.title}
        </Link>
      ))}
    </Flex>
  );
};

export default Nav;
