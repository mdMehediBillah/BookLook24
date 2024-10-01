import { toast } from "react-toastify";
import "./AllBooks.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../Utils/security/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import BookForm from "../../forms/book/BookForm";
import { MdEditSquare } from "react-icons/md";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";
const AllBooks = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode
  // Local state variables
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/books`);
        setBooks(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const columns = [
    {
      field: "coverImageUrl",
      headerName: "Cover Page",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "NULL"}
          alt={params.row.title}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "author",
      headerName: "Authors",
      width: 300,
    },
    { field: "language", headerName: "Language", width: 100 },
    { field: "summary", headerName: "Summary", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <MdEditSquare className="edit" />
            <FaTrashAlt
              onClick={() => {
                setBookId(params.id);
                setConfirmDeletion(true);
              }}
              className="delete"
            />
          </div>
        );
      },
    },
  ];
  const rows = books.map((book) => ({
    ...book,
    id: book._id,
  }));
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/books/${id}`);
      toast.success(data.message);
      // dispatch(fetchBooks()); // Re-fetch books after deletion
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section
      className={`books-table-container ${theme === "light" ? "" : ""}`}
      style={{ height: "", width: "100%" }}
    >
      <h3
        className={`books-table-title ${theme === "light" ? "" : "text-white"}`}
      >
        List of Books
      </h3>
      <aside className="add-new-book">
        <h3
          className={`add-new-book-title ${
            theme === "light" ? "" : "text-white"
          }`}
        >
          Add New Genre
        </h3>
        <button
          onClick={() => setOpenBook(true)}
          className={` mb-4 px-4 py-2 text-red-gray-100 rounded hover:bg-rose-400 transition ${
            theme === "light"
              ? "bg-rose-100 text-gray-900"
              : "bg-cyan-600 text-gray-100"
          }`}
        >
          Add New
        </button>
      </aside>
      <DataGrid
        className="bg-gray-100"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight // Adjust the height automatically
      />
      {confirmDeletion && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>
          <h3 className="you-want-delete-user">
            Are you sure you want to delete this book?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className="cancel-delete"
              onClick={() => setConfirmDeletion(false)}
            >
              Cancel
            </p>
            <h3
              className="confirm-delete"
              onClick={() => setConfirmDeletion(false) || handleDelete(bookId)}
            >
              Confirm
            </h3>
          </aside>
        </article>
      )}
      {openBook && <BookForm setOpenBook={setOpenBook} />}
    </section>
  );
};
export default AllBooks;
