import { Link, useParams } from "react-router-dom";
import "./BookCardForShelf.scss";
import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { API } from "../../../Utils/security/secreteKey";
import Rating from "../ratings/Rating";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";

/*
npm install lodash.debounce
*/

const BookCardForShelf = ({ book }) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  // const [books, setBooks] = useState([]);

  const { bookshelfId } = useParams();
  const [averageRating, setAverageRating] = useState(0);

  const fetchRating = async () => {
    try {
      const response = await axios.get(
        `${API}/api/v1/books/${book._id}/rating`
      );
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  const updateRating = async (newRating) => {
    try {
      const response = await axios.put(
        `${API}/api/v1/books/${book._id}/rating`,
        {
          rating: newRating,
        }
      );
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const debouncedUpdateRating = useCallback(debounce(updateRating, 500), []);

  const handleRatingChange = (newRating) => {
    debouncedUpdateRating(newRating);
  };

  useEffect(() => {
    // fetchBooks();
    fetchRating();
  }, [book._id]);

  return (
    <section
      className={`flex flex-col bg-gray-100 p-2 rounded shadow-md justify-between ${
        theme === "light" ? "bg-gray-50" : "bg-gray-300"
      }`}
    >
      <figure className="">
        {/* <Link to={`/bookshelves/${bookshelfId}/books/${book._id}`}> */}
        <img
          className="w-full h-52 object-cover rounded-md mx-auto"
          src={book?.coverImageUrl}
          alt={book?.title}
        />
        {/* </Link> */}
      </figure>
      <article className="">
        {/* <Link to={`/bookshelves/${bookshelfId}/books/${book._id}`}> */}
        <h4 className="text-lg font-semibold pt-2 line-clamp-1">
          {" "}
          {book?.title}{" "}
        </h4>
        {/* </Link> */}
        <small className="font-semibold text-[14px]">{book?.author}</small>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Rating: {averageRating?.toFixed(1)}</p>
          <Rating
            initialRating={averageRating}
            onRatingChange={handleRatingChange}
          />
        </div>
      </article>
      <Link to={`/${bookshelfId}/books/${book._id}`} className="">
        <p className="bg-gray-200 text-center rounded-lg py-1">
          {book?.summary?.slice(0, 300).concat("...")}{" "}
          <span className=" ">read more</span>{" "}
        </p>
      </Link>
    </section>
  );
};

export default BookCardForShelf;
