import "./AdminSidebar.scss";
import { FaBook, FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { ThemeContext } from "../../../Components/lightDarkMood/ThemeContext.jsx";
import { useContext } from "react";

// import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";

const AdminSidebar = ({ isActive, setIsActive }) => {
  // Global state variables
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  // const handleLogout = () => {};

  return (
    <section
      className={`flex flex-col p-1 rounded-lg ${
        theme === "light" ? "bg-cyan-100" : "bg-gray-400"
      }`}
    >
      <aside onClick={() => setIsActive(1)} className="flex flex-col">
        <div className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg">
          <MdDashboard
            title="User Profile"
            className={isActive === 1 ? "active-icon" : "passive-icon"}
          />
          <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
            Summary
          </h4>
        </div>
      </aside>

      <aside
        onClick={() => setIsActive(2)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <FaUser
          title=""
          className={isActive === 2 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
          Users
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(3)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <GiBookshelf
          title="User Profile"
          className={isActive === 3 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
          Bookshelves
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(4)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <FaBook
          title="User Address"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          Books
        </h4>
      </aside>

      {/* <aside
        onClick={() => setIsActive(5)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <FaBook
          title="Change Password"
          className={isActive === 5 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
          Donated Books
        </h4>
      </aside> */}

      {/* <aside
        onClick={() => setIsActive(6)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <FaBook
          title="Change Password"
          className={isActive === 6 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
          Borrowed
        </h4>
      </aside> */}

      {/* <aside
        onClick={() => setIsActive(7)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <MdInsertComment
          title="Change Password"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          Comments
        </h4>
      </aside> */}
      {/* 
      <aside
        onClick={() => setIsActive(8)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <FaStar
          title="Change Password"
          className={isActive === 8 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
          Ratings
        </h4>
      </aside> */}

      {/* <aside
        onClick={() => setIsActive(9)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <MdCategory
          title="Change Password"
          className={isActive === 9 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 9 ? "active-text" : "passive-text"}>
          Genres
        </h4>
      </aside> */}

      {/* <aside
        onClick={() => setIsActive(10)}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <MdOutlineMessage
          title="User Inbox"
          className={isActive === 10 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 10 ? "active-text" : "passive-text"}>
          Admin Inbox
        </h4>
      </aside> */}

      {/* <aside
        onClick={handleLogout}
        className="flex items-center gap-1 hover:bg-rose-500 cursor-pointer w-full px-4 py-2 rounded-lg"
      >
        <IoMdLogOut
          title="Log Out"
          className={isActive === 11 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 11 ? "active-text" : "passive-text"}>
          Log Out
        </h4>
      </aside> */}
    </section>
  );
};

export default AdminSidebar;
