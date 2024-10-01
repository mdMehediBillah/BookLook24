import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

// =================================================================
// SignUpComponent
const SignUpComponent = ({ toggleForm }) => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_REACT_APP_URL;

  // =================================================================
  // define states
  const [visible, setVisibile] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });
  // const { firstName, lastName, email, password, agree } = formData;

  // =================================================================
  // handleChange event
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    // setErrors({ ...errors, [e.target.name]: "" }); // Clear error message on input change
  };

  // =================================================================
  // handleReset event
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agree: false,
    });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "first name is required";
    if (!formData.lastName) newErrors.lastName = "last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.agree)
      newErrors.agree = "You must accept the terms and conditions";
    return newErrors;
  };

  // =================================================================
  // handleSubmit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL}/api/v1/auth/register`,
        formData
      );
      console.log(response);
      toast.success("SignUp successfully!");
      handleReset();
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: "An error occurred. Please try again." });
      }
      // console.log(error.response.data.message);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =================================================================
  // =================================================================
  // return the SignUpComponent
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className=" w-5/12 mx-auto min-w-[360px] max-w-[580px] bg-gray-100 p-4 rounded-xl mb-16 drop-shadow-xl"
    >
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        Sign up your account
      </h2>
      <form onSubmit={handleSubmit} className="">
        {errors.form && (
          <p className="bg-red-600 text-white text-xs p-2 mb-2 rounded-md">
            {errors.form}
          </p>
        )}
        <div className="mb-3">
          <label className="text-sm block font-medium text-gray-900">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Your first name"
            className="border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.firstName && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="text-sm block font-medium text-gray-900">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Your first name"
            className="border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.lastName && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="text-sm block font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.email && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="text-sm block font-medium text-gray-900">
            Password
          </label>
          <div className="flex w-full items-center justify-between border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 focus:outline-none focus:border-cyan-50">
            <input
              type={visible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full text-gray-900 outline-none bg-transparent "
            />

            <div
              onClick={() => {
                setVisibile(!visible);
              }}
              className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-300"
            >
              {visible ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4 px-2">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
            />
            I accept the{" "}
            <Link to="/terms_condition">
              <span className="hover:underline text-cyan-600 cursor-pointer">
                terms and conditions
              </span>
            </Link>
          </label>
          {errors.agree && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.agree}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-800"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <div>
        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-gray-900  pl-2 hover:underline font-semibold"
          >
            Log In
          </button>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUpComponent;
