import React, { useEffect, useState } from "react";
import "./MyRecipes.css";
import { Utilitybar } from "../../components";
import axios from "axios";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";

export const MyRecipes = () => {
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
    <div className="myrecipes-container">
      <Utilitybar></Utilitybar>
      <div className="myrecipes-recipes">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id}></RecipeCard>
        ))}
      </div>
    </div>
  );
};
