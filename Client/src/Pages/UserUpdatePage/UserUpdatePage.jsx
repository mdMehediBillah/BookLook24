import { Link, useNavigate } from "react-router-dom";
import { GoBackComponent, FooterComponent } from "../../Components";
import bannerImgUrl from "../../assets/images/banner_default.png";
import profileImgUrl from "../../assets/images/avatar.png";
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Context/User/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext";
import { DNA } from "react-loader-spinner";

// import { format } from "date-fns";
// import { useUserContext } from "../../Context/User/UserContext.jsx";

const UserUpdatePage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  const [form, setForm] = useState({ prompt: "" });

  const url = import.meta.env.VITE_REACT_APP_URL;
  // const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  // const userLocal = localStorage.getItem("user");
  // const user = JSON.parse(userLocal);
  const {
    firstName,
    lastName,
    email,
    aboutMe,
    street,
    zipCode,
    city,
    state,
    country,
    image,
    banner,
    createdAt,
  } = user;

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: "",
    aboutMe: aboutMe || "",
    street: street || "",
    zipCode: zipCode || "",
    city: city || "",
    state: state || "",
    country: country || "",
    image: "",
    banner: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(image || profileImgUrl);
  const [bannerPreview, setBannerPreview] = useState(banner || bannerImgUrl);
  const [imgUrl, setImgUrl] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [shareButton, setShareButton] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/registrationPage");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "banner") {
        setBannerPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    if (name === "prompt") {
      setForm({ ...form, prompt: value });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const data = new FormData();
    data.append("file", file);
    data.append("cloud_name", cloud_name);
    data.append("upload_preset", upload_preset);

    const response = await axios.post(cloud_URL, data);
    return response.data.url;
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : image;
      let bannerUrl = formData.banner
        ? await uploadImageToCloudinary(formData.banner)
        : banner;

      const updatedFormData = {
        ...formData,
        image: imageUrl,
        banner: bannerUrl,
      };
      // const token = localStorage.getItem("token");
      const response = await axios.put(
        `${url}/api/v1/auth/update/${user._id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      // console.log("User updated successfully:", response.data);

      setUser(response.data.result);
      // localStorage.setItem("user", JSON.stringify(response.data.result));
      setSuccess("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Server error! Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleImgGenerator = async (e) => {
    e.preventDefault();
    if (!form.prompt) {
      alert("Please provide a proper prompt");
      return;
    }
    try {
      setLoading(true);
      setGeneratingImage(true);
      setShareButton(false);
      const response = await fetch(`${url}/api/v1/images/generations`, {
        method: "POST",
        headers: {
          provider: "open-ai",
          mode: "production",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: form.prompt,
          size: "1024x1024",
        }),
      });
      const data = await response.json();
      const createdImage = data[0].url;
      setImgUrl(createdImage);
      setImagePreview(createdImage); // Update the avatar preview with the generated image
      // Save to Cloudinary
      const imageUrl = await uploadImageToCloudinary(createdImage);
      // Update form data with the Cloudinary URL
      setFormData({ ...formData, image: imageUrl });
      setLoading(false);
      setGeneratingImage(false);
      setShareButton(true);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setGeneratingImage(false);
    }
  };

  return (
    <main
      className={`pb-16 ${theme === "light" ? "bg-gray-50" : "bg-gray-400"}`}
    >
      <section
        className={`flex items-center py-2 px-4 container mx-auto justify-between screen-max-lg  max-w-screen-lg ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <div className="w-3/12">
          <GoBackComponent />
        </div>
        <div className="flex items-center gap-4 w-6/12 justify-center">
          <div>
            <Link
              to="/"
              className="flex justify-center items-center gap-2 text-xl"
            >
              <h3>
                <span className="text-rose-500 font-semibold ">Book</span>
                <span className="text-cyan-600 font-semibold ">Look</span>
              </h3>
            </Link>
          </div>
        </div>
        <div className="w-3/12 flex justify-end">
          <div className="py-1 px-3 font-semibold text-white">
            <h4
              className={` ${
                theme === "light" ? "text-rose-800" : "text-gray-300"
              }`}
            >
              Update Profile
            </h4>
          </div>
        </div>
      </section>
      <div
        className="bg-gray-400 h-[180px] relative container max-w-screen-lg mx-auto bg-cover bg-center bg-no-repeat w-[100%]"
        style={{
          backgroundImage: `url(${bannerPreview})`,
        }}
      >
        <div className="avatar absolute bottom-[-48px] left-[32px]">
          <div className="ring-gray-50 ring-cyan-400 w-44 rounded-full ring ring-offset-2">
            <img src={imagePreview} alt="Profile" />
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] rounded-full">
                <DNA loading={loading} color="#212121" size={28} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 px-4 container mx-auto justify-between screen-max-lg bg-gray-100 max-w-screen-lg pb-16">
        <form onSubmit={handelUpdate} className="">
          <div className="flex justify-between ">
            <div className="flex flex-col pt-12 w-56">
              <label className="mt-1 py-2 px-3 rounded cursor-pointer text-center  px-4 bg-cyan-100 w-8/12 mx-auto rounded-xl font-semibold hover:bg-cyan-300 text-sm">
                Change Profile
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col items-end w-56">
              <label className="mt-1 py-2 px-3 rounded cursor-pointer text-center  px-4 bg-cyan-100 w-8/12 mx-auto rounded-xl font-semibold hover:bg-cyan-300 text-sm">
                Change Banner
                <input
                  type="file"
                  name="banner"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full lg:w-8/12 py-2 flex flex-col items-center">
              <h4 className="text-gray-600 font-semibold text-lg">
                Generated your Profile Image
              </h4>
              <div className="w-full lg:w-8/12 flex flex-col items-center">
                <textarea
                  // ref={inputRef}
                  name="prompt"
                  className="textarea textarea-bordered h-24 w-full my-2"
                  placeholder="Describe yourself for your profile image"
                  onChange={handleChange}
                />
                <button
                  onClick={handleImgGenerator}
                  className="btn bg-rose-500 text-white w-8/12 hover:bg-rose-400 hover:text-gray-700"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="flex container mx-auto min-w-[360px] max-w-[900px] justify-between items-end pb-12 mt-8">
            <div>
              <h4 className="text-3xl font-semibold text-gray-600 ">
                Personal information
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-gray-500 text-sm">
                <span className="">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex gap-1 text-gray-500 text-sm">
                <span className="">Member since:</span>
                {/* <span>{`${format(createdAt, "dd/MM/yyyy")}`} </span> */}
              </div>
            </div>
          </div>
          <div className="min-w-[360px] max-w-[900px] mx-auto  grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    required
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    required
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm block  text-gray-700 mb-1">
                  About yourself
                </label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50 h-[162px]"
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-600 pb-2 pt-6">
                Address
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Your state"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm block  text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Your postal code"
                      className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm block  text-gray-700 mb-1">
                    Road
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Your Road"
                    className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm block  text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
                className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm block  text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="border-2 border-gray-200 rounded-lg py-1 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
              />
            </div>
            <div className="mb-8 px-2 pt-4">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4"
                />
                I am updating my profile and I agree to the changes
              </label>
            </div>
          </div>

          <div className=" min-w-[360px] max-w-[900px] mx-auto pt-8">
            <div className="w-6/12 mx-auto bg-cyan-900 text-center py-2 px-4 rounded-lg text-white font-semibold hover:bg-rose-600 cursor-pointer">
              <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Update Profile"}
              </button>
            </div>
          </div>
          {error && (
            <p className="bg-red-500 px-2 py-2 mt-4 text-sm font-regular rounded-lg text-center text-gray-50">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-700 px-2 py-2 mt-4 text-sm font-regular rounded-lg text-center text-gray-50">
              {success}
            </p>
          )}
        </form>
      </div>
      <FooterComponent />
    </main>
  );
};

export default UserUpdatePage;
