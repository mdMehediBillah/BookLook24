import React, { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://openlibrary.org/search.json?title=${searchTerm}`
      );
      const data = await response.json();
      const { docs } = data;
      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
            author_key,
            language,
          } = bookSingle;
          return {
            id: key,
            author: author_name || [],
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
            author_key: author_key || [],
            language: language || [],
          };
        });
        setBooks(newBooks);
        setResultTitle(
          newBooks.length > 0 ? "Your Search Result" : "No Search Result Found!"
        );
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }
    } catch (error) {
      console.error(error);
      setResultTitle("An error occurred while fetching data!");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        books,
        loading,
        resultTitle,
        setSearchTerm: fetchBooks,
        fetchBooks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
