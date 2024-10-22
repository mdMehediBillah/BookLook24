import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
const SearchComponent = ({ searchTerm, setSearchTerm, setCenter }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value.trim()); // Remove any leading/trailing whitespace
  };
  const handleSearchClick = () => {
    setSearchTerm(localSearchTerm);
    // console.log("Search term:", localSearchTerm); // Debugging
  };
  return (
    <section className="">
      <div className="bg-gray-200 flex w-3/12 max-w-[400px] min-w-[200px] mx-auto rounded-full items-center justify-between border-2 border-gray-400 shadow-lg ">
        <input
          type="text"
          placeholder="Search"
          value={localSearchTerm}
          onChange={handleSearchChange}
          className="bg-transparent pl-4 w-full outline-none text-gray-900"
        />
        <button
          type="button"
          className="bg-cyan-700 py-2 px-4 rounded-r-full text-center font-semibold text-[16px] text-gray-50 hover:bg-rose-500 sm:text-sm "
          onClick={handleSearchClick}
        >
          <IoSearch />
        </button>
      </div>
    </section>
  );
};
export default SearchComponent;
