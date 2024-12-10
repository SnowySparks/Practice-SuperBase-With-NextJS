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
