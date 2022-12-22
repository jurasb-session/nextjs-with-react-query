import { Flex, Button, Text, Input, Progress, Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Card } from "lib/components/Card";
import { useData } from "lib/hooks/useData";
import type { UpdateNote } from "lib/types/firebase";
import { getCurrentDate } from "lib/utils/getCurrentDate";

const Firebase = () => {
  const [value, setValue] = useState<string>();
  const [updatedValue, setUpdatedValue] = useState<string>("");
  const queryClient = useQueryClient();
  const { query, post, update, remove } = useData();

  const onSaveClick = (note: string | undefined) => {
    if (note) {
      post.mutate({
        date: getCurrentDate(),
        title: note,
      });
    }
  };

  const onDeleteClick = (key: string) => {
    remove.mutate(key);
  };

  const onUpdateClick = (note: UpdateNote) => {
    update.mutate(note);
  };

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
      <Flex gap={4} width="full" direction="column">
        <Text>Note to be saved:</Text>
        <Flex gap={4}>
          <Input
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
          />
          <Button
            onClick={() => {
              onSaveClick(value);
            }}
            disabled={!value}
          >
            Save
          </Button>
        </Flex>
        {queryClient.isFetching() ? (
          <Progress isIndeterminate size="sm" />
        ) : (
          <Box height="8px" />
        )}
      </Flex>
      {query.isFetched &&
        query.data &&
        Object.keys(query?.data).map((key) =>
          [...Array(query.data[key])].map((item) => (
            <Card
              key={key}
              text={item.title}
              date={item.date}
              onChange={(val: string) => setUpdatedValue(val)}
              onDeleteClick={() => onDeleteClick(key)}
              onUpdateClick={() =>
                onUpdateClick({
                  key,
                  date: getCurrentDate(),
                  title: updatedValue,
                })
              }
            />
          ))
        )}
    </Flex>
  );
};

export default Firebase;
