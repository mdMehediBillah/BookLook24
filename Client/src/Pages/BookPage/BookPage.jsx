import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../Utils/security/secreteKey";
import "./BookPage.scss";
import BorrowedBookForm from "../../Components/forms/borrow/BorrowedBookForm";
import debounce from "lodash.debounce";
import Rating from "../../Components/bookshelf/ratings/Rating";
import {
  GoBackComponent,
  FooterComponent,
  NavigationComponent,
} from "../../Components";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx"; // Adjust the path as necessary
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const BookPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode
  const [openUnlikeBook, setOpenUnlikeBook] = useState(false);

  const navigate = useNavigate();
  const { shelfData } = useShelfContext();
  // console.log(shelfData);
  const { bookshelfId, bookId } = useParams();
  // console.log(bookshelfId, bookId);

  const { user } = useAuthContext();
  const [book, setBook] = useState({});
  const [openBorrowedBook, setOpenBorrowedBook] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Get a single book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books/${bookId}`);

        setBook(data.result);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`${API}/books/${bookId}/rating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [book._id]);

  const updateRating = async (newRating) => {
    try {
      const response = await axios.put(`${API}/books/${bookId}/rating`, {
        rating: newRating,
      });
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const debouncedUpdateRating = useCallback(debounce(updateRating, 500), []);

  const handleRatingChange = (newRating) => {
    debouncedUpdateRating(newRating);
  };

  // =================================================================
  // Borrow book
  const userId = user?._id || "";
  const borrowedFrom = shelfData?._id || "";
  // console.log(user);

  const [formData, setFormData] = useState({
    book: bookId,
    user: userId,
    borrowedFrom: bookshelfId,
  });
  // console.log(formData);
  // console.log(book);

  // handle BorrowedBookForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const { data } = await axios.post(
        `${API}/api/v1/borrowedBooks/new`,
        formData
      );

      toast.success(data.message);
      setOpenBorrowedBook(false);
      navigate(-2);
    } catch (error) {
      console.error("Error creating BorrowedBook:", error);
      toast.error("Error creating BorrowedBook:", error);
    }
  };
  // =================================================================

  return (
    <>
      <main
        className={`w-full object-cover bg-cover bg-center bg-no-repeat bookshelf-page h-[100vh] ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <NavigationComponent />
        <div className="max-w-screen-lg mx-auto flex justify-between">
          <GoBackComponent />
          <div className="py-1 px-3 font-semibold">
            <h4
              className={`text-lg font-bold line-clamp-1 ${
                theme === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              {book?.title}
            </h4>
          </div>
        </div>

        <section className="flex gap-4 mt-12 justify-center">
          {/* <h1 className="book-page-title">{book?.title}</h1> */}

          <div className="flex gap-4 bg-gray-100 p-2">
            <figure className="book-image">
              <img
                className="w-full h-[300px] object-cover rounded-md mx-auto"
                src={book?.coverImageUrl}
                alt={book?.title}
              />
            </figure>

            <article className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold line-clamp-1">
                  {" "}
                  {book?.title}{" "}
                </h2>
                <small className="book-author">Written by {book?.author}</small>
                <hr />
              </div>

              <div>
                <div className="flex gap-2 items-center mt-6">
                  <p className="book-rating">
                    Rating: {averageRating?.toFixed(1)}
                  </p>
                  <Rating
                    initialRating={averageRating} // Pass the averageRating to Rating component
                    onRatingChange={handleRatingChange}
                  />
                </div>
                <p className="book-summary">{book.summary}</p>
                {/* <button
                  onClick={() => setOpenBorrowedBook(true)}
                  className="bg-cyan-500 text-white px-4 py-1 rounded-md mt-4 hover:bg-rose-500 hover:scale-105 transition-transform duration-500"
                >
                  Borrow Book
                </button> */}
                <button
                  className="btn btn-warning btn-sm mt-2"
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  Borrow Book
                </button>
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h4 className="font-bold text-lg text-rose-500">
                      Borrow Book!
                    </h4>
                    <p className="py-4">
                      Do you really want to Borrow this book from Bookshelf ?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-accent mr-2 btn-sm">
                          Close
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={handleSubmit}
                        >
                          Borrow Book
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </article>
          </div>
        </section>
      </main>

      <FooterComponent />
    </>
  );
};

export default BookPage;
