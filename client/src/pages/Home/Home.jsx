import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { RecipePost } from "../../components/index";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [highlightRecipes, setHighlightRecipes] = useState([]);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        setHighlightRecipes(randomRecipes(response.data, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fectRecipes();
  }, []);

  const randomRecipes = (recipes, number) => {
    const randomRecipes = [];
    const indices = [];
    while (indices.length < number) {
      const casualNumber = Math.floor(Math.random() * recipes.length);
      if (!indices.includes(casualNumber)) {
        indices.push(casualNumber);
        randomRecipes.push(recipes[casualNumber]);
      }
    }
    return randomRecipes;
  };

  return (
    <div className="home-container">
      <h1>Recipes</h1>
      <div className="home-recipes">
        {recipes.map((recipePost) => (
          <RecipePost recipe={recipePost} key={recipePost._id}></RecipePost>
        ))}
      </div>
    </div>
  );
};
