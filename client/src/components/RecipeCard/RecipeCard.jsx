import React, { useState } from "react";

export const RecipeCard = ({ recipe }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };

  return (
    <div>
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
