import "./Genres.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import GenreForm from "../../forms/genre/GenreForm";
import { API } from "../../../Utils/security/secreteKey.js";

const Genres = () => {
  const [genreId, setGenreId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/genres/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };

  const columns = [
    { id: "id", headerName: "Genre ID", width: 100 },
    { field: "category", headerName: "Book Category", width: 250 },
    { field: "description", headerName: "Genre Description", width: 600 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <FaTrashAlt
              onClick={() => setGenreId(params.id) || setConfirmDeletion(true)}
              className="delete"
            />
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: "sfs13",
      category: "Book category",
      description:
        "A great book description is one of your best marketing tools, but too often authors have a book description that isn't enticing, and doesn't convey what category the book is, and what the book is actually about.",
      createdAt: "24/05/1986",
    },
  ];
  return (
    <section className="genres-table-container">
      <h3 className="genres-table-title"> List of Genres </h3>

      <aside className="add-new-genre">
        <h3 className="add-new-genre-title">Add New Genre</h3>
        <button
          onClick={() => setOpenGenre(true)}
          className="add-new-genre-btn"
        >
          Add New
        </button>
      </aside>
      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Initial state
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // Create search bar
        slots={{ toolbar: GridToolbar }}
        // Search a specific user
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // Page size optons
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        //
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
            Are you sure you want delete this service?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className={`cancel-delete`}
              onClick={() => setConfirmDeletion(false)}
            >
              cancel
            </p>
            <h3
              className={`confirm-delete`}
              onClick={() => setConfirmDeletion(false) || handleDelete(genreId)}
            >
              confirm
            </h3>
          </aside>
        </article>
      )}

      {openGenre && <GenreForm setOpenGenre={setOpenGenre} />}
    </section>
  );
};
export default Genres;
