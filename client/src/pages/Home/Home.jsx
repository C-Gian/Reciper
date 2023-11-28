import React from "react";
import "./Home.css";

import { Tab } from "../../components/Tab/Tab";

export const Home = () => {
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
