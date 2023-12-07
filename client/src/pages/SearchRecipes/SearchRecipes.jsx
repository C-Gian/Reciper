import React, { useEffect, useState } from "react";
import "./SearchRecipes.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RecipeCard } from "../../components/index";

export const SearchRecipes = () => {
  let { state } = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fectRecipes();
  }, []);

  return (
    <div className="searchrecipes-container">
      <h1>Recipes with "{state}"</h1>
      <div className="searchrecipes">
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
