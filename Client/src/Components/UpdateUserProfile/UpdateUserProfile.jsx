import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import UserProfileActivitiesCompo from "../UserProfileActivitiesCompo/UserProfileActivitiesCompo.jsx";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  // console.log(user);

  // fetching data from local storage
  // const userLocal = localStorage.getItem("user");
  // const user = JSON.parse(userLocal);
  // const { firstName, lastName, email, image, createdAt } = user;
  // console.log(email, firstName, lastName, email, image, createdAt);
  const [loading, setLoading] = useState(false);

  // const [userData, setUserData] = useState(userLocal);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
    // setUserData(userLocal);
  }, []);

  return (
    <div>
      <div className="bg-gray-400 h-[180px] relative container max-w-screen-lg mx-auto ">
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end   container max-w-screen-lg mx-auto bg-gray-50 ">
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) =>
                setUser(
                  { ...user, firstName: e.target.value }
                  // JSON.stringify({ ...user, firstName: e.target.value })
                )
              }
              className="mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input type="text" id="lastName" name="lastName" value={lastName} />
          </div>
        </form>

        <div>
          <p className="text-right text-md font-semibold container mx-auto text-gray-500 pt-1">
            {email}
          </p>
        </div>
        <div>
          <p className="text-right text-md font-semibold container mx-auto text-gray-500 ">
            {`Member Since: ${format(createdAt, "dd/MM/yyyy")}`}{" "}
            {/* {`Member Since: ${createdAt}`}{" "} */}
            {/* {format(user.createdAt, "dd/MM/yyyy HH:mm")} */}
          </p>
        </div>
        {/* <div>
          <Link to="/update">
            <button className="mt-3 bg-cyan-200 py-2 px-4 text-center rounded-xl font-medium text-sm">
              Update Profile
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default UpdateUserProfile;
