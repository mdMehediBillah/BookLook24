import { useContext } from "react";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const HeroText = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        className={`lg:text-4xl sm:text-3xl font-bold ${
          theme === "light" ? "text-rose-500" : "text-cyan-300"
        }`}
      >
        Start your journey
      </h1>

      <p
        className={`mt-1 lg:text-lg sm:text-sm ${
          theme === "light" ? "text-gray-800" : "text-gray-300"
        }`}
      >
        Discover your next favorite book today!
      </p>
    </div>
  );
};

export default HeroText;
