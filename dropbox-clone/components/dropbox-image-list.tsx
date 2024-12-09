"use client";

import React from "react";
import DropboxImage from "./dropbox-image";
import { useQuery } from "@tanstack/react-query";
import { searchFiles } from "actions/storageActions";
import { Spinner } from "@material-tailwind/react";

interface DropboxImageListProps {
  searchInput?: string;
}

export const DropBoxImageList = ({ searchInput }: DropboxImageListProps) => {
  const searchImagesQuery = useQuery({
    queryKey: ["searchImages", searchInput],
    queryFn: async () => searchFiles(searchInput),
  });

  return (
    // grid 사용
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {searchImagesQuery.isPending && <Spinner />}
      {searchImagesQuery.data &&
        searchImagesQuery.data.map((file) => (
          <DropboxImage key={file.id} file={file} />
        ))}
    </section>
  );
};
