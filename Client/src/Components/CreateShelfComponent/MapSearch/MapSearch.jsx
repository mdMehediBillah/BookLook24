import React, { useState } from "react";
import BookshelfMap from "../BookshelfMap/BookshelfMap";
const MapSearch = ({ onLocationSelect }) => {
  const [mapVisible, setMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={toggleMapVisibility}
        className="py-2 px-4 mr-2 bg-cyan-700 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {mapVisible ? "Hide Map" : "Find Location"}
      </button>
      {mapVisible && (
        <div className="mt-4">
          <BookshelfMap onLocationSelect={onLocationSelect} />
        </div>
      )}
    </div>
  );
};

export default MapSearch;
