import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeComponent = () => {
  // Initial state for like status
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle the like/unlike button click
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="text-sm">
      <button onClick={handleLikeClick}>
        {isLiked ? (
          <div className="flex items-center gap-1">
            <FaHeart /> Liked
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <FaRegHeart /> Like
          </div>
        )}{" "}
        {/* {isLiked ? <FaHeart /> : <FaRegHeart />} */}
      </button>
    </div>
  );
};

export default LikeComponent;
