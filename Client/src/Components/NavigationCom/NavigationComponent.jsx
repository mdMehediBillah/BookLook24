import { useContext, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { MdOutlineLeaderboard } from "react-icons/md";
// import { GrLogout } from "react-icons/gr";
import { GiBlackBook } from "react-icons/gi";
// import { motion } from "framer-motion";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import ThemeToggle from "../lightDarkMood/ThemeToggle.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

// =================================================================
// NavigationComponent
const NavigationComponent = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const { user } = useAuthContext();
  const navigate = useNavigate();

  // console.log("user =", user);

  const { firstName } = user;

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);

  // Navlink styles
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-cyan-600" : "text-black";
  };

  // handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    // logout();
    navigate("/registrationPage");
  };
  // max-w-screen-lg mx-auto container
  return (
    <>
      <div
        className={`navbar w-full object-cover container mx-auto bg-cover bg-center bg-no-repeat ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <div className="flex-1">
          <div className=" w-2/12 logo">
            <Link to="/" className="flex justify-center items-center gap-2">
              <GiBlackBook
                className={`min-w-7 min-h-7 ${
                  theme === "light" ? "text-gray-800" : "text-gray-100"
                }`}
              />

              <div>
                <span className="text-rose-500 font-semibold text-2xl">
                  Book
                </span>
                <span className="text-cyan-600 font-semibold text-2xl">
                  Look
                </span>
              </div>
            </Link>
          </div>
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        </div>
        <ThemeToggle />

        <div className="flex-none gap-2 ">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.image} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <Link to="/profile">
                <li>
                  <span className="justify-between">Profile</span>
                </li>
              </Link>
              {user && user.role === "admin" && (
                <Link to="/admin/dashboard">
                  <li>
                    <span className="justify-between">Admin</span>
                  </li>
                </Link>
              )}

              <li onClick={handleLogout}>
                <span className="justify-between">
                  Logout
                  {/* <span className="badge">New</span> */}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationComponent;
