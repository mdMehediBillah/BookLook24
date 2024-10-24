import "./AdminSidebar.scss";
import { FaBook, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";
import { useContext } from "react";

const AdminSidebar = ({ isActive, setIsActive }) => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <section
      className={` p-4 rounded-lg ${
        theme === "light" ? "bg-cyan-100" : "bg-gray-400 "
      }`}
    >
      {/* Sidebar layout */}
      <nav className="flex flex-row lg:flex-col lg:h-full lg:w-1/4 w-full justify-between lg:justify-start">
        <aside
          onClick={() => setIsActive(1)}
          className="flex flex-col items-center lg:flex-row gap-2 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg lg:w-full lg:items-start"
        >
          <MdDashboard
            title="Dashboard"
            className={isActive === 1 ? "active-icon" : "passive-icon"}
          />
          <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
            Summary
          </h4>
        </aside>

        <aside
          onClick={() => setIsActive(2)}
          className="flex flex-col items-center lg:flex-row gap-2 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg lg:w-full lg:items-start"
        >
          <FaUser
            title="Users"
            className={isActive === 2 ? "active-icon" : "passive-icon"}
          />
          <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
            Users
          </h4>
        </aside>

        <aside
          onClick={() => setIsActive(3)}
          className="flex flex-col items-center lg:flex-row gap-2 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg lg:w-full lg:items-start"
        >
          <GiBookshelf
            title="Bookshelves"
            className={isActive === 3 ? "active-icon" : "passive-icon"}
          />
          <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
            Bookshelves
          </h4>
        </aside>

        <aside
          onClick={() => setIsActive(4)}
          className="flex flex-col items-center lg:flex-row gap-2 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg lg:w-full lg:items-start"
        >
          <FaBook
            title="Books"
            className={isActive === 4 ? "active-icon" : "passive-icon"}
          />
          <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
            Books
          </h4>
        </aside>
      </nav>
    </section>
  );
};

export default AdminSidebar;
