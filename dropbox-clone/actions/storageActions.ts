"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};

// 업로드 기능 서버 액션
export const uploadFiles = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  // 해당 value가 File 객체인지 확인하는 함수
  const isFile = (value: unknown): value is File => {
    return value instanceof File;
  };

  const files = Array.from(formData.entries())
    .map(([_, file]) => file)
    .filter(isFile);

  // Promise.all을 사용하여 파일 업로드
  const results = await Promise.all(
    files.map((file) =>
      supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(file.name, file, {
          upsert: true, // overwrite if file already exists
        })
    )
  );

  return results;
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
