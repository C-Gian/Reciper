import React, { useEffect, useState } from "react";
import "./Tab.css";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Searchbar } from "../Searchbar/Searchbar";

export const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  /* const [savedRecipes, setSavedRecipes] = useState([]); */

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    /* const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    }; */

    fectRecipes();
    /* if (cookies.access_token) {
      fetchSavedRecipes();
    } */
  }, []);

  /* const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  }; */

  /* const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  }; */

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-utilbar">
        <Searchbar></Searchbar>
        <ul className="tabs">
          <li
            className={activeTab === 1 ? "active" : ""}
            onClick={() => handleTabClick(1)}
          >
            All
          </li>
          <li
            className={activeTab === 2 ? "active" : ""}
            onClick={() => handleTabClick(2)}
          >
            My Recipes
          </li>
          <li
            className={activeTab === 3 ? "active" : ""}
            onClick={() => handleTabClick(3)}
          >
            Saved Recipes
          </li>
        </ul>
        <div style={{ width: 30, height: 30, backgroundColor: "red" }}></div>
      </div>

      <div className="tab-content">
        {activeTab === 1 && (
          <div className="tab-panel">
            {recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                /* saveRecipe={saveRecipe}
                isRecipeSaved={isRecipeSaved} */
              ></RecipeCard>
            ))}
          </div>
        )}
        {activeTab === 2 && <div className="tab-panel">Second tab content</div>}
        {activeTab === 3 && <div className="tab-panel">Third tab content</div>}
      </div>
    </div>
  );
};
