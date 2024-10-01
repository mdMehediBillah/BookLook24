import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";

const URL = import.meta.env.VITE_REACT_APP_URL;

const NewsletterSubscription = () => {
  const { user } = useAuthContext();
  const userId = user?._id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    id: userId || "",
  });
  // console.log(userId);
  // console.log(form);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setError(""); // Clear error message on input change
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.id) newErrors.id = "User ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors.email); // Set the first validation error message
      return;
    }
    setLoading(true);
    setError("");
    // console.log("clicked submit for subscription");

    try {
      const response = await axios.post(`${URL}/api/v1/subscribe/new`, form);
      toast.success("Successfully subscribed to the newsletter!");
      setForm({ email: "", id: user._id }); // Clear the form on success
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set error message from server
      } else {
        setError("Failed to subscribe. Please try again.");
      }
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-subscription">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="border-2 border-gray-200 rounded-l-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 text-white py-2 rounded-r-lg hover:bg-cyan-700 transition-colors px-2 text-sm"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        <div>
          {error && (
            <p className="bg-red-500 text-white text-sm py-1 px-2 rounded-md">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
