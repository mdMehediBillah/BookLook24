import { Link } from "react-router-dom";
import LikedBookshelvesPage from "../../Components/LikedBookshelvesPage/LikedBookshelvesPage.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";
import { useContext } from "react";

const UserProfileActivitiesCompo = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <section
      className={`flex flex-col p-4 container max-w-screen-lg mx-auto ${
        theme === "light" ? "bg-gray-100" : "bg-gray-600"
      }`}
    >
      {/* <h4 className="text-sm font-bold py-2 uppercase">Your Book-shelves</h4> */}
      <LikedBookshelvesPage />
    </section>
  );
};

export default UserProfileActivitiesCompo;
