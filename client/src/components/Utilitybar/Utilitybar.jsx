import React from "react";
import "./Utilitybar.css";
import { Searchbar } from "../Searchbar/Searchbar";

export const Utilitybar = () => {
  return (
    <div className="utilitybar-container">
      <Searchbar></Searchbar>
      <h1>EXPLORE RECIPES</h1>
      <div style={{ width: 30, height: 30, backgroundColor: "red" }}></div>
    </div>
  );
};
