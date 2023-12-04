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
    for (let i = 0; i < number; i++) {
      const casualNumber = Math.floor(Math.random() * recipes.length);
      randomRecipes.push(recipes[randomRecipes]);
    }
    return randomRecipes;
  };

  return (
    <div className="myrecipes-container">
      <Utilitybar></Utilitybar>
      <div className="myrecipes-highlight-container">
        {/* {highlightRecipes.map((hRecipe, hIndex) => {
          
        })} */}
      </div>
      <div className="myrecipes-recipes">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id}></RecipeCard>
        ))}
      </div>
    </div>
  );
};
