import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; //Leaflet library object for interacting with the map directly.
import "leaflet/dist/leaflet.css"; //Leaflet’s default styling
import RoutingMachine from "./RoutingMachine";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";
import { mockBookshelves } from "../../data/bookshelfData.js";

import "./MapComponent.css";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import "react-leaflet-markercluster/dist/styles.min.css";

const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
  searchTerm,
}) => {
  const [mockData, setMockData] = useState(mockBookshelves);
  // console.log(searchTerm);
  const mapRef = useRef(null); //It is used to directly manipulate the map.

  useEffect(() => {
    // console.log("MapComponent useEffect called");
    if (mapRef.current) {
      // console.log("Map instance:", mapRef.current);

      // Clear previous layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer || layer instanceof L.Marker) {
          layer.remove();
        }
      });
      //==========================================================================
      // Validate center coordinates
      //==========================================================================

      if (center && Array.isArray(center) && center.length === 2) {
        mapRef.current.setView(center, 13);
      } else {
        console.warn("Invalid center coordinates:", center);
      }
      //==========================================================================
      // Add tile layer
      //==========================================================================
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      //==========================================================================
      // Add bookshelf markers
      //==========================================================================
      bookshelves.forEach((shelf) => {
        if (shelf.latitude && shelf.longitude) {
          const location = [shelf.latitude, shelf.longitude];
          L.marker(location).addTo(mapRef.current).bindPopup(`
              <div style="max-width: 200px;">
                <h3>${shelf.name}</h3>
                <p>${shelf.street}, ${shelf.city}</p>
                ${
                  shelf.imageUrl
                    ? `<img src="${shelf.imageUrl}" alt="${shelf.name}" style="width: 100%; height: auto; border-radius: 5px;" />`
                    : ""
                }
                <button onClick={() => setDestination(location)} style="margin-top: 10px;">Go Here</button>
              </div>
            `);
        } else {
          console.warn("Invalid bookshelf location:", shelf.location);
        }
      });

      //==========================================================================
      // Add user location marker
      //==========================================================================
      if (
        userLocation &&
        Array.isArray(userLocation) &&
        userLocation.length === 2
      ) {
        const userIcon = L.icon({
          iconUrl: "path_to_custom_user_icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        L.marker(userLocation, { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup("Your Location")
          .openPopup();
      } else {
        console.warn("Invalid user location:", userLocation);
      }
      //==========================================================================
      // Add destination marker
      //================================================================
      if (
        destination &&
        Array.isArray(destination) &&
        destination.length === 2
      ) {
        L.marker(destination)
          .addTo(mapRef.current)
          .bindPopup("Destination")
          .openPopup();
      } else {
        console.warn("Invalid destination location:", destination);
      }

      // Adding zoom control to the bottom right corner
      // L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    }
  }, [bookshelves, center, userLocation, destination]);

  useEffect(() => {
    let filterdMockBookshelves = [];
    mockBookshelves?.filter((shelf) => {
      if (shelf.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        filterdMockBookshelves.push(shelf);
      }
    });
    setMockData(filterdMockBookshelves);
    // console.log(filterdMockBookshelves);
  }, [searchTerm]);

  const showMap = (mockBookshelves) => {
    return mockBookshelves?.map((shelf, idx) => {
      if (shelf.latitude && shelf.longitude) {
        const location = [shelf?.latitude, shelf?.longitude];
        // Use getOpeningStatus to determine the opening status
        const { isOpen, message, detail } = getOpeningStatus(
          shelf.openingTime,
          shelf.closingTime
        );

        return (
          <Marker key={idx} position={location} icon={customIcon}>
            <Popup>
              <div className="">
                <div className="flex gap-1">
                  <div>
                    {/* Image */}
                    {shelf.image && shelf.image.length > 0 && (
                      <img
                        src={shelf.image[0]}
                        alt={shelf.name}
                        className="w-screen h-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                  {/* Title and Address */}
                  <div className="popup-text">
                    <h4 className="line-clamp-2 font-semibold">{shelf.name}</h4>
                    <p className="line-clamp-1">
                      {shelf.street}, {shelf.city}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-full gap-1 items-center">
                  <div className="w-full ">
                    <p className="btn btn-nutral btn-sm">
                      {shelf.openingTime === "00:00" &&
                      shelf.closingTime === "23:59"
                        ? "Open 24 hours"
                        : `Opening Hours: ${shelf.openingTime} - ${shelf.closingTime}`}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setDestination(location)}
                  >
                    Go Here
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      }
      return null;
    });
  };

  return (
    <div className="px-2">
      <MapContainer
        center={center || [51.505, -0.09]} // Default center if `center` is undefined
        zoom={5}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        className="min-h-[400px] max-h-[800px] w-full"
      >
        {/* //==========================================================================
        Adds the OpenStreetMap tile layer to the map.
        //========================================================================== */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <MarkerClusterGroup> */}
        {showMap(mockData)}
        {/* </MarkerClusterGroup> */}
        <LocationMarker />
        {userLocation && destination && (
          <RoutingMachine start={userLocation} end={destination} />
        )}
        <MinimapControl position="topright" zoom={0} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
