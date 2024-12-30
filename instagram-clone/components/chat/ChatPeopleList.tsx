"use client";
import Person from "./Person";
import {
  useSelectedIndexStore,
  useSelectedUserIdState,
} from "utils/store/selectedUserIdStore";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "actions/chatAction";
import { User } from "node_modules/@supabase/auth-js/dist/module";

interface ChatPeopleListProps {
  loggedInUser?: User;
}

export default function ChatPeopleList({ loggedInUser }: ChatPeopleListProps) {
  const { selectedUserId, setSelectedUserId } = useSelectedUserIdState();
  const { selectedIndex, setSelectedIndex } = useSelectedIndexStore();

  const getAllUserQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
      const allUser = await getAllUsers();
      return allUser.filter((user) => user.id !== loggedInUser?.id);
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      {getAllUserQuery.data?.map((user, index) => (
        <Person
          key={user.id}
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedIndex(index);
          }}
          index={index}
          isActive={selectedUserId === user.id}
          name={user.email.split("@")[0]}
          onChatScreen={false}
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
    </div>
  );
}
