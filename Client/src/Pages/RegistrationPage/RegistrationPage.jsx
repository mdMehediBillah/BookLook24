import { useState } from "react";
import { motion } from "framer-motion";
import { GiBlackBook } from "react-icons/gi";
import imgUrl from "../../assets/images/registrationPage_img.png";

import { LoginComponent, SignUpComponent } from "../../Components";

const RegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section
      className=" flex flex-col justify-center homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <motion.div
        initial={{ x: -20, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className=" flex justify-center py-4"
      >
        <GiBlackBook className="w-12 h-12" />
      </motion.div>

      <motion.h1
        initial={{ x: 20, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="text-3xl container mx-auto text-center mb-10 text-gray-700 drop-shadow-md"
      >
        Welcome to <span className="text-rose-500 font-semibold ">Book</span>
        <span className="text-cyan-600 font-semibold ">Look</span>
      </motion.h1>
      <div className="flex justify-center items-start">
        <div className="">
          {isLogin ? (
            <LoginComponent toggleForm={toggleForm} />
          ) : (
            <SignUpComponent toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
