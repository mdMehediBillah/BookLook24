import { useBookshelvesContext } from "../../Context/Shelf/BookshelvesContext.jsx";

const Pagination = ({ hasMore }) => {
  const { page, loadMoreBookshelves } = useBookshelvesContext();
  // console.log(page);
  return (
    <>
      <div className="flex justify-center py-4">
        {hasMore ? (
          <button
            // onClick={() => hasMore && setPage(page + 1)}
            onClick={loadMoreBookshelves}
            className="bg-rose-600 text-white py-2 px-12 rounded hover:bg-cyan-700 transition-colors"
          >
            Load More
          </button>
        ) : (
          <p>No more bookshelves to load</p>
        )}
      </div>
    </>
  );
};

export default Pagination;
