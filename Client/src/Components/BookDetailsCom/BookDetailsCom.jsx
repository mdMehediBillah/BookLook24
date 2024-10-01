import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx";
import coverImg from "../../assets/images/bookCover.png";
import { toast } from "react-toastify";
const URLLocal = import.meta.env.VITE_REACT_APP_URL;
import { FooterComponent } from "../../Components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoBackComponent from "../GoBackComponent/GoBackComponent";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

const URL = "https://openlibrary.org/works/";

const BookDetails = ({ shelf }) => {
  const { shelfData } = useShelfContext();
  // console.log(shelfData._id);
  const { id } = useParams();
  // console.log(shelf);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        // console.log(data);

        // =================================================================
        // get author name
        // console.log(data.authors[0].author.key);
        const authorKey = data.authors[0].author.key;
        // http://openlibrary.org/search.json?author=/authors/$OL3732231A}
        const authorNameurl = `http://openlibrary.org/search.json?author=${authorKey}`;
        // console.log(authorNameurl);

        const authorResponse = await fetch(authorNameurl);
        const authorData = await authorResponse.json();
        // console.log(authorData.docs[0].author_name);
        const author = authorData.docs[0].author_name;
        setAuthorData(author);
        // console.log(authorData.docs[0].author_name);
        // =================================================================

        setFormData(data);
        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook = {
            description: description
              ? description.value
              : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);
  // if (loading) return <Loading />;

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    const imageFormData = formData.covers[0];

    // fetch image from openlibrary
    // console.log(imageFormData);
    const url = `https://covers.openlibrary.org/b/id/${imageFormData}-L.jpg`;
    // setImageData(url);
    // console.log(url);
    // console.log(imageData);

    // create new book object with updated data
    const newBook = {
      ISBN: "",
      title: formData.title,
      author: authorData[0],
      coverImageUrl: url,
      summary: formData.description,
      subjects: formData.subjects,
      bookshelf: shelfData._id,
      genre: "",
      publisher: "",
      publishedDate: "",
      language: "",
    };

    setFormData(newBook);
    // save changes to database
    // console.log(formData);
    // console.log(newBook.title);
    // console.log(newBook.author);
    // console.log(newBook.coverImageUrl);
    // console.log(newBook.bookshelf);
    // const img = newBook.image;
    // const url = `https://covers.openlibrary.org/b/id/${img}-L.jpg`;
    // setImageData(url);
    try {
      const response = await axios.post(`${URLLocal}/api/v1/books/new`, {
        title: newBook.title,
        author: newBook.author,
        coverImageUrl: newBook.coverImageUrl,
        // summary: newBook.summary,
        // subjects: newBook.subjects,
        bookshelf: newBook.bookshelf,
        // genre: newBook.genre,
        // publisher: newBook.publisher,
        // publishedDate: newBook.publishedDate,
        // language: newBook.language,
      });
      // console.log(response.data);
      toast.success("Add Book successfully!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Book not added. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <main className="h-[100%] mb-12">
        <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-cyan-900 max-w-screen-lg">
          <div className="w-3/12">
            <GoBackComponent />
          </div>
          <div className="flex items-center gap-4 w-6/12 justify-center">
            <div>
              <Link
                to="/"
                className="flex justify-center items-center gap-2 text-xl"
              >
                <h3>
                  <span className="text-rose-500 font-semibold ">Book</span>
                  <span className="text-cyan-600 font-semibold ">Look</span>
                </h3>
              </Link>
            </div>
          </div>
          <div className="w-3/12 flex justify-end">
            <div className="py-1 px-3 font-semibold text-white">
              <h4>Book Details</h4>
            </div>
          </div>
        </section>
        <section className="flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg bg-gray-200 max-w-screen-lg">
          <div className="container">
            <div className="grid md:grid-cols-2 justify-center py-8 px-6 gap-4 mt-4">
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
                    src={book?.cover_img}
                    alt="cover img"
                    className="w-full object-cover rounded-md"
                  />
                )}
              </div>
              <div className=" flex flex-col gap-2">
                <div className="">
                  <span className="text-2xl font-bold">{book?.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="">
                    <span className="">{book?.description}</span>
                  </div>
                  <div className="book-details-item">
                    <span className="fw-6">Subject Places: </span>
                    <span className="text-italic">{book?.subject_places}</span>
                  </div>
                  <div className="book-details-item">
                    <span className="fw-6">Subject Times: </span>
                    <span className="text-italic">{book?.subject_times}</span>
                  </div>
                  <div className="book-details-item">
                    <span className="fw-6">Subjects: </span>
                    <span>{book?.subjects}</span>
                  </div>
                </div>
                <button
                  onClick={handleBookSubmit}
                  className="bg-cyan-800 text-white py-2 rounded-xl mt-8 w-10/12 mx-auto font-semibold hover:bg-rose-600"
                >
                  Add to shelf
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </>
  );
};

export default BookDetails;
