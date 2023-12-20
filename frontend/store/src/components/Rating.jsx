import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";
const Rating = ({ ratingValue, numReviews, addRate }) => {
  //? Function to generate an array of star components based on the rating value
  const generateStars = () => {
    ratingValue = ratingValue ? ratingValue : 0;
    const stars = [];
    const fullStars = Math.floor(ratingValue); // Number of full stars
    const hasHalfStar = ratingValue % 1 !== 0; // Check if there's a half star (value is r)

    // I- Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar color="#FF9800" key={i} />);
    }

    // II- Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt color="#FF9800" key="half" />);
    }

    // Calculate the number of empty stars needed
    const emptyStars = 5 - stars.length;
    // III- Empty stars
    // Add the necessary empty stars to the Stars array
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar color="#FF9800" key={`empty_${i}`} />);
    }

    return stars;
  };

  return (
    <div >
      <span>{generateStars()}</span>

      {!addRate && (
        <span className="rating-text">
          {numReviews ? numReviews : 0} reviews
        </span>
      )}
    </div>
  );
};

Rating.propTypes = {
  ratingValue: PropTypes.number,
  numReviews: PropTypes.number,
};
export default Rating;
