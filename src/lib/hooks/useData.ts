import { useToast } from "@chakra-ui/react";
import type { Query } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { Note, UpdateNote } from "lib/types/firebase";

const URL = process.env.NEXT_PUBLIC_FIREBASE_API_ID;
const TOAST_POSITION = "bottom-right";

export const useData = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery(["notes"], async (): Promise<Record<string, Note>> => {
    const response = await fetch(`${URL}.json`);
    return response.json();
  });

  const post = useMutation<Query, unknown, Note, unknown>({
    mutationFn: (newNote) => {
      return axios.post(`${URL}.json`, newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        position: TOAST_POSITION,
        title: "Note added.",
        description: "Note was successfully added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const remove = useMutation<Query, unknown, string, unknown>({
    mutationFn: (key) => {
      return axios.delete(`${URL}/${key}.json`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        position: TOAST_POSITION,
        title: "Note deleted.",
        description: "Note was successfully deleted",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const update = useMutation<Query, unknown, UpdateNote, unknown>({
    mutationFn: (note) => {
      return axios.put(`${URL}/${note.key}.json`, {
        date: note.date,
        title: note.title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({
        position: TOAST_POSITION,
        title: "Note updated.",
        description: "Note was successfully updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return {
    query,
    post,
    update,
    remove,
  };
};
