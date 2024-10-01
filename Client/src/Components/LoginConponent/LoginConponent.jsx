import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuthContext } from "../../Context/User/AuthContext.jsx"; // Adjust the path as necessary

const URL = import.meta.env.VITE_REACT_APP_URL;

// =================================================================
// LoginComponent
const LoginConponent = ({ toggleForm }) => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  // =================================================================
  // define states
  const [loading, setLoading] = useState(false);
  const [visible, setVisibile] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { email, password, rememberMe } = form;

  // =================================================================
  // handleReset event
  const handleReset = () => {
    setForm({
      email: "",
      password: "",
      rememberMe: false,
    });
  };
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error message on input change
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // Handle submit
  const handelLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/api/v1/auth/login`, form);
      localStorage.setItem("token", `Bearer ${response.data.token}`);

      setUser(response.data.result);
      toast.success("Login successfully!");
      handleReset();
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: "An error occurred. Please try again." });
      }
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className=" w-5/12 mx-auto min-w-[360px] max-w-[580px] bg-gray-100 p-4 rounded-xl mb-16 drop-shadow-xl"
    >
      <h2 className="text-xl font-bold mb-6 text-gray-900 mx-auto">
        Log in your account
      </h2>
      <form onSubmit={handelLogin}>
        {errors.form && (
          <p className="bg-red-600 text-white text-xs p-2 mb-2 rounded-md">
            {errors.form}
          </p>
        )}
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your email address"
            className="border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-100 text-gray-900"
          />
          {errors.email && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm block font-medium text-gray-900">
            Password
          </label>
          <div className="flex w-full items-center justify-between border-2 border-gray-300 rounded-lg py-1 px-2 text-gray-700 0focus:outline-none focus:border-cyan-50">
            <input
              type={visible ? "text" : "password"}
              name="password"
              value={password}
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
              name="rememberMe"
              checked={rememberMe}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
            />
            Remember me
          </label>
          {/* {errors.agree && (
            <p className="text-xs text-red-600 px-2 pt-1">{errors.agree}</p>
          )} */}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-800"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div>
        <p className="text-center text-gray-700 mt-4 text-sm">
          Don`t have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-gray-900  pl-2 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.section>
  );
};

export default LoginConponent;
