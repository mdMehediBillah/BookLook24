import { useLocation } from "react-router-dom";
import "./BooksPage.scss";
import BookCardForShelf from "../../Components/bookshelf/bookCard/BookCardForShelf";
import { GoBackComponent, NavigationComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";
import { useContext } from "react";

const BooksPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const location = useLocation();
  const { books, bookshelf, borrowedBooks } = location.state || {
    books: [],
    bookshelf: {},
  };
  // console.log(books.length);
  // console.log(borrowedBooks?.length);
  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat bookshelf-page h-[100vh] ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className="max-w-screen-lg mx-auto flex justify-between">
        <GoBackComponent />
        <div className="py-1 px-3 font-semibold">
          <h4
            className={`text-lg font-bold line-clamp-1 ${
              theme === "light" ? "text-gray-800" : "text-gray-300"
            }`}
          >
            {bookshelf?.name}
          </h4>
        </div>
      </div>

      <section className="max-w-screen-lg mx-auto mt-4">
        <h2
          className={`text-2xl font-bold  pt-4 pb-8 ${
            theme === "light" ? "text-gray-800" : "text-gray-300"
          }`}
        >
          Books of {bookshelf?.name}{" "}
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {books &&
            books.length > 0 &&
            books.map((book) => {
              return <BookCardForShelf key={book._id} book={book} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default BooksPage;
