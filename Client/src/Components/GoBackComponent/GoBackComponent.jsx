import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const GoBackComponent = () => {
  const navigate = useNavigate();
  // handle back navigation
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {" "}
      <button onClick={handleGoBack} className="back-button">
        <div className="flex items-center gap-1 py-1 px-4 bg-cyan-700 rounded-full justify-center hover:bg-cyan-600 text-white text-sm">
          <IoIosArrowBack /> <span>Back</span>
        </div>
      </button>
    </div>
  );
};

export default GoBackComponent;
