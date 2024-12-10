"use client";

import { Spinner } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

const FileDrageDropZone = () => {
  //HTML Input 객체 참조
  const fileRef = useRef(null);

  // 업로드 파일 Mutation
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

  // 파일 드래그 앤 드롭 이벤트가 일어 날 때 실행
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadFileMutation.mutate(formData);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-full py-20 border-2 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {/* 현재 드래그 중인지 아닌지 */}
      {uploadFileMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요</p>
      ) : (
        <p>파일을 여기에 끓어다 놓거나 클릭하여 업로드 해주세요</p>
      )}
    </div>
  );
};

export default FileDrageDropZone;
