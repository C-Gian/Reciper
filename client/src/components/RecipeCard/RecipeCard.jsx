import React from "react";
import "./RecipeCard.css";

export const RecipeCard = ({ recipe, saveRecipe, isRecipeSaved }) => {
  /*
  Recipe components:
    - image*
    - title*
    - description*
    - instructions in step mode
    - time to prepare
    - time to cook
    - time to chill
    - total time*
    - type of dish (appetizer, main, etc)*
    - healty, medium, unhealty*
    - number of ingredients*
    - ingredients
    - date added
    - button to save*
  */
  return (
    <div className="recipe-container">
      <div className="recipe-t-container">
        <img
          /* src={recipe.imageUrl} alt={recipe.name} */ src="\assets\images\recipecard\imagesample.png"
        ></img>
        <div className="recipet-type">
          <label>Appetizer</label>
        </div>
        <img src="\assets\images\recipecard\easy.png"></img>
      </div>
      <div className="recipe-b-container">
        <h1>{recipe.name}</h1>
        <div className="recipeb-tih-container">
          <div className="recipebtih-time">
            <div className="recipebtih-time-icontext">
              <img src="assets\images\recipecard\time_icon.png"></img>
              <label>{recipe.cookingTime}</label>
            </div>
            <label>Total time</label>
          </div>
          <div className="recipebtih-ingredients">
            <div className="recipebtih-ingredients-icontext">
              <img src="assets\images\recipecard\ingredients_icon.png"></img>
              <label>{recipe.cookingTime}</label>
            </div>
            <label>Ingredients</label>
          </div>
          <div className="recipebtih-healthy">
            <div className="recipebtih-healthy-icontext">
              <img src="assets\images\recipecard\healthy_icon.png"></img>
              <label>{recipe.cookingTime}</label>
            </div>
            <label>Healthy</label>
          </div>
        </div>
        <button
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
        >
          {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};
