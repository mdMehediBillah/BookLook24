import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserContext = createContext();
const URL = import.meta.env.VITE_REACT_APP_URL;

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [likedBookshelves, setLikedBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLikedBookshelves = async (userId) => {
    setLoading(true);
    try {
      // const response = await axios.get(`${URL}/api/v1/likeShelf`);
      const response = await axios.get(`${URL}/api/v1/likeShelf`, {
        params: { userId },
      });
      setLikedBookshelves(response.data.likedBookshelves);
    } catch (error) {
      setError("Failed to fetch liked bookshelves");
      toast.error("Failed to fetch liked bookshelves");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ likedBookshelves, fetchLikedBookshelves, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
