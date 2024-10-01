// CountryStateCitySelector.js
import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

const CountryStateCitySelector = ({ onLocationChange }) => {
  const [countries, setCountries] = useState([]);
  // const [countryToDB, setCountryToDB] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity("");
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    // console.log(countries);
    setSelectedCountry(e.target.value);
    onLocationChange({ country: e.target.value });
    // onLocationChange(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    onLocationChange({ state: e.target.value });
    // onLocationChange("state", e.target.value);
  };

  const handleCityChange = (e) => {
    // console.log(e.target.value);
    setSelectedCity(e.target.value);
    onLocationChange({ city: e.target.value });
    // onLocationChange("city", e.target.value);
  };

  // console.log("country", countries);
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Country:
        </label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Country</option>
          {countries?.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          State:
        </label>
        <select
          value={selectedState}
          onChange={handleStateChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select State</option>
          {states?.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">City:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select City</option>
          {cities?.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryStateCitySelector;
