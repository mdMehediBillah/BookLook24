import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import imgUrl from "../../assets/images/shelfDefault.png";
const URL = import.meta.env.VITE_REACT_APP_URL;
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";
import { motion } from "framer-motion";

const LikedBookshelvesPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuthContext();
  const [openUnlikeBook, setOpenUnlikeBook] = useState(false);

  const [likedBookshelves, setLikedBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLikedBookshelves = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL}/api/v1/likeShelf/likedBookshelves/${userId}`
      );
      setLikedBookshelves(response.data.favBookshelves);
    } catch (error) {
      setError("Failed to fetch liked bookshelves");
      toast.error("Failed to fetch liked bookshelves");
    } finally {
      setLoading(false);
    }
  };

  const removeLikedBookshelf = async (shelfId) => {
    try {
      await axios.delete(
        `${URL}/api/v1/likeShelf/unlikeBookshelf/${user._id}/${shelfId}`
      );
      setLikedBookshelves((prevBookshelves) =>
        prevBookshelves.filter((shelf) => shelf._id !== shelfId)
      );
      toast.success("Bookshelf removed from liked bookshelves");
    } catch (error) {
      toast.error("Failed to remove liked bookshelf");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchLikedBookshelves(user._id);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <h2
        className={`text-2xl font-bold mb-4 ${
          theme === "light" ? "text-gray-500" : "text-gray-300"
        }`}
      >
        {likedBookshelves.length > 0
          ? "Your Liked Bookshelves"
          : "Bookshelf not found"}
      </h2>
      {likedBookshelves.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
          {likedBookshelves.map((shelf) => (
            <div
              key={shelf._id}
              className={`text-sm flex flex-col items-start p-2 border rounded mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer justify-between hover:shadow-xl ${
                theme === "light"
                  ? "bg-gray-100 border-gray-200"
                  : "bg-gray-300 border-gray-200"
              }`}
            >
              <Link to={`/${shelf._id}`}>
                {shelf.image && shelf.image.length > 0 && (
                  <img
                    src={shelf.image[0]}
                    alt={shelf.name}
                    className="w-screen h-40 object-cover rounded-md"
                  />
                )}
                <h2 className="text-[16px] font-semibold pt-1">{shelf.name}</h2>
                <p className="text-gray-700">
                  {shelf.street}, {shelf.city}
                </p>
              </Link>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-warning btn-sm mt-2"
                onClick={() =>
                  document.getElementById("my_modal_6").showModal()
                }
              >
                Remove
              </button>
              <dialog
                id="my_modal_6"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h4 className="font-bold text-lg text-rose-500">
                    Remove Bookshelf!
                  </h4>
                  <p className="py-4">
                    Do you really want to remove this bookshelf from your liked
                    ?
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-accent mr-2 btn-sm">
                        Close
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => removeLikedBookshelf(shelf._id)}
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
              {/* <button
                onClick={() => removeLikedBookshelf(shelf._id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4 py-3 px-2">
          <Link to="/allShalves" className="mt-4">
            <div className="text-sm flex flex-col items-start p-2 border border-gray-300 rounded bg-gray-50 mb-4 shadow-md hover:scale-105 transition-transform duration-500 cursor-pointer justify-between hover:shadow-xl">
              <img
                src={imgUrl}
                alt="No Bookshelf"
                className="w-screen h-40 object-cover rounded-md"
              />
              <h2 className="text-[16px] font-semibold pt-1">
                No Bookshelf name
              </h2>
              <p className="text-gray-700">
                No bookshelf found. Click here to add a new bookshelf.
              </p>
            </div>
            <button className="w-full text-center py-2 px-4 bg-cyan-800 text-white rounded-md">
              Add a new bookshelf
            </button>
          </Link>
        </div>
      )}

      {openUnlikeBook && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-red-200 bg-opacity-75 z-50"
          onClick={() => openUnlikeBook(false)}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateX: 180, x: "-100vw" }}
            animate={{ scale: 1, opacity: 1, rotateX: 0, x: 0 }}
            transition={{ type: "spring", duration: 0.2, bounce: 20 }}
            className="w-full max-w-lg mx-auto bg-white rounded-md shadow-lg p-4 border-radius-2xl border-gray-200 border-4 flex gap-4"
          ></motion.div>
        </div>
      )}
    </div>
  );
};

export default LikedBookshelvesPage;
