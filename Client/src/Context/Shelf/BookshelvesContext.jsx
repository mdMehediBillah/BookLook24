// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookshelvesContext = createContext();
// const URL = import.meta.env.VITE_REACT_APP_URL;

// export const useBookshelvesContext = () => {
//   return useContext(BookshelvesContext);
// };

// const BookshelvesProvider = ({ children }) => {
//   const [bookshelves, setBookshelves] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const fetchBookshelves = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${URL}/api/v1/bookshelves?page=${page}`
//         );
//         console.log(response.data.result);
//         setBookshelves((prevBookshelves) => [
//           ...prevBookshelves,
//           ...response.data.result,
//         ]);
//         setHasMore(response.data.result.length > 0);
//       } catch (error) {
//         setError("Failed to fetch bookshelves");
//         toast.error("Failed to fetch bookshelves");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookshelves();
//   }, [page]);

//   const loadMoreBookshelves = () => {
//     if (hasMore) {
//       setPage(page + 1);
//       // setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <BookshelvesContext.Provider
//       value={{
//         bookshelves,
//         loading,
//         error,
//         loadMoreBookshelves,
//         hasMore,
//         page,
//         setPage,
//       }}
//     >
//       {children}
//     </BookshelvesContext.Provider>
//   );
// };

// export default BookshelvesProvider;

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookshelvesContext = createContext();
const URL = import.meta.env.VITE_REACT_APP_URL;

export const useBookshelvesContext = () => {
  return useContext(BookshelvesContext);
};

const BookshelvesProvider = ({ children }) => {
  const [bookshelves, setBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBookshelves = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL}/api/v1/bookshelves?page=${page}`
        );
        // console.log(response.data.result);
        setBookshelves((prevBookshelves) => [
          ...prevBookshelves,
          ...response.data.result,
        ]);
        // console.log(response.data.result);
        setHasMore(response.data.result.length > 0);
      } catch (error) {
        setError("Failed to fetch bookshelves");
        toast.error("Failed to fetch bookshelves");
      } finally {
        setLoading(false);
      }
    };

    fetchBookshelves();
  }, [page]);

  const loadMoreBookshelves = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <BookshelvesContext.Provider
      value={{
        bookshelves,
        loading,
        error,
        loadMoreBookshelves,
        hasMore,
        page,
        setPage,
      }}
    >
      {children}
    </BookshelvesContext.Provider>
  );
};

export default BookshelvesProvider;
