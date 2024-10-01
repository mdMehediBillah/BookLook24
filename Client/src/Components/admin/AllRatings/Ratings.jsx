import "./Ratings.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Ratings = () => {
  const columns = [
    { field: "eventName", headerName: "Event Name", width: 250 },
    { field: "eventPurpose", headerName: "Event PUrpose", width: 400 },
    { field: "eventOrganizer", headerName: "Event Organizer", width: 150 },
    { field: "eventFacilitator", headerName: "Event Facilitator", width: 150 },
    { field: "eventAddress", headerName: "Event Address", width: 200 },
    { field: "eventDate", headerName: "Event Date", width: 150 },
  ];

  const rows = [];
  return (
    <section className="user-sidebar-container">
      <h3 className="user-sidebar-title"> List of Ratings </h3>
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
    </section>
  );
};
export default Ratings;
