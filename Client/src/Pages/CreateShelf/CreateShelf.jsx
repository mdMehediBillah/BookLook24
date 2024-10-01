import { Country } from "country-state-city";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./CustomTimePicker.css";
import imgPlaceholder from "../../assets/images/shelfDefault.png";
import ChatbotLayout from "../../Components/Chatbot/ChatbotLayout/ChatbotLayout";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx"; // for dark and light mode

import TimeSelectionOptions from "../../Components/CreateShelfComponent/TimeSelectionOptions/TimeSelectionOptions.jsx";
import BookshelfMap from "../../Components/CreateShelfComponent/BookshelfMap/BookshelfMap.jsx";
import MapSearch from "../../Components/CreateShelfComponent/MapSearch/MapSearch.jsx";
import AddressInput from "../../Components/CreateShelfComponent/AddressInput/AddressInput.jsx";
import {
  GoBackComponent,
  FooterComponent,
  NavigationComponent,
} from "../../Components/index.js";
import { Link, useNavigate } from "react-router-dom";

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  const response = await axios.post(cloud_URL, data);
  return response.data.url;
};

const CreateShelfForm = () => {
  const { theme } = useContext(ThemeContext); // for dark and light mode
  const navigate = useNavigate();

  // Determine the styles based on the theme
  // const inputStyle =
  //   theme === "dark"
  //     ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
  //     : "bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-700";

  //==========================================================================
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    openingTime: "7:00" || "",
    closingTime: "18:00" || "",
    street: "",
    zipCode: "",
  });
  const [imagePreview, setImagePreview] = useState(imgPlaceholder);

  const [is24Hours, setIs24Hours] = useState(true);
  const [loading, setLoading] = useState(false);
  const [useMap, setUseMap] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleTimeChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setIs24Hours(e.target.value === "24hours");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : null;
      //==========================================================================
      // Create updated form data with URLs
      //==========================================================================
      // console.log(" formData", formData);
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        openingTime: is24Hours ? "00:00" : formData.openingTime,
        closingTime: is24Hours ? "23:59" : formData.closingTime,
      };
      //==========================================================================
      //==========================================================================
      // console.log(" updatedFormData", updatedFormData);
      // console.log(Country.getAllCountries());

      // const x = Country.getAllCountries().filter(
      //   (country) => country.isoCode === updatedFormData.country
      // );
      // console.log(" x", x);

      // const formReq = { ...updatedFormData, country: x[0].name };
      const URL = import.meta.env.VITE_REACT_APP_URL;
      const response = await axios.post(
        `${URL}/api/v1/bookshelves/new`,
        updatedFormData
      );
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/bookshelves/new",
      //   formReq
      // );
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/bookshelves/new",
      //   updatedFormData
      // );
      toast.success(response.data.message);
      navigate("/allShalves");
    } catch (error) {
      console.error("Error creating bookshelf:", error);
      toast.error(error.response?.data?.message || "Error creating bookshelf");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (addressData) => {
    setFormData((prevState) => ({
      ...prevState,
      ...addressData,
    }));
  };

  const handleLocationManual = (addressData) => {
    setFormData((prevState) => ({
      ...prevState,
      ...addressData,
    }));
  };

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat h-[100%] ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className="max-w-screen-lg mx-auto">
        <GoBackComponent />
      </div>
      <section
        className={`flex items-center py-1 px-4 container mx-auto justify-between screen-max-lg max-w-screen-lg${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <div className="w-3/12 flex justify-end">
          <div className="py-1 px-3 font-semibold text-gray-100">
            <h4>Create New Bookshelf</h4>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className={`max-w-5xl mx-auto p-2 shadow-md  mt-1 rounded-lg shadow-lg ${
          theme === "dark"
            ? "bg-gray-600 text-gray-100"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-4xl font-bold mt-6 mb-10 text-center">
          Create New Bookshelf
        </h1>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            theme === "dark" ? "text-gray-100" : "bg-gray-100 text-gray-800"
          }`}
        >
          {/* Left Side */}
          <div className="space-y-4 text-sm">
            <div className="flex-1 mb-4">
              <label className="text-sm block font-medium">
                Bookshelf Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bookshelf Name"
                required
                className={`border-2 rounded-lg py-2 px-2 w-full focus:outline-none ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 "
                    : "border-gray-300 bg-gray-100 "
                }`}
              />
            </div>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <label htmlFor="image" className="text-sm block font-medium">
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={`border-2 rounded-lg py-2 px-2 w-full focus:outline-none ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700"
                      : "border-gray-300 bg-gray-100"
                  }`}
                />
              </div>
            </div>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-36 object-cover rounded-md"
            />

            <div className="flex items-center mb-4">
              <div className="text-sm block font-medium">
                <TimeSelectionOptions
                  is24Hours={is24Hours}
                  handleRadioChange={handleRadioChange}
                />
              </div>
            </div>
            {!is24Hours && (
              <div
                className={`flex space-x-4 mb-4 ${
                  theme === "dark"
                    ? "text-gray-100"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div
                  className={`flex-1 ${
                    theme === "dark"
                      ? "text-gray-100"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <label
                    htmlFor="openingTime"
                    className={`text-sm font-medium ${
                      theme === "dark"
                        ? "text-gray-100"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Opening Time:
                  </label>
                  <TimePicker
                    id="openingTime"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={(value) => handleTimeChange("openingTime", value)}
                    required
                    className={`time-picker-input mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      theme === "dark"
                        ? "text-gray-100 border-gray-100"
                        : "text-gray-800 border-gray-100"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="closingTime"
                    className={`text-sm font-medium ${
                      theme === "dark"
                        ? "text-gray-100"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Closing Time:
                  </label>
                  <TimePicker
                    id="closingTime"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={(value) => handleTimeChange("closingTime", value)}
                    required
                    className="time-picker-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Right Side */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={() => setUseMap(true)}
                className={`mr-2 py-1 px-4 ${
                  useMap
                    ? "bg-rose-100 text-gray-800 shadow-md"
                    : "bg-gray-100 text-gray-500 shadow-md"
                } font-bold rounded-md hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:text-gray-100`}
              >
                Use Map
              </button>
              <button
                type="button"
                onClick={() => setUseMap(false)}
                className={`py-1 px-4 ${
                  !useMap
                    ? "bg-rose-100 text-gray-800 shadow-md"
                    : "bg-gray-100 text-gray-500 shadow-md"
                } font-bold rounded-md hover:bg-rose-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                Add Manually
              </button>
            </div>
            {useMap ? (
              <BookshelfMap onLocationSelect={handleLocationSelect} />
            ) : (
              <AddressInput
                formData={formData}
                handleChange={handleChange}
                handleLocationChange={handleLocationManual}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-7 px-4 ${
            theme === "dark"
              ? "bg-cyan-700 text-gray-100"
              : "bg-cyan-900 text-black"
          } font-bold rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {loading ? "Creating..." : "Create Bookshelf"}
        </button>
      </form>
      <ChatbotLayout />
      <FooterComponent />
    </main>
  );
};

export default CreateShelfForm;
