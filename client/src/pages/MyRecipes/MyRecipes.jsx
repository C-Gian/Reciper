import React, { useEffect, useState } from "react";
import "./MyRecipes.css";
import axios from "axios";
import { Utilitybar, RecipeCard } from "../../components/index";

export const MyRecipes = () => {
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
    <div className="myrecipes-container">
      <div className="myrecipesh-highlight">
        <h1>POPULAR TODAY</h1>
        <div className="myrecipes-recipes">
          {highlightRecipes.map((hRecipe) => (
            <RecipeCard
              recipe={hRecipe}
              key={hRecipe._id}
              size={{ w: 400, h: 245 }}
            ></RecipeCard>
          ))}
        </div>
      </div>
      <Utilitybar></Utilitybar>
      <div className="myrecipes-recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe._id}
            size={{ w: 300, h: 185 }}
          ></RecipeCard>
        ))}
      </div>
    </div>
  );
};
