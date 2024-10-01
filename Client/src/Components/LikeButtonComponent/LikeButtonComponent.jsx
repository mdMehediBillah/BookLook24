import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_REACT_APP_URL;

const LikeButton = ({ userId, bookshelfId, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/likeShelf/status`, {
          params: { userId, bookshelfId },
        });
        setLiked(response.data.liked);
        // if (response.status === 200) {
        //   setLiked(true);
        // }
      } catch (error) {
        console.error("Error checking liked status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && bookshelfId) {
      checkLikedStatus();
    }
  }, [userId, bookshelfId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/likeShelf`, {
        userId,
        bookshelfId,
      });
      if (response.status === 200) {
        setLiked(true);
        if (onLike) onLike(bookshelfId); // Notify parent component about the like
        toast.success("Wow, you have liked this bookshelf!");
      }
    } catch (error) {
      console.error("Error liking bookshelf:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full rounded-md flex justify-center py-1">
      <button
        onClick={handleLike}
        className={`like-button ${liked ? "liked" : ""}`}
        disabled={liked}
      >
        {liked ? (
          <div className="flex gap-1 items-center ">
            <span>
              <FaHeart />
            </span>
            <span>Liked</span>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <span>
              <FaRegHeart />
            </span>
            <span>Like</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default LikeButton;
