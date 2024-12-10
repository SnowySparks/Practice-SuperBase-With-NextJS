"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};

export const searchMovies = async ({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  const supabase = await createServerSupabaseClient();

  const { data, count, error } = await supabase // count : 전체 데이터 크기
    .from("movie")
    .select("*", { count: "exact" })
    .like("title", `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);
  // range (start, end) -> [start, end] 범위의 데이터를 가져옴
  console.log("searchMovies", { data, count, page, pageSize });
  if (error) {
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    pageSize,
  };
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
