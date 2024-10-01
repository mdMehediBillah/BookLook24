import React from "react";

const CustomItinerary = ({ route, onClose }) => {
  if (!route) return null;

  return (
    <div className="absolute top-10 right-2 w-[300px] max-h-[80%] bg-white border border-gray-300 rounded-lg p-4 shadow-md overflow-y-auto text-sm">
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-2">Route Details</h2>
      <div className="mb-3">
        <p>
          <strong>Total Distance:</strong> {route.summary.totalDistance} km
        </p>
        <p>
          <strong>Estimated Time:</strong> {route.summary.totalTime} min
        </p>
      </div>
      <ul className="list-none p-0 m-0">
        {route.instructions.map((instruction, index) => (
          <li key={index} className="mb-2">
            <span>{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomItinerary;
