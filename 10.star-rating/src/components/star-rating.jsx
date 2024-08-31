import React from 'react'
import { useState } from 'react';

const StartRating = ({rating, size, onRatingClick}) => {
  const stars = [...Array(size)];
  const [hoveredStar, setHoveredStar] = useState(null);

  const getStarClass = function(val) {
    if (hoveredStar && val <= hoveredStar) {
      return " hover";
    } else if (rating && val <= rating) {
      return " active";
    }

    return "";
  }

  return (
    <div className="star-container">
      {
        stars.map((_, index) => (
          <span
            key={index + 1}
            onMouseEnter={() => setHoveredStar(index + 1)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => onRatingClick(index + 1)}
            className={`star${getStarClass(index + 1)}`}
          >
            &#9733;
          </span>
        ))
      }
    </div>
    
  )
}

export default StartRating