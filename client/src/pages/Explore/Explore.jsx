import "./Explore.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RecipePost } from "../../components/index";

export const Explore = () => {
  const query = useLocation().state;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        let response;
        if (query) {
          response = await axios.get(`http://localhost:3001/recipes/${query}`);
        } else {
          response = await axios.get(`http://localhost:3001/recipes`);
        }
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fectRecipes();
  }, [query]);

  return (
    <div className="explore-container">
      <h1>{query ? `Recipes with "${query}"` : "All Recipes"}</h1>
      <div className="explore">
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
