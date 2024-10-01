import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CreateBook,
  GoBackComponent,
  NavigationComponent,
  FooterComponent,
} from "../../Components";
import axios from "axios";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";

// import { Outlet } from "react-router-dom";

const CreateBookPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const URL = import.meta.env.VITE_REACT_APP_URL;
  const { id } = useParams();
  const { shelfData, setShelfData } = useShelfContext();

  const [shelf, setShelf] = useState(null);

  // fetch single shelf data here
  const fetchSingleShelf = async () => {
    try {
      const response = await axios.get(` ${URL}/api/v1/bookshelves/${id}`);
      setShelf(response.data.result);
      setShelfData(response.data.result); // Update the context data here if needed. For example, to set the book data in the ShelfContext.
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSingleShelf();
  }, [id]);
  // console.log(shelf);
  // console.log(shelfData);

  return (
    <>
      <main
        className={`w-full object-cover bg-cover bg-center bg-no-repeat h-[100%] pb-16 ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <NavigationComponent />
        <div className="max-w-screen-lg mx-auto flex justify-between">
          <GoBackComponent />
          <div className="py-1 px-3 font-semibold">
            <h4
              className={`text-lg font-bold ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              Donate your Book
            </h4>
          </div>
        </div>

        <div className="screen-max-lg mx-auto max-w-screen-lg">
          <div className="flex items-center container pt-4 mx-auto screen-max-lg">
            <div
              className={`flex flex-col gap-1 items-center screen-max-lg p-1 rounded-md flex-wrap shadow-lg ${
                theme === "light" ? "bg-gray-100" : "bg-gray-300"
              }`}
            >
              <div className="w-full h-20 bg-gray-400 text-center">
                <img
                  src={shelf?.image[0]}
                  alt={shelf?.name}
                  className="w-full h-20 object-cover"
                />
              </div>
              <div className="px-2">
                <h4 className="text-md font-semibold">{shelf?.name}</h4>
                <p className="flex flex-col  text-sm ">
                  <span>{shelf?.street}</span>
                  <span>{shelf?.city}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4
              className={`text-center text-3xl font-bold ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              Give your Book information
            </h4>
          </div>
        </div>
        <CreateBook />
      </main>
      <FooterComponent />
    </>
  );
};

export default CreateBookPage;
