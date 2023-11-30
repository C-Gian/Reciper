import React from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./CreateRecipe.css";
import { format } from "date-fns";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    imageUrl: "",
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    chillTime: 0,
    price: 0,
    difficulty: "",
    type: "",
    healthy: "",
    date: "",
    userOwner: userID,
  });

  const handleTextSelectChange = (e) => {
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
    const currentDate = format(new Date(), "dd/MM/yyyy");
    const formDataWithDate = {
      ...recipe,
      date: currentDate,
    };
    try {
      const resp = await axios.post(
        "http://localhost:3001/recipes",
        formDataWithDate,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      console.log(resp);
      alert("recipe created");
      //navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit} className="cr-form">
        <div className="cr-form-imageUrl-container">
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            type="text"
            placeholder="imageUrl"
            id="imageUrl"
            name="imageUrl"
            onChange={handleTextSelectChange}
          ></input>
        </div>
        <div className="cr-form-title-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            onChange={handleTextSelectChange}
          ></input>
        </div>
        <div className="cr-form-description-container">
          <label htmlFor="description">description</label>
          <textarea
            placeholder="description"
            id="description"
            name="description"
            onChange={handleTextSelectChange}
          ></textarea>
        </div>
        <div className="cr-form-ingredients-container">
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
        </div>
        <div className="cr-form-instructions-container">
          <label htmlFor="instructions">instructions</label>
          <textarea
            placeholder="instructions"
            id="instructions"
            name="instructions"
            onChange={handleTextSelectChange}
          ></textarea>
        </div>
        <div className="cr-form-tthdp-container">
          <div className="cr-form-times">
            <div className="cr-form-time-prep">
              <label htmlFor="prepTime">Preparation Time</label>
              <input
                type="number"
                placeholder="Preparation Time"
                id="prepTime"
                name="prepTime"
                onChange={handleTextSelectChange}
              ></input>
            </div>
            <div className="cr-form-time-cook">
              <label htmlFor="cookTime">Cooking Time</label>
              <input
                type="number"
                placeholder="Cooking Time"
                id="cookTime"
                name="cookTime"
                onChange={handleTextSelectChange}
              ></input>
            </div>
            <div className="cr-form-time-chill">
              <label htmlFor="chillTime">Chill Time</label>
              <input
                type="number"
                placeholder="Chill Time"
                id="chillTime"
                name="chillTime"
                onChange={handleTextSelectChange}
              ></input>
            </div>
          </div>
          <div className="cr-form-type">
            <h1>Dish Type</h1>
            <select
              id="plateType"
              value={recipe.type}
              onChange={handleTextSelectChange}
              name="type"
            >
              <option value=""></option>
              <option value="appetizer">Appetizer</option>
              <option value="first course">First Course</option>
              <option value="main course">Main Course</option>
              <option value="side dish">Side Dish</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="cr-form-healthy">
            <h1>Healthy Level</h1>
            <select
              id="plateHealthy"
              value={recipe.healthy}
              onChange={handleTextSelectChange}
              name="healthy"
            >
              <option value=""></option>
              <option value="healthy">Healthy</option>
              <option value="neutral">Neutral</option>
              <option value="not healthy">Not Healthy</option>
            </select>
          </div>
          <div className="cr-form-difficulty">
            <h1>Difficulty Level</h1>
            <select
              id="plateDifficulty"
              value={recipe.difficulty}
              onChange={handleTextSelectChange}
              name="difficulty"
            >
              <option value=""></option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="cr-form-price">
            <h1>Price</h1>
            <input
              id="platePrice"
              value={recipe.price}
              onChange={handleTextSelectChange}
              name="price"
              type="number"
            ></input>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
