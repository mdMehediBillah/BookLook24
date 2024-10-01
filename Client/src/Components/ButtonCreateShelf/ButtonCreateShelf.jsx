import { Link } from "react-router-dom";

const ButtonCreateShelf = () => {
  return (
    <div className="flex bg-rose-500 py-1 px-4 rounded-lg hover:bg-cyan-400 shadow-md hover:scale-110 transition-transform duration-300">
      <Link to="/create_shelf">
        <span className="text-gray-900  text-sm font-semibold">
          Create Shelf
        </span>
      </Link>
    </div>
  );
};

export default ButtonCreateShelf;
