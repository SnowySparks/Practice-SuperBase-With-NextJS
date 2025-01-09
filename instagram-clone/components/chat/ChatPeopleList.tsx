"use client";
import Person from "./Person";
import {
  useSelectedIndexStore,
  useSelectedUserIdState,
} from "utils/store/selectedUserIdStore";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "actions/chatAction";
import { User } from "node_modules/@supabase/auth-js/dist/module";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useEffect } from "react";
import { usePresenceStore } from "utils/store/presenseStore";

interface ChatPeopleListProps {
  loggedInUser?: User;
}

export default function ChatPeopleList({ loggedInUser }: ChatPeopleListProps) {
  const { selectedUserId, setSelectedUserId } = useSelectedUserIdState();
  const { selectedIndex, setSelectedIndex } = useSelectedIndexStore();
  const { presence, setPresence } = usePresenceStore();

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

  const supabase = createBrowserSupabaseClient();
  useEffect(() => {
    // 채널 생성 - 자기 자신에 대한 존재
    const channel = supabase.channel("online_users", {
      config: {
        presence: {
          key: loggedInUser.id,
        },
      },
    });

    // 존재 여부에 대한 구독 -> 로그인/아웃
    channel.on("presence", { event: "sync" }, () => {
      const newState = channel.presenceState();
      // console.log("newstate : ", newState);
      const newStateCopy = JSON.parse(JSON.stringify(newState));
      setPresence(newStateCopy);
    });

    // 구독 -> 트래킹할 정보를 입력
    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      const newPresenceStatus = await channel.track({
        onlineAt: new Date().toISOString(),
      });
      console.log("newP", newPresenceStatus);
    });

    // 언마운트시 구독해제
    return () => {
      channel.unsubscribe();
    };
  }, []);

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
          onlineAt={presence?.[user.id]?.[0]?.onlineAt}
          userId={user.id}
        />
      ))}
    </div>
  );
}
