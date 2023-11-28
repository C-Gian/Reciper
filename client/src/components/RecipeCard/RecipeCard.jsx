import React from "react";

export const RecipeCard = ({ recipe, saveRecipe, isRecipeSaved }) => {
  /*
  Recipe components:
    - image
    - title
    - description
    - instructions in step mode
    - time to prepare
    - time to cook
    - time to chill
    - total time
    - type of dish (appetizer, main, etc)
    - healty, medium, unhealty
    - number of ingredients
    - ingredients
    - date added
    - button to save
    
  */
  return (
    <div className="recipe-container">
      <div>
        <h2>{recipe.name}</h2>
        <button
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
        >
          {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
        </button>
      </div>
      <div className="instructions">
        <p>{recipe.instructions}</p>
      </div>
      <img src={recipe.imageUrl} alt={recipe.name} />
      <p>Cooking Time: {recipe.cookingTime} minutes</p>
    </div>
  );
};
