import React from "react";
import "./RecipeCard.css";

export const RecipeCard = ({ recipe /* , saveRecipe, isRecipeSaved */ }) => {
  const {
    imageUrl,
    title,
    prepTime,
    cookTime,
    chillTime,
    description,
    instructions,
    ingredients,
    difficulty,
    type,
    healthy,
  } = recipe;
  return (
    <div className="recipe-container">
      <div className="recipe-t-container">
        <img src={imageUrl} alt={title}></img>
        <div className="recipet-type">
          <label>{type}</label>
        </div>
        <img
          src={
            difficulty === "easy"
              ? "\\assets\\images\\recipecard\\easy.png"
              : difficulty === "medium"
              ? "assets\\images\\recipecard\\medium.png"
              : "assets\\images\\recipecard\\hard.png"
          }
        ></img>
      </div>
      <div className="recipe-b-container">
        <h1>{title}</h1>
        <div className="recipeb-tih-container">
          <div className="recipebtih-time">
            <div className="recipebtih-time-icontext">
              <img src="assets\images\recipecard\time_icon.png"></img>
              <label>{prepTime + cookTime + chillTime}</label>
            </div>
            <label>Total time</label>
          </div>
          <div className="recipebtih-ingredients">
            <div className="recipebtih-ingredients-icontext">
              <img src="assets\images\recipecard\ingredients_icon.png"></img>
              <label>{ingredients.length}</label>
            </div>
            <label>Ingredients</label>
          </div>
          <div className="recipebtih-healthy">
            <div className="recipebtih-healthy-icontext">
              <img src="assets\images\recipecard\healthy_icon.png"></img>
              <label>{healthy}</label>
            </div>
            <label>Healthy</label>
          </div>
        </div>
        <button
        /* onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)} */
        >
          {/* {isRecipeSaved(recipe._id) ? "Saved" : "Save"} */}
          Save
        </button>
      </div>
    </div>
  );
};
