import "./BookAuthor.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../Utils/security/secreteKey.js";
import { toast } from "react-toastify";
import { FaBookMedical } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";

const initialState = {
  bookId: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  deathDate: "",
};
const BookAuthor = ({ setOpenBookAuthor }) => {
  const [author, setAuthor] = useState(initialState);
  const [books, setBooks] = useState([]);

  const { bookId, firstName, lastName, birthDate, deathDate } = author;

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/books`);
        setBooks(data.result);
      } catch (error) {
        toast.error("Error fetching books");
      }
    };
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  };

  const handleReset = () => {
    setAuthor(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${API}/books/${bookId}`, author);
      toast.success(data.message);
      handleReset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <article className="author-modal">
      <section className="author-popup-box">
        <span className="close-modal" onClick={() => setOpenBookAuthor(false)}>
          X
        </span>
        <h3 className="author-form-title">Borrowed Book</h3>
        <form onSubmit={handleSubmit} className="author-form">
          {/* Select Book */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <select
              name="bookId"
              value={bookId}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a Book</option>
              {books &&
                books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
            </select>
            <label htmlFor="bookId" className="input-label">
              Select Book
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* First Name */}
          <div className="input-container">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field"
              required
            />
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Last Name */}
          <div className="input-container">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field"
              required
            />
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Birth Date */}
          <div className="input-container">
            <BsCalendar2DateFill className="input-icon" />
            <input
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={handleChange}
              placeholder="Birth Date"
              className="input-field"
            />
            <label htmlFor="birthDate" className="input-label">
              Birth Date
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Death Date */}
          <div className="input-container">
            <BsCalendar2DateFill className="input-icon" />
            <input
              type="date"
              name="deathDate"
              value={deathDate}
              onChange={handleChange}
              placeholder="Death Date"
              className="input-field"
            />
            <label htmlFor="deathDate" className="input-label">
              Death Date
            </label>
            <span className="input-highlight"></span>
          </div>

          <button type="submit" className="author-form-btn">
            Add
          </button>
        </form>
      </section>
    </article>
  );
};
export default BookAuthor;
