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
      value={searchInput || ""}
      onChange={(e) => setSearchInput(e.target.value)}
      label="Search Image"
      placeholder="Search Image"
      icon={<i className="fas fa-search" />}
    />
  );
};

export default SearchComponent;
