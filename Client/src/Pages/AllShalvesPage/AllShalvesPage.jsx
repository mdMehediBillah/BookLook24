import { LuBook } from "react-icons/lu";
import imgUrl from "../../assets/images/bg-color_terms.png";
import {
  FooterComponent,
  GoBackComponent,
  NavigationComponent,
} from "../../Components";
import LikeButton from "../../Components/LikeButtonComponent/LikeButtonComponent";
import { useBookshelvesContext } from "../../Context/Shelf/BookshelvesContext.jsx";
import { Link } from "react-router-dom";
import { getOpeningStatus } from "../../Components/Location/getOpeningStatus/getOpeningStatus";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const AllShalvesPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const { bookshelves, loading, error, loadMoreBookshelves, hasMore } =
    useBookshelvesContext();
  const [shalvesData, setShalvesData] = useState([]);
  const { user } = useAuthContext();

  const userId = user?._id;

  // =================================================================
  // fetch bookshelves
  useEffect(() => {
    setShalvesData(bookshelves);
    // setShalvesData(bookshelves.slice(0, 12));
  }, [bookshelves]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleLike = (bookshelfId) => {
    // Optionally, update local state or perform other actions when a bookshelf is liked
    // console.log(`Bookshelf ${bookshelfId} liked`);
  };

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
      // style={{
      //   backgroundImage: `url(${imgUrl})`,
      // }}
    >
      <NavigationComponent />
      <div className="max-w-screen-lg mx-auto">
        <GoBackComponent />
      </div>
      <section className="max-w-screen-lg mx-auto">
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
          {shalvesData?.map((shelf, idx) => {
            const { isOpen, message, detail } = getOpeningStatus(
              shelf.openingTime,
              shelf.closingTime
            );
            return (
              <div
                key={idx}
                className={`text-sm flex flex-col items-start p-2 border rounded mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-direction justify-between hover:shadow-xl ${
                  theme === "light"
                    ? "border-gray-200 bg-gray-50 text-gray-800"
                    : "border-gray-600 bg-gray-700 text-gray-300"
                }`}
              >
                {/* Image Container */}
                <Link to={`/${shelf._id}`}>
                  {shelf.image && shelf.image.length > 0 && (
                    <img
                      src={shelf.image[0]}
                      alt={shelf.name}
                      className="w-screen h-40 object-cover rounded-md"
                    />
                  )}

                  {/* Text Content */}
                  <h2 className="text-[16px] font-semibold pt-1">
                    {shelf.name}
                  </h2>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    {shelf.street}, {shelf.city}
                  </p>
                  <p className={`text-${isOpen ? "green" : "red"}-500`}>
                    {message} <span className="text-gray-500">{detail}</span>
                  </p>
                </Link>

                <div className="flex justify-between gap-2 mt-1  items-center w-full pt-4">
                  <div className="bg-cyan-600 w-7/12 rounded-md text-white">
                    <Link
                      to={`/create_book/${shelf._id}`}
                      className="flex items-center justify-center gap-1"
                    >
                      <div>
                        <LuBook />
                      </div>
                      <div>
                        <p className="text-center py-1">Add Book</p>
                      </div>
                    </Link>
                  </div>
                  <div className="w-5/12">
                    <div className="w-full bg-rose-200 rounded-lg text-gray-800">
                      <LikeButton
                        userId={userId}
                        bookshelfId={shelf._id}
                        onLike={handleLike}
                      />{" "}
                    </div>
                    {/* <LikeButton /> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          loadMoreBookshelves={loadMoreBookshelves}
          hasMore={hasMore}
          loadLessBookshelves={loadMoreBookshelves}
        />
      </section>
      <FooterComponent />
    </main>
  );
};

export default AllShalvesPage;
