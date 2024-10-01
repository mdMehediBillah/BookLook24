import { Link, Outlet, NavLink } from "react-router-dom";

const CreateBook = () => {
  const NavStyle = ({ isActive }) => {
    return isActive ? "font-bold text-rose-600" : "text-gray-500";
  };
  return (
    <section className=" pt-6 flex flex-col gap-2 container mx-auto screen-max-lg max-w-screen-lg items-center">
      <ul className="flex gap-1 w-6/12 mx-auto justify-center pb-2">
        <NavLink to={"createBookSearch"} className={NavStyle}>
          <li className="py-1 px-4 border-2 border-gray-200 rounded-l-full hover:border-cyan-600 bg-gray-200  w-28 text-center">
            Search
          </li>
        </NavLink>
        <NavLink to={"createBookinput"} className={NavStyle}>
          <li className="py-1 px-4 border-2 border-gray-200 rounded-r-full hover:border-cyan-600 bg-gray-200  w-28 text-center">
            input text
          </li>
        </NavLink>
      </ul>
      <Outlet />
    </section>
  );
};

export default CreateBook;
