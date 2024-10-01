//==========================================================================
//this code integrates a searchInput, a list of bookshelves, and a mapComponent.
//==========================================================================

import React, { useState, useEffect, useContext } from "react";
import MapComponent from "./MapComponent";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";
import { Link } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
import LikeComponent from "../LikeComponent/LikeComponent";
import { LuBook } from "react-icons/lu";
import LikeButton from "../LikeButtonComponent/LikeButtonComponent";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext"; // Import ThemeContext
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { useBookshelvesContext } from "../../Context/Shelf/BookshelvesContext.jsx";
import ButtonCreateShelf from "../ButtonCreateShelf/ButtonCreateShelf.jsx";

const LayoutComponent = ({
  bookshelves,
  center,
  setCenter,
  userLocation,
  destination,
  setDestination,
  searchTerm,
  setSearchTerm,
}) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  // =================================================================
  const { loading, error } = useBookshelvesContext();
  // const { bookshelves, loading, error } = useBookshelvesContext();
  // console.log(bookshelves);
  // const userId = user?._id;

  //==========================================================================
  // Filter bookshelves based on search term
  //==========================================================================
  const normalizedSearchTerm = (searchTerm || "").toLowerCase();
  const filteredBookshelves = bookshelves.filter((shelf) => {
    const name = shelf.name?.toLowerCase() || "";
    const country = shelf.country?.toLowerCase() || "";
    const state = shelf.state?.toLowerCase() || "";
    const city = shelf.city?.toLowerCase() || "";
    return (
      name.includes(normalizedSearchTerm) ||
      country.includes(normalizedSearchTerm) ||
      state.includes(normalizedSearchTerm) ||
      city.includes(normalizedSearchTerm)
    );
  });
  //==========================================================================
  // State for display liked bookshelves
  //==========================================================================
  const [likedBookshelves, setLikedBookshelves] = useState(new Set());
  const handleLikeToggle = (shelfId) => {
    setLikedBookshelves((prevLiked) => {
      const updatedLiked = new Set(prevLiked);
      if (updatedLiked.has(shelfId)) {
        updatedLiked.delete(shelfId);
      } else {
        updatedLiked.add(shelfId);
      }
      return updatedLiked;
    });
  };

  //==========================================================================
  const displayedBookshelves =
    searchTerm === "" ? filteredBookshelves.slice(0, 8) : filteredBookshelves; // to always display all bookshelves
  // console.log(displayedBookshelves);
  return (
    <div className="flex flex-col mt-10">
      {/* Map Container */}
      <div className="flex justify-between py-4 px-2 items-center">
        <h2
          className={`text-xl font-bold ${
            theme === "light" ? "text-gray-800" : "text-gray-300"
          }`}
        >
          Grow your Bookshelf
        </h2>
        <ButtonCreateShelf />
      </div>
      <div className="relative h-1/2 md:h-full">
        {/* Search Component inside the map */}
        <div className="absolute w-[50%] left-[25%] z-[1000] p-2 rounded">
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCenter={setCenter}
          />
        </div>

        <MapComponent
          bookshelves={filteredBookshelves}
          center={center}
          userLocation={userLocation}
          destination={destination}
          setDestination={setDestination}
          searchTerm={searchTerm}
        />
      </div>

      {/* Bookshelves Container */}
      <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
        {displayedBookshelves.map((shelf, idx) => {
          const { isOpen, message, detail } = getOpeningStatus(
            shelf.openingTime,
            shelf.closingTime
          );
          return (
            <div
              key={idx}
              className={`text-sm flex flex-col items-start p-2 border rounded mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-direction justify-between hover:shadow-xl ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100 text-black"
                  : "border-gray-700 bg-gray-600 text-white"
              }`}
            >
              {/* Image Container */}
              <Link to={`/${shelf._id}`}>
                {shelf.image && shelf.image.length > 0 && (
                  <img
                    src={shelf.image[0]}
                    alt={shelf.name}
                    className="w-screen h-40 object-cover rounded-md"
                  />
                )}

                {/* Text Content */}
                <h2 className="text-[16px] font-semibold pt-1">{shelf.name}</h2>
                <p className="">
                  {shelf.street}, {shelf.city}
                </p>
                <p className={`text-${isOpen ? "green" : "red"}-500`}>
                  {message} <span className="">{detail}</span>
                </p>
              </Link>

              <div className="flex justify-between gap-2 mt-1  items-center w-full pt-4">
                <div className="bg-cyan-600 w-full rounded-md text-white">
                  <Link
                    to={`/create_book/${shelf._id}`}
                    className="flex items-center justify-center gap-1"
                  >
                    <div>
                      <LuBook />
                    </div>
                    <div>
                      <p className="text-center py-1">Add Book</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {searchTerm ? (
        ""
      ) : (
        <div className="flex justify-center my-12">
          <Link to="/allShalves">
            <span className="bg-rose-600 py-2 px-6 rounded-lg text-gray-100 hover:bg-cyan-600 ">
              More Bookshelves
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default LayoutComponent;
