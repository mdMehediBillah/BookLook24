import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  GoBackComponent,
  NavigationComponent,
  UserProfileComponent,
  FooterComponent,
} from "../../Components";
import ChatbotLayout from "../../Components/Chatbot/ChatbotLayout/ChatbotLayout";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);

  return (
    <main
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className="max-w-screen-lg mx-auto flex justify-between">
        <GoBackComponent />
        <div className="py-1 px-3 font-semibold">
          <h4
            className={`text-lg font-bold ${
              theme === "light" ? "text-rose-800" : "text-gray-300"
            }`}
          >
            Your Profile
          </h4>
        </div>
      </div>
      <div>
        <UserProfileComponent />
      </div>
      <FooterComponent />
      <ChatbotLayout />
    </main>
  );
};

export default UserProfilePage;
