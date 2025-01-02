"use server";

import { Database } from "types_db";
import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from "utils/supabase/server";

export async function getAllUsers() {
  // 모든 유저의 데이터를 가져오기 위해 Admin 접근
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error(error);
    return [];
  }
  return data.users;
}

export async function getUserById(userId: string) {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) return null;
  return data.user;
}

// 메세지 전송
export async function sendMessage({
  message,
  chatUserId,
}: {
  message: string;
  chatUserId: string;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    throw new Error("User is not authenticated");
  }
  const { data, error: SendMessageError } = await supabase
    .from("message")
    .insert({
      message,
      receiver: chatUserId,
      sender: session.user.id,
      is_deleted: false,
    });

  if (SendMessageError) {
    throw new Error(SendMessageError.message);
  }
  return data;
}

// 메세지 전부 받기
export async function getAllMessages({
  chatUserId,
}: {
  chatUserId: string;
}): Promise<Database["public"]["Tables"]["message"]["Row"][]> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    throw new Error("User is not authenticated");
  }
  const { data, error: getAllMessagesError } = await supabase
    .from("message")
    .select("*")
    .or(`receiver.eq.${session.user.id},receiver.eq.${chatUserId}`)
    .or(`sender.eq.${session.user.id},sender.eq.${chatUserId}`)
    .order("created_at", { ascending: true });
  if (getAllMessagesError) return [];
  return data;
}
