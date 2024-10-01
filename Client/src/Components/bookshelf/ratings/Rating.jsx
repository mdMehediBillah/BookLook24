import ReactStars from "react-rating-stars-component";

const Rating = ({ initialRating, onRatingChange }) => {
  const handleRatingChange = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <ReactStars
      count={5}
      value={initialRating}
      onChange={handleRatingChange}
      size={20}
      activeColor="#d4085d"
    />
  );
};

export default Rating;
