"use server";

import { createServerSupabaseAdminClient } from "utils/supabase/server";

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
