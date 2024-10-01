import {
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaApple,
  FaGoogle,
  FaAndroid,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
const FooterComponent = () => {
  return (
    <div className="bg-gray-900 min-h-48 text-white ">
      <div className="grid lg:grid-cols-2 py-10 px-4 container max-w-screen-lg mx-auto">
        <div className="grid md:grid-cols-2  mx-auto gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
              <FaApple /> <span>Apple Store</span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
              <FaGoogle /> <span>Google Store</span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
              <FaAndroid /> <span>Android Store</span>
            </div>
          </div>
          <div className="">
            <ul className="flex flex-col gap-2">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  Home
                </li>
              </Link>
              <Link to="/about_us" onClick={() => window.scrollTo(0, 0)}>
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  About Us
                </li>
              </Link>
              <Link to="/contact_us" onClick={() => window.scrollTo(0, 0)}>
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  Contact Us
                </li>
              </Link>
              <Link to="/how_it_works" onClick={() => window.scrollTo(0, 0)}>
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  How it Works
                </li>
              </Link>
              <Link to="/faq" onClick={() => window.scrollTo(0, 0)}>
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  FAQ
                </li>
              </Link>
              <Link
                to="/terms_and_conditions"
                onClick={() => window.scrollTo(0, 0)}
              >
                <li className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-cyan-100">
                  Terms & Conditions
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="">
          <h6 className="font-medium text-2xl  pb-4 cursor-default">
            Newsletter
          </h6>
          <NewsletterSubscription />
          <ul className="flex py-4 gap-3 cursor-pointer">
            <a href="https://www.whatsapp.com/?lang=de_DE" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaWhatsapp />
              </li>
            </a>
            <a href="https://www.facebook.com/?locale=de_DE" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaFacebook />
              </li>
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaYoutube />
              </li>
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaLinkedin />
              </li>
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaInstagram />
              </li>
            </a>
            <a href="https://x.com/?lang=de" target="_blank">
              <li className="flex gap-1 items-center cursor-pointer hover:scale-150 transition-transform duration-300 hover:text-cyan-100 text-2xl">
                <FaXTwitter />
              </li>
            </a>
          </ul>
          <div className="flex flex-col gap-1 mt-3">
            <p className="text-sm hover:text-cyan-200">
              <a href="tel:+1629386868">Mobile: +49 162 9386868</a>
            </p>
            <p className="text-sm hover:text-cyan-200">
              <a href="mailto:mailbillah@gmail.com">Email: team@booklook.com</a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly p-4 border-t border-white">
        <div className=" w-2/12 logo ">
          <Link to="/" className="flex justify-center items-center gap-2">
            <GiBlackBook className="min-w-11  min-h-11 text-cyan-200 " />
            <div>
              <span className="text-rose-400 font-semibold text-2xl">Book</span>
              <span className="text-cyan-400 font-semibold text-2xl">Look</span>
            </div>
          </Link>
        </div>
        <Link to="/">
          <p className="flex  justify-center pt-2 cursor-default">
            ©2024 booklook.com
          </p>
        </Link>
      </div>
    </div>
  );
};
export default FooterComponent;
