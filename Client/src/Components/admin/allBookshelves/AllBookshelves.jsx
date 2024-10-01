import { useEffect, useRef, useState } from "react";
import "./AllBookshelves.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Utils/security/secreteKey.js";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
const AllBookshelves = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [bookshelfId, setBookshelfId] = useState("");
  const [openBookshelf, setOpenBookshelf] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const downloadRef = useRef(); // Create a reference to the component to download
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value[0] || "NULL"}
          alt={params.row.name}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "barcode", headerName: "Barcode", width: 250 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "street", headerName: "Street", width: 200 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "openingTime", headerName: "Opening Time", width: 150 },
    { field: "closingTime", headerName: "Closing Time", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <MdEditSquare
            className="edit"
            onClick={() => setOpenBookshelf(true)}
          />
          <FaTrashAlt
            onClick={() => {
              setBookshelfId(params.id);
              setConfirmDeletion(true);
            }}
            className="delete"
          />
        </div>
      ),
    },
  ];
  const rows = bookshelves.map((bookshelf) => ({
    id: bookshelf._id,
    barcode: bookshelf.barcode,
    image: bookshelf.image,
    name: bookshelf.name,
    street: bookshelf.street,
    zipCode: bookshelf.zipCode,
    city: bookshelf.city,
    state: bookshelf.state,
    country: bookshelf.country,
    openingTime: bookshelf.openingTime,
    closingTime: bookshelf.closingTime,
  }));
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/bookshelves/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section
      ref={downloadRef}
      className="bookshelves-table-container"
      style={{ height: "auto", width: "100%", backgroundColor: "#fff" }}
    >
      <h3 className="bookshelves-table-title"> List of Bookshelves </h3>
      <aside className="add-new-bookshelf">
        <h3 className="add-new-bookshelf-title">
          Options to Add New Bookshelf
        </h3>
        <div>
          <button
            onClick={() => setOpenBookshelf(true)}
            className="add-new-bookshelf-btn"
          >
            Add Bookshelf
          </button>
        </div>
      </aside>
      <DataGrid
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
            Are you sure you want delete this bookshelf?
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
              onClick={() => {
                setConfirmDeletion(false);
                handleDelete(bookshelfId);
              }}
            >
              confirm
            </h3>
          </aside>
        </article>
      )}
    </section>
  );
};
export default AllBookshelves;
