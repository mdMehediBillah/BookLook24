import { useEffect } from "react";
import { useMap } from "react-leaflet";    //useMap is a hook that provides access to the map instance.
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      //L.latLng is a function from the Leaflet library that creates a LatLng (latitude and longitude) object:
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      createMarker: () => null, // Do not create default markers
      lineOptions: {
        styles: [{ color: "green", weight: 3 }],
      },
      show: false, // Do not show the itinerary
      addWaypoints: false, // Do not allow adding waypoints
      draggableWaypoints: false, // Do not allow dragging waypoints
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;          //because it doesn't render any visible elements and only adds routing functionality to the map.
};

export default RoutingMachine;
