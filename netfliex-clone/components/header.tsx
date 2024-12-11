"use client";

import React from "react";
import Logo from "./logo";
import { useSearch } from "utils/store/searchText";

const Header = () => {
  const { searchText, setSearchText } = useSearch();

  return (
    <header className="fixed top-0 left-0 right-0 px-4 py-2 bg-gray-900 flex items-center justify-between z-50">
      <nav className="flex gap-4">
        <Logo />
        <ul className="flex gap-2 text-white">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>
      <div className="flex w-full max-w-72 gap-2 items-center border border-white bg-transparent text-white rounded-md p-2">
        <i className="fas fa-search" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent"
          placeholder="Search Movies"
        />
      </div>
    </header>
  );
};

export default Header;
