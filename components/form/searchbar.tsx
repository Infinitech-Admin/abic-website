import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const url = `/property-finder?query=${encodeURIComponent(searchTerm)}`;

    window.location.href = url; // Redirect to the new URL
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="absolute -bottom-4 md:top-5 md:right-2 z-30 w-full md:max-w-md px-4 sm:px-8">
      <form className="w-full flex justify-end" onSubmit={handleSearch}>
        <label
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          htmlFor="default-search"
        >
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          <input
            required
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="default-search"
            placeholder="Search Properties...."
            type="search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
