//==========================================================================
//This code fetches a list of bookshelves from an API,
//obtains the user's current location, and passes this data to a layout component.
//==========================================================================

import React, { useEffect, useState } from "react";
import LayoutComponent from "./LayoutComponent";
import axios from "axios";
// import { API } from "../../utils/security/secreteKey";
import { toast } from "react-toastify";
import SearchComponent from "../SearchComponent/SearchComponent";
import { updateBookshelvesWithCoordinates } from "./geocoding/geocoding";

const Location = () => {
  const URL = import.meta.env.VITE_REACT_APP_URL;
  const [bookshelves, setBookshelves] = useState([]);
  const [center, setCenter] = useState([51.541574, 9.951122]); // Default center
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm state variable

  //==========================================================================
  // Get all bookshelves /using GeoCoding api (openCage)
  //==========================================================================
  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/bookshelves/`);

        setBookshelves(response.data.result);
      } catch (error) {
        toast.error("Error fetching Bookshelfs");
      }
    };
    fetchBookshelves();
  }, []);

  //==========================================================================
  //Fetching User Location:
  //==========================================================================

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            setCenter(userCoords);
            setUserLocation(userCoords);
            setLoadingLocation(false);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("User denied Geolocation");
              const defaultCoords = [51.541574, 9.951122]; //default coordinates
              setCenter(defaultCoords);
              setUserLocation(defaultCoords);
              setLoadingLocation(false);
            } else {
              console.error("Error getting user location: ", error);
              setLoadingLocation(false);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);
  //==========================================================================
  // Error handling
  //==========================================================================

  if (loadingLocation) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* <SearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCenter={setCenter}
      /> */}
      <LayoutComponent
        bookshelves={bookshelves}
        center={center}
        setCenter={setCenter}
        userLocation={userLocation}
        destination={destination}
        setDestination={(loc) => {
          setDestination(loc);
          console.log("Destination set:", loc);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Location;
