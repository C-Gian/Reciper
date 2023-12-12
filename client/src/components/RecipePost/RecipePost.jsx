import React from "react";
import "./RecipePost.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export const RecipePost = ({ recipe, index }) => {
  const {
    imageUrl,
    title,
    prepTime,
    cookTime,
    chillTime,
    description,
    instructions,
    ingredients,
    ratingVote,
    totalRatings,
    difficulty,
    price,
    type,
    healthy,
  } = recipe;

  return (
    <div className="rp-header">
      <Link to="/profile">
        <img src="\assets\images\leftbar\profile_icon.png" alt="" />
      </Link>
      <div className="rph-infos">
        <h1>Gabriella Monez</h1>
        <h3>2h</h3>
      </div>
      <div>
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
};
