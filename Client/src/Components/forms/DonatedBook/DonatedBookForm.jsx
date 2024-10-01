import "./DonatedBookForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { API } from "../../../Utils/security/secreteKey.js";
import { toast } from "react-toastify";

const DonatedBookForm = ({ setOpenDonatedBook }) => {
  // Step 1: Set up the initial state
  const initialFormData = {
    title: "",
    author: "",
    ISBN: "",
    message: "",
    bookshelfId: "",
    userId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [bookshelves, setBookshelves] = useState([]);
  const [users, setUsers] = useState([]);

  const { title, author, ISBN, message, bookshelfId, userId } = formData;

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
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/users`);
        setUsers(response.data.result);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  // Step 2: Create the handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData(initialFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/donatedBooks/new`, formData);
      toast.success(data.message);
      handleReset();
    } catch (error) {
      console.error("Error donating book:", error);
      toast.error("Error donating book");
    }
  };

  return (
    <article className="donated-book-modal">
      <section className="donated-book-popup-box">
        <span className="close-modal" onClick={() => setOpenDonatedBook(false)}>
          X
        </span>
        <h3 className="donated-book-form-title">Donated Book</h3>
        <form onSubmit={handleSubmit} className="donated-book-form">
          {/* Title */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Title"
              className="input-field"
              required
            />
            <label htmlFor="title" className="input-label">
              Title
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Author */}
          <div className="input-container">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
              placeholder="Author"
              className="input-field"
            />
            <label htmlFor="author" className="input-label">
              Author
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* ISBN */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <input
              type="text"
              name="ISBN"
              value={ISBN}
              onChange={handleChange}
              placeholder="ISBN"
              className="input-field"
            />
            <label htmlFor="ISBN" className="input-label">
              ISBN
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Select Bookshelf */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <select
              name="bookshelfId"
              value={bookshelfId}
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
            <label htmlFor="shelfId" className="input-label">
              Select Bookshelf
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Select Donator */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <select
              name="userId"
              value={userId}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Donator</option>
              {users &&
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
            </select>
            <label htmlFor="userId" className="input-label">
              Select Donator
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Message */}
          <div className="input-container">
            <MdMessage className="input-icon" />
            <input
              type="text"
              name="message"
              value={message}
              onChange={handleChange}
              placeholder="Message"
              className="input-field"
              required
            />
            <label htmlFor="message" className="input-label">
              Message
            </label>
            <span className="input-highlight"></span>
          </div>

          <button type="submit" className="donated-book-form-btn">
            Donate Book
          </button>
        </form>
      </section>
    </article>
  );
};

export default DonatedBookForm;
