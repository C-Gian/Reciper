import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./Review.css";

export const Review = ({ review }) => {
  return (
    <div className="review-container">
      <div className="review-author-vote">
        <div className="review-author">
          <Link to="/">
            <img src="\assets\images\recipe\profile_icon.png"></img>
          </Link>
          <h1>{review.user}</h1>
        </div>
        <Rating
          size={25}
          initialValue={review.rating}
          allowFraction={true}
          readonly={true}
          style={{ marginLeft: 40 }}
        />
      </div>
      <p>{review.message}</p>
    </div>
  );
};
