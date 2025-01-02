"use client";
import { Button } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useEffect } from "react";
import {
  useSelectedIndexStore,
  useSelectedUserIdState,
} from "utils/store/selectedUserIdStore";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "actions/chatAction";

export default function ChatScreen() {
  const { selectedUserId } = useSelectedUserIdState();
  const { selectedIndex } = useSelectedIndexStore();

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: async () => getUserById(selectedUserId),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return selectedUserQuery.data ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />
      {/* 채팅 영역 */}
      <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
        <Message isFromMe={true} message={"안녕하세요."} />
        <Message isFromMe={false} message={"반갑습니다."} />
        <Message isFromMe={true} message={"안녕하세요."} />
        <Message isFromMe={true} message={"안녕하세요."} />
        <Message isFromMe={false} message={"반갑습니다."} />
        <Message isFromMe={false} message={"반갑습니다."} />
      </div>
      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메시지를 입력하세요."
        />
        <button
          className="min-w-20 p-3 bg-light-blue-600 text-white"
          color="light-blue"
        >
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
