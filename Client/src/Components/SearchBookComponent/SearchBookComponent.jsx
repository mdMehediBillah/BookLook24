import { useContext, useRef } from "react";
import { useGlobalContext } from "../../Context/Book/context.jsx"; // Import the context
import { Link } from "react-router-dom";
import coverImg from "../../assets/images/bookCover.png"; // Placeholder image
import "./SearchBookComponent.css";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";
import { ColorRing } from "react-loader-spinner";

const SearchBookComponent = ({ shelf }) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  // console.log(shelf);
  const { books, loading, resultTitle, setSearchTerm, fetchBooks } =
    useGlobalContext();
  const searchText = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(tempSearchTerm);
      fetchBooks(tempSearchTerm); // Fetch books when the search term is valid
    }
    searchText.current.value = "";
  };

  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.cover_id
        ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
        : coverImg,
    };
  });

  return (
    <section
      className={`w-full object-cover bg-cover bg-center bg-no-repeat bookshelf-page h-[100%] ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <form
        className="bg-gray-200 flex w-5/12 min-w-[400px] mx-auto rounded-full items-center justify-between border-2 border-cyan-600"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          ref={searchText}
          placeholder="Search Book by title or author"
          className="bg-transparent pl-4 w-full outline-none text-gray-900 placeholder:text-gray-500"
        />
        <button className="bg-cyan-600 py-2 px-6 rounded-r-full text-center font-medium text-gray-400 text-white">
          Search
        </button>
      </form>
      <div className="">
        {loading ? (
          <div className="flex flex-col justify-center  mx-auto w-6/12 mb-20">
            {" "}
            <div className="mx-auto">
              <div className="mx-auto">
                <ColorRing
                  loading={loading}
                  colors={[
                    "#00BCD4",
                    "#ff007a",
                    "#00BCD4",
                    "#ff007a",
                    "#00BCD4",
                  ]}
                  size={28}
                />
              </div>
              <span className="text-center">Loading search result...</span>
            </div>
          </div>
        ) : (
          <div className="container screen-max-lg p-4">
            <div className="">
              <h2
                className={`text-2xl font-bold pt-8 pb-4 line-clamp-1 ${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {resultTitle}
              </h2>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3 ">
                {booksWithCovers.map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-col bg-gray-50 p-2 shadow-md border-2 border-gray-200 rounded-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    {" "}
                    <Link to={`/createBookSearch/${book.id}`}>
                      <div className="">
                        {loading ? (
                          <div className="flex flex-col justify-center  mx-auto w-6/12">
                            {" "}
                            <div className="mx-auto">
                              <div className="mx-auto">
                                <ColorRing
                                  loading={loading}
                                  colors={[
                                    "#00BCD4",
                                    "#ff007a",
                                    "#00BCD4",
                                    "#ff007a",
                                    "#00BCD4",
                                  ]}
                                  size={28}
                                />
                              </div>
                              <span className="text-center">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={book.cover_img}
                            alt="cover"
                            className="w-full cover "
                          />
                        )}
                      </div>
                      {/* <div className="">
                        <img
                          src={book.cover_img}
                          alt="cover"
                          className="w-full cover "
                        />
                      </div> */}
                    </Link>
                    <div className="px-2">
                      <div className="text-lg font-semibold pt-2">
                        <span>{book.title}</span>
                      </div>
                      <div className="">
                        <span className="t">Author: </span>
                        <span>{book.author.join(", ")}</span>
                      </div>
                      <div className="">
                        <span className="">Total Editions: </span>
                        <span>{book.edition_count}</span>
                      </div>
                      <div className="">
                        <span className="">First Publish Year: </span>
                        <span>{book.first_publish_year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBookComponent;
