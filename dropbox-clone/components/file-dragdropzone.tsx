"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import React, { useRef } from "react";

const FileDrageDropZone = () => {
  //HTML Input 객체 참조
  const fileRef = useRef(null);

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchImages"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault(); // prevent form submission
        const file = fileRef.current?.files?.[0];

        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          uploadFileMutation.mutate(formData);
        }
      }}
      className="w-full py-20 border-2 border-dotted border-indigo-700 flex flex-col items-center justify-center "
    >
      <input ref={fileRef} type="file" className="" />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드 하세요</p>
      <Button loading={uploadFileMutation.isPending} type="submit">
        파일 업로드
      </Button>
    </form>
  );
};

export default FileDrageDropZone;
