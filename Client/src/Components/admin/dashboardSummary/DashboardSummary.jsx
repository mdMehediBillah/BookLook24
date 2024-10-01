import { useContext, useEffect, useState } from "react";
import { API } from "../../../Utils/security/secreteKey";
import AdminInbox from "../adminInbox/AdminInbox";
import AllBooks from "../allBooks/AllBooks";
import AllBookshelves from "../allBookshelves/AllBookshelves";
import AllBorrowedBooks from "../allBorrowedBooks/AllBorrowedBooks";
import Comments from "../allComments/Comments";
import AllDonatedBooks from "../allDonatedBooks/AllDonatedBooks";
import Genres from "../AllGenres/Genres";
import Ratings from "../AllRatings/Ratings";
import AllUsers from "../allUsers/AllUsers";
import "./DashboardSummary.scss";
import axios from "axios";
import BookshelvesChart from "../../charts/bookshelves/BookshelvesChart";
import AreaChartBookshelves from "../../charts/books/AreaChartBookshelves";
import PieChartBookshelves from "../../charts/performance/PieChartBookshelves";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";
const DashboardSummary = ({ isActive }) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode
  const [bookshelves, setBookshelves] = useState([]);
  const [bookshelvesCount, setBookshelvesCount] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [donatedBooksCount, setDonatedBooksCount] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  // console.log("commentsCount", commentsCount);
  // ====================================================
  // Bookshelves
  // ====================================================
  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookshelves();
  }, []);
  useEffect(() => {
    const fetchBookshelvesCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/bookshelves/count/total`
        );
        setBookshelvesCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookshelvesCount();
  }, []);
  // ====================================================
  // Books
  // ====================================================
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books`);
        setBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    const fetchBooksCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books/count/total`);
        setBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooksCount();
  }, []);
  // ====================================================
  // Donated Books
  // ====================================================
  useEffect(() => {
    const fetchDonatedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/donatedBooks`);
        setDonatedBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooks();
  }, []);
  useEffect(() => {
    const fetchDonatedBooksCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/donatedBooks/count/total`
        );
        setDonatedBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooksCount();
  }, []);
  // ====================================================
  // Borrowed Books
  // ====================================================
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/borrowedBooks`);
        setBorrowedBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, []);
  useEffect(() => {
    const fetchBorrowedBooksCount = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/borrowedBooks/count/total`
        );
        setBorrowedBooksCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooksCount();
  }, []);
  // ====================================================
  // Users Books
  // ====================================================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/users`);
        setUsers(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/users/count/total`);
        setUsersCount(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersCount();
  }, []);
  // ====================================================
  // Comments
  // ====================================================
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/comments/count/total`);
        setCommentsCount(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsCount();
  }, []);
  // Function to handle the print
  const handlePrint = () => {
    window.print();
  };
  return (
    <article className="w-full">
      {isActive === 1 && (
        <section
          className={`flex flex-col p-4 rounded-lg w-full ${
            theme === "light"
              ? "bg-gray-100 text-gray-900"
              : "bg-gray-700 text-gray-100"
          }`}
          id="printable"
        >
          <h4 className="text-2xl font-semibold mb-4">Summary Overview</h4>
          <button
            onClick={handlePrint}
            className={`mb-4 px-4 py-2  text-red-gray-100 rounded hover:bg-rose-400 transition ${
              theme === "light"
                ? "bg-rose-100 text-gray-900"
                : "bg-cyan-600 text-gray-100"
            }`}
          >
            Print
          </button>
          <div
            className={`rounded-lg p-2 ${
              theme === "light"
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <BookshelvesChart
              bookshelves={bookshelves}
              books={books}
              donatedBooks={donatedBooks}
              borrowedBooks={borrowedBooks}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AreaChartBookshelves
              bookshelves={bookshelves}
              books={books}
              users={users}
            />
            <PieChartBookshelves
              bookshelvesCount={bookshelvesCount}
              booksCount={booksCount}
              borrowedBooksCount={borrowedBooksCount}
              donatedBooksCount={donatedBooksCount}
              usersCount={usersCount}
              commentsCount={commentsCount}
            />
          </div>
        </section>
      )}
      {isActive === 2 && <AllUsers />}
      {isActive === 3 && <AllBookshelves />}
      {isActive === 4 && <AllBooks />}
      {isActive === 5 && <AllDonatedBooks />}
      {isActive === 6 && <AllBorrowedBooks />}
      {isActive === 7 && <Comments />}
      {isActive === 8 && <Ratings />}
      {isActive === 9 && <Genres />}
      {isActive === 10 && <AdminInbox />}
    </article>
  );
};
export default DashboardSummary;
