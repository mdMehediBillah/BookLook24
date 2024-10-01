import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const ContactUsPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className=" max-w-screen-lg mx-auto">
        <div className=" flex justify-center py-9 ">
          <h4
            className={`text-4xl font-medium cursor-default ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            Contact Us
          </h4>
        </div>
        <div className=" flex justify-center">
          <div className=" grid md:grid-cols-2 size-9/12  items-center  ">
            <img
              src="src/assets/images/contactUsBackground.png.png"
              alt="ContactUsImage"
              className="rounded-md  "
            />
            <form className=" flex flex-col py-1 px-1 rounded-md " action="">
              <input
                type="text"
                placeholder="Your Name"
                className={`border-2  w-6ful p-2 mt-4 rounded-md focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-800 font-semibold border-gray-300"
                    : "bg-gray-500 text-gray-50 font-semibold placeholder:text-gray-50 border-gray-600"
                }`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`border-2  w-6ful p-2 mt-4 rounded-md focus:outline-none ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-800 font-semibold border-gray-300"
                    : "bg-gray-500 text-gray-50 font-semibold placeholder:text-gray-50 border-gray-600"
                }`}
              />
              <textarea
                placeholder="Your Message"
                className={`border-2  w-6ful p-2 mt-4 rounded-md focus:outline-none resize-none ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-800 font-semibold border-gray-300"
                    : "bg-gray-500 text-gray-50 font-semibold placeholder:text-gray-50 border-gray-600"
                }`}
              />
              <button
                type="submit"
                className={`py-2 px-2 mt-4 text-black bg-cyan-200 border-2 border-gray-300 rounded-md w-24 font-medium hover:font-semibold hover:bg-cyan-300 ${
                  theme === "light" ? "border-gray-300" : "border-gray-600"
                }`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};

export default ContactUsPage;
