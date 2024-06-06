/* eslint-disable react/prop-types */
import { useState } from "react";

const StarRating = ({ size = 5, rating, onChange = () => {} }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  return (
    <div>
      {Array(size)
        .fill("")
        .map((_, index) => {
          let starClass = "star";
          if (hoveredRating >= index + 1) {
            starClass += " hover";
          }
          if (index + 1 <= rating) {
            starClass += " active";
          }
          return (
            <span
              key={index}
              className={starClass}
              onMouseEnter={() => handleStarHover(index + 1)}
              onMouseLeave={() => handleStarHover(0)}
              onClick={() => onChange(index + 1)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
