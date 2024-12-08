"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "components/todo";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const todosQuery = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: () => getTodos({ searchInput }),
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),
    onSuccess: () => {
      todosQuery.refetch();
      // refetch하는 또다른 방법
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });
    },
  });

  return (
    <div className="w-full flex flex-col mx-auto items-center gap-2">
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value || "")}
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
      />
      {todosQuery.isPending && <Spinner className="h-12 w-12" />}
      {todosQuery.data &&
        todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}
      <Button
        className="w-[20%] min-w-[150px]"
        size="sm"
        onClick={() => {
          createTodoMutation.mutate();
        }}
        disabled={todosQuery.isPending || todosQuery.isError}
        loading={createTodoMutation.isPending}
      >
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
