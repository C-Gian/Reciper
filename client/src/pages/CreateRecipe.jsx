import React from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleIngredientChange = (e, index) => {
    e.preventDefault();
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("recipe created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="name"
          id="name"
          name="name"
          onChange={handleChange}
        ></input>
        <label htmlFor="ingredients">ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => {
              handleIngredientChange(e, index);
            }}
          ></input>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>
        <label htmlFor="instructions">instructions</label>
        <textarea
          placeholder="instructions"
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">imageUrl</label>
        <input
          type="text"
          placeholder="imageUrl"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        ></input>
        <label htmlFor="cookingTime">cookingTime</label>
        <input
          type="number"
          placeholder="cookingTime"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
