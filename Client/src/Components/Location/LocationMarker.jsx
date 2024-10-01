import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const userLocationIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=VkCeX4Qax9iH&format=png&color=228BE6",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
