import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import imgPlaceholder from "../../assets/images/placeholder-image.jpg";
// import { useShelfContext } from "../../Context/Shelf/shelfContext.jsx";
import { toast } from "react-toastify";

const CreateBookComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { shelfData } = useShelfContext();
  // const shelfId = shelfData?._id || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(imgPlaceholder);

  // console.log(id);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImageUrl: "",
    language: "eng",
    summary: "",
    bookshelf: id,
  });

  const url = import.meta.env.VITE_REACT_APP_URL;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        coverImageUrl: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const data = new FormData();
    data.append("file", file);
    data.append("cloud_name", cloud_name);
    data.append("upload_preset", upload_preset);

    const response = await axios.post(cloud_URL, data);
    return response.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const imageUrl = formData.coverImageUrl
        ? await uploadImageToCloudinary(formData.coverImageUrl)
        : formData.coverImageUrl;

      const updatedFormData = {
        ...formData,
        coverImageUrl: imageUrl,
      };

      const response = await axios.post(
        `${url}/api/v1/books/new`,
        updatedFormData
      );
      // console.log(response.data);

      toast.success("Add Book successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating book:", error);
      setError("Server error! Please try again!");
      toast.error("Book not added. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container screen-max-lg rounded-lg">
      <div className="container mx-auto p-4">
        <h2 className="text-lg py-4 text-center">Type book's information</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] min-w-[380px] mx-auto p-4 bg-cyan-800 rounded-lg text-white"
        >
          <div className="flex flex-col mb-4">
            <label className="text-sm text-white mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book title"
              required
              className="border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-white mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
              className="border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-white mb-1">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            >
              <option value="eng">English</option>
              <option value="deu">German</option>
              <option value="fre">French</option>
              <option value="ita">Italian</option>
              <option value="spa">Spanish</option>
              <option value="ara">Arabic</option>
              <option value="ben">Bengali</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-white mb-1">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write something about the book"
              className="border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50 min-h-[120px]"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <label className="text-sm text-white">Upload Photo</label>
              <input
                type="file"
                name="coverImageUrl"
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
              />
            </div>
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-36 h-20 object-cover rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-rose-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-cyan-500"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Book"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBookComponent;
