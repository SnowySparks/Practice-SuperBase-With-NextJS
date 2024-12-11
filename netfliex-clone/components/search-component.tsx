"use client";

import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

interface SearchComponentProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent = ({
  searchInput,
  setSearchInput,
}: SearchComponentProps) => {
  return (
    <Input
      variant="outlined"
      value={searchInput || ""}
      onChange={(e) => setSearchInput(e.target.value)}
      label=""
      icon={<i className="fa-solid fa-magnifying-glass" />}
    />
  );
};

export default SearchComponent;
