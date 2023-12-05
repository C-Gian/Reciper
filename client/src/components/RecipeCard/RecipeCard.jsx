import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export const RecipeCard = ({ recipe, index, size }) => {
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
    <div className="recipe-container" style={{ width: size.w }}>
      <Link
        to={{
          pathname: "/recipe",
        }}
        state={recipe}
        key={index}
      >
        <div className="recipe-t-container" style={{ height: size.h }}>
          <img src={imageUrl} alt={title}></img>
          {/* <img
            src={
              difficulty === "easy"
                ? "\\assets\\images\\recipecard\\easy.png"
                : difficulty === "medium"
                ? "assets\\images\\recipecard\\medium.png"
                : "assets\\images\\recipecard\\hard.png"
            }
          ></img> */}
          {/* <div className="recipet-saveicon">
            <img
              src="\assets\images\recipes\fav_icon_heart.png"
              alt="save recipe"
            ></img>
          </div> */}
        </div>
        <div className="recipe-b-container">
          {/* <div className="recipeb-typeprice-container">
            <div className="recipeb-type">
              <label>{type}</label>
            </div>
            <div className="recipeb-price-container">
              <img src="assets\images\recipecard\dollar_icon.png" alt="price" />
              <img
                src="assets\images\recipecard\dollar_icon.png"
                alt="price"
                className={price <= 5 ? "recipeb-dollar-disabled" : ""}
              />
              <img
                src="assets\images\recipecard\dollar_icon.png"
                alt="price"
                className={price <= 10 ? "recipeb-dollar-disabled" : ""}
              />
            </div>
          </div> */}
          {/* <div className="recipeb-ti-container">
            <div className="recipebti-time">
              <img src="assets\images\recipecard\time_icon.png"></img>
              <label>{prepTime + cookTime + chillTime}</label>
              <label>minutes</label>
            </div>
            <div className="recipebti-divider"></div>
            <div className="recipebti-ingredients">
              <img src="assets\images\recipecard\ingredients_icon.png"></img>
              <label>{ingredients.length}</label>
              <label>ingredients</label>
            </div>
          </div> */}
          <div className="recipeb-tti-container">
            <div className="recipeb-type-container">
              <label>{type}</label>
            </div>
            <div className="recipeb-ti-container">
              <div className="recipebti-time">
                <img src="assets\images\recipecard\time_icon.png"></img>
                <label>{prepTime + cookTime + chillTime}</label>
              </div>
              <div className="recipebti-ingredients">
                <img src="assets\images\recipecard\ingredients_icon.png"></img>
                <label>{ingredients.length}</label>
              </div>
            </div>
          </div>
          <h1>{title}</h1>
          <div className="recipeb-rating">
            <Rating
              size={20}
              initialValue={ratingVote}
              allowFraction={true}
              readonly={true}
            />
            <label>{Math.floor(ratingVote * 10) / 10}</label>
            <label>{`(${totalRatings})`}</label>
          </div>
          {/* <div className="recipeb-infos">
            <div className="recipebinfo">
              <img src="assets\images\recipes\price_icon.png" alt="price"></img>
              <h1>Price</h1>
              <label>
                {price <= 5 ? "low" : price <= 10 ? "medium" : "high"}
              </label>
            </div>
            <div className="recipebinfo">
              <img
                src="assets\images\recipes\difficulty_icon.png"
                alt="price"
              ></img>
              <h1>Difficulty</h1>
              <label>{difficulty}</label>
            </div>
            <div className="recipebinfo">
              <img
                src="assets\images\recipes\healthy_icon.png"
                alt="price"
              ></img>
              <h1>Healthy</h1>
              <label>{healthy ? "yes" : "no"}</label>
            </div>
          </div> */}
          {/* <button
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
          >
            {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            Save
          </button> */}
        </div>
      </Link>
    </div>
  );
};
