import { Link, useParams } from "react-router-dom";
import "./BookshelfPage.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Utils/security/secreteKey";
import { toast } from "react-toastify";
import {
  GoBackComponent,
  FooterComponent,
  NavigationComponent,
} from "../../Components";
import { getOpeningStatus } from "../../Components/Location/getOpeningStatus/getOpeningStatus.jsx";
import LikeButton from "../../Components/LikeButtonComponent/LikeButtonComponent.jsx";
import { LuBook } from "react-icons/lu";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const BookshelfPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const { bookshelfId } = useParams();
  const [bookshelf, setBookshelf] = useState(null);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { user } = useAuthContext();
  const userId = user?._id;

  useEffect(() => {
    const fetchBookshelf = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}`
        );
        setBookshelf(data.result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchBookshelf();
  }, []);

  // console.log(bookshelf);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}/books`
        );
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();

    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/${bookshelfId}/books`
        );
        setBorrowedBooks(data.borrowedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, [bookshelfId]);

  // Filter the array to get only the available books
  const availableBooks = books.filter((book) => book.status === "available");
  const availableBooksCount = availableBooks.length;

  // Compute opening status
  // console.log(bookshelf);
  if (bookshelf === null) {
    return <div>Loading...</div>;
  }
  const { isOpen, message, detail } = getOpeningStatus(
    bookshelf?.openingTime,
    bookshelf?.closingTime
  );

  const handleLike = (bookshelfId) => {
    // Optionally, update local state or perform other actions when a bookshelf is liked
    // console.log(`Bookshelf ${bookshelfId} liked`);
  };

  return (
    <>
      <main
        className={`w-full object-cover bg-cover bg-center bg-no-repeat bookshelf-page h-[100vh] ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <NavigationComponent />
        <div className="max-w-screen-lg mx-auto">
          <GoBackComponent />
        </div>
        <section className="flex flex-col py-4 container mx-auto screen-max-lg max-w-screen-lg mt-6 mb-6">
          <article
            className={`flex flex-col gap-4  mx-auto p-3 rounded-md ${
              theme === "light" ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <div>
              <div className="flex gap-2">
                <figure>
                  <img
                    className="w-56 h-68 object-cover rounded-lg"
                    src={bookshelf?.image}
                    alt={bookshelf?.name}
                  />
                </figure>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {" "}
                      {bookshelf?.name}
                    </h2>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{bookshelf?.street},</span>
                      <span>{bookshelf?.city}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{bookshelf?.zipCode},</span>
                      <span>{bookshelf?.country}</span>
                    </div>
                  </div>
                  <aside className="">
                    <div className="">
                      <Link
                        to={`/${bookshelfId}/books`}
                        state={{ books, bookshelf, borrowedBooks }}
                      >
                        <div className="bg-cyan-100 w-full">
                          <div className="flex gap-1 py-1 rounded w-full justify-center">
                            <span>{availableBooksCount}</span>
                            <span>available books</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </aside>
                </div>
              </div>
              <div className="text-center py-1 bg-gray-100 w-full rounded-md mt-3">
                <p className={`text-${isOpen ? "green" : "red"}-500`}>
                  {message} <span className="text-gray-500">{detail}</span>
                </p>{" "}
              </div>
              <div className="flex justify-between gap-2 mt-1  items-center">
                <div className="bg-cyan-600 w-10/12 rounded-md text-white">
                  <Link
                    to={`/create_book/${bookshelf?._id}`}
                    className="flex items-center justify-center gap-1"
                  >
                    <div>
                      <LuBook />
                    </div>
                    <div>
                      <p className="text-center py-1">Add Book</p>
                    </div>
                  </Link>
                </div>
                <div className="w-4/12">
                  <div className="w-full bg-rose-200 rounded-lg text-gray-800">
                    <LikeButton
                      userId={userId}
                      bookshelfId={bookshelf?._id}
                      onLike={handleLike}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
      <FooterComponent />
    </>
  );
};

export default BookshelfPage;
