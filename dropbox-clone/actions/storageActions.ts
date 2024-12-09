"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};

// 업로드 기능 서버 액션
export const uploadFile = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(file.name, file, {
      upsert: true, // overwrite if file already exists
    });

  if (error) {
    handleError(error);
  }

  return data;
};

// 조회 기능
export const searchFiles = async (search: string = "") => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .list(null, {
      search,
    });

  if (error) {
    handleError(error);
  }
  return data;
};

// 삭제 기능
export const deleteFile = async (fileName: string) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([fileName]);

  if (error) {
    handleError(error);
  }
  return data;
};
