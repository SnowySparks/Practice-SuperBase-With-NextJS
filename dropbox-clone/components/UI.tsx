"use client";
import Logo from "components/logo";
import SearchComponent from "../components/search-component";
import { useState } from "react";
import FileDrageDropZone from "./file-dragdropzone";
import { DropBoxImageList } from "./dropbox-image-list";

const UI = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <main className="w-full p-2 flex flex-col gap-4">
      {/* logo */}
      <Logo />

      {/* search images */}
      <SearchComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* file drag&drop */}
      <FileDrageDropZone />

      {/* dropbox image list */}
      <DropBoxImageList />
    </main>
  );
};

export default UI;
