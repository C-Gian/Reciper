import React, { useEffect, useState } from "react";
import "./Tab.css";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [savedRecipes, setSavedRecipes] = useState([]);

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

  const saveRecipe = async (recipeID) => {
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
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs-container">
      <ul className="tabs">
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          First Tab
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          Second Tab
        </li>
        <li
          className={activeTab === 3 ? "active" : ""}
          onClick={() => handleTabClick(3)}
        >
          Third Tab
        </li>
        <li
          className={activeTab === 4 ? "active" : ""}
          onClick={() => handleTabClick(4)}
        >
          Forth Tab
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 1 && (
          <div className="tab-panel">
            {recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                saveRecipe={saveRecipe}
                isRecipeSaved={isRecipeSaved}
              ></RecipeCard>
            ))}
          </div>
        )}
        {activeTab === 2 && <div className="tab-panel">Second tab content</div>}
        {activeTab === 3 && <div className="tab-panel">Third tab content</div>}
        {activeTab === 4 && <div className="tab-panel">Forth tab content</div>}
      </div>
    </div>
  );
};
