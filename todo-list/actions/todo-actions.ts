"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

const handleError = (error: PostgrestError) => {
  console.error(error);
  throw new Error(error.message);
};

// select 쿼리 처리
export async function getTodos({ searchInput = "" }): Promise<TodoRow[]> {
  // server client
  const supabase = await createServerSupabaseClient();
  console.log("getTodos 실행");

  // supabase 로부터 검색어 포함해서 정보 가져오기. 작성일 기준 오름차순
  // 마지막에 select를 기입해 자기자신 데이터 리턴
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("created_at", {
      ascending: true,
    })
    .select();

  // error가 있으면 throw 처리
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  //   조회 결과 데이터 리턴
  return data;
}

// Create 처리
export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").insert({
    ...todo,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }
  return data;
}

// Update 처리
export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("todo")
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    .eq("id", todo.id);

  if (error) {
    handleError(error);
  }
  return data;
}

// 삭제
export async function deleteTodo(todo: TodoRow) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("todo")
    .delete()
    .eq("id", todo.id);

  if (error) {
    handleError(error);
  }
  return data;
}
