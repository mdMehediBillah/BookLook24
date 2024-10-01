import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";
const AboutUsPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main
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
            About Us
          </h4>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto  ">
          <figure className="w-3/4">
            <img
              src="src/assets/images/habte_360.jpg"
              alt="Image of Yohannes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Yohannes Habtemariam</h2>
            <p>
              My personal mission is to serve people with love so that they can
              enjoy life to the fullest. Therefore, I am always happy to serve
              people with all my heart, mind, soul and body without
              discriminating. My main role in this group project was the
              backend, admin dashboard and retrieving some key pillars of the
              project.
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Anna Najafi</h2>
            <p>
              Being a proud part of BookLook is a dream coming true for me. As a
              passionate book lover, it was a big dream for me and my team to
              serve our application to the community.
            </p>
          </div>
          <figure className="w-3/4">
            <img src="src/assets/images/anna.png" alt="Image of Anna" />
          </figure>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto ">
          <figure className="w-3/4">
            <img src="src/assets/images/mehedi.png" alt="Image of Mehedi" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">MD Mehedi Billah</h2>
            <p>
              Nice experience for me to be a part of the BookLook family. My
              kids are the most motivating part for me in this time working on
              BookLook as they are really interested in reading and exploring.
            </p>
          </div>
        </div>
        <div className="card card-side shadow-xl bg-cyan-100 mb-5 size-4/5 mx-auto">
          <div className="card-body">
            <h2 className="card-title">Erdinc Yasar</h2>
            <p>
              BookLook became a part of my life since we started our journey to
              fullfill our goal. It makes me proud to be able to help the
              community with my team members. Thanks!
            </p>
          </div>
          <figure className="w-3/4">
            <img src="src/assets/images/erdinc.png" alt="Image of Erdinc" />
          </figure>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};
export default AboutUsPage;
