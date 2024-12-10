"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};

export const searchMovies = async (search = "") => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`);

  if (error) {
    handleError(error);
  }
  return data;
};

export const getMovie = async (id: number) => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle(); //-> 리스트러 이 데이터를 받지 않고, 하나인 것은 무조건 알고 있음 그러나 Null 일수도 있음

  if (error) {
    handleError(error);
  }
  return data;
};
