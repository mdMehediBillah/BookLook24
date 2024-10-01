import { useEffect, useState } from "react";
import "./BookForm.scss";
import { FaBookMedical } from "react-icons/fa";
import axios from "axios";
import { MdMessage } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../Utils/security/secreteKey.js";
import { toast } from "react-toastify";
import BookAuthor from "../author/BookAuthor";
const initialValues = {
  ISBN: "",
  title: "",
  genre: "",
  publishedDate: "",
  language: "",
  publisher: "",
  coverImageUrl: null,
  summary: "",
  shelfId: "",
};
const BookForm = ({ setOpenBook }) => {
  const [book, setBook] = useState(initialValues);
  const [bookshelves, setBookshelves] = useState([]);
  const [genres, setGenres] = useState([]);
  const [openBookAuthor, setOpenBookAuthor] = useState(false);

  const {
    ISBN,
    title,
    genre,
    publishedDate,
    language,
    publisher,
    coverImageUrl,
    summary,
    shelfId,
  } = book;

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API}/bookshelves`);
        setBookshelves(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBookshelves();
  }, []);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${API}/genres`);
        setGenres(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchGenres();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImageUrl") {
      setBook({
        ...book,
        [name]: files[0],
      });
    } else {
      setBook({
        ...book,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setBook(initialValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", coverImageUrl);
    formData.append("cloud_name", cloud_name);
    formData.append("upload_preset", upload_preset);

    // Upload to Cloudinary
    const response = await axios.post(cloud_URL, formData);
    const imageUrl = response.data.secure_url;

    try {
      const newBook = {
        ISBN,
        title,
        genre,
        publishedDate,
        language,
        publisher,
        coverImageUrl: imageUrl,
        summary,
        shelfId,
      };
      const response = await axios.post(`${API}/books/new`, newBook);

      toast.success(response.data.message);

      handleReset();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };
  return (
    <article className="book-modal">
      <section className="book-popup-box">
        <span onClick={() => setOpenBook(false)} className="close-modal">
          X
        </span>
        <h2 className="book-form-title "> Add New Book</h2>

        <form action="" className="book-form" onSubmit={handleSubmit}>
          <div className="input-containers-wrapper">
            {/* Book ISBN */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="text"
                name="ISBN"
                value={book.ISBN}
                onChange={handleChange}
                placeholder="Book ISBN"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Book ISBN
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Book Title */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Book Title"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Book Title
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Select Genre */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Genre</option>
                {genres &&
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.category}
                    </option>
                  ))}
              </select>
              <label htmlFor="" className="input-label">
                Book Genre
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Select Bookshelf */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                name="shelfId"
                value={book.shelfId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Bookshelf</option>
                {bookshelves &&
                  bookshelves.map((shelf) => (
                    <option key={shelf._id} value={shelf._id}>
                      {shelf.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="" className="input-label">
                Select Bookshelf
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Published Date */}
            <div className="input-container">
              <BsCalendar2DateFill className="input-icon" />
              <input
                type="date"
                name="publishedDate"
                value={book.publishedDate}
                onChange={handleChange}
                placeholder="Published Date"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Published Date
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Select a Language */}
            <div className="input-container">
              <MdLanguage className="input-icon" />
              <select
                name="language"
                value={book.language}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="spanish">Spanish</option>
              </select>
              <span className="input-highlight"></span>
            </div>

            {/* Publisher Name */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="text"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                required
                placeholder="Publisher Name"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Publisher Name
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Book Cover Image */}
            <div className="input-container">
              <FaCloudUploadAlt className="input-icon" />
              <input
                type="file"
                name="coverImageUrl"
                onChange={handleChange}
                required
                placeholder="Book Cover Image"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Book Cover Image
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          {/* Book Summary */}
          <div className="input-container">
            <MdMessage className="input-icon" />
            <textarea
              name="summary"
              rows={6}
              cols={30}
              value={book.summary}
              onChange={handleChange}
              placeholder="Book Summary"
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Book Summary
            </label>
            <span className="input-highlight"></span>
          </div>

          <button className="book-btn" type="submit">
            Add Book
          </button>
        </form>

        <div className="add-author" onClick={() => setOpenBookAuthor(true)}>
          Add Author
        </div>
        {openBookAuthor && <BookAuthor setOpenBookAuthor={setOpenBookAuthor} />}
      </section>
    </article>
  );
};

export default BookForm;
