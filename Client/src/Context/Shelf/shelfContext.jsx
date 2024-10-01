import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create a context
const ShelfContext = createContext();

// Create a provider component
export const ShelfProvider = ({ children, shelfId }) => {
  const localShelfData = localStorage.getItem("shelf");
  const [shelfData, setShelfData] = useState(localShelfData || []);
  const URL = import.meta.env.VITE_REACT_APP_URL;

  useEffect(() => {
    const fetchSingleShelf = async () => {
      if (!shelfId) return; // Do nothing if shelfId is not provided

      try {
        const response = await axios.get(
          `${URL}/api/v1/bookshelves/${shelfId}`
        );
        setShelfData(response.data.result); // Update the context data here if needed
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleShelf();
  }, [shelfId, URL]);

  return (
    <ShelfContext.Provider value={{ shelfData, setShelfData }}>
      {children}
    </ShelfContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useShelfContext = () => {
  return useContext(ShelfContext);
};
