import React from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faMap } from "@fortawesome/free-solid-svg-icons";
import CountryStateCitySelector from "../CountryStateCitySelector/CountryStateCitySelector";
import { ThemeContext } from "../../lightDarkMood/ThemeContext"; //for dark and light mode

const AddressInput = ({ formData, handleChange, handleLocationChange }) => {
  const { theme } = useContext(ThemeContext);

  // Determine the styles based on the theme
  const inputStyle =
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-700 placeholder-gray-500"
      : "bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-700";

    

  return (
    <div className="space-y-4 ">
      <div className="flex items-center mb-4">
        {/* <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600" /> */}
        <div className="flex-1">
          <CountryStateCitySelector onLocationChange={handleLocationChange} />
        </div>
      </div>
      <div className="flex items-center mb-4 relative ">
        <FontAwesomeIcon
          icon={faRoad}
          className="absolute left-3 top-3 ${iconColor}"
        />
        <div className="flex-1">
          <input
            type="text"
            id="road"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
            className={`pl-10 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputStyle}`}
          />
        </div>
      </div>
      <div className="flex items-center mb-4 relative">
        <FontAwesomeIcon
          icon={faMap}
          className="absolute left-3 top-3 text-gray-600"
        />
        <div className="flex-1">
          <input
            type="text"
            id="postcode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="zipCode"
            required
            className={`pl-10 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputStyle}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
