import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch}>
        <FaSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
