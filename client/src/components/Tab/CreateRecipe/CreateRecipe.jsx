import React from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./CreateRecipe.css";

export const CreateRecipe = () => {
  const userID = useGetUserID();
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
    type: "",
    healthy: "",
    date: "",
    userOwner: userID,
  });
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedHealthy, setSelectedHealthy] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleHealthyChange = (event) => {
    setSelectedHealthy(event.target.value);
  };

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
      <form onSubmit={onSubmit} className="cr-form">
        <div className="cr-form-imageUrl-container">
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            type="text"
            placeholder="imageUrl"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
          ></input>
        </div>
        <div className="cr-form-title-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            onChange={handleChange}
          ></input>
        </div>
        <div className="cr-form-description-container">
          <label htmlFor="description">description</label>
          <textarea
            placeholder="description"
            id="description"
            name="description"
            onChange={handleChange}
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
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="cr-form-timestypehealthy-container">
          <div className="cr-form-times">
            <div className="cr-form-time-prep">
              <label htmlFor="prepTime">Preparation Time</label>
              <input
                type="number"
                placeholder="Preparation Time"
                id="prepTime"
                name="prepTime"
                onChange={handleChange}
              ></input>
            </div>
            <div className="cr-form-time-cook">
              <label htmlFor="cookTime">Cooking Time</label>
              <input
                type="number"
                placeholder="Cooking Time"
                id="cookTime"
                name="cookTime"
                onChange={handleChange}
              ></input>
            </div>
            <div className="cr-form-time-chill">
              <label htmlFor="chillTime">Chill Time</label>
              <input
                type="number"
                placeholder="Chill Time"
                id="chillTime"
                name="chillTime"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="cr-form-type">
            <h1>Type</h1>
            <select
              id="plateType"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Seleziona un tipo</option>
              <option value="primo">Primo</option>
              <option value="secondo">Secondo</option>
              <option value="contorno">Contorno</option>
            </select>
          </div>
          <div className="cr-form-healthy">
            <h1>Healthy Level</h1>
            <select
              id="plateHealthy"
              value={selectedHealthy}
              onChange={handleHealthyChange}
            >
              <option value="">Seleziona un tipo</option>
              <option value="primo">Primo</option>
              <option value="secondo">Secondo</option>
              <option value="contorno">Contorno</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
