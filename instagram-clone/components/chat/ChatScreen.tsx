"use client";
import { Button } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import {
  useSelectedIndexStore,
  useSelectedUserIdState,
} from "utils/store/selectedUserIdStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMessages, getUserById, sendMessage } from "actions/chatAction";
import { Spinner } from "@material-tailwind/react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { usePresenceStore } from "utils/store/presenseStore";

export default function ChatScreen() {
  const { selectedUserId } = useSelectedUserIdState();
  const { selectedIndex } = useSelectedIndexStore();
  const supabase = createBrowserSupabaseClient();
  const [message, setMessage] = useState("");
  const endMessageRef = useRef<HTMLDivElement | null>(null);
  const { presence } = usePresenceStore();

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: async () => getUserById(selectedUserId),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // 메세지 전송
  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      // 메세지 입력 초기화 및 메세지 재패치
      setMessage("");
      getAllMessagesQuery.refetch();
    },
  });

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
    retry: 1,
  });

  useEffect(() => {
    const channel = supabase
      .channel("message_postgres_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
        },
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.errors) {
            getAllMessagesQuery.refetch();
          }
        }
      )
      .subscribe();

    // 언마운트시 구독 해제
    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (endMessageRef && endMessageRef.current) {
      endMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [getAllMessagesQuery.data]);

  return selectedUserQuery.data ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        onChatScreen={true}
        onlineAt={presence?.[selectedUserId]?.[0]?.onlineAt}
        userId={selectedUserQuery.data?.id}
      />
      {/* 채팅 영역 */}
      <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
        {getAllMessagesQuery.data?.map((item) => (
          <Message
            key={item.id}
            message={item.message}
            isFromMe={item.receiver === selectedUserId}
          />
        ))}
        {/* 메세지 끝자락 */}
        <div ref={endMessageRef}></div>
      </div>
      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메시지를 입력하세요."
        />
        <button
          className="min-w-20 p-3 bg-light-blue-600 text-white"
          color="light-blue"
          onClick={() => sendMessageMutation.mutate()}
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
