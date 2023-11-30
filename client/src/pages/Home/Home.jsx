import React from "react";
import "./Home.css";
import { Utilitybar } from "../../components";

export const Home = () => {
  return (
    <div className="homepage">
      <Utilitybar></Utilitybar>
      {/* <ul>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id}></RecipeCard>
        ))}
      </ul> */}
    </div>
  );
};
