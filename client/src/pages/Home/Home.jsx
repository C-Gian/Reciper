import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { RecipeCard } from "../../components/index";

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
      <div className="homeh-highlight">
        <h1>POPULAR TODAY</h1>
        <div className="home-recipes">
          {highlightRecipes.map((hRecipe) => (
            <RecipeCard
              recipe={hRecipe}
              key={hRecipe._id}
              size={{ w: 400, h: 245 }}
            ></RecipeCard>
          ))}
        </div>
      </div>
      <div className="home-others-container">
        <h1>EXPLORE OTHERS RECIPES</h1>
        <div className="home-recipes home-others">
          {recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe._id}
              size={{ w: 300, h: 185 }}
            ></RecipeCard>
          ))}
        </div>
      </div>
    </div>
  );
};
