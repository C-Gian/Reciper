import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import "./Home.css";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { Tab } from "../../components/Tab/Tab";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fectRecipes();
    if (cookies.access_token) {
      fetchSavedRecipes();
    }
  }, []);

  return (
    <div className="homepage">
      <Tab></Tab>
      {/* <ul>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id}></RecipeCard>
        ))}
      </ul> */}
    </div>
  );
};
