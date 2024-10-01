import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const FaqPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <div
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto ">
        <div className="flex justify-center py-9 items-center flex-col">
          <h4
            className={`text-4xl font-medium ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            FAQ
          </h4>
        </div>
        <div className="flex flex-col items-center pb-9">
          <p
            className={` font-medium text-center ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            You’ve got a question? We’ve got the answer! Check our most
            frequently asked questions about BookLook.com below.
          </p>
          <br />
          <div className="w-9/12 ">
            <div className="collapse collapse-arrow bg-cyan-100">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium ">
                Do I have to pay for a book?
              </div>
              <div className="collapse-content bg-cyan-50">
                <p>
                  Thanks to our daily growing community, we are able to
                  continually circulate more books. Due to the considerate
                  behavior of our community, which is based on charity,
                  borrowing books is always free.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-cyan-100">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                What should I do if the book I want to donate is in a foreign
                language?
              </div>
              <div className="collapse-content bg-cyan-50">
                <p>
                  There is always the possibility to donate books in any
                  language. As a community, we are open and grateful for every
                  donation.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-cyan-100">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Is there a limit to the number of books I can borrow?
              </div>
              <div className="collapse-content bg-cyan-50">
                <p>
                  There is no limit to the number of books that can be borrowed.
                  We are also happy about every donated book that is made
                  available to the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default FaqPage;
