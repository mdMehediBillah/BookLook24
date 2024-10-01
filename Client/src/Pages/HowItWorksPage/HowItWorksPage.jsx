import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <div
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto">
        <div className="flex justify-center py-9 ">
          <h4
            className={`text-4xl font-medium ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            How it Works
          </h4>
        </div>
        <div className="flex flex-col justify-center items-center px-32 pb-9">
          <img
            src="src/assets/images/booklook_drawn_image.png"
            alt=" drawn image of how it works"
            width="600"
            height="auto"
          />

          <p
            className={`font-medium text-center ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            laboriosam cupiditate expedita laudantium, ipsa dolorum asperiores
            corporis obcaecati enim voluptate eius, consectetur ad officia?
            Officia, quaerat quos. Necessitatibus, natus obcaecati!
          </p>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HowItWorks;
