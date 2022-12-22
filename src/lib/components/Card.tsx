import { Flex, Text, Button, Input } from "@chakra-ui/react";
import type { FC } from "react";
import { useState } from "react";

interface CardProps {
  text: string;
  onChange: (arg0: string) => void;
  date: string;
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
  onUpdateClick: () => void;
}

export const Card: FC<CardProps> = ({
  text,
  date,
  onChange,
  onDeleteClick,
  onUpdateClick,
}) => {
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  return (
    <Flex
      direction="column"
      gap={4}
      w="full"
      background="gray.900"
      p={4}
      borderRadius={4}
      boxShadow="1px 10px 39px -14px rgba(255,255,255,0.35)"
    >
      <Text>{date}</Text>
      <Input
        width="100%"
        variant="flushed"
        defaultValue={text}
        onChange={(e) => {
          onChange(e.currentTarget.value);
          if (e.currentTarget.value !== text) {
            setShowUpdateButton(true);
          } else {
            setShowUpdateButton(false);
          }
        }}
      />
      <Flex gap={4}>
        <Button onClick={onDeleteClick}>Delete</Button>
        {showUpdateButton && (
          <Button
            onClick={() => {
              onUpdateClick();
              setShowUpdateButton(false);
            }}
          >
            Update
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
