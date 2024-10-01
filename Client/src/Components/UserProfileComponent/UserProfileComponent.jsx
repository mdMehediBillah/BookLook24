import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import bannerImgUrl from "../../assets/images/banner_default.png";
import profileImgUrl from "../../assets/images/avatar.png";
// import { format } from "date-fns";
import UserProfileActivitiesCompo from "../UserProfileActivitiesCompo/UserProfileActivitiesCompo.jsx";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";

const UserProfileComponent = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const { setUser, user } = useAuthContext();
  // console.log(JSON.stringify(user));

  // fetching data from local storage
  // const userLocal = localStorage.getItem("user");
  // const userLocalData = JSON.parse(userLocal);
  const { firstName, lastName, email, image, createdAt, banner, aboutMe } =
    user;
  const [loading, setLoading] = useState(false);

  // const [userData, setUserData] = useState(userLocal);

  const [imagePreview, setImagePreview] = useState(image || profileImgUrl);
  const [bannerPreview, setBannerPreview] = useState(banner || bannerImgUrl);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
    // setUserData(userLocal);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // logout();
    navigate("/registrationPage");
    window.location.reload();
  };

  return (
    <section>
      <div
        className="bg-gray-400 h-[180px] relative container max-w-screen-lg mx-auto bg-cover bg-center bg-no-repeat w-[100%]"
        style={{
          backgroundImage: `url(${bannerPreview})`,
        }}
      >
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray-50 ring-cyan-400 w-44 rounded-full ring ring-offset-2 bg-gray-500">
            <img src={imagePreview} alt="Profile" />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col justify-end items-end  pr-4 container max-w-screen-lg mx-auto ${
          theme === "light" ? "bg-gray-100" : "bg-gray-600"
        }`}
      >
        <div
          className={`flex gap-2 text-right text-2xl font-bold pt-2 container text-gray-700 justify-end ${
            theme === "light" ? "text-rose-500" : "text-rose-100"
          }`}
        >
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div>
          <p
            className={`text-right text-sm  container mx-auto text-gray-500 pt-1 ${
              theme === "light" ? "text-gray-500" : "text-gray-200"
            }`}
          >
            {email}
          </p>
        </div>
        <div>
          <p className="text-right text-sm  container mx-auto text-gray-500 ">
            {/* {`Member Since: ${format(createdAt, "dd/MM/yyyy")}`}{" "} */}
          </p>
        </div>
      </div>

      <div
        className={`flex justify-between gap-4 container max-w-screen-lg mx-auto pb-4 ${
          theme === "light" ? "bg-gray-100" : "bg-gray-600"
        }`}
      >
        <div className="pl-12 w-8/12">
          <p
            className={` pt-1 ${
              theme === "light" ? "text-gray-500" : "text-gray-200"
            }`}
          >
            {aboutMe}
          </p>
        </div>
        <div className=" w-4/12 text-right">
          <Link to="/profile_update">
            <button className="mt-3 mr-2 bg-cyan-100 py-2 px-4 text-center rounded-xl font-medium text-sm">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
      <UserProfileActivitiesCompo />

      <div
        className={`flex flex-col container max-w-screen-lg mx-auto px-4 pb-10 ${
          theme === "light" ? "bg-gray-200" : "bg-gray-500"
        }`}
      >
        <div>
          <button
            className="mt-3 bg-cyan-200 py-2 px-6 text-center rounded-xl font-semibold mb-10"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <div>
          <button
            className="btn btn-error btn-sm mt-2"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Delete Account
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h4 className="font-bold text-lg text-red-600">
                Delete Your Account?
              </h4>
              <p className="py-4">Warning: This action cannot be undone</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-accent mr-2 btn-sm">Close</button>
                  <button
                    className="btn btn-error btn-sm"
                    // onClick={() => removeLikedBookshelf(shelf._id)}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  );
};

export default UserProfileComponent;
