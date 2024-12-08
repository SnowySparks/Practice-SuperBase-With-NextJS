"use client";

import { Button, Input } from "@material-tailwind/react";
import Todo from "components/todo";

export default function Home() {
  return (
    <div className="w-full flex flex-col mx-auto items-center gap-2">
      <Input
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
      />
      <Todo />
      <Button className="w-[20%] min-w-[150px]" size="sm">
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
