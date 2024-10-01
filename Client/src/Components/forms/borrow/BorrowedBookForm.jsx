import { useState, useEffect } from "react";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import "./BorrowedBookForm.scss";
import { useAuthContext } from "../../../Context/User/AuthContext";

import { toast } from "react-toastify";
import { API } from "../../../Utils/security/secreteKey";

const BorrowedBookForm = ({ setOpenBorrowedBook }) => {
  const { user } = useAuthContext();
  // const userId = user?._id;
  console.log(user);

  // console.log(book);
  const initialValues = {
    user: user?._id,
    book: "",
    title: "",
    author: "",
    borrowedFrom: "",
  };
  // Local variables
  const [formData, setFormData] = useState(initialValues);
  // console.log(formData);
  // const [books, setBooks] = useState([]);
  // const [authors, setAuthors] = useState([]);
  // const [bookshelves, setBookshelves] = useState([]);

  // useEffect(() => {
  //   // Fetch books and bookshelves from the backend
  //   const fetchBookshelves = async () => {
  //     try {
  //       const { data } = await axios.get(`${API}/bookshelves`);
  //       setBookshelves(data.result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchBookshelves();
  // }, []);

  // useEffect(() => {
  //   // Fetch books and bookshelves from the backend
  //   const fetchBooks = async () => {
  //     try {
  //       const { data } = await axios.get(`${API}/api/v1/books`);
  //       setBooks(data.result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchBooks();
  // }, []);

  // Extract authors from books
  // useEffect(() => {
  //   const allAuthors = [];
  //   books.forEach((book) => {
  //     if (book.authors && book.authors.length > 0) {
  //       book.authors.forEach((author) => allAuthors.push(author));
  //     }
  //   });
  //   setAuthors(allAuthors);
  // }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleReset = () => {
  //   setFormData(initialValues);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   try {
  //     const { data } = await axios.post(
  //       `${API}/borrowedBooks/new/currentUser._id`,
  //       formData
  //     );

  //     toast.success(data.message);

  //     handleReset();
  //   } catch (error) {
  //     console.error("Error creating BorrowedBook:", error);
  //   }
  // };

  return (
    <article className="borrowed-book-modal">
      <section className="borrowed-book-popup-box">
        <span
          className="close-modal"
          onClick={() => setOpenBorrowedBook(false)}
        >
          X
        </span>
        <h3 className="borrowed-book-form-title">Borrowed Book</h3>

        <form onSubmit={handleSubmit} className="borrowed-book-form">
          <button type="submit" className="borrowed-book-form-btn">
            OK
          </button>
        </form>
      </section>
    </article>
  );
};

export default BorrowedBookForm;
