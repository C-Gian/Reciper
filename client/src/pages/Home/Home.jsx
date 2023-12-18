import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { RecipePost } from "../../components/index";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes", {
          headers: { authorization: cookies.access_token },
        });
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fectRecipes();
  }, []);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/get-liked-recipes`,
          {
            headers: { authorization: cookies.access_token },
          }
        );

        setLikedRecipes(response.data.likedRecipes);
      } catch (error) {
        console.error("Error fetching liked recipes", error);
      }
    };

    fetchLikedRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1>Recipes</h1>
      <div className="home-recipes">
        {recipes.map((recipePost) => (
          <RecipePost
            recipe={recipePost}
            key={recipePost._id}
            likedRecipes={likedRecipes}
          ></RecipePost>
        ))}
      </div>
    </div>
  );
};
