import React from 'react';
import "./RatingBoard.css"

const ratings = [
  { stars: 5, percentage: 100, color: '#ff7300' },
  { stars: 4, percentage: 30, color: '#cccccc' },
  { stars: 3, percentage: 0, color: '#cccccc' },
  { stars: 2, percentage: 0, color: '#cccccc' },
  { stars: 1, percentage: 0, color: '#cccccc' }
];

const RatingBoard = () => {
  return (
    <div className="rating-board">
      <div className="rating-overview">
        <h1>5.0</h1>
        <span className="star">★</span>
        <span className="overall-rating">overall rating</span>
      </div>
      <div className="ratings">
        {ratings.map((rating) => (
          <div key={rating.stars} className="rating-row">
            <span>{rating.stars} stars</span>
            <div className="rating-bar">
              <div
                className="filled-bar"
                style={{ width: `${rating.percentage}%`, backgroundColor: rating.color }}
              ></div>
            </div>
            <span>{rating.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBoard;
