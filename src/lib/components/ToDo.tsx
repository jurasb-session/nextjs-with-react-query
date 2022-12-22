import { Box, ListItem, OrderedList } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const Todos = () => {
  // Queries
  const query = useQuery(
    ["todos"],
    async (): Promise<
      Array<{ id: string; userId: number; title: string; body: string }>
    > => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    }
  );

  return (
    <Box>
      <OrderedList>
        {query?.data?.map((todo) => (
          <ListItem key={todo.id}>{todo.title}</ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};
