"use client";

import React from "react";
import DropboxImage from "./dropbox-image";

export const DropBoxImageList = () => {
  return (
    // grid 사용
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
      <DropboxImage />
    </section>
  );
};
